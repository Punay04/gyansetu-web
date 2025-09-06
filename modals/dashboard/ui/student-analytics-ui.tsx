"use client";
import axios from "axios";
import React, { useEffect } from "react";
import { Card } from "@/components/ui/card";
import {
  ArrowUpRight,
  Award,
  Calendar,
  Clock,
  Target,
  TrendingUp,
} from "lucide-react";

interface StudentAnalyticsUiProps {
  id: string;
}

interface Student {
  id: string;
  name: string;
  email: string;
  class: string;
  analytics: {
    progress: number;
    points: number;
    streak: number;
  }[];
  achievements: {
    badge: string;
    date: string;
  }[];
}

const StudentAnalyticsUi = ({ id }: StudentAnalyticsUiProps) => {
  const [studentData, setStudentData] = React.useState<Student | null>(null);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [error, setError] = React.useState<string | null>(null);

  useEffect(() => {
    const fetchStudentData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.post(`/api/studentAnalytics`, {
          studentId: id,
        });
        setStudentData(response.data);
      } catch (error) {
        console.error("Error fetching student data:", error);
        setError("Failed to load student data");
      } finally {
        setLoading(false);
      }
    };

    fetchStudentData();
  }, [id]);

  const analytics = studentData?.analytics?.[0] || {
    progress: 0,
    points: 0,
    streak: 0,
  };

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      <div className="max-w-[1000px] mx-auto">
        {loading ? (
          <div className="bg-white p-6 rounded-lg shadow-sm flex justify-center items-center h-40">
            <p className="text-gray-500">Loading student data...</p>
          </div>
        ) : error ? (
          <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-red-500">
            <p className="text-red-600">{error}</p>
          </div>
        ) : studentData ? (
          <>
            {/* Student Profile */}
            <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
              <div className="flex items-center">
                <div className="h-16 w-16 bg-orange-100 rounded-full flex items-center justify-center text-orange-600 text-xl font-bold">
                  {studentData.name.charAt(0)}
                </div>
                <div className="ml-4">
                  <h1 className="text-xl font-bold text-gray-900">
                    {studentData.name}
                  </h1>
                  <p className="text-sm text-gray-500">{studentData.email}</p>
                  <p className="text-sm text-gray-500">
                    Class: {studentData.class}
                  </p>
                </div>
              </div>
            </div>

            {/* Analytics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <Card className="bg-white p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Progress</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {analytics.progress}%
                    </p>
                  </div>
                  <div className="p-2 bg-orange-100 rounded-full text-orange-600">
                    <Target className="h-5 w-5" />
                  </div>
                </div>
                <div className="mt-3 w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="h-2 bg-orange-500 rounded-full"
                    style={{ width: `${analytics.progress}%` }}
                  />
                </div>
              </Card>

              <Card className="bg-white p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Points</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {analytics.points}
                    </p>
                  </div>
                  <div className="p-2 bg-orange-100 rounded-full text-orange-600">
                    <TrendingUp className="h-5 w-5" />
                  </div>
                </div>
              </Card>

              <Card className="bg-white p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Streak</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {analytics.streak} days
                    </p>
                  </div>
                  <div className="p-2 bg-orange-100 rounded-full text-orange-600">
                    <Calendar className="h-5 w-5" />
                  </div>
                </div>
              </Card>
            </div>

            {/* Achievements */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-lg font-semibold mb-4">Achievements</h2>
              {studentData.achievements &&
              studentData.achievements.length > 0 ? (
                <div className="space-y-3">
                  {studentData.achievements.map((achievement, index) => (
                    <div
                      key={index}
                      className="flex items-center bg-gray-50 p-3 rounded-lg"
                    >
                      <div className="p-2 bg-orange-100 rounded-full text-orange-600 mr-3">
                        <Award className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">
                          {achievement.badge}
                        </p>
                        <p className="text-xs text-gray-500">
                          {achievement.date || "Recently earned"}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-500">No achievements yet</p>
              )}
            </div>
          </>
        ) : (
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <p className="text-gray-500">No student data found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentAnalyticsUi;
