import React, { createContext, useState, useContext, ReactNode } from "react";

// Define course structure
interface Course {
  id: number;
  name: string;
  completed: boolean;
}

// Define context structure
interface DegreeContextType {
  courses: Course[];
  addCourse: (course: Course) => void;
  toggleCourseCompletion: (id: number) => void;
}

// Create Context
const DegreeContext = createContext<DegreeContextType | undefined>(undefined);

export const DegreeProvider = ({ children }: { children: ReactNode }) => {
  const [courses, setCourses] = useState<Course[]>([
    { id: 1, name: "CS101 - Introduction to Programming", completed: true },
    { id: 2, name: "CS102 - Data Structures", completed: false },
    { id: 3, name: "CS201 - Algorithms", completed: false },
    { id: 4, name: "CS301 - Operating Systems", completed: false },
  ]);

  const addCourse = (course: Course) => setCourses([...courses, course]);

  const toggleCourseCompletion = (id: number) =>
    setCourses(courses.map(course =>
      course.id === id ? { ...course, completed: !course.completed } : course
    ));

  return (
    <DegreeContext.Provider value={{ courses, addCourse, toggleCourseCompletion }}>
      {children}
    </DegreeContext.Provider>
  );
};

export const useDegree = () => {
  const context = useContext(DegreeContext);
  if (!context) {
    throw new Error("useDegree must be used within a DegreeProvider");
  }
  return context;
};