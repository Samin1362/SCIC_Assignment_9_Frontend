"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useState } from "react";
import { loginUser } from "@/lib/api";

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

// Icon Components
const EmailIcon = ({ focused }) => (
  <svg
    className={`w-4 h-4 sm:w-5 sm:h-5 transition-colors duration-300 ${
      focused ? "text-cyan-400" : "text-white/40"
    }`}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
    />
  </svg>
);

const LockIcon = ({ focused }) => (
  <svg
    className={`w-4 h-4 sm:w-5 sm:h-5 transition-colors duration-300 ${
      focused ? "text-cyan-400" : "text-white/40"
    }`}
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
);

const ErrorIcon = () => (
  <svg
    className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-red-400 flex-shrink-0"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);

export default function LoginForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const response = await loginUser(data.email, data.password);

      if (response.success) {
        toast.success("Login successful! Redirecting...");
        setTimeout(() => router.push("/items"), 1000);
      } else {
        toast.error(response.message || "Login failed");
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "An error occurred. Please try again.";
      toast.error(errorMessage);
      console.error("Login error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 sm:space-y-5">
      {/* Email Field */}
      <div className="space-y-1.5 sm:space-y-2">
        <label
          htmlFor="email"
          className="block text-xs sm:text-sm font-medium text-white/80"
        >
          Email Address
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 sm:pl-4 flex items-center pointer-events-none">
            <EmailIcon focused={emailFocused} />
          </div>
          <input
            {...register("email")}
            type="email"
            id="email"
            placeholder="user@example.com"
            onFocus={() => setEmailFocused(true)}
            onBlur={() => setEmailFocused(false)}
            className={`w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-3 sm:py-3.5 bg-white/5 border rounded-lg sm:rounded-xl text-sm sm:text-base text-white placeholder:text-white/30 focus:outline-none transition-all duration-300 ${
              errors.email
                ? "border-red-500/50 focus:border-red-500 focus:ring-2 focus:ring-red-500/20"
                : "border-white/10 focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20 hover:border-white/20"
            }`}
          />
        </div>
        {errors.email && (
          <div className="flex items-center gap-1.5 sm:gap-2 text-red-400 text-xs sm:text-sm animate-fade-in">
            <ErrorIcon />
            <span>{errors.email.message}</span>
          </div>
        )}
      </div>

      {/* Password Field */}
      <div className="space-y-1.5 sm:space-y-2">
        <label
          htmlFor="password"
          className="block text-xs sm:text-sm font-medium text-white/80"
        >
          Password
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 sm:pl-4 flex items-center pointer-events-none">
            <LockIcon focused={passwordFocused} />
          </div>
          <input
            {...register("password")}
            type="password"
            id="password"
            placeholder="Enter your password"
            onFocus={() => setPasswordFocused(true)}
            onBlur={() => setPasswordFocused(false)}
            className={`w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-3 sm:py-3.5 bg-white/5 border rounded-lg sm:rounded-xl text-sm sm:text-base text-white placeholder:text-white/30 focus:outline-none transition-all duration-300 ${
              errors.password
                ? "border-red-500/50 focus:border-red-500 focus:ring-2 focus:ring-red-500/20"
                : "border-white/10 focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20 hover:border-white/20"
            }`}
          />
        </div>
        {errors.password && (
          <div className="flex items-center gap-1.5 sm:gap-2 text-red-400 text-xs sm:text-sm animate-fade-in">
            <ErrorIcon />
            <span>{errors.password.message}</span>
          </div>
        )}
      </div>

      {/* Demo Credentials Note */}
      <div className="bg-cyan-500/10 border border-cyan-500/20 rounded-lg sm:rounded-xl p-3 sm:p-4 animate-fade-in delay-100">
        <div className="flex items-start gap-2.5 sm:gap-3">
          <div className="w-7 h-7 sm:w-8 sm:h-8 bg-cyan-500/20 rounded-md sm:rounded-lg flex items-center justify-center flex-shrink-0">
            <svg
              className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-cyan-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <div className="text-xs sm:text-sm min-w-0">
            <p className="font-semibold text-cyan-300 mb-1">Demo Credentials</p>
            <div className="space-y-1 text-cyan-200/70">
              <p className="flex flex-wrap items-center gap-1">
                <span>Email:</span>
                <code className="bg-white/10 px-1.5 sm:px-2 py-0.5 rounded text-cyan-300 text-xs break-all">
                  user@example.com
                </code>
              </p>
              <p className="flex flex-wrap items-center gap-1">
                <span>Password:</span>
                <code className="bg-white/10 px-1.5 sm:px-2 py-0.5 rounded text-cyan-300 text-xs">
                  password123
                </code>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isLoading}
        className="w-full relative group overflow-hidden bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-400 hover:to-purple-400 disabled:from-gray-600 disabled:to-gray-600 disabled:cursor-not-allowed text-white font-semibold py-3 sm:py-4 px-4 sm:px-6 rounded-lg sm:rounded-xl transition-all duration-300 shadow-lg shadow-purple-500/25 hover:shadow-xl hover:shadow-purple-500/40 disabled:shadow-none text-sm sm:text-base"
      >
        {/* Button shine effect */}
        <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>

        {/* Button content */}
        <span className="relative flex items-center justify-center gap-2">
          {isLoading ? (
            <>
              <svg
                className="animate-spin h-4 w-4 sm:h-5 sm:w-5"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              <span>Signing in...</span>
            </>
          ) : (
            <>
              <span>Sign In</span>
              <svg
                className="w-4 h-4 sm:w-5 sm:h-5 transform group-hover:translate-x-1 transition-transform duration-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </>
          )}
        </span>
      </button>
    </form>
  );
}
