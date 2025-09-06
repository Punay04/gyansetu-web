"use client";

import React, { useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useStore } from "@/zustand/init";
import { Users, Trophy, Award, TrendingUp } from "lucide-react";
import axios from "axios";

const DashboardUi = () => {
  const username = useStore((state) => state.username);
  const [totalStudentsCount, setTotalStudentsCount] = React.useState<
    string | number
  >("0");

  useEffect(() => {
    const totalStudents = async () => {
      try {
        const response = await axios.post("/api/studentsList", {
          teacherId: "ad39727c-8c2c-4057-8dc2-74939a7496cf",
        });
        const data = response.data;
        setTotalStudentsCount(data.length);
      } catch (error) {
        console.error("Error fetching total students:", error);
      }
    };

    setTimeout(() => {
      totalStudents();
    }, 3000);
  }, []);

  const stats = [
    { title: "Total Students", value: totalStudentsCount, icon: Users },
    { title: "Challenges Completed", value: "1,847", icon: Trophy },
    { title: "Badges Earned", value: "892", icon: Award },
    { title: "Average Engagement", value: "87%", icon: TrendingUp },
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
          teacherId: "ad39727c-8c2c-4057-8dc2-74939a7496cf",
        });
        const data = response.data.map((s: any) => ({
          name: s.name,
          points: s.analytics?.[0]?.points || 0,
        }));
        setTopStudents(data);
      } catch (error) {
        console.error("Error fetching top students:", error);
      }
    };

    setTimeout(() => {
      fetchTopStudents();
    }, 3000);
  }, []);

  const [recentActivities, setRecentActivities] = React.useState<string[]>([]);

  useEffect(() => {
    const fetchRecentActivities = async () => {
      try {
        const response = await axios.post("/api/recentAchievement", {
          teacherId: "ad39727c-8c2c-4057-8dc2-74939a7496cf",
        });
        const data = response.data;
        setRecentActivities(data);
      } catch (error) {
        console.error("Error fetching recent activities:", error);
      }
    };

    setTimeout(() => {
      fetchRecentActivities();
    }, 3000);
  }, []);

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
                  <IconComponent className="h-8 w-8 text-orange-500" />
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
                  <span className="text-sm text-orange-600">
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
    </div>
  );
};

export default DashboardUi;
