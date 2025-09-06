"use client";
import DashboardPage from "@/modals/dashboard/views/dashbaord-page";
import React from "react";
import { Toaster } from "react-hot-toast";

const Dashboard = () => {
  return (
    <div className="h-full">
      <DashboardPage />
      <Toaster position="top-right" />
    </div>
  );
};

export default Dashboard;
