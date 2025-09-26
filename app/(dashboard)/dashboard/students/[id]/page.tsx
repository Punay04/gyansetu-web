import StudentAnalyticsPage from "@/modals/dashboard/views/students-analytics-page";
import React from "react";
import { Metadata } from "next";

interface PageProps {
  params: {
    id: string;
  };
  searchParams: Record<string, string | string[] | undefined>;
}

export const generateMetadata = ({ params }: PageProps): Metadata => {
  return {
    title: `Student ${params.id} - Analytics`,
  };
};

export default function Page({ params }: PageProps) {
  const id = params.id;
  return (
    <div>
      <StudentAnalyticsPage id={id} />
    </div>
  );
}
