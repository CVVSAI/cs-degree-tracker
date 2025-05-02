import { useEffect, useState } from "react";

const CourseOfferings = () => {
  const [courses, setCourses] = useState<any[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/courses");
        const data = await res.json();
        setCourses(data);
      } catch (err) {
        setError("Failed to load courses");
      }
    };
    fetchCourses();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">📚 Course Offerings</h1>
      {error && <p className="text-red-500">{error}</p>}
      {courses.length === 0 && !error && <p>Loading courses...</p>}

      {courses.map((course, idx) => (
        <div key={idx} className="mb-4 p-4 border rounded shadow bg-white">
          <p><strong>{course.SUBJECT} {course.CATALOG_NBR}</strong> - {course.DESCR}</p>
          <p><span className="font-semibold">Units:</span> {course.UNITS_MAXIMUM}</p>
          <p><span className="font-semibold">Instructor:</span> {course.INSTRUCTOR_NAME || "TBA"}</p>
          <p><span className="font-semibold">Start:</span> {course.START_DT} — <span className="font-semibold">End:</span> {course.END_DT}</p>
          <p><span className="font-semibold">Enrollment:</span> {course.ENRL_TOT} / {course.ENRL_CAP}</p>
        </div>
      ))}
    </div>
  );
};

export default CourseOfferings;
