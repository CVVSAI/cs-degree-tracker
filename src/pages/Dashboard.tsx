const Dashboard = () => {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-bold text-center text-gray-800">📜 Degree Tracker</h1>
      <p className="text-gray-600 text-center mt-2">
        Upload your transcripts to check completed courses and remaining degree requirements.
      </p>

      <div className="mt-6 bg-white shadow-md rounded-lg p-6 text-center">
        <input type="file" className="p-2 border rounded-lg" />
        <button className="ml-3 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition">
          Upload Transcript
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
