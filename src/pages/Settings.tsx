const Settings = () => {
    return (
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold text-center text-gray-800">Settings</h1>
        <p className="text-gray-600 text-center mt-2">Manage your profile and preferences.</p>
  
        <div className="mt-6 bg-white shadow-md rounded-lg p-6">
          <label className="block text-gray-700 font-medium">Your Name</label>
          <input
            type="text"
            className="mt-1 p-2 border rounded-lg w-full"
            placeholder="Enter your name"
          />
  
          <label className="block text-gray-700 font-medium mt-4">Email</label>
          <input
            type="email"
            className="mt-1 p-2 border rounded-lg w-full"
            placeholder="Enter your email"
          />
  
          <button className="mt-6 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition">
            Save Settings
          </button>
        </div>
      </div>
    );
  };
  
  export default Settings;
  