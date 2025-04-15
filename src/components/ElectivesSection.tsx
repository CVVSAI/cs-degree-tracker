import React from "react";
import { electives } from "../data/courses";

interface Elective {
  id: string;
  name: string;
  credits: number;
}

interface Props {
  showElectives: boolean;
  setShowElectives: (val: boolean) => void;
  searchQuery: string;
  setSearchQuery: (val: string) => void;
  completedCourses: string[];
  toggleCourse: (courseId: string, credits: number) => void;
}

const ElectivesSection: React.FC<Props> = ({
  showElectives,
  setShowElectives,
  searchQuery,
  setSearchQuery,
  completedCourses,
  toggleCourse
}) => {
  const filteredElectives = electives.filter(course =>
    course.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    course.id.toLowerCase().includes(searchQuery.replace(/\s+/g, "").toLowerCase())
  );

  return (
    <div className="mt-6">
      <h2 className="text-xl font-semibold">Elective Courses</h2>
      <button
        onClick={() => setShowElectives(!showElectives)}
        className="mt-2 bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition"
      >
        {showElectives ? "Hide Electives" : "Show Electives"}
      </button>

      {showElectives && (
        <>
          <div className="mt-4">
            <input
              type="text"
              placeholder="Search by Course ID or Name..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="p-2 border rounded-lg w-full"
            />
          </div>

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
        </>
      )}
    </div>
  );
};

export default ElectivesSection;
