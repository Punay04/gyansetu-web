"use client";
import { useStore } from "@/zustand/init";
import axios from "axios";
import { se } from "date-fns/locale";
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
  const [students, setStudents] = React.useState<Student[]>([]);
  const [viewStudents, setViewStudents] = React.useState<Student[]>([]);
  const [classes, setClasses] = React.useState<string[]>([]);
  const [selectedClass, setSelectedClass] = React.useState<string>("");
  const [sections, setSections] = React.useState<string[]>([]);
  const [selectedSection, setSelectedSection] = React.useState<string>("");

  const router = useRouter();

  const id = useStore((state) => state.id);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.post("/api/studentsList", {
          teacherId: id,
        });
        const data = response.data.map((s: any) => ({
          id: s.id,
          name: s.name,
          email: s.email,
          class: {
            section: s.class?.section || "N/A",
            grade: s.class?.grade || "N/A",
          },
          analytics: {
            progress: s.analytics?.[0]?.progress || 0,
            points: s.analytics?.[0]?.points || 0,
            streak: s.analytics?.[0]?.streak || 0,
          },
          achievements: {
            badges: s.achievements?.map((a: any) => a.badge) || [],
          },
        }));
        setStudents(data);
        setViewStudents(data);
        setClasses(
          Array.from(
            new Set(data.map((s: any) => s.class.section))
          ).sort() as string[]
        );
        setSelectedClass("All Classes");
        setSections(
          Array.from(
            new Set(data.map((s: any) => s.class.grade))
          ).sort() as string[]
        );
        setSelectedSection("All Sections");
      } catch (error) {
        console.error("Error fetching students:", error);
      }
    };

    fetchStudents();
  }, [id]);

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
                    className="border-b border-gray-100 hover:bg-gray-50"
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
                      {s.class.grade}
                      {s.class.section}
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
                        {s.analytics.points} pts
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
