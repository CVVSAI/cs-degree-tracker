import React from "react";

const ReducedCourseload = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-start py-16 px-6">
      <div className="bg-white p-10 shadow-lg rounded-xl w-full max-w-5xl">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">📉 Reduced Course Load (RCL)</h1>
        <p className="mb-6 text-gray-700 text-lg leading-relaxed">
          If you're a graduating student and do not need to take 9 units in your final semester, you may request a Reduced Course Load (RCL) through the Laney Graduate School.
          If you are an international student, you must also submit a request with ISSS.
        </p>

        <div className="mb-8 space-y-4">
          <a
            href="https://gs.emory.edu/academics/policies-progress/reduced.html"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline text-lg"
          >
            Laney Graduate School Policy: Reduced Course Load
          </a>
        </div>
        <div className="mb-8 space-y-4">
          <a
            href="https://isss.emory.edu/students/changing_your_program/reduced_course_load.html"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline text-lg"
          >
            ISSS Emory: Reduced Course Load for International Students
          </a>
        </div>

        <div className="mt-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">📧 For more details:</h2>
          <p className="text-gray-700 text-lg">
            <strong>Mathew Estrada</strong><br />
            <i>Graduate Coordinator, MS</i><br />
            Email: <a href="mailto:mdestra@emory.edu" className="text-blue-600 underline">mdestra@emory.edu</a><br />
            Calendly:{" "}
            <a
              href="https://calendly.com/mdestra-emory/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline"
            >
              Schedule a 30-min meeting
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ReducedCourseload;
