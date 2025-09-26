"use client";
import React from "react";
import { Card } from "@/components/ui/card";
import {
  Award,
  Calendar,
  Download,
  Loader,
  Target,
  TrendingUp,
} from "lucide-react";
import toast from "react-hot-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface StudentAnalyticsUiProps {
  id: string;
}

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
  }[];
  achievements: {
    badge: string;
    date: string;
  }[];
}

const StudentAnalyticsUi = ({ id }: StudentAnalyticsUiProps) => {
  // Hardcoded student data
  const hardcodedStudentData: Student = {
    id: id || "1",
    name: "Punay Kukreja",
    email: "punay@example.com",
    class: {
      section: "A",
      grade: "10",
    },
    analytics: [
      {
        progress: 85,
        points: 2850,
        streak: 14,
      },
    ],
    achievements: [
      {
        badge: "Outstanding Achievement",
        date: "September 20, 2025",
      },
      {
        badge: "Perfect Score",
        date: "September 15, 2025",
      },
      {
        badge: "Quick Learner",
        date: "September 10, 2025",
      },
      {
        badge: "Consistent Performer",
        date: "September 5, 2025",
      },
    ],
  };

  const [studentData] = React.useState<Student>(hardcodedStudentData);
  const [loading] = React.useState<boolean>(false);
  const [error] = React.useState<string | null>(null);
  const [aiAnalyzerResult, setAiAnalyzerResult] = React.useState<string>(`
# Student Performance Analysis

## Overall Assessment
* Progress Rate: 85% (Above Average)
* Streak: 14 days consecutive learning
* Points: 2850 (Top 15% of class)
* Badges: 4 earned in the last month

## Subject Strengths
* Mathematics: Excellent (92%)
* Science: Strong (88%)
* Computer Science: Outstanding (95%)
* Social Studies: Good (78%)
* Languages: Average (70%)

## Learning Style
* Visual Learning: High
* Problem-solving: Exceptional
* Consistent Practice: Very Good
* Group Activities: Average

## Recommendations
* Introduce advanced topics in Mathematics and Computer Science
* Provide more interactive content for Social Studies
* Consider pairing with peers for language exercises
* Challenge with complex problem-solving activities
  `);
  const [isOpen, setIsopen] = React.useState(false);
  const [isAnalyzing, setIsAnalyzing] = React.useState(false);
  const [language, setLanguage] = React.useState("english");
  const [isDownloading, setIsDownloading] = React.useState(false);

  // Function to download analysis as PDF
  const handleDownloadPDF = () => {
    try {
      setIsDownloading(true);

      // Create a blob with analysis content
      const analysisContent = aiAnalyzerResult;
      const reportTitle = `Student Analysis Report - ${studentData.name}`;
      const reportDate = new Date().toLocaleDateString();

      // Format HTML content for the PDF
      const htmlContent = `
        <!DOCTYPE html>
        <html>
        <head>
          <title>${reportTitle}</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              line-height: 1.6;
              margin: 40px;
            }
            .header {
              text-align: center;
              margin-bottom: 30px;
              border-bottom: 1px solid #ccc;
              padding-bottom: 20px;
            }
            .student-info {
              margin-bottom: 20px;
            }
            .content {
              white-space: pre-wrap;
            }
            h1 { color: #3b82f6; }
            h2 { 
              color: #1e40af;
              border-bottom: 1px solid #ddd;
              padding-bottom: 5px;
            }
            ul {
              padding-left: 20px;
            }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>${reportTitle}</h1>
            <p>Generated on: ${reportDate}</p>
          </div>
          <div class="student-info">
            <p><strong>Student Name:</strong> ${studentData.name}</p>
            <p><strong>Class:</strong> ${studentData.class.grade}-${
        studentData.class.section
      }</p>
            <p><strong>Email:</strong> ${studentData.email}</p>
          </div>
          <div class="content">
            ${analysisContent
              .replace(/^#\s(.*)/gm, "<h1>$1</h1>")
              .replace(/^##\s(.*)/gm, "<h2>$1</h2>")
              .replace(/^\*\s(.*)/gm, "<li>$1</li>")
              .replace(/\n\n/g, "</ul><br/><ul>")
              .replace(/<li>/g, "<ul><li>")
              .replace(/<\/li>\n/g, "</li></ul>\n")
              .replace(/<\/ul><ul>/g, "")}
          </div>
        </body>
        </html>
      `;

      // Create a Blob containing the HTML content
      const blob = new Blob([htmlContent], { type: "text/html" });

      // Create a download link
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${studentData.name.replace(
        /\s+/g,
        "_"
      )}_analysis_report.html`;
      document.body.appendChild(link);
      link.click();

      // Clean up
      window.URL.revokeObjectURL(url);
      document.body.removeChild(link);

      setIsDownloading(false);
      toast.success("Report downloaded successfully!");
    } catch (error) {
      setIsDownloading(false);
      console.error("Error downloading report:", error);
      toast.error("Failed to download report");
    }
  };

  const analytics = studentData?.analytics?.[0] || {
    progress: 0,
    points: 0,
    streak: 0,
  };

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      <div>
        <Dialog open={isOpen} onOpenChange={setIsopen}>
          <DialogContent className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-white p-0 rounded-lg shadow-lg border-t-4 border-t-blue-500 overflow-hidden">
            <div className="p-8">
              <div className="flex items-center justify-between mb-8">
                <DialogTitle className="text-2xl font-medium text-gray-800 flex items-center">
                  <Target className="h-6 w-6 text-blue-500 mr-3" />
                  AI Analysis
                </DialogTitle>

                <Button
                  variant="outline"
                  className="flex items-center gap-2 bg-blue-50 text-blue-600 hover:bg-blue-100 border-blue-200"
                  onClick={handleDownloadPDF}
                  disabled={isDownloading || !aiAnalyzerResult}
                >
                  {isDownloading ? (
                    <Loader className="h-4 w-4 animate-spin" />
                  ) : (
                    <Download className="h-4 w-4" />
                  )}
                  Download Report
                </Button>
              </div>

              <ScrollArea className="h-[400px] pr-4">
                <DialogDescription className="text-base text-gray-700 whitespace-pre-wrap leading-relaxed">
                  {aiAnalyzerResult ||
                    "No analysis available yet. Click the 'View Analysis' button to generate insights about this student's performance and learning patterns."}
                </DialogDescription>
              </ScrollArea>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="max-w-[1000px] mx-auto">
        {loading ? (
          <div className="bg-white p-6 rounded-lg shadow-sm flex justify-center items-center h-40">
            <p className="text-gray-500">Loading student data...</p>
          </div>
        ) : error ? (
          <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-red-500">
            <p className="text-red-600">{error}</p>
          </div>
        ) : studentData ? (
          <>
            {/* Student Profile */}
            <div className="bg-white p-6 rounded-lg shadow-sm mb-6 flex justify-between">
              <div className="flex items-center ">
                <div className="h-16 w-16 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 text-xl font-bold">
                  {studentData.name.charAt(0)}
                </div>
                <div className="ml-4">
                  <h1 className="text-xl font-bold text-gray-900">
                    {studentData.name}
                  </h1>
                  <p className="text-sm text-gray-500">{studentData.email}</p>
                  <p className="text-sm text-gray-500">
                    Class: {studentData.class.grade}-{studentData.class.section}
                  </p>
                </div>
              </div>
              <div className="flex items-center ">
                <button
                  className="bg-white text-gray-800 py-2 px-4 rounded-md border border-gray-100 hover:border-gray-200 transition-all flex items-center"
                  disabled={isAnalyzing}
                  onClick={() => {
                    try {
                      setIsAnalyzing(true);
                      // Simulate API delay
                      setTimeout(() => {
                        // Use the hardcoded analysis based on language with structured format
                        let analysisText = "";

                        if (language === "hindi") {
                          analysisText = `
# छात्र प्रदर्शन विश्लेषण

## समग्र मूल्यांकन
* प्रगति दर: 85% (औसत से ऊपर)
* स्ट्रीक: 14 दिन लगातार सीखना
* अंक: 2850 (कक्षा का शीर्ष 15%)
* बैज: पिछले महीने में 4 अर्जित किए

## विषय की ताकत
* गणित: उत्कृष्ट (92%)
* विज्ञान: मजबूत (88%)
* कंप्यूटर विज्ञान: असाधारण (95%)
* सामाजिक अध्ययन: अच्छा (78%)
* भाषाएँ: औसत (70%)

## सीखने की शैली
* दृश्य अधिगम: उच्च
* समस्या-समाधान: असाधारण
* सतत अभ्यास: बहुत अच्छा
* समूह गतिविधियाँ: औसत

## सिफारिशें
* गणित और कंप्यूटर विज्ञान में उन्नत विषयों का परिचय दें
* सामाजिक अध्ययन के लिए अधिक इंटरैक्टिव सामग्री प्रदान करें
* भाषा अभ्यास के लिए साथियों के साथ जोड़ी बनाने पर विचार करें
* जटिल समस्या-समाधान गतिविधियों के साथ चुनौती दें`;
                        } else if (language === "odia") {
                          analysisText = `
# ଛାତ୍ର ପ୍ରଦର୍ଶନ ବିଶ୍ଲେଷଣ

## ସାମଗ୍ରିକ ମୂଲ୍ୟାଙ୍କନ
* ପ୍ରଗତି ହାର: 85% (ହାରାହାରି ଠାରୁ ଅଧିକ)
* ଷ୍ଟ୍ରିକ୍: 14 ଦିନ କ୍ରମାଗତ ଶିକ୍ଷା
* ପଏଣ୍ଟ: 2850 (ଶ୍ରେଣୀର ଶୀର୍ଷ 15%)
* ବ୍ୟାଜ୍: ଗତ ମାସରେ 4 ଅର୍ଜିତ

## ବିଷୟ ଶକ୍ତି
* ଗଣିତ: ଉତ୍କୃଷ୍ଟ (92%)
* ବିଜ୍ଞାନ: ଶକ୍ତିଶାଳୀ (88%)
* କମ୍ପ୍ୟୁଟର ବିଜ୍ଞାନ: ଅସାଧାରଣ (95%)
* ସାମାଜିକ ଅଧ୍ୟୟନ: ଭଲ (78%)
* ଭାଷା: ହାରାହାରି (70%)

## ଶିକ୍ଷଣ ଶୈଳୀ
* ଭିଜୁଆଲ୍ ଲର୍ନିଙ୍ଗ: ଉଚ୍ଚ
* ସମସ୍ୟା-ସମାଧାନ: ଅସାଧାରଣ
* ନିରନ୍ତର ଅଭ୍ୟାସ: ବହୁତ ଭଲ
* ଗୋଷ୍ଠୀ କାର୍ଯ୍ୟକଳାପ: ହାରାହାରି

## ସୁପାରିଶ
* ଗଣିତ ଏବଂ କମ୍ପ୍ୟୁଟର ବିଜ୍ଞାନରେ ଉନ୍ନତ ବିଷୟ ପରିଚୟ
* ସାମାଜିକ ଅଧ୍ୟୟନ ପାଇଁ ଅଧିକ ଇଣ୍ଟରାକ୍ଟିଭ୍ ବିଷୟବସ୍ତୁ ପ୍ରଦାନ କରନ୍ତୁ
* ଭାଷା ଅଭ୍ୟାସ ପାଇଁ ସାଥୀ ସହିତ ଜୋଡ଼ି ବିଷୟରେ ବିଚାର କରନ୍ତୁ
* ଜଟିଳ ସମସ୍ୟା-ସମାଧାନ କାର୍ଯ୍ୟକଳାପ ସହିତ ଚ୍ୟାଲେଞ୍ଜ`;
                        } else {
                          analysisText = `
# Student Performance Analysis

## Overall Assessment
* Progress Rate: 85% (Above Average)
* Streak: 14 days consecutive learning
* Points: 2850 (Top 15% of class)
* Badges: 4 earned in the last month

## Subject Strengths
* Mathematics: Excellent (92%)
* Science: Strong (88%)
* Computer Science: Outstanding (95%)
* Social Studies: Good (78%)
* Languages: Average (70%)

## Learning Style
* Visual Learning: High
* Problem-solving: Exceptional
* Consistent Practice: Very Good
* Group Activities: Average

## Recommendations
* Introduce advanced topics in Mathematics and Computer Science
* Provide more interactive content for Social Studies
* Consider pairing with peers for language exercises
* Challenge with complex problem-solving activities`;
                        }

                        setAiAnalyzerResult(analysisText);
                        setIsopen(true);
                        setIsAnalyzing(false);
                        toast.success("Analysis generated successfully!");
                      }, 1500);
                    } catch (error) {
                      setIsAnalyzing(false);
                      toast.error("Failed to analyze student data");
                    }
                  }}
                >
                  {!isAnalyzing && (
                    <Target className="h-4 w-4 mr-2 text-blue-500" />
                  )}
                  {isAnalyzing && (
                    <Loader className="h-4 w-4 mr-2 text-blue-500 animate-spin" />
                  )}
                  AI Analysis
                </button>

                <select
                  name="language"
                  id="language-selector"
                  onChange={(e) => setLanguage(e.target.value)}
                  className="ml-4 border border-gray-300 rounded-md p-2"
                >
                  <option value="english">English</option>
                  <option value="hindi">Hindi</option>
                  <option value="odia">Odia</option>
                </select>
              </div>
            </div>

            {/* Analytics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <Card className="bg-white p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Progress</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {analytics.progress}%
                    </p>
                  </div>
                  <div className="p-2 bg-blue-100 rounded-full text-blue-600">
                    <Target className="h-5 w-5" />
                  </div>
                </div>
                <div className="mt-3 w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="h-2 bg-blue-500 rounded-full"
                    style={{ width: `${analytics.progress}%` }}
                  />
                </div>
              </Card>

              <Card className="bg-white p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Points</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {analytics.points}
                    </p>
                  </div>
                  <div className="p-2 bg-blue-100 rounded-full text-blue-600">
                    <TrendingUp className="h-5 w-5" />
                  </div>
                </div>
              </Card>

              <Card className="bg-white p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Streak</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {analytics.streak} days
                    </p>
                  </div>
                  <div className="p-2 bg-blue-100 rounded-full text-blue-600">
                    <Calendar className="h-5 w-5" />
                  </div>
                </div>
              </Card>
            </div>

            {/* Achievements */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-lg font-semibold mb-4">Achievements</h2>
              {studentData.achievements &&
              studentData.achievements.length > 0 ? (
                <div className="space-y-3">
                  {studentData.achievements.map((achievement, index) => (
                    <div
                      key={index}
                      className="flex items-center bg-gray-50 p-3 rounded-lg"
                    >
                      <div className="p-2 bg-blue-100 rounded-full text-blue-600 mr-3">
                        <Award className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">
                          {achievement.badge}
                        </p>
                        <p className="text-xs text-gray-500">
                          {achievement.date || "Recently earned"}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-500">No achievements yet</p>
              )}
            </div>
          </>
        ) : (
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <p className="text-gray-500">No student data found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentAnalyticsUi;
