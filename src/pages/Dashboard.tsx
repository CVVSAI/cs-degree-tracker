const Dashboard = () => {
    return (
      <div className="container mx-auto p-6">
        <h1 className="text-4xl font-bold text-center text-gray-800">Degree Progress Dashboard</h1>
        <p className="text-gray-600 text-center mt-2">Track your completed and remaining courses.</p>
  
        <div className="mt-6 bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold">Current Progress</h2>
          <div className="mt-4 bg-gray-200 rounded-full h-6 w-full">
            <div className="bg-blue-500 h-6 rounded-full w-2/3"></div>
          </div>
          <p className="text-gray-600 mt-2">You have completed 67% of your degree.</p>
        </div>
      </div>
    );
  };
  
  export default Dashboard;
  