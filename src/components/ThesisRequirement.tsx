import React from "react";

interface ThesisCourse {
  id: string;
  name: string;
}

interface Props {
  selectedThesisCourse: string;
  setSelectedThesisCourse: (id: string) => void;
  thesisCourse: ThesisCourse;
  thesisCredits: number;
  setThesisCredits: (credits: number) => void;
  setCompletedCourses: React.Dispatch<React.SetStateAction<string[]>>;
}


const ThesisRequirement: React.FC<Props> = ({
  selectedThesisCourse,
  setSelectedThesisCourse,
  thesisCourse,
  thesisCredits,
  setThesisCredits,
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

      <label className="mt-4 block text-gray-600 font-medium">Enter Thesis Credits</label>
      <input
        type="number"
        min="9"
        value={thesisCredits}
        onChange={(e) => setThesisCredits(parseInt(e.target.value))}
        className="mt-1 p-2 border rounded-lg w-full"
      />
      {thesisCredits < 9 && selectedThesisCourse && (
        <p className="text-red-500 mt-2">⚠️ You need at least 9 credits for the thesis.</p>
      )}
    </div>
  );
};

export default ThesisRequirement;
