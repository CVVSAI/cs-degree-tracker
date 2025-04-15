import React from "react";
import { coreCourses } from "../data/courses";

interface Props {
  completedCourses: string[];
  toggleCourse: (courseId: string, credits: number) => void;
}

const CoreCourses: React.FC<Props> = ({ completedCourses, toggleCourse }) => {
  return (
    <div className="mt-6">
      <h2 className="text-xl font-semibold">Core Course Requirements</h2>
      {Object.entries(coreCourses).map(([category, courses]) => (
        <div key={category} className="mt-4">
          <h3 className="text-lg font-medium">
            {category.replace(/([A-Z])/g, " $1")} Subject Area
          </h3>
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
  );
};

export default CoreCourses;
