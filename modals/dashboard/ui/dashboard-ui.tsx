"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useStore } from "@/zustand/init";
import {
  Users,
  Trophy,
  Award,
  TrendingUp,
  BarChart3,
  PieChart,
  BookOpen,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart as RePieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

const DashboardUi = () => {
  const username = useStore((state) => state.username);

  // Hardcoded student data
  const students = [
    { id: "1", name: "Punay Kukreja", points: 2850, progress: 92, badges: 12 },
    { id: "2", name: "Vansh Goel", points: 2720, progress: 88, badges: 11 },
    { id: "3", name: "Aditya Sharma", points: 2650, progress: 85, badges: 10 },
    { id: "4", name: "Priya Patel", points: 2580, progress: 82, badges: 9 },
    { id: "5", name: "Rahul Kumar", points: 2450, progress: 78, badges: 8 },
    { id: "6", name: "Sneha Singh", points: 2380, progress: 75, badges: 7 },
    { id: "7", name: "Arjun Mehta", points: 2320, progress: 72, badges: 6 },
    { id: "8", name: "Kavya Reddy", points: 2250, progress: 68, badges: 5 },
    { id: "9", name: "Vikram Joshi", points: 2180, progress: 65, badges: 4 },
    { id: "10", name: "Ananya Das", points: 2100, progress: 62, badges: 3 },
  ];

  // Hardcoded recent activities
  const recentActivities = [
    {
      studentName: "Punay Kukreja",
      badge: "Outstanding Achievement",
      awardedAt: new Date(Date.now() - 3600000).toISOString(), // 1 hour ago
    },
    {
      studentName: "Vansh Goel",
      badge: "Perfect Score",
      awardedAt: new Date(Date.now() - 7200000).toISOString(), // 2 hours ago
    },
    {
      studentName: "Aditya Sharma",
      badge: "Quick Learner",
      awardedAt: new Date(Date.now() - 10800000).toISOString(), // 3 hours ago
    },
    {
      studentName: "Priya Patel",
      badge: "Consistent Performer",
      awardedAt: new Date(Date.now() - 14400000).toISOString(), // 4 hours ago
    },
    {
      studentName: "Rahul Kumar",
      badge: "Problem Solver",
      awardedAt: new Date(Date.now() - 18000000).toISOString(), // 5 hours ago
    },
  ];

  // Calculate average progress
  const averageProgress = Math.round(
    students.reduce((sum, student) => sum + student.progress, 0) /
      students.length
  );

  // Get top students sorted by points
  const topStudents = [...students]
    .sort((a, b) => b.points - a.points)
    .slice(0, 5);

  // Subject performance data
  const subjectPerformance = [
    { name: "Mathematics", score: 76 },
    { name: "Science", score: 82 },
    { name: "English", score: 65 },
    { name: "Computer Science", score: 90 },
    { name: "Social Studies", score: 72 },
  ];

  // Quiz completion data
  const quizCompletionData = [
    { name: "Completed", value: 68, color: "#3b82f6" }, // Blue-500
    { name: "Pending", value: 32, color: "#dbeafe" }, // Blue-100
  ];

  // Stats for the dashboard
  const stats = [
    { title: "Total Students", value: students.length, icon: Users },
    { title: "Challenges Completed", value: "187", icon: Trophy },
    { title: "Badges Earned", value: recentActivities.length, icon: Award },
    { title: "Average Engagement", value: "87%", icon: TrendingUp },
  ];

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      {/* Welcome */}
      <div className="bg-white p-6 rounded-lg">
        <h1 className="text-2xl font-bold text-gray-900">
          Welcome back, {username || "Teacher"}
        </h1>
        <p className="text-gray-600 mt-1">Here's your dashboard overview</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => {
          const IconComponent = stat.icon;
          return (
            <Card key={index} className="bg-white">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">{stat.title}</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {stat.value}
                    </p>
                  </div>
                  <IconComponent className="h-8 w-8 text-blue-500" />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Students */}
        <Card className="bg-white">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">
              Top Students
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {topStudents.map((student, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center p-3 bg-gray-50 rounded"
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-sm font-medium text-gray-500">
                      #{index + 1}
                    </span>
                    <span className="font-medium text-gray-900">
                      {student.name}
                    </span>
                  </div>
                  <span className="text-sm text-blue-600">
                    {student.points} pts
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="bg-white">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {!recentActivities.length && (
                <p className="text-sm text-gray-500">Loading...</p>
              )}
              {recentActivities.map((d: any) => (
                <div key={d.studentName} className="p-3 bg-gray-50 rounded">
                  <p className="font-medium text-gray-900"></p>
                  <p className="text-sm text-gray-700">
                    {d.studentName} got {d.badge} badge
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    {Math.floor(
                      (Date.now() - new Date(d.awardedAt).getTime()) /
                        1000 /
                        60 /
                        60
                    )}
                    h{" "}
                    {Math.floor(
                      ((Date.now() - new Date(d.awardedAt).getTime()) /
                        1000 /
                        60) %
                        60
                    )}
                    m ago
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Analytics Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Subject Performance */}
        <Card className="bg-white">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg font-semibold">
              <BarChart3 className="h-5 w-5 text-blue-500" />
              Subject Performance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={subjectPerformance}
                  margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
                >
                  <XAxis
                    dataKey="name"
                    tick={{ fontSize: 12 }}
                    tickLine={false}
                    axisLine={{ stroke: "#e5e7eb" }}
                  />
                  <YAxis
                    tick={{ fontSize: 12 }}
                    tickLine={false}
                    axisLine={{ stroke: "#e5e7eb" }}
                    domain={[0, 100]}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "white",
                      border: "1px solid #e5e7eb",
                      borderRadius: "6px",
                      fontSize: "12px",
                    }}
                    formatter={(value: any) => [`${value}%`, "Score"]}
                  />
                  <Bar dataKey="score" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Quiz Completion Rate */}
        <Card className="bg-white">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg font-semibold">
              <PieChart className="h-5 w-5 text-blue-500" />
              Quiz Completion Rate
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[250px] flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <RePieChart>
                  <Pie
                    data={quizCompletionData}
                    cx="50%"
                    cy="50%"
                    innerRadius={70}
                    outerRadius={90}
                    paddingAngle={5}
                    dataKey="value"
                    label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
                    labelLine={false}
                    stroke="none"
                  >
                    {quizCompletionData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={entry.color}
                        strokeWidth={0}
                      />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value: any) => `${value}%`}
                    contentStyle={{
                      backgroundColor: "white",
                      border: "1px solid #e5e7eb",
                      borderRadius: "6px",
                      fontSize: "12px",
                    }}
                  />
                  <Legend
                    formatter={(value, entry) => {
                      return (
                        <span
                          style={{
                            color:
                              value === "Completed" ? "#3b82f6" : "#3b82f6",
                            fontWeight: value === "Completed" ? 500 : 400,
                          }}
                        >
                          {value}
                        </span>
                      );
                    }}
                  />
                </RePieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Overall Progress */}
      <Card className="bg-white">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg font-semibold">
            <BookOpen className="h-5 w-5 text-blue-500" />
            Overall Class Progress
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center p-6 text-center">
            <div className="relative w-40 h-40 flex items-center justify-center">
              <svg className="w-full h-full" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke="#e5e7eb"
                  strokeWidth="10"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke="#3b82f6"
                  strokeWidth="10"
                  strokeDasharray={`${
                    (2 * Math.PI * 45 * averageProgress) / 100
                  } ${2 * Math.PI * 45 * (1 - averageProgress / 100)}`}
                  strokeDashoffset="0"
                  transform="rotate(-90 50 50)"
                />
              </svg>
              <div className="absolute">
                <p className="text-3xl font-bold text-gray-900">
                  {averageProgress}%
                </p>
                <p className="text-sm text-gray-500">Average Progress</p>
              </div>
            </div>
            <div className="mt-6 text-center">
              <p className="text-gray-700">
                Average progress across all students
              </p>
              <p className="mt-2 text-sm text-gray-500">
                Based on {students.length} student
                {students.length !== 1 ? "s" : ""}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardUi;
