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
      console.log("Sign-in response:", response.data);
      toast.success(`${response.data.message}`);
      router.push("/dashboard");
    } catch (error: any) {
      if (error) {
        toast.error(error.response?.data?.message || "Sign-in failed");
      }
    }
  };

  return (
    <div className="bg-white w-full max-w-md mx-auto p-8 rounded-lg shadow-lg border border-neutral-200">
      <div className="mb-4 text-center">
        <span className="inline-block text-3xl font-extrabold text-black tracking-tight">
          ज्ञान<span className="text-orange-500">Setu</span>
        </span>
        <p className="mt-2 text-sm text-black font-medium">
          Welcome back! Sign in to monitor and empower your students.
        </p>
      </div>
      <h2 className="text-xl font-bold text-black mb-6 text-center">
        Teacher Sign In
      </h2>
      <form className="space-y-5" onSubmit={handleSignIn}>
        <div>
          <label
            className="block text-sm font-medium text-black mb-1"
            htmlFor="email"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="w-full px-4 py-2 border border-neutral-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label
            className="block text-sm font-medium text-black mb-1"
            htmlFor="password"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            className="w-full px-4 py-2 border border-neutral-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 px-4 bg-orange-500 text-white font-semibold rounded shadow hover:bg-black hover:text-orange-400 transition border border-orange-300"
        >
          Sign In
        </button>
      </form>
      <div className="mt-6 text-center">
        <span className="text-sm text-neutral-700">Don't have an account?</span>
        <a
          href="/sign-up"
          className="ml-2 text-orange-500 font-semibold hover:underline"
        >
          Sign up
        </a>
      </div>
    </div>
  );
};

export default SignInBox;
