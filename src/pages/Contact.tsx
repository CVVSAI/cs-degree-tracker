const Contact = () => {
    return (
      <div className="min-h-screen p-8 bg-gray-100 text-gray-900">
        <h1 className="text-3xl font-bold text-center mb-6">✉️ Contact Us</h1>
        <p className="text-lg text-center mb-4">
          For inquiries, please visit our Computer Science faculty directory:
        </p>
        <div className="text-center">
          <a
            href="https://computerscience.emory.edu/graduate-phd/csi-faculty.html"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-700 transition"
          >
            🔗 View CSI Faculty Directory
          </a>
        </div>
      </div>
    );
  };
  
  export default Contact;
  