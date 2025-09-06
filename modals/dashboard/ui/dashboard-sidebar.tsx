"use client";

import React, { useState, useEffect } from "react";
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
} from "@/components/ui/sidebar";
import {
  Menu,
  X,
  Home,
  Users,
  BarChart2,
  Settings,
  LogOut,
  ChevronRight,
} from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter, usePathname } from "next/navigation";
import { useStore } from "@/zustand/init";

const DashboardSidebar = () => {
  const isMobile = useIsMobile();
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const username = useStore((state) => state.username);

  // Close sidebar when clicking outside on mobile
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isMobile && open) {
        const sidebar = document.getElementById("dashboard-sidebar");
        if (sidebar && !sidebar.contains(event.target as Node)) {
          setOpen(false);
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMobile, open]);

  // Close sidebar when route changes on mobile
  useEffect(() => {
    if (isMobile) {
      setOpen(false);
    }
  }, [pathname, isMobile]);

  const handleLogout = async () => {
    try {
      await axios.post("/api/sign-out");
      useStore.getState().clearUser();
      toast.success("Logged out successfully");
      router.push("/sign-in");
    } catch (error) {
      toast.error("Logout failed");
    }
  };

  return (
    <SidebarProvider>
      {/* Mobile topbar */}
      {isMobile && (
        <div className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-4 py-3 bg-white border-b shadow-sm">
          <span className="text-xl font-bold text-black">
            ज्ञान<span className="text-orange-500">Setu</span>
          </span>
          <button
            className="p-1 rounded hover:bg-gray-100"
            onClick={() => setOpen((prev) => !prev)}
            aria-label="Toggle menu"
          >
            {open ? (
              <X size={20} className="text-gray-700" />
            ) : (
              <Menu size={20} className="text-gray-700" />
            )}
          </button>
        </div>
      )}

      <div
        id="dashboard-sidebar"
        className={`${isMobile ? "fixed inset-0 z-50" : ""} ${
          isMobile && !open ? "hidden" : ""
        }`}
      >
        {/* Overlay for mobile */}
        {isMobile && open && (
          <div
            className="absolute inset-0 bg-black bg-opacity-30"
            onClick={() => setOpen(false)}
          />
        )}

        <Sidebar
          variant={isMobile ? "floating" : "inset"}
          className={`
            ${
              isMobile
                ? "w-[250px] absolute top-0 left-0"
                : "min-w-[220px] w-[220px]"
            } 
            bg-white border-r border-gray-200 flex flex-col h-screen z-50
            transition-all duration-200
          `}
        >
          <SidebarHeader>
            <div className="flex items-center justify-between px-4 py-4 border-b">
              <span className="text-lg font-bold text-black">
                ज्ञान<span className="text-orange-500">Setu</span>
              </span>
              {isMobile && (
                <button
                  onClick={() => setOpen(false)}
                  className="p-1 rounded hover:bg-gray-100 text-gray-600"
                >
                  <ChevronRight size={18} />
                </button>
              )}
            </div>

            {/* User profile section */}
            <div className="px-4 py-3 border-b">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center text-white font-medium">
                  {username ? username.charAt(0).toUpperCase() : "T"}
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    {username || "Teacher"}
                  </p>
                  <p className="text-xs text-gray-500">Teacher</p>
                </div>
              </div>
            </div>
          </SidebarHeader>

          <SidebarContent className="px-2 py-3">
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  onClick={() => router.push("/dashboard")}
                  className={`flex items-center gap-2 w-full px-3 py-2 text-sm rounded transition-colors ${
                    pathname === "/dashboard"
                      ? "bg-gray-100 text-gray-900"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <Home size={16} className="text-gray-500" />
                  <span>Dashboard</span>
                  {pathname === "/dashboard" && (
                    <div className="ml-auto w-1 h-4 bg-orange-500 rounded-full"></div>
                  )}
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton
                  onClick={() => router.push("/dashboard/students")}
                  className={`flex items-center gap-2 w-full px-3 py-2 text-sm rounded transition-colors ${
                    pathname === "/dashboard/students"
                      ? "bg-gray-100 text-gray-900"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <Users size={16} className="text-gray-500" />
                  <span>Students</span>
                  {pathname === "/dashboard/students" && (
                    <div className="ml-auto w-1 h-4 bg-orange-500 rounded-full"></div>
                  )}
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton
                  onClick={() => router.push("/dashboard/analytics")}
                  className={`flex items-center gap-2 w-full px-3 py-2 text-sm rounded transition-colors ${
                    pathname === "/dashboard/analytics"
                      ? "bg-gray-100 text-gray-900"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <BarChart2 size={16} className="text-gray-500" />
                  <span>Analytics</span>
                  {pathname === "/dashboard/analytics" && (
                    <div className="ml-auto w-1 h-4 bg-orange-500 rounded-full"></div>
                  )}
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton
                  onClick={() => router.push("/dashboard/settings")}
                  className={`flex items-center gap-2 w-full px-3 py-2 text-sm rounded transition-colors ${
                    pathname === "/dashboard/settings"
                      ? "bg-gray-100 text-gray-900"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <Settings size={16} className="text-gray-500" />
                  <span>Settings</span>
                  {pathname === "/dashboard/settings" && (
                    <div className="ml-auto w-1 h-4 bg-orange-500 rounded-full"></div>
                  )}
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarContent>

          <SidebarFooter className="mt-auto px-3 py-4 border-t">
            <button
              onClick={handleLogout}
              className="flex items-center justify-center gap-2 w-full py-2 bg-orange-500 text-white text-sm rounded hover:bg-orange-600 transition-colors"
            >
              <LogOut size={16} />
              <span>Logout</span>
            </button>
            <div className="mt-3 text-xs text-gray-400 text-center">
              <p>© 2025 ज्ञानSetu</p>
            </div>
          </SidebarFooter>
        </Sidebar>
      </div>
    </SidebarProvider>
  );
};

export default DashboardSidebar;
