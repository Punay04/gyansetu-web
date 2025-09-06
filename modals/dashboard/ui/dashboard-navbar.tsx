import axios from "axios";
import { useRouter } from "next/navigation";
import React from "react";
import toast from "react-hot-toast";

const DashboardNavbar = () => {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const res = await axios.post("/api/sign-out");
      toast.success(res.data.message);
      router.push("/sign-in");
    } catch (error) {
      toast.error("Logout failed");
    }
  };

  return (
    <nav className="w-full bg-white border-b border-neutral-200 px-4 py-3 flex items-center justify-between shadow-sm">
      <div className="flex items-center gap-2">
        <span className="text-2xl font-extrabold text-black tracking-tight">
          ज्ञान<span className="text-orange-500">Setu</span>
        </span>
      </div>
      <div className="flex items-center gap-4">
        <button className="hidden sm:inline-flex items-center px-4 py-2 rounded text-black font-medium hover:bg-orange-50 border border-neutral-200 transition">
          Profile
        </button>
        <button onClick={handleLogout} className="inline-flex items-center px-4 py-2 rounded bg-orange-500 text-white font-semibold hover:bg-black hover:text-orange-400 border border-orange-300 transition">
          Logout
        </button>
        <button className="sm:hidden inline-flex items-center px-2 py-2 rounded text-black hover:bg-orange-50 border border-neutral-200 transition">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6.75 12a.75.75 0 01.75-.75h9a.75.75 0 010 1.5h-9a.75.75 0 01-.75-.75z"
            />
          </svg>
        </button>
      </div>
    </nav>
  );
};

export default DashboardNavbar;
