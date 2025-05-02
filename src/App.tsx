import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
// import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home"; 
import Courses from "./pages/Courses";
import Settings from "./pages/Settings";
import DegreeTracker from "./components/DegreeTracker";
import CourseOfferings from "./components/CourseOfferings";
import Contact from "./pages/Contact";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />  
          <Route path="/degree-tracker" element={<DegreeTracker />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/course-offerings" element={<CourseOfferings />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
