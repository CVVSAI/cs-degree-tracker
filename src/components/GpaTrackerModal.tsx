import React from "react";

interface Props {
  show: boolean;
  completedCourses: string[];
  courseGrades: { [key: string]: { grade: string; credits: number } };
  setCourseGrades: React.Dispatch<React.SetStateAction<{ [key: string]: { grade: string; credits: number } }>>;
  calculateGPA: () => string;
  close: () => void;
  gradePoints: { [key: string]: number };
}

const GpaTrackerModal: React.FC<Props> = ({
  show,
  completedCourses,
  courseGrades,
  setCourseGrades,
  calculateGPA,
  close,
  gradePoints
}) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
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

        <div className="mt-4">
          <h3 className="text-lg font-semibold">Your GPA: {calculateGPA()}</h3>
        </div>

        <button
          onClick={close}
          className="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default GpaTrackerModal;
