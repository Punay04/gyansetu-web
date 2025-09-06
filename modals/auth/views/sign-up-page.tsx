"use client";
import React from "react";
import SignupBox from "../ui/signup-box";
import { Toaster } from "react-hot-toast";

const SignUpPage = () => {
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left side - Sign up form */}
      <div className="w-full flex justify-center items-center bg-gray-50 p-4 order-2 md:order-1">
        <SignupBox />
        <Toaster position="top-right" />
      </div>

      {/* Right side - Branding and features */}
    </div>
  );
};

export default SignUpPage;
