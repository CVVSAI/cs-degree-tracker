import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { coreCourses, electives, degreeTracks } from "../data/courses";

const DegreeTracker = () => {
  const [track, setTrack] = useState("coursework");
  const [semester, setSemester] = useState("");
  const [completedCourses, setCompletedCourses] = useState<string[]>([]);
  const [error, setError] = useState("");
  const [showElectives, setShowElectives] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [projectCourse, setProjectCourse] = useState("");
  const [projectCredits, setProjectCredits] = useState(0);
  const navigate = useNavigate();

  const totalRequiredCourses = degreeTracks[track].totalCourses;

  const practicumCourse = { id: "CS596R", name: "Computer Science Master’s Practicum", credits: 1 };
  const projectCourses = [
    { id: "CS597R", name: "CS MS Project - 597R", minCredits: 6 },
    { id: "CS599R", name: "CS MS Project - 599R", minCredits: 6 }
  ];

  // Calculate total credits
  const totalCredits = completedCourses.reduce((acc, courseId) => {
    const course = [...Object.values(coreCourses).flat(), ...electives].find(c => c.id === courseId);
    return course ? acc + course.credits : acc;
  }, 0);

  // Toggle course selection
  const toggleCourse = (courseId: string) => {
    setCompletedCourses(prev =>
      prev.includes(courseId)
        ? prev.filter(id => id !== courseId)
        : [...prev, courseId]
    );
  };

  // Ensure at least one course is taken from each core category
  const isCoreComplete = Object.keys(coreCourses).every(category =>
    coreCourses[category].some(course => completedCourses.includes(course.id))
  );

  // Ensure the correct number of electives is taken based on the track
  const requiredElectives = track === "coursework" ? 7 : track === "project" ? 5 : 4;
  const completedElectives = electives.filter(course => completedCourses.includes(course.id)).length;
  const isElectivesComplete = completedElectives >= requiredElectives;
  const isPracticumComplete = completedCourses.includes(practicumCourse.id);

  const isProjectComplete = track !== "project" || (projectCourse && projectCredits >= 6);

  // Calculate progress percentage
  const completedCount = completedCourses.length;
  const totalCoursesNeeded = Object.keys(coreCourses).length + requiredElectives;
  const progress = Math.round((completedCount / totalCoursesNeeded) * 100);

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

      {/* Track Selection */}
      <div className="mt-6">
        <label className="block text-gray-700 font-medium">Select Your Track</label>
        <select
          value={track}
          onChange={e => setTrack(e.target.value)}
          className="mt-1 p-2 border rounded-lg w-full"
        >
          {Object.entries(degreeTracks).map(([key, value]) => (
            <option key={key} value={key}>
              {value.name}
            </option>
          ))}
        </select>
      </div>

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
                  onChange={() => toggleCourse(course.id)}
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
            onChange={() => toggleCourse(practicumCourse.id)}
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
                  onChange={() => toggleCourse(course.id)}
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