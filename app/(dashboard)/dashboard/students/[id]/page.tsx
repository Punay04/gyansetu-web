import StudentAnalyticsPage from "@/modals/dashboard/views/students-analytics-page";
import React from "react";

const Page = ({ params }: { params: { id: string } }) => {
  const id = params.id;
  return (
    <div>
      <StudentAnalyticsPage id={id} />
    </div>
  );
};

export default Page;
