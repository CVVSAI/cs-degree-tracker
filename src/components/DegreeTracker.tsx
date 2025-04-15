import { useState } from "react";
import { useNavigate } from "react-router-dom";
import TrackSelector from "./TrackSelector";
import SemesterSelector from "./SemesterSelector";
import ProgressBar from "./ProgressBar";
import RequirementChecklist from "./RequirementChecklist";
import GpaTrackerModal from "./GpaTrackerModal";
import ProjectRequirement from "./ProjectRequirement";
import ThesisRequirement from "./ThesisRequirement";
import Reminders from "./Reminders";
import CoreCourses from "./CoreCourses";
import PracticumSection from "./PracticumSection";
import ElectivesSection from "./ElectivesSection";
import { coreCourses, electives, degreeTracks } from "../data/courses";

const gradePoints: { [key: string]: number } = {
  "A": 4.0, "A-": 3.7,
  "B+": 3.3, "B": 3.0, "B-": 2.7,
  "C+": 2.3, "C": 2.0, "C-": 1.7,
  "D+": 1.3, "D": 1.0, "F": 0.0
};

const DegreeTracker = () => {
  const [track, setTrack] = useState("coursework");
  const [semester, setSemester] = useState("");
  const [completedCourses, setCompletedCourses] = useState<string[]>([]);
  const [error, setError] = useState("");
  const [showElectives, setShowElectives] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [projectCourse, setProjectCourse] = useState("");
  const [showThesisReminder, setShowThesisReminder] = useState(false);
  const [projectCredits, setProjectCredits] = useState(0);
  const [showGpaTracker, setShowGpaTracker] = useState(false);
  const [selectedThesisCourse, setSelectedThesisCourse] = useState("");
  const [courseGrades, setCourseGrades] = useState<{ [key: string]: { grade: string; credits: number } }>({});

  const practicumCourse = { id: "CS596R", name: "Computer Science Master’s Practicum", credits: 1 };
  const projectCourses = [
    { id: "CS597R", name: "CS MS Project - 597R", minCredits: 6 },
    { id: "CS599R", name: "CS MS Project - 599R", minCredits: 6 }
  ];
  const thesisCourse = { id: "CS599R", name: "Master’s Thesis (9 Credits)" };

  // Calculate total credits
  const totalCredits = completedCourses.reduce((acc, courseId) => {
    const course = [...Object.values(coreCourses).flat(), ...electives].find(c => c.id === courseId);
    return course ? acc + course.credits : acc;
  }, 0) + (selectedThesisCourse === thesisCourse.id ? 9 : 0); // Add 9 credits if thesis is selected
  
  if (track === "thesis" && semester === "Last" && !showThesisReminder) {
    setShowThesisReminder(true);
  }

  // Toggle course selection
  const toggleCourse = (courseId: string, credits: number) => {
    setCompletedCourses(prev =>
      prev.includes(courseId)
        ? prev.filter(id => id !== courseId)
        : [...prev, courseId]
    );

    if (!courseGrades[courseId]) {
      setCourseGrades(prev => ({ ...prev, [courseId]: { grade: "A", credits } })); // Default grade
    }
  };

  const missingRequirements: string[] = [];
  // Ensure at least one course is taken from each core category
  const isCoreComplete = Object.keys(coreCourses).every(category =>
    coreCourses[category].some(course => completedCourses.includes(course.id))
  );
  if (!isCoreComplete) missingRequirements.push("Complete at least one course from each Core Subject Area");


  // Ensure the correct number of electives is taken based on the track
  const requiredElectives = track === "coursework" ? 7 : track === "project" ? 5 : 4;
  const completedElectives = electives.filter(course => completedCourses.includes(course.id)).length;
  const isElectivesComplete = completedElectives >= requiredElectives;
  if (!isElectivesComplete) missingRequirements.push(`Complete at least ${requiredElectives} elective courses`);

  const isPracticumComplete = completedCourses.includes(practicumCourse.id);
  if (!isPracticumComplete) missingRequirements.push("Complete CS 596R: Computer Science Master’s Practicum");

  const isProjectComplete = track !== "project" || (projectCourse && projectCredits >= 6);
  if (track === "project" && !isProjectComplete) missingRequirements.push("Select CS 597R or CS 599R and complete at least 6 project credits");

  // Calculate progress percentage
  const completedCount = completedCourses.length;
  const totalCoursesNeeded = Object.keys(coreCourses).length + requiredElectives;
  const progress = Math.round((completedCount / totalCoursesNeeded) * 100);

  // Calculate GPA
  const calculateGPA = () => {
    const totalQualityPoints = Object.values(courseGrades).reduce(
      (acc, { grade, credits }) => acc + (gradePoints[grade] || 0) * credits, 0
    );
    const totalCreditHours = Object.values(courseGrades).reduce((acc, { credits }) => acc + credits, 0);
    return totalCreditHours ? (totalQualityPoints / totalCreditHours).toFixed(2) : "0.00";
  };

  // Check completion status
  const checkCompletion = () => {
    if (!isCoreComplete) {
      setError("⚠️ You must complete at least one course from each Core Subject Area.");
      return;
    }
    if (!isPracticumComplete) {
      setError("⚠️ You must complete CS 596R: Computer Science Master’s Practicum.");
      return;
    }
    if (track === "project" && !isProjectComplete) {
      setError("⚠️ You must select CS 597R or CS 599R and complete at least 6 project credits.");
      return;
    }
    setError(""); // Clear error if all requirements are met
  };

  // Filter electives based on search query (Searches Course ID + Course Name)
  const filteredElectives = electives.filter(
    course =>
      course.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.id.toLowerCase().includes(searchQuery.replace(/\s+/g, "").toLowerCase())
  );

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center text-gray-800">📜 Degree Tracker</h1>

      <ProgressBar progress={progress} />

      <RequirementChecklist missingRequirements={missingRequirements} />

      <TrackSelector
        track={track}
        setTrack={setTrack}
        thesisCourseId={thesisCourse.id}
        setSelectedThesisCourse={setSelectedThesisCourse}
        setCompletedCourses={setCompletedCourses}
      />

      <button
        onClick={() => setShowGpaTracker(!showGpaTracker)}
        className="mt-4 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
      >
        {showGpaTracker ? "Hide GPA Tracker" : "Show GPA Tracker"}
      </button>

      <GpaTrackerModal
        show={showGpaTracker}
        completedCourses={completedCourses}
        courseGrades={courseGrades}
        setCourseGrades={setCourseGrades}
        calculateGPA={calculateGPA}
        close={() => setShowGpaTracker(false)}
        gradePoints={gradePoints}
      />

      {track === "project" && (
        <ProjectRequirement
          projectCourses={projectCourses}
          projectCourse={projectCourse}
          setProjectCourse={setProjectCourse}
          projectCredits={projectCredits}
          setProjectCredits={setProjectCredits}
        />
      )}

      <SemesterSelector semester={semester} setSemester={setSemester} />

      {track === "thesis" && (
        <ThesisRequirement
          selectedThesisCourse={selectedThesisCourse}
          setSelectedThesisCourse={setSelectedThesisCourse}
          thesisCourse={thesisCourse}
          setCompletedCourses={setCompletedCourses}
        />
      )}

      <Reminders
        semester={semester}
        track={track}
        showThesisReminder={showThesisReminder}
        setShowThesisReminder={setShowThesisReminder}
      />

      <CoreCourses
        completedCourses={completedCourses}
        toggleCourse={toggleCourse}
      />

      <PracticumSection
        practicumCourse={practicumCourse}
        completedCourses={completedCourses}
        toggleCourse={toggleCourse}
      />

      <ElectivesSection
        showElectives={showElectives}
        setShowElectives={setShowElectives}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        completedCourses={completedCourses}
        toggleCourse={toggleCourse}
      />

      <p className="mt-6 text-lg font-semibold text-gray-800">
        Total Credits Completed: {totalCredits}
      </p>

      {error && <p className="text-red-500 mt-4">{error}</p>}

      <button
        onClick={checkCompletion}
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
      >
        Check Progress
      </button>
    </div>
  );
};

export default DegreeTracker; 