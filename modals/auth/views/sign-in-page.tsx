import React from "react";
import SignInBox from "../ui/signin-box";
import { Toaster } from "react-hot-toast";

const SignInPage = () => {
  return (
    <div className="min-h-screen flex justify-center items-center bg-white">
      <SignInBox />
      <Toaster />
    </div>
  );
};

export default SignInPage;
