"use client";

import React from "react";
import Dashboard from "./page";
import DashboardSidebar from "@/modals/dashboard/ui/dashboard-sidebar";
import { useIsMobile } from "@/hooks/use-mobile";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const isMobile = useIsMobile();

  return (
    <div className="flex h-screen w-full overflow-hidden">
      <div className={isMobile ? "" : "fixed left-0 h-full"}>
        <DashboardSidebar />
      </div>
      <div
        className={`flex-1 ${
          isMobile ? "pt-16" : "ml-[240px]"
        } overflow-y-auto`}
      >
        {children}
      </div>
    </div>
  );
};

export default Layout;
