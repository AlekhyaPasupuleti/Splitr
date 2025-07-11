import React from "react";
import { Dialog,DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { X, UserPlus } from "lucide-react";
import { AvatarFallback, Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { useConvexMutation, useConvexQuery } from "@/hooks/use-convex-query";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

const groupSchema = z.object({
    name: z.string().min(1, "Group name is required"),
    description: z.string().optional(),
})


const CreateGroupModal = ({ isOpen, onClose, onSuccess }) => {
 const [selectedMembers, setSelectedMembers] = useState([]);
 const [searchQuery, setSearchQuery] = useState("");
 const [commandOpen, setCommandOpen] = useState(false);

 const { data: currentUser } = useConvexQuery(api.users.getCurrentUser);
 const { data: searchResults, isLoading: isSearching } = useConvexQuery(
  api.users.searchUsers, 
  {query:searchQuery}
);

const createGroup =  useConvexMutation(api.contacts.createGroup)

const addMember = (user) => {
  if(!selectedMembers.some((m) => m.id === user.id)) {
    setSelectedMembers([...selectedMembers, user]);
  }
  setCommandOpen(false);
};

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver:zodResolver(groupSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      const membersIds = selectedMembers?.map((member) => member.id);

      const groupId = await createGroup.mutate({
        name:data.name,
        description: data.description,
        members: membersIds,
      });

      toast.success("Group created successfully!");
      handleClose();

      if(onSuccess) onSuccess(groupId);
    } catch(error) {
      toast.error("Failed to create group:" + error.message);

    } };

  const removeMember = (userId) => {
    setSelectedMembers(selectedMembers.filter((m) => m.id !== userId));
  };

const handleClose = () => {

  reset();
setSelectedMembers([]);
  onClose();
};

  return (
  <Dialog open={isOpen} onOpenChange={handleClose}>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Create New Group</DialogTitle>
    </DialogHeader>

    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Group Name</Label>
        <Input 
        id="name" 
        placeholder="Enter group name" 
        {...register("name")}
        />
        {errors.name && (
          <p className="text-sm text-red-500">{errors.name.message}</p>
          )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description (Optional)</Label>
        <Textarea
        id="description" 
        placeholder="Enter group name" 
        {...register("description")}
        />
        {errors.name && (
          <p className="text-sm text-red-500">{errors.name.message}</p>
          )}
      </div>

          <div className="space-y-2">
            <Label>Members</Label>
            <div className="flex flex-wrap gap-2 mb-2">
              {currentUser && (
              <Badge variant = "secondary" className="px-3 py-1">
                <Avatar className="h-5 w-5 mr-2">
                  <AvatarImage src={currentUser.imageUrl} />
                  <AvatarFallback>
                    {currentUser.name?.charAt(0) || "?"}
                  </AvatarFallback>
                </Avatar>
                <span>{currentUser.name} (You)</span>
              </Badge>
            )}
            
            {/* selected members */}

            {selectedMembers.map((member) => (
              <Badge
              key={member.id}
              variant="secondary"
              className="px-3 py-1">
                <Avatar className="h-5 w-5 mr-2">
                  <AvatarImage src={member.imageUrl}/>
                  <AvatarFallback>
                    {member.name?.charAt(0) || "?"}
                  </AvatarFallback>
                </Avatar>
                <span>{member.name}</span>
                <button 
                type="button"
                onClick={() => removeMember(member.id)}
                className="ml-2 text-muted-foreground hover:text-foreground"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))}
          
            {/* add user to selected members */}
            <Popover open={commandOpen} onOpenChange={setCommandOpen}>
              <PopoverTrigger asChild>
                <Button 
                type="button"
                variant="outline"
                size="sm"
                className="h-8 gap-1 text-xs"
                >
                  <UserPlus className="h-3.5 w-3.5" />
                  Add member
                </Button>
                </PopoverTrigger>
              <PopoverContent className="p-0" align="start" side="bottom">
                <Command>
  <CommandInput 
  placeholder="Search by name or email..." 
  value={searchQuery}
  onValueChange={setSearchQuery}
  />
  <CommandList>
    <CommandEmpty>{searchQuery.length < 2 ? (
      <p className="py-3 px-4
    text-sm text-center text-muted-foreground">
          Type at least 2 characters to search
    </p> 
    ) : isSearching ? (
      <p className="py-3 px-4 text-sm text-center
      text-muted-foreground">
          Searching...
      </p> 
      ) : (
        <p className="py-3 px-4 text-sm 
        text-centertext-muted-foreground">
          No users found
        </p>
      )}
    </CommandEmpty>
    <CommandGroup heading="Users">
      {searchResults?.map((user) => (
        <CommandItem
        key={user.id}
        value={user.name + user.email}
        onSelect={() => addMember(user)}
        >
          <div className="flex items-center gap-2">
            <Avatar className="h-6 w-6">
              <AvatarImage src={user.imageUrl} />
              <AvatarFallback>
                {user.name?.charAt(0) || "?"}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="text-sm">{user.name}</span>
              <span className="text-xs text-muted-foreground">
                {user.email}
              </span>
            </div>
            </div>
          </CommandItem>
      ))}
      
    </CommandGroup>
  </CommandList>
</Command>
             
              </PopoverContent>
            </Popover>

            </div>
            {selectedMembers.length === 0 && (
              <p className="text-sm text-amber-600">
                Add at least one other person to the group
              </p>
            )}
          </div>
          <DialogFooter>
        <Button type="button" variant="outline" onClick={handleClose}>
          Cancel
        </Button>
        <Button 
        type="submit"
        disabled = {isSubmitting || selectedMembers.length === 0}
        >
          { isSubmitting ? "Creating..." : "Create Group" }
        </Button>
    </DialogFooter>
    </form>

    
  </DialogContent>
</Dialog>
  );
};

export default CreateGroupModal;
