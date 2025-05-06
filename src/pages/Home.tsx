import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaGraduationCap, FaChartLine, FaEnvelope } from "react-icons/fa";

const Home = () => {
  return (
    <motion.div
      className="relative min-h-screen flex flex-col justify-center items-center bg-gradient-to-r from-blue-50 via-blue-100 to-blue-200 bg-[length:200%_200%] px-4 py-8 overflow-hidden"
      initial={{ backgroundPosition: "0% 50%" }}
      animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
      transition={{ duration: 20, ease: "linear", loop: Infinity }}
    >
      {/* Decorative SVG blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-80 h-80 bg-blue-200 rounded-full opacity-20 filter blur-3xl mix-blend-multiply"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-blue-100 rounded-full opacity-20 filter blur-2xl mix-blend-multiply"></div>

      {/* Header Section */}
      <motion.h1
        className="text-5xl font-extrabold text-center text-gray-900 mb-4 z-10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Welcome to the Computer Science Department 🎓
      </motion.h1>

      <motion.p
        className="text-lg text-gray-800 text-center max-w-2xl mb-10 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
      >
        Track your degree progress, manage your course load, and stay connected with the department.
      </motion.p>

      {/* Navigation Cards */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-4xl z-10"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
        }}
      >
        {/* Degree Tracker */}
        <motion.div
          variants={{ hidden: { opacity: 0, scale: 0.9 }, visible: { opacity:1, scale:1 } }}
          whileHover={{ scale: 1.05 }}
          className="bg-white bg-opacity-80 backdrop-filter backdrop-blur-lg rounded-2xl p-6 shadow-lg flex items-center gap-4 hover:shadow-2xl transition"
        >
          <FaGraduationCap className="text-blue-700 text-4xl" />
          <Link to="/degree-tracker" className="text-xl font-semibold text-blue-800">
            Degree Tracker
          </Link>
        </motion.div>

        {/* Reduced Courseload */}
        <motion.div
          variants={{ hidden: { opacity: 0, scale: 0.9 }, visible: { opacity:1, scale:1 } }}
          whileHover={{ scale: 1.05 }}
          className="bg-white bg-opacity-80 backdrop-filter backdrop-blur-lg rounded-2xl p-6 shadow-lg flex items-center gap-4 hover:shadow-2xl transition"
        >
          <FaChartLine className="text-green-600 text-4xl" />
          <Link to="/reduced-courseload" className="text-xl font-semibold text-green-700">
            Reduced Courseload Form
          </Link>
        </motion.div>

        {/* Contact Us */}
        <motion.div
          variants={{ hidden: { opacity: 0, scale: 0.9 }, visible: { opacity:1, scale:1 } }}
          whileHover={{ scale: 1.05 }}
          className="bg-white bg-opacity-80 backdrop-filter backdrop-blur-lg rounded-2xl p-6 shadow-lg flex items-center gap-4 hover:shadow-2xl transition"
        >
          <FaEnvelope className="text-gray-700 text-4xl" />
          <Link to="/contact" className="text-xl font-semibold text-gray-800">
            Contact Us
          </Link>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default Home;