import axios from "axios";
import { useRouter } from "next/navigation";
import React from "react";
import toast from "react-hot-toast";

const SignupBox = () => {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const router = useRouter();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "/api/sign-up",
        { name, email, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // success
      toast.success(response.data.message);
      router.push("/sign-in");
    } catch (error: any) {
      if (error.response?.status === 400) {
        // teacher already exists
        toast.error("Teacher already exists");
        router.push("/sign-in");
      } else {
        toast.error(error.response?.data?.message || "Signup failed");
      }
    }
  };

  return (
    <div className="bg-white w-full max-w-md mx-auto p-6 rounded shadow">
      <div className="md:hidden mb-4 text-center">
        <span className="inline-block text-xl font-bold text-black">
          ज्ञान<span className="text-blue-500">Setu</span>
        </span>
      </div>

      <h2 className="text-xl font-bold text-gray-900 mb-1">Create account</h2>
      <p className="text-sm text-gray-600 mb-6">
        Join our platform as a teacher
      </p>

      <form className="space-y-4" onSubmit={handleSignup}>
        <div>
          <label
            className="block text-sm font-medium text-gray-700 mb-1"
            htmlFor="name"
          >
            Full Name
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
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
            </div>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Reena Sharma"
              className="w-full pl-9 px-3 py-2 bg-gray-50 border border-gray-200 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
              required
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        </div>

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
              className="w-full pl-9 px-3 py-2 bg-gray-50 border border-gray-200 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>

        <div>
          <label
            className="block text-sm font-medium text-gray-700 mb-1"
            htmlFor="password"
          >
            Password
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
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
              </svg>
            </div>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="••••••••"
              className="w-full pl-9 px-3 py-2 bg-gray-50 border border-gray-200 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <p className="mt-1 text-xs text-gray-500">Min 8 characters</p>
        </div>

        <div className="flex items-center">
          <input
            id="terms"
            name="terms"
            type="checkbox"
            className="h-3.5 w-3.5 border-gray-300 rounded text-blue-500 focus:ring-blue-500"
            required
          />
          <label htmlFor="terms" className="ml-2 block text-xs text-gray-600">
            I agree to the{" "}
            <a href="#" className="text-blue-600 hover:text-blue-800">
              Terms
            </a>{" "}
            and{" "}
            <a href="#" className="text-blue-600 hover:text-blue-800">
              Privacy Policy
            </a>
          </label>
        </div>

        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-500 text-white font-medium rounded hover:bg-blue-600 transition focus:outline-none focus:ring-1 focus:ring-blue-500 focus:ring-offset-1"
        >
          Create Account
        </button>
      </form>

      <div className="mt-6 text-center text-sm">
        <span className="text-gray-600">Already have an account?</span>
        <a href="/sign-in" className="ml-1 text-blue-600 hover:text-blue-800">
          Sign in
        </a>
      </div>
    </div>
  );
};

export default SignupBox;
