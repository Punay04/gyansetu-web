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
    <div
      className="bg-white w-full max-w-md mx-auto mt
    -10 p-8 rounded-lg shadow-lg border border-neutral-200"
    >
      <div className="mb-4 text-center">
        <span className="inline-block text-3xl font-extrabold text-black tracking-tight">
          ज्ञान<span className="text-orange-500">Setu</span>
        </span>
        <p className="mt-2 text-sm text-black font-medium">
          Empowering Teachers with Analytics to Monitor Student Performance
        </p>
        <p className="mt-1 text-xs text-neutral-600">
          ज्ञानSetu is an advanced analytics platform designed to help teachers
          track, analyze, and improve student outcomes with actionable insights.
        </p>
      </div>
      <h2 className="text-xl font-bold text-black mb-6 text-center">
        Teacher Signup
      </h2>
      <form className="space-y-5" onSubmit={handleSignup}>
        <div>
          <label
            className="block text-sm font-medium text-black mb-1"
            htmlFor="name"
          >
            Full Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className="w-full px-4 py-2 border border-neutral-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
            required
            onChange={(e) => setName(e.target.value)}
          />
        </div>
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
          Sign Up
        </button>
      </form>
      <div className="mt-6 text-center">
        <span className="text-sm text-neutral-700">
          Already have an account?
        </span>
        <a
          href="/sign-in"
          className="ml-2 text-orange-500 font-semibold hover:underline"
        >
          Sign in
        </a>
      </div>
    </div>
  );
};

export default SignupBox;
