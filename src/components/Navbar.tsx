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
          <Link to="/courses" className="hover:text-blue-400 transition duration-300">
            Courses
          </Link>
        </li>
        <li>
          <Link to="/settings" className="hover:text-blue-400 transition duration-300">
            Settings
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
