"use client";
import React from "react";
import SignupBox from "../ui/signup-box";
import { Toaster } from "react-hot-toast";

const SignUpPage = () => {
  return (
    <div className="min-h-screen flex justify-center items-center bg-white">
      <SignupBox />
      <Toaster position="bottom-right" />
    </div>
  );
};

export default SignUpPage;
