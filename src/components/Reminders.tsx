import React from "react";
import { useNavigate } from "react-router-dom";

interface Props {
  semester: string;
  track: string;
  showThesisReminder: boolean;
  setShowThesisReminder: (show: boolean) => void;
}

const Reminders: React.FC<Props> = ({ semester, track, showThesisReminder, setShowThesisReminder }) => {
  const navigate = useNavigate();

  return (
    <>
      {semester === "Last" && (
        <div className="mt-4 bg-yellow-100 border-l-4 border-yellow-500 p-4">
          <p className="text-yellow-700 font-medium">
            ⚠️ You are in your last semester! You may be eligible for a reduced courseload, which could lower your tuition.
          </p>
          <button
            onClick={() => navigate("/reduced-courseload")}
            className="mt-2 bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition"
          >
            Learn More
          </button>
        </div>
      )}

      {showThesisReminder && track === "thesis" && (
        <div className="mt-4 bg-red-100 border-l-4 border-red-500 p-4">
          <p className="text-red-700 font-medium">
            ⚠️ You are in your last semester and on the Thesis Track! Please check the <strong>Graduate School completion deadlines</strong> to ensure all submission requirements are met.
          </p>
          <a
            href="https://gs.emory.edu/academics/completion/index.html"
            target="_blank"
            rel="noopener noreferrer"
            className="block mt-2 text-blue-600 font-semibold underline"
          >
            View Thesis Deadlines & Submission Info
          </a>
          <button
            onClick={() => setShowThesisReminder(false)}
            className="mt-2 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
          >
            Dismiss
          </button>
        </div>
      )}
    </>
  );
};

export default Reminders;
