import { Toaster } from "sonner";
import Link from "next/link";

// Logo Component
function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2 group">
      <div className="w-9 h-9 sm:w-10 sm:h-10 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/25 group-hover:shadow-xl group-hover:shadow-purple-500/40 transition-all duration-300">
        <svg
          className="w-5 h-5 sm:w-6 sm:h-6 text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
          />
        </svg>
      </div>
      <span className="text-xl sm:text-2xl font-bold text-white">
        Item<span className="text-cyan-400">Hub</span>
      </span>
    </Link>
  );
}

// Simple Auth Navbar
function AuthNavbar() {
  return (
    <nav className="absolute top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          <Logo />
          <Link
            href="/"
            className="flex items-center gap-1.5 sm:gap-2 text-white/70 hover:text-white transition-colors duration-300 group"
          >
            <svg
              className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform duration-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            <span className="font-medium text-sm sm:text-base hidden xs:inline">
              Back to Home
            </span>
            <span className="font-medium text-sm sm:hidden">Home</span>
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default function AuthLayout({ children }) {
  return (
    <>
      <AuthNavbar />
      <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden px-4 py-20 sm:py-0">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {/* Gradient Orbs - Smaller on mobile */}
          <div
            className="absolute top-10 sm:top-20 left-0 sm:left-10 w-64 h-64 sm:w-96 sm:h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"
            style={{ animationDuration: "4s" }}
          ></div>
          <div
            className="absolute top-20 sm:top-40 -right-10 sm:right-20 w-64 h-64 sm:w-96 sm:h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"
            style={{ animationDelay: "1s", animationDuration: "5s" }}
          ></div>
          <div
            className="absolute bottom-10 sm:bottom-20 left-1/4 sm:left-1/3 w-64 h-64 sm:w-96 sm:h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"
            style={{ animationDelay: "2s", animationDuration: "6s" }}
          ></div>

          {/* Grid Pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:30px_30px] sm:bg-[size:50px_50px]"></div>

          {/* Floating Elements - Hidden on very small screens */}
          <div
            className="hidden sm:block absolute top-1/4 left-1/4 w-3 h-3 bg-cyan-400 rounded-full animate-bounce"
            style={{ animationDuration: "3s" }}
          ></div>
          <div
            className="hidden sm:block absolute top-1/3 right-1/4 w-2 h-2 bg-purple-400 rounded-full animate-bounce"
            style={{ animationDuration: "2.5s", animationDelay: "0.5s" }}
          ></div>
          <div
            className="hidden sm:block absolute bottom-1/4 left-1/3 w-2 h-2 bg-pink-400 rounded-full animate-bounce"
            style={{ animationDuration: "2s", animationDelay: "1s" }}
          ></div>
          <div
            className="hidden sm:block absolute top-1/2 right-1/3 w-3 h-3 bg-yellow-400 rounded-full animate-bounce"
            style={{ animationDuration: "2.8s", animationDelay: "0.3s" }}
          ></div>
        </div>

        {/* Content */}
        <div className="relative z-10 w-full flex items-center justify-center">
          {children}
        </div>
      </main>
      <Toaster position="top-right" />
    </>
  );
}
