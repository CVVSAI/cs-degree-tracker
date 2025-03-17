import { useState } from "react";
import { useNavigate } from "react-router-dom";
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

  const navigate = useNavigate();

  const totalRequiredCourses = degreeTracks[track].totalCourses;

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

      {/* Progress Bar */}
      <div className="mt-6 bg-gray-200 rounded-full h-6 w-full">
        <div className="bg-blue-500 h-6 rounded-full" style={{ width: `${progress}%` }}></div>
      </div>
      <p className="text-gray-700 mt-2 text-center">{progress}% Complete</p>

      {/* Missing Requirements Checklist */}
      {missingRequirements.length > 0 && (
        <div className="mt-4 bg-red-100 border-l-4 border-red-500 p-4">
          <h3 className="text-red-700 font-semibold">Incomplete Requirements:</h3>
          <ul className="list-disc list-inside text-red-600">
            {missingRequirements.map((req, index) => (
              <li key={index}>{req}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Track Selection */}
      <div className="mt-6">
        <label className="block text-gray-700 font-medium">Select Your Track</label>
        <select
          value={track}
          onChange={e => {
            const newTrack = e.target.value;
            setTrack(newTrack);

            // Remove thesis course when changing from thesis track
            if (track === "thesis" && newTrack !== "thesis") {
              setSelectedThesisCourse("");
              setCompletedCourses(prev => prev.filter(id => id !== thesisCourse.id));
            }
          }}
          className="mt-1 p-2 border rounded-lg w-full"
        >
          {Object.entries(degreeTracks).map(([key, value]) => (
            <option key={key} value={key}>
              {value.name}
            </option>
          ))}
        </select>
      </div>

      {/* GPA Tracker Button */}
      <button
        onClick={() => setShowGpaTracker(!showGpaTracker)}
        className="mt-4 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
      >
        {showGpaTracker ? "Hide GPA Tracker" : "Show GPA Tracker"}
      </button>

      {/* GPA Tracker Popup */}
      {showGpaTracker && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/2">
            <h2 className="text-xl font-semibold mb-4">GPA Tracker</h2>
            {completedCourses.length > 0 ? (
              completedCourses.map(courseId => (
                <div key={courseId} className="mt-2">
                  <p className="font-medium">{courseId}</p>
                  <label className="mr-2">Grade:</label>
                  <select
                    value={courseGrades[courseId]?.grade || "A"}
                    onChange={e =>
                      setCourseGrades(prev => ({
                        ...prev,
                        [courseId]: { ...prev[courseId], grade: e.target.value }
                      }))
                    }
                    className="p-2 border rounded-lg"
                  >
                    {Object.keys(gradePoints).map(grade => (
                      <option key={grade} value={grade}>
                        {grade}
                      </option>
                    ))}
                  </select>
                </div>
              ))
            ) : (
              <p className="text-gray-600">No courses selected.</p>
            )}

            {/* Display GPA */}
            <div className="mt-4">
              <h3 className="text-lg font-semibold">Your GPA: {calculateGPA()}</h3>
            </div>

            {/* Close Button */}
            <button
              onClick={() => setShowGpaTracker(false)}
              className="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Project Track - Required CS 597R / CS 599R */}
      {track === "project" && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold">Master’s Project Requirement</h2>
          <label className="block text-gray-700 font-medium">Select Your Project Course</label>
          <select
            value={projectCourse}
            onChange={e => setProjectCourse(e.target.value)}
            className="mt-1 p-2 border rounded-lg w-full"
          >
            <option value="">Select a project course</option>
            {projectCourses.map(course => (
              <option key={course.id} value={course.id}>
                {course.name}
              </option>
            ))}
          </select>
          <label className="block mt-4 text-gray-700 font-medium">Enter Project Credits</label>
          <input
            type="number"
            min="6"
            value={projectCredits}
            onChange={e => setProjectCredits(parseInt(e.target.value))}
            className="mt-1 p-2 border rounded-lg w-full"
          />
          {projectCredits < 6 && projectCourse && (
            <p className="text-red-500 mt-2">⚠️ You need at least 6 credits for the project.</p>
          )}
        </div>
      )}

      {/* Semester Selection */}
      <div className="mt-6">
        <label className="block text-gray-700 font-medium">Select Your Semester</label>
        <select
          value={semester}
          onChange={e => setSemester(e.target.value)}
          className="mt-1 p-2 border rounded-lg w-full"
        >
          <option value="">Select Semester</option>
          <option value="1st">1st Semester</option>
          <option value="2nd">2nd Semester</option>
          <option value="3rd">3rd Semester</option>
          <option value="Last">Last Semester</option>
        </select>
      </div>

      {track === "thesis" && (
        <div className="mt-6 bg-gray-100 border-l-4 border-gray-500 p-4">
          <h2 className="text-gray-700 font-semibold">Thesis Requirement</h2>
          
          {/* Thesis Course Selection */}
          <label className="mt-2 block text-gray-600 font-medium">Select Your Thesis Course</label>
          <select
            value={selectedThesisCourse}
            onChange={e => {
              const courseId = e.target.value;
              setSelectedThesisCourse(courseId);

              // Add thesis course to completed courses if selected
              if (courseId === thesisCourse.id) {
                setCompletedCourses(prev => [...prev, thesisCourse.id]);
              } else {
                setCompletedCourses(prev => prev.filter(id => id !== thesisCourse.id));
              }
            }}
            className="mt-1 p-2 border rounded-lg w-full"
          >
            <option value="">Select a thesis course</option>
            {[thesisCourse].map(course => (
              <option key={course.id} value={course.id}>
                {course.name}
              </option>
            ))}
          </select>

          {/* Show "Completed 9 Credits" when selected */}
          {selectedThesisCourse && (
            <p className="mt-2 text-green-600 font-semibold">✅ Completed 9 Credits</p>
          )}
        </div>
      )}


      {/* Reduced Courseload Notification (Only for Last Semester) */}
      {semester === "Last" && (
        <div className="mt-4 bg-yellow-100 border-l-4 border-yellow-500 p-4">
          <p className="text-yellow-700 font-medium">
            ⚠️ You are in your last semester! You may be eligible for a reduced courseload, which could lower your tuition.
          </p>
          <button
            onClick={() => navigate("/reduced-courseload")}
            className="mt-2 bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition"
          >
            Learn More
          </button>
        </div>
      )}

      {/* Thesis Completion Reminder (Only for Thesis Track & Last Semester) */}
      {showThesisReminder && track === "thesis" && (
        <div className="mt-4 bg-red-100 border-l-4 border-red-500 p-4">
          <p className="text-red-700 font-medium">
            ⚠️ You are in your last semester and on the Thesis Track! Please check the **Graduate School completion deadlines** to ensure all submission requirements are met.
          </p>
          <a
            href="https://gs.emory.edu/academics/completion/index.html"
            target="_blank"
            rel="noopener noreferrer"
            className="block mt-2 text-blue-600 font-semibold underline"
          >
            View Thesis Deadlines & Submission Info
          </a>
          <button
            onClick={() => setShowThesisReminder(false)}
            className="mt-2 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Core Courses Selection */}
      <div className="mt-6">
        <h2 className="text-xl font-semibold">Core Course Requirements</h2>
        {Object.entries(coreCourses).map(([category, courses]) => (
          <div key={category} className="mt-4">
            <h3 className="text-lg font-medium">{category.replace(/([A-Z])/g, " $1")} Subject Area</h3>
            {courses.map(course => (
              <label key={course.id} className="block mt-2">
                <input
                  type="checkbox"
                  checked={completedCourses.includes(course.id)}
                  onChange={() => toggleCourse(course.id, course.credits)}
                  className="mr-2"
                />
                {course.id} - {course.name} ({course.credits} credits)
              </label>
            ))}
          </div>
        ))}
      </div>

      {/* Practicum Course Selection */}
      <div className="mt-6">
        <h2 className="text-xl font-semibold">Mandatory Practicum</h2>
        <label className="block mt-2">
          <input
            type="checkbox"
            checked={completedCourses.includes(practicumCourse.id)}
            onChange={() => toggleCourse(practicumCourse.id, practicumCourse.credits)}
            className="mr-2"
          />
          {practicumCourse.id} - {practicumCourse.name} ({practicumCourse.credits} credits)
        </label>
      </div>

      {/* Elective Courses Toggle */}
      <div className="mt-6">
        <h2 className="text-xl font-semibold">Elective Courses</h2>
        <button
          onClick={() => setShowElectives(!showElectives)}
          className="mt-2 bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition"
        >
          {showElectives ? "Hide Electives" : "Show Electives"}
        </button>

        {/* Elective Search Box */}
        {showElectives && (
          <div className="mt-4">
            <input
              type="text"
              placeholder="Search by Course ID or Name..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="p-2 border rounded-lg w-full"
            />
          </div>
        )}

        {/* Elective Courses Dropdown */}
        {showElectives && (
          <div className="mt-4 max-h-60 overflow-y-auto border p-4 rounded-lg bg-white shadow-md">
            {filteredElectives.map(course => (
              <label key={course.id} className="block mt-2">
                <input
                  type="checkbox"
                  checked={completedCourses.includes(course.id)}
                  onChange={() => toggleCourse(course.id, course.credits)}
                  className="mr-2"
                />
                {course.id} - {course.name} ({course.credits} credits)
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Total Credit Hours */}
      <p className="mt-6 text-lg font-semibold text-gray-800">Total Credits Completed: {totalCredits}</p>

      {/* Error Message for Missing Core Courses */}
      {error && <p className="text-red-500 mt-4">{error}</p>}

      {/* Check Completion Button */}
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