import React from "react";
import StudentAnalyticsUi from "../ui/student-analytics-ui";

const StudentAnalyticsPage = ({ id }: { id: string }) => {
  return (
    <div>
      <StudentAnalyticsUi id={id} />
    </div>
  );
};

export default StudentAnalyticsPage;
