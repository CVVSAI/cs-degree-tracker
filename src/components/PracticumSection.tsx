import React from "react";

interface PracticumCourse {
  id: string;
  name: string;
  credits: number;
}

interface Props {
  practicumCourse: PracticumCourse;
  completedCourses: string[];
  toggleCourse: (courseId: string, credits: number) => void;
}

const PracticumSection: React.FC<Props> = ({ practicumCourse, completedCourses, toggleCourse }) => {
  return (
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
  );
};

export default PracticumSection;
