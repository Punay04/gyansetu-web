import React from "react";
import SignInBox from "../ui/signin-box";
import { Toaster } from "react-hot-toast";

const SignInPage = () => {
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Right side - Sign in form */}
      <div className="w-full flex justify-center items-center bg-gray-50 p-4">
        <SignInBox />
        <Toaster position="top-right" />
      </div>
    </div>
  );
};

export default SignInPage;
