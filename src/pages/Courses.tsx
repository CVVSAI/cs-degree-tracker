import { useDegree } from "../context/DegreeContext";

const Courses = () => {
  const { courses, toggleCourseCompletion } = useDegree();

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center text-gray-800">Your Courses</h1>
      <p className="text-gray-600 text-center mt-2">Mark courses as completed.</p>

      <ul className="mt-6 space-y-4">
        {courses.map(course => (
          <li
            key={course.id}
            className={`flex items-center p-4 rounded-lg shadow-md transition ${
              course.completed ? "bg-green-100" : "bg-white"
            }`}
          >
            <input
              type="checkbox"
              checked={course.completed}
              onChange={() => toggleCourseCompletion(course.id)}
              className="mr-3 h-5 w-5"
            />
            <span className={`text-lg ${course.completed ? "text-green-600 line-through" : "text-gray-800"}`}>
              {course.name}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Courses;
