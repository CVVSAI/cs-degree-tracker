import React from "react";

interface Props {
  progress: number;
}

const ProgressBar: React.FC<Props> = ({ progress }) => {
  return (
    <>
      <div className="mt-6 bg-gray-200 rounded-full h-6 w-full">
        <div
          className="bg-blue-500 h-6 rounded-full"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      <p className="text-gray-700 mt-2 text-center">{progress}% Complete</p>
    </>
  );
};

export default ProgressBar;
