import React from "react";

interface ProjectCourse {
  id: string;
  name: string;
  minCredits: number;
}

interface Props {
  projectCourses: ProjectCourse[];
  projectCourse: string;
  setProjectCourse: (id: string) => void;
  projectCredits: number;
  setProjectCredits: (credits: number) => void;
}

const ProjectRequirement: React.FC<Props> = ({
  projectCourses,
  projectCourse,
  setProjectCourse,
  projectCredits,
  setProjectCredits
}) => {
  return (
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
  );
};

export default ProjectRequirement;
