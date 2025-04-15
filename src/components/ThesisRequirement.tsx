import React from "react";

interface ThesisCourse {
  id: string;
  name: string;
}

interface Props {
  selectedThesisCourse: string;
  setSelectedThesisCourse: (id: string) => void;
  thesisCourse: ThesisCourse;
  setCompletedCourses: React.Dispatch<React.SetStateAction<string[]>>;
}

const ThesisRequirement: React.FC<Props> = ({
  selectedThesisCourse,
  setSelectedThesisCourse,
  thesisCourse,
  setCompletedCourses
}) => {
  return (
    <div className="mt-6 bg-gray-100 border-l-4 border-gray-500 p-4">
      <h2 className="text-gray-700 font-semibold">Thesis Requirement</h2>
      
      <label className="mt-2 block text-gray-600 font-medium">Select Your Thesis Course</label>
      <select
        value={selectedThesisCourse}
        onChange={e => {
          const courseId = e.target.value;
          setSelectedThesisCourse(courseId);

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

      {selectedThesisCourse && (
        <p className="mt-2 text-green-600 font-semibold">✅ Completed 9 Credits</p>
      )}
    </div>
  );
};

export default ThesisRequirement;
