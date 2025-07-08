# Splitr

**Splitr** is a modern, full-stack expense splitting application built with Next.js 15 and React 19. It features user authentication, data management, and visual analytics for tracking shared expenses.

## ✨ Features

- 🔐 **Authentication** with Clerk
- 🧠 **AI-Powered Suggestions** using Gemini AI
- 📊 **Data Visualizations** with Recharts
- 🎨 **Modern UI** using TailwindCSS and Radix UI components
- 📦 **Backendless Data Layer** with Convex
- 📅 **Date Picker** with `react-day-picker`
- 📧 **Transactional Emails** via Resend
- 🧪 **Form Validation** using `react-hook-form` + `zod`
- 🌙 **Theme Support** with `next-themes`

---

## 🧱 Tech Stack

| Layer         | Technology                                     |
|---------------|------------------------------------------------|
| Frontend      | React 19, Next.js 15, TailwindCSS              |
| UI Components | Radix UI, Lucide Icons, CMDK, Sonner Toasts    |
| Forms         | React Hook Form, Zod, Hookform Resolvers       |
| Backend       | Convex (serverless), Inngest (job/event system)|
| Auth          | Clerk (frontend + backend SDKs)                |
| AI            | Gemini AI API                       |
| Charts        | Recharts                                       |
| Email         | Resend                                         |

---

## 🚀 Getting Started

### 1. Clone the Repo

```bash
git clone https://github.com/your-username/splitr.git
cd splitr

2. Install Dependencies
npm install

3. Environment Variables
CLERK_PUBLISHABLE_KEY=your_key
CLERK_SECRET_KEY=your_secret
CONVEX_DEPLOY_KEY=your_convex_key
NEXT_PUBLIC_CONVEX_URL=https://your.convex.dev
GOOGLE_API_KEY=your_google_genai_key
RESEND_API_KEY=your_resend_key

Note: You will need accounts and credentials for Clerk, Convex, Google GenAI, and Resend.

4. Start Development Server
npm run dev

5. Start Backend Server
npx convex dev

📁 Project Structure
splitr/
├── app/                  # Next.js app router pages
├── components/           # UI Components
├── convex/               # Convex backend functions
├── lib/                  # Utility functions
├── styles/               # Tailwind & Global CSS
├── public/               # Static assets
├── .env.local            # Environment variables
└── package.json          # Project config

---

## ✅ Conclusion

Splitr is built to simplify the process of tracking and managing shared expenses with modern tools and a beautiful user experience. Whether you're splitting bills with friends or managing group expenses, this app provides a fast, secure, and scalable solution. Contributions are welcome — feel free to fork, extend, or suggest new features!
