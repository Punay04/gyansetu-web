"use client";
import { useStore } from "@/zustand/init";
import { SearchIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

interface Student {
  id: string;
  name: string;
  email: string;
  class: {
    section: string;
    grade: string;
  };
  analytics: {
    progress: number;
    points: number;
    streak: number;
  };
  achievements: {
    badges: string[];
  };
}

const StudentsPageUi = () => {
  // Hardcoded student data
  const hardcodedStudents: Student[] = [
    {
      id: "1",
      name: "Punay Kukreja",
      email: "punay@example.com",
      class: {
        section: "A",
        grade: "10",
      },
      analytics: {
        progress: 85,
        points: 2850,
        streak: 14,
      },
      achievements: {
        badges: ["Outstanding Achievement", "Perfect Score"],
      },
    },
    {
      id: "2",
      name: "Vansh Goel",
      email: "vansh@example.com",
      class: {
        section: "A",
        grade: "10",
      },
      analytics: {
        progress: 88,
        points: 2720,
        streak: 12,
      },
      achievements: {
        badges: ["Quick Learner"],
      },
    },
    {
      id: "3",
      name: "Aditya Sharma",
      email: "aditya@example.com",
      class: {
        section: "B",
        grade: "10",
      },
      analytics: {
        progress: 85,
        points: 2650,
        streak: 10,
      },
      achievements: {
        badges: ["Consistent Performer"],
      },
    },
    {
      id: "4",
      name: "Priya Patel",
      email: "priya@example.com",
      class: {
        section: "B",
        grade: "9",
      },
      analytics: {
        progress: 82,
        points: 2580,
        streak: 9,
      },
      achievements: {
        badges: ["Problem Solver"],
      },
    },
    {
      id: "5",
      name: "Rahul Kumar",
      email: "rahul@example.com",
      class: {
        section: "C",
        grade: "9",
      },
      analytics: {
        progress: 78,
        points: 2450,
        streak: 8,
      },
      achievements: {
        badges: ["Math Whiz"],
      },
    },
    {
      id: "6",
      name: "Sneha Singh",
      email: "sneha@example.com",
      class: {
        section: "C",
        grade: "8",
      },
      analytics: {
        progress: 75,
        points: 2380,
        streak: 7,
      },
      achievements: {
        badges: ["Science Explorer"],
      },
    },
    {
      id: "7",
      name: "Arjun Mehta",
      email: "arjun@example.com",
      class: {
        section: "A",
        grade: "8",
      },
      analytics: {
        progress: 72,
        points: 2320,
        streak: 6,
      },
      achievements: {
        badges: ["Language Master"],
      },
    },
    {
      id: "8",
      name: "Kavya Reddy",
      email: "kavya@example.com",
      class: {
        section: "B",
        grade: "8",
      },
      analytics: {
        progress: 68,
        points: 2250,
        streak: 5,
      },
      achievements: {
        badges: ["History Buff"],
      },
    },
    {
      id: "9",
      name: "Vikram Joshi",
      email: "vikram@example.com",
      class: {
        section: "A",
        grade: "7",
      },
      analytics: {
        progress: 65,
        points: 2180,
        streak: 4,
      },
      achievements: {
        badges: ["Art Enthusiast"],
      },
    },
    {
      id: "10",
      name: "Ananya Das",
      email: "ananya@example.com",
      class: {
        section: "C",
        grade: "7",
      },
      analytics: {
        progress: 62,
        points: 2100,
        streak: 3,
      },
      achievements: {
        badges: ["Team Leader"],
      },
    },
  ];

  const [students, setStudents] = React.useState<Student[]>(hardcodedStudents);
  const [viewStudents, setViewStudents] =
    React.useState<Student[]>(hardcodedStudents);
  const [selectedClass, setSelectedClass] =
    React.useState<string>("All Sections");
  const [selectedSection, setSelectedSection] =
    React.useState<string>("All Classes");

  // Extract unique sections and grades from hardcoded data
  const classes = Array.from(
    new Set(hardcodedStudents.map((s) => s.class.section))
  ).sort();
  const sections = Array.from(
    new Set(hardcodedStudents.map((s) => s.class.grade))
  ).sort();

  const router = useRouter();

  const id = useStore((state) => state.id);

  return (
    <div className="p-6 space-y-5 bg-gray-50 min-h-screen">
      <div className="max-w-[1200px] mx-auto">
        {/* Header */}
        <header className="bg-white p-6 rounded-lg mb-5 flex flex-col md:flex-row justify-between md:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Students</h1>
            <p className="text-sm text-gray-600 mt-1">
              Manage your class students
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative">
              <input
                placeholder="Search student..."
                className="pl-9 pr-3 py-2 border border-gray-200 rounded w-full sm:w-56 focus:outline-none focus:ring-1 focus:ring-blue-500"
                onChange={(e) => {
                  const query = e.target.value.toLowerCase();
                  if (query === "") {
                    setViewStudents(students);
                  } else {
                    setViewStudents(
                      students.filter((s) =>
                        s.name.toLowerCase().includes(query)
                      )
                    );
                  }
                }}
              />
              <div className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400">
                <SearchIcon size={20} />
              </div>
            </div>
            <select
              value={selectedClass}
              className="pl-9 pr-3 py-2 border border-gray-200 rounded w-full sm:w-56 focus:outline-none focus:ring-1 focus:ring-blue-500"
              onChange={(e) => {
                const value = e.target.value;
                setSelectedClass(e.target.value);
                setViewStudents(
                  students.filter((s) => s.class.section === e.target.value)
                );

                if (value === "All Sections") {
                  setViewStudents(students);
                } else {
                  setViewStudents(
                    students.filter((s) => s.class.section === value)
                  );
                }
              }}
            >
              <option value="All Sections">All Sections</option>
              {classes.map((cls) => (
                <option key={cls} value={cls}>
                  {cls}
                </option>
              ))}
            </select>
            <select
              value={selectedSection}
              className="pl-9 pr-3 py-2 border border-gray-200 rounded w-full sm:w-56 focus:outline-none focus:ring-1 focus:ring-blue-500"
              onChange={(e) => {
                const value = e.target.value;
                setSelectedSection(e.target.value);
                setViewStudents(
                  students.filter((s) => s.class.grade === e.target.value)
                );
                if (value === "All Classes") {
                  setViewStudents(students);
                } else {
                  setViewStudents(
                    students.filter((s) => s.class.grade === value)
                  );
                }
              }}
            >
              <option value="All Classes">All Classes</option>
              {sections.map((sec) => (
                <option key={sec} value={sec}>
                  {sec}
                </option>
              ))}
            </select>
          </div>
        </header>

        {/* Students Table */}
        <div className="bg-white rounded-lg overflow-hidden border border-gray-200">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Student
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Class
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Progress
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Points
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Badges
                  </th>
                </tr>
              </thead>
              <tbody>
                {viewStudents.length === 0 && (
                  <tr>
                    <td colSpan={5} className="text-center text-gray-500 py-6">
                      No students found.
                    </td>
                  </tr>
                )}
                {viewStudents.map((s) => (
                  <tr
                    key={s.id}
                    className="border-b border-gray-100 hover:bg-gray-50 cursor-pointer"
                    onClick={() => {
                      router.push(`/dashboard/students/${s.id}`);
                    }}
                  >
                    <td className="px-4 py-3">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-8 w-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-medium">
                          {s.name.split(" ")[0][0]}
                        </div>
                        <div className="ml-3">
                          <p className="font-medium text-gray-900">{s.name}</p>
                          <p className="text-xs text-gray-500">ID: {s.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700">
                      {s.class.grade}-{s.class.section}
                    </td>
                    <td className="px-4 py-3">
                      <div className="w-32 bg-gray-200 rounded-full h-2">
                        <div
                          className="h-2 bg-blue-500 rounded-full"
                          style={{ width: `${s.analytics.progress}%` }}
                        />
                      </div>
                      <span className="text-xs text-gray-500 mt-1">
                        {s.analytics.progress}%
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex space-x-2">
                        <span className="font-medium">
                          {s.analytics.points}
                        </span>{" "}
                        pts
                      </div>
                    </td>
                    <td>
                      <div className="text-sm text-gray-700 ml-2">
                        {s.achievements.badges.map((badge) => (
                          <span
                            key={badge}
                            className="inline-block bg-blue-100 text-blue-600 rounded-full px-2 py-1 text-xs font-medium mr-1"
                          >
                            {badge}
                          </span>
                        ))}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentsPageUi;
