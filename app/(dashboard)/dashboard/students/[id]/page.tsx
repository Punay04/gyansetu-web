import StudentAnalyticsPage from "@/modals/dashboard/views/students-analytics-page";
import React from "react";
import { Metadata } from "next";

type StudentPageParams = {
  params: {
    id: string;
  };
};

export async function generateMetadata({
  params,
}: StudentPageParams): Promise<Metadata> {
  return {
    title: `Student ${params.id} - Analytics`,
  };
}

export default function Page({ params }: { params: { id: string } }) {
  return (
    <div>
      <StudentAnalyticsPage id={params.id} />
    </div>
  );
}
