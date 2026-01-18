import LoginForm from "@/components/LoginForm";
import Link from "next/link";

export const metadata = {
  title: "Login - ItemHub",
  description: "Login to ItemHub to access your account and manage items",
};

// Icon component
const SparklesIcon = () => (
  <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456z" />
  </svg>
);

export default function LoginPage() {
  return (
    <div className="w-full max-w-md animate-fade-in">
      {/* Glassmorphism Card */}
      <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl sm:rounded-3xl shadow-2xl shadow-purple-500/10 p-6 sm:p-8 md:p-10">
        {/* Header Section */}
        <div className="text-center mb-6 sm:mb-8">
          {/* Badge */}
          <div className="inline-flex items-center gap-1.5 sm:gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-3 py-1.5 sm:px-4 sm:py-2 mb-4 sm:mb-6">
            <SparklesIcon />
            <span className="text-white/90 text-xs sm:text-sm font-medium">
              Welcome Back
            </span>
          </div>

          {/* Title */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 sm:mb-3">
            <span className="text-white">Sign in to </span>
            <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              ItemHub
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-gray-400 text-sm sm:text-base">
            Enter your credentials to access your account
          </p>
        </div>

        {/* Login Form */}
        <LoginForm />

        {/* Footer Links */}
        <div className="mt-6 sm:mt-8 text-center">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/10"></div>
            </div>
            <div className="relative flex justify-center text-xs sm:text-sm">
              <span className="px-3 sm:px-4 bg-transparent text-gray-500">
                New to ItemHub?
              </span>
            </div>
          </div>

          <p className="mt-3 sm:mt-4 text-gray-400 text-xs sm:text-sm">
            Don&apos;t have an account?{" "}
            <Link
              href="#"
              className="text-cyan-400 hover:text-cyan-300 font-medium transition-colors duration-300"
            >
              Contact support
            </Link>
          </p>
        </div>
      </div>

      {/* Trust Badges - Stack on very small screens */}
      <div className="flex flex-col xs:flex-row items-center justify-center gap-3 xs:gap-4 sm:gap-6 mt-6 sm:mt-8 text-white/40 text-xs sm:text-sm animate-fade-in delay-300">
        <div className="flex items-center gap-1.5 sm:gap-2">
          <svg
            className="w-3.5 h-3.5 sm:w-4 sm:h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
            />
          </svg>
          <span>Secure Login</span>
        </div>
        <div className="hidden xs:block w-1 h-1 rounded-full bg-white/20"></div>
        <div className="flex items-center gap-1.5 sm:gap-2">
          <svg
            className="w-3.5 h-3.5 sm:w-4 sm:h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
            />
          </svg>
          <span>256-bit SSL</span>
        </div>
      </div>
    </div>
  );
}
