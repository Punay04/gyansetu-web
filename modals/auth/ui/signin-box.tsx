import { useStore } from "@/zustand/init";
import axios from "axios";
import { useRouter } from "next/navigation";
import React from "react";
import toast from "react-hot-toast";

const SignInBox = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const router = useRouter();

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "/api/sign-in",
        {
          email,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.data;

      useStore.getState().setUser({
        username: data.data.username,
        email: data.data.email,
        id: data.data.id,
      });

      console.log("Signed in username:", data.data.username);
      toast.success(`${response.data.message}`);
      router.push("/dashboard");
    } catch (error: any) {
      if (error) {
        toast.error(error.response?.data?.message || "Sign-in failed");
      }
    }
  };

  return (
    <div className="bg-white w-full max-w-md mx-auto p-6 rounded shadow">
      <div className="md:hidden mb-4 text-center">
        <span className="inline-block text-xl font-bold text-black">
          ज्ञान<span className="text-orange-500">Setu</span>
        </span>
      </div>

      <h2 className="text-xl font-bold text-gray-900 mb-1">Welcome back</h2>
      <p className="text-sm text-gray-600 mb-6">Sign in to continue</p>

      <form className="space-y-4" onSubmit={handleSignIn}>
        <div>
          <label
            className="block text-sm font-medium text-gray-700 mb-1"
            htmlFor="email"
          >
            Email
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 text-gray-400"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="2" y="4" width="20" height="16" rx="2"></rect>
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
              </svg>
            </div>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="teacher@example.com"
              className="w-full pl-9 px-3 py-2 bg-gray-50 border border-gray-200 rounded focus:outline-none focus:ring-1 focus:ring-orange-500"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>

        <div>
          <div className="flex justify-between items-center mb-1">
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="password"
            >
              Password
            </label>
            <a
              href="#"
              className="text-xs text-orange-600 hover:text-orange-800"
            >
              Forgot?
            </a>
          </div>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 text-gray-400"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
              </svg>
            </div>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="••••••••"
              className="w-full pl-9 px-3 py-2 bg-gray-50 border border-gray-200 rounded focus:outline-none focus:ring-1 focus:ring-orange-500"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-2 px-4 bg-orange-500 text-white font-medium rounded hover:bg-orange-600 transition focus:outline-none focus:ring-1 focus:ring-orange-500 focus:ring-offset-1"
        >
          Sign In
        </button>
      </form>

      <div className="mt-6 text-center text-sm">
        <span className="text-gray-600">Don't have an account?</span>
        <a
          href="/sign-up"
          className="ml-1 text-orange-600 hover:text-orange-800"
        >
          Create account
        </a>
      </div>
    </div>
  );
};

export default SignInBox;
