import QuizPage from "@/modals/quiz/views/quiz-page";
import React from "react";
import { Toaster } from "react-hot-toast";

const Quiz = () => {
  return (
    <div>
      <QuizPage />
      <Toaster position="top-right" />
    </div>
  );
};

export default Quiz;
