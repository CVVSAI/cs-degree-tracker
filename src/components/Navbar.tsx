import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-gray-900 text-white p-4">
      <ul className="flex space-x-6 justify-center">
        <li>
          <Link to="/" className="hover:text-blue-400 transition duration-300">
            Dashboard
          </Link>
        </li>
        <li>
        <Link to="/course-offerings" className="px-4 py-2 hover:text-blue-600">
          Course Offerings
        </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
