"use client";

import React, { useEffect } from "react";
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
import axios from "axios";
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
  const [totalStudentsCount, setTotalStudentsCount] = React.useState<
    string | number
  >("Loading...");
  const [students, setStudents] = React.useState<any[]>([]);
  const [subjectPerformance, setSubjectPerformance] = React.useState<any[]>([]);
  const [quizCompletionData, setQuizCompletionData] = React.useState<any[]>([]);
  const [averageProgress, setAverageProgress] = React.useState<number>(0);

  const id = useStore((state) => state.id);

  useEffect(() => {
    const fetchStudentsData = async () => {
      try {
        const response = await axios.post("/api/studentsList", {
          teacherId: id,
        });
        const data = response.data;
        setStudents(data);
        setTotalStudentsCount(data.length);

        // Calculate average progress
        let totalProgress = 0;
        let studentsWithProgress = 0;

        data.forEach((student: any) => {
          if (student.analytics && student.analytics.length > 0) {
            const progress = student.analytics[0]?.progress || 0;
            if (progress > 0) {
              totalProgress += progress;
              studentsWithProgress++;
            }
          }
        });

        setAverageProgress(
          studentsWithProgress > 0
            ? Math.round(totalProgress / studentsWithProgress)
            : 0
        );

        // Mock subject performance data (since we don't have actual subject-wise data)
        setSubjectPerformance([
          { name: "Mathematics", score: 76 },
          { name: "Science", score: 82 },
          { name: "English", score: 65 },
          { name: "Computer Science", score: 90 },
          { name: "Social Studies", score: 72 },
        ]);

        // Mock quiz completion data
        setQuizCompletionData([
          { name: "Completed", value: 68, color: "#3b82f6" }, // Blue-500
          { name: "Pending", value: 32, color: "#dbeafe" }, // Blue-100
        ]);
      } catch (error) {
        console.error("Error fetching students data:", error);
      }
    };

    fetchStudentsData();
  }, [id]);

  const [recentActivities, setRecentActivities] = React.useState<string[]>([]);

  const stats = [
    { title: "Total Students", value: totalStudentsCount, icon: Users },
    { title: "Challenges Completed", value: "18", icon: Trophy },
    { title: "Badges Earned", value: recentActivities.length, icon: Award },
    { title: "Average Engagement", value: "61%", icon: TrendingUp },
  ];

  type Student = {
    name: string;
    points: number;
  };

  const [topStudents, setTopStudents] = React.useState<Student[]>([]);

  useEffect(() => {
    const fetchTopStudents = async () => {
      try {
        const response = await axios.post("/api/topStudents", {
          teacherId: id,
        });
        const data = response.data.map((s: any) => ({
          name: s.name,
          points: s.analytics?.[0]?.points || 0,
        }));

        // Sort descending by points
        data.sort(
          (a: { points: number }, b: { points: number }) => b.points - a.points
        );

        // Optionally take top 5
        const top5 = data.slice(0, 5);

        setTopStudents(top5);
      } catch (error) {
        console.error("Error fetching top students:", error);
      }
    };

    fetchTopStudents();
  }, [id]);

  useEffect(() => {
    const fetchRecentActivities = async () => {
      try {
        const response = await axios.post("/api/recentAchievement", {
          teacherId: id,
        });
        const data = response.data;
        const top5 = data.slice(0, 5);
        setRecentActivities(top5);
      } catch (error) {
        console.error("Error fetching recent activities:", error);
      }
    };

    fetchRecentActivities();
  }, [id]);

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
              {!topStudents.length && (
                <p className="text-sm text-gray-500">Loading...</p>
              )}
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
