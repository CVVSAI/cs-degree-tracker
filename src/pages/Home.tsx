import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 text-gray-900">
      <h1 className="text-5xl font-bold text-center text-blue-600 mb-4">
        Welcome to the Computer Science Department 🎓
      </h1>
      <p className="text-lg text-gray-700 text-center max-w-2xl">
        Track your degree progress, manage your course load, and stay connected with the department.
      </p>

      <div className="mt-10 space-y-6">
        <Link
          to="/degree-tracker"
          className="block w-80 bg-blue-500 text-white text-center py-3 rounded-lg shadow-md hover:bg-blue-600 transition"
        >
          📜 Degree Tracker
        </Link>

        <Link
          to="/reduced-courseload"
          className="block w-80 bg-green-500 text-white text-center py-3 rounded-lg shadow-md hover:bg-green-600 transition"
        >
          📉 Reduced Courseload Form
        </Link>

        <Link
          to="/contact"
          className="block w-80 bg-gray-500 text-white text-center py-3 rounded-lg shadow-md hover:bg-gray-600 transition"
        >
          ✉️ Contact Us
        </Link>
      </div>
    </div>
  );
};

export default Home;
