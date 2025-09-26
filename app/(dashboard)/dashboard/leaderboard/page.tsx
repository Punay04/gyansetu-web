"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trophy, Award, Medal, Crown, Star } from "lucide-react";

// Hardcoded student data
const studentsData = [
  { id: "1", name: "Punay Kukreja", points: 2850, badges: 12 },
  { id: "2", name: "Vansh Goel", points: 2720, badges: 11 },
  { id: "3", name: "Aditya Sharma", points: 2650, badges: 10 },
  { id: "4", name: "Priya Patel", points: 2580, badges: 9 },
  { id: "5", name: "Rahul Kumar", points: 2450, badges: 8 },
  { id: "6", name: "Sneha Singh", points: 2380, badges: 7 },
  { id: "7", name: "Arjun Mehta", points: 2320, badges: 6 },
  { id: "8", name: "Kavya Reddy", points: 2250, badges: 5 },
  { id: "9", name: "Vikram Joshi", points: 2180, badges: 4 },
  { id: "10", name: "Ananya Das", points: 2100, badges: 3 },
];

const LeaderboardPage = () => {
  // Sort by points for score leaderboard
  const scoreLeaderboard = [...studentsData].sort(
    (a, b) => b.points - a.points
  );

  // Sort by badges for badge leaderboard
  const badgeLeaderboard = [...studentsData].sort(
    (a, b) => b.badges - a.badges
  );

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="h-5 w-5 text-yellow-500" />;
      case 2:
        return <Medal className="h-5 w-5 text-gray-400" />;
      case 3:
        return <Award className="h-5 w-5 text-amber-600" />;
      default:
        return (
          <span className="h-5 w-5 flex items-center justify-center text-xs font-bold text-gray-500">
            #{rank}
          </span>
        );
    }
  };

  const getRankColor = (rank: number) => {
    switch (rank) {
      case 1:
        return "bg-gradient-to-r from-yellow-50 to-yellow-100 border-yellow-200";
      case 2:
        return "bg-gradient-to-r from-gray-50 to-gray-100 border-gray-200";
      case 3:
        return "bg-gradient-to-r from-amber-50 to-amber-100 border-amber-200";
      default:
        return "bg-white border-gray-200";
    }
  };

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      {/* Page Header */}
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
          <Trophy className="h-8 w-8 text-blue-500" />
          Leaderboard
        </h1>
        <p className="text-gray-600 mt-2">
          Top performing students in your class
        </p>
      </div>

      {/* Leaderboard Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Score-based Leaderboard */}
        <Card className="bg-white shadow-sm">
          <CardHeader className="border-b border-gray-100 bg-blue-50/50">
            <CardTitle className="flex items-center gap-2 text-xl font-semibold text-gray-800">
              <Star className="h-6 w-6 text-blue-500" />
              Top Performers (Points)
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="space-y-0">
              {scoreLeaderboard.map((student, index) => {
                const rank = index + 1;
                return (
                  <div
                    key={student.id}
                    className={`flex items-center justify-between p-4 border-b border-gray-100 last:border-b-0 ${getRankColor(
                      rank
                    )}`}
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex items-center justify-center w-8 h-8">
                        {getRankIcon(rank)}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">
                          {student.name}
                        </p>
                        <p className="text-sm text-gray-500">Student</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-blue-600">
                        {student.points.toLocaleString()}
                      </p>
                      <p className="text-xs text-gray-500">points</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Badge-based Leaderboard */}
        <Card className="bg-white shadow-sm">
          <CardHeader className="border-b border-gray-100 bg-blue-50/50">
            <CardTitle className="flex items-center gap-2 text-xl font-semibold text-gray-800">
              <Award className="h-6 w-6 text-blue-500" />
              Badge Champions
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="space-y-0">
              {badgeLeaderboard.map((student, index) => {
                const rank = index + 1;
                return (
                  <div
                    key={student.id}
                    className={`flex items-center justify-between p-4 border-b border-gray-100 last:border-b-0 ${getRankColor(
                      rank
                    )}`}
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex items-center justify-center w-8 h-8">
                        {getRankIcon(rank)}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">
                          {student.name}
                        </p>
                        <p className="text-sm text-gray-500">Student</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-blue-600">
                        {student.badges}
                      </p>
                      <p className="text-xs text-gray-500">badges</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-white shadow-sm">
          <CardContent className="p-6 text-center">
            <div className="flex justify-center mb-2">
              <Trophy className="h-8 w-8 text-blue-500" />
            </div>
            <p className="text-2xl font-bold text-gray-900">
              {scoreLeaderboard[0]?.points.toLocaleString()}
            </p>
            <p className="text-sm text-gray-600">Highest Score</p>
            <p className="text-xs text-gray-500 mt-1">
              {scoreLeaderboard[0]?.name}
            </p>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-sm">
          <CardContent className="p-6 text-center">
            <div className="flex justify-center mb-2">
              <Award className="h-8 w-8 text-blue-500" />
            </div>
            <p className="text-2xl font-bold text-gray-900">
              {badgeLeaderboard[0]?.badges}
            </p>
            <p className="text-sm text-gray-600">Most Badges</p>
            <p className="text-xs text-gray-500 mt-1">
              {badgeLeaderboard[0]?.name}
            </p>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-sm">
          <CardContent className="p-6 text-center">
            <div className="flex justify-center mb-2">
              <Star className="h-8 w-8 text-green-500" />
            </div>
            <p className="text-2xl font-bold text-gray-900">
              {Math.round(
                studentsData.reduce((sum, s) => sum + s.points, 0) /
                  studentsData.length
              ).toLocaleString()}
            </p>
            <p className="text-sm text-gray-600">Average Score</p>
            <p className="text-xs text-gray-500 mt-1">Class Average</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LeaderboardPage;
