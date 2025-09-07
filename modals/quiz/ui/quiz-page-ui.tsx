"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Loader2, Upload, Sparkles, BookOpen, Brain } from "lucide-react";
import toast from "react-hot-toast";
import axios from "axios";
import { useStore } from "@/zustand/init";

type QuizItem = { question: string; answer: string; options: string[] };

const grades = ["6", "7", "8", "9", "10", "11", "12"];
const subjects = [
  "Mathematics",
  "Computer Science",
  "Physics",
  "Chemistry",
  "Biology",
];
const difficulties = ["Easy", "Medium", "Hard", "Advanced"];

const QuizPageUi = () => {
  const [grade, setGrade] = React.useState<string>("");
  const [subject, setSubject] = React.useState<string>("");
  const [difficulty, setDifficulty] = React.useState<string>("");
  const [count, setCount] = React.useState<number>(3);
  const [loading, setLoading] = React.useState(false);
  const [quizLoading, setQuizLoading] = React.useState(false);
  const [quiz, setQuiz] = React.useState<QuizItem[]>([]);
  const [error, setError] = React.useState<string | null>(null);

  const handleClick = async () => {
    setLoading(true);
    setError(null);
    setQuiz([]);

    if (!grade || !subject || !difficulty) {
      setError("Please select grade, subject, and difficulty level");
      toast.error("Please select grade, subject, and difficulty level");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post("/api/quiz/generate", {
        grade,
        subject,
        difficulty,
        count,
      });

      const data = response.data;

      if (response && data) {
        setQuiz(data.quiz);
        setLoading(false);
        toast.success("Quiz generated successfully");
      } else {
        setError(data.error || "Failed to generate quiz");
        toast.error(data.error || "Failed to generate quiz");
        setLoading(false);
      }
    } catch (error) {
      setError("An unexpected error occurred");
      setLoading(false);
    }
  };

  const id = useStore((state) => state.id);

  const uploadQuizBtn = async () => {
    setLoading(true);
    setError(null);

    try {
      setQuizLoading(true);
      const response = await axios.post("/api/quiz/upload", {
        quiz,
        title: `${difficulty} Quiz on ${subject} for Grade ${grade}`,
        grade,
        subject,
        teacherId: id,
      });

      const data = response.data;

      if (response && data) {
        toast.success("Quiz uploaded successfully");
        setLoading(false);
        setQuizLoading(false);
      } else {
        setError(data.error || "Failed to upload quiz");
        toast.error(data.error || "Failed to upload quiz");
      }
    } catch (error) {
      setError("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto p-4 sm:p-6">
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
          Create Quiz
        </h1>
        <p className="text-gray-600 mt-1">
          Generate or upload quizzes for your students
        </p>
      </div>

      <div className="flex flex-col gap-6">
        <Card className="border border-gray-200 bg-white shadow-sm">
          <CardHeader className="border-b border-gray-100 bg-gray-50/50">
            <CardTitle className="flex items-center gap-2 text-lg font-medium text-gray-800">
              <Brain className="h-5 w-5 text-blue-500" />
              <span>Quiz Generator</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-gray-700">
                  Grade
                </label>
                <Select value={grade} onValueChange={setGrade}>
                  <SelectTrigger className="bg-gray-50 border border-gray-200 focus:border-blue-500 focus:ring-blue-500">
                    <SelectValue placeholder="Select grade" />
                  </SelectTrigger>
                  <SelectContent>
                    {grades.map((g) => (
                      <SelectItem key={g} value={g}>
                        {g}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-gray-700">
                  Subject
                </label>
                <Select value={subject} onValueChange={setSubject}>
                  <SelectTrigger className="bg-gray-50 border border-gray-200 focus:border-blue-500 focus:ring-blue-500">
                    <SelectValue placeholder="Select subject" />
                  </SelectTrigger>
                  <SelectContent>
                    {subjects.map((s) => (
                      <SelectItem key={s} value={s}>
                        {s}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-gray-700">
                  Difficulty Level
                </label>
                <Select value={difficulty} onValueChange={setDifficulty}>
                  <SelectTrigger className="bg-gray-50 border border-gray-200 focus:border-blue-500 focus:ring-blue-500">
                    <SelectValue placeholder="Select difficulty" />
                  </SelectTrigger>
                  <SelectContent>
                    {difficulties.map((d) => (
                      <SelectItem key={d} value={d}>
                        {d}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-gray-700">
                  Number of Questions
                </label>
                <Input
                  type="number"
                  min={3}
                  max={10}
                  value={count}
                  onChange={(e) => setCount(Number(e.target.value))}
                  className="bg-gray-50 border border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 mt-6">
              <Button
                className="bg-blue-500 hover:bg-blue-600 text-white font-medium px-5 py-2 h-auto"
                disabled={loading}
                onClick={handleClick}
              >
                {loading && quizLoading && (
                  <span className="inline-flex items-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Uploading...
                  </span>
                )}
                {loading && !quizLoading && (
                  <span className="inline-flex items-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Generating...
                  </span>
                )}

                {!loading && (
                  <span className="inline-flex items-center gap-2">
                    <Sparkles className="h-4 w-4" />
                    Generate Quiz with AI
                  </span>
                )}
              </Button>

              <Button
                variant="outline"
                className="border-gray-200 hover:bg-gray-50 text-gray-700 font-medium px-5 py-2 h-auto"
                onClick={() => {
                  if (quiz.length === 0) {
                    toast.error("Please generate a quiz first");
                    return;
                  }
                  uploadQuizBtn();
                }}
                disabled={quizLoading || quiz.length === 0}
              >
                <span className="inline-flex items-center gap-2">
                  <Upload className="h-4 w-4" />
                  {quizLoading ? "Uploading..." : "Upload Quiz"}
                </span>
              </Button>
            </div>

            {error && (
              <div className="mt-4 p-3 bg-red-50 text-red-600 text-sm rounded-md border border-red-200">
                {error}
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="border border-gray-200 bg-white shadow-sm">
          <CardHeader className="border-b border-gray-100 bg-gray-50/50">
            <CardTitle className="flex items-center gap-2 text-lg font-medium text-gray-800">
              <BookOpen className="h-5 w-5 text-blue-500" />
              <span>Quiz Preview</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-5">
            {!quiz ? (
              <div className="text-center py-8">
                <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-3">
                  <BookOpen className="h-8 w-8 text-gray-400" />
                </div>
                <p className="text-gray-600">No quiz questions yet.</p>
                <p className="text-sm text-gray-500 mt-1">
                  Generate a new quiz with AI
                </p>
              </div>
            ) : (
              <ul className="space-y-4">
                {quiz.map((item, idx) => (
                  <li
                    key={idx}
                    className="rounded-lg border border-gray-200 p-4 bg-gray-50"
                  >
                    <div className="flex gap-3">
                      <div className="flex-shrink-0 bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-medium">
                        {idx + 1}
                      </div>
                      <div className="flex-1">
                        <div className="text-base font-medium text-gray-800">
                          {item.question}
                        </div>
                        <div>
                          {item.options.map((option, index) => (
                            <div key={index} className="flex items-center">
                              <span className="mr-1"> {index + 1}. </span>
                              <span className="text-gray-600">{option}</span>
                            </div>
                          ))}
                        </div>
                        <div className="mt-3 p-3 bg-white border-l-4 border-green-500 text-sm text-gray-700 rounded">
                          <span className="font-medium text-green-600">
                            Answer:
                          </span>{" "}
                          {item.answer}
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default QuizPageUi;
