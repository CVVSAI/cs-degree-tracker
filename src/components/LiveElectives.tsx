import { useEffect, useState } from "react";
import { electives } from "../data/courses";

const termLabels: { [key: string]: string } = {
  "5251": "Spring 2025",
  "5259": "Fall 2025"
};

type CourseOffering = {
  CLASS_NBR: string;
  SUBJECT: string;
  CATALOG_NBR: string;
  DESCR: string;
  INSTRUCTOR_NAME: string;
  START_DT: string;
  END_DT: string;
  ENRL_TOT: string;
  ENRL_CAP: string;
};

type Props = {
  completedCourses: string[];
  toggleCourse: (id: string, credits: number) => void;
  updateCourseRelationship: (liveId: string, regularId: string) => void;
};

const LiveElectives = ({ completedCourses, toggleCourse, updateCourseRelationship }: Props) => {
  const [courses, setCourses] = useState<CourseOffering[]>([]);
  const [expanded, setExpanded] = useState(false);
  const [selectedTerm, setSelectedTerm] = useState("5251");

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/courses"); 
        const data = await res.json();

        const filtered = data.filter((course: CourseOffering) => {
          const isCS = course.SUBJECT === "CS";
          const num = parseInt(course.CATALOG_NBR, 10);
          const validNumber = num >= 500 && num < 600;
          const notDirectedStudy = !(course.DESCR || "").includes("Directed Study");
          return isCS && validNumber && notDirectedStudy;
        });

        setCourses(filtered.filter(course => course.TERM === selectedTerm));
      } catch (err) {
        console.error("Failed to load live courses");
      }
    };
    fetchCourses();
  }, [selectedTerm]);

  // Effect to map live courses to regular electives
  useEffect(() => {
    courses.forEach(course => {
      const catalogNumber = course.CATALOG_NBR.padStart(3, '0');
      const liveBaseId = `${course.SUBJECT}${catalogNumber}`;
      
      // Find matching regular elective
      const matchingElective = electives.find(elective => 
        elective.id === liveBaseId || 
        elective.id === `${course.SUBJECT}${catalogNumber}`
      );
      
      if (matchingElective) {
        const instructorSanitized = course.INSTRUCTOR_NAME.replace(/\s+/g, "");
        const liveBaseId = `${course.SUBJECT}${course.CATALOG_NBR}_${instructorSanitized}`;
        updateCourseRelationship(liveBaseId, matchingElective.id);
      }
    });
  }, [courses, updateCourseRelationship]);

  const handleToggle = (uniqueId: string, baseId: string) => {
    // Check if there's a corresponding regular elective
    const catalogNumber = baseId.split("_")[0].replace(/[A-Za-z]/g, '');
    const regularElectiveId = `CS${catalogNumber}`;
    
    // Find matching regular elective to get correct credits
    const matchingElective = electives.find(e => e.id === regularElectiveId);
    const credits = matchingElective?.credits || 3; // Default to 3 if not found

    toggleCourse(uniqueId, credits);
  };

  return (
    <div className="mt-8">
      <button
        onClick={() => setExpanded(!expanded)}
        className="mb-4 bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600"
      >
        {expanded ? "Hide Live Electives" : "Show Live Electives"}
      </button>

      <select
        className="mb-4 px-4 py-2 border rounded shadow"
        value={selectedTerm}
        onChange={(e) => setSelectedTerm(e.target.value)}
      >
        {Object.entries(termLabels).map(([termCode, label]) => (
          <option key={termCode} value={termCode}>{label}</option>
        ))}
      </select>

      {expanded && (
        <div>
          <h2 className="text-xl font-semibold mb-4">📡 Available CS Electives</h2>
          <div className="space-y-4">
            {courses.map((course) => {
              const instructorSanitized = course.INSTRUCTOR_NAME.replace(/\s+/g, "");
              const baseId = `${course.SUBJECT}${course.CATALOG_NBR}_${instructorSanitized}`;
              const uniqueId = `${baseId}-${course.CLASS_NBR}`;
              // Check if this course or any corresponding regular elective is selected
              const catalogNumber = course.CATALOG_NBR.padStart(3, '0');
              const regularElectiveId = `${course.SUBJECT}${catalogNumber}`;
              const isSelected = completedCourses.some(id => 
                id === uniqueId || 
                id.startsWith(regularElectiveId)
              );

              return (
                <div
                  key={uniqueId}
                  className="p-4 border rounded shadow-sm bg-white"
                >
                  <p>
                    <strong>{course.SUBJECT} {course.CATALOG_NBR}</strong> - {course.DESCR}
                  </p>
                  <p><span className="font-semibold">Instructor:</span> {course.INSTRUCTOR_NAME || "TBA"}</p>
                  <p><span className="font-semibold">Schedule:</span> {course.START_DT} to {course.END_DT}</p>
                  <p><span className="font-semibold">Enrollment:</span> {course.ENRL_TOT} / {course.ENRL_CAP}</p>
                  <div className="mt-2 space-x-2">
                    <button
                      onClick={() => handleToggle(uniqueId, baseId)}
                      className={`px-3 py-1 rounded text-white ${isSelected ? "bg-red-500 hover:bg-red-600" : "bg-blue-500 hover:bg-blue-600"}`}
                    >
                      {isSelected ? "Remove" : "Add to Electives"}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default LiveElectives;