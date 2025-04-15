import React from "react";

interface Props {
  semester: string;
  setSemester: (semester: string) => void;
}

const SemesterSelector: React.FC<Props> = ({ semester, setSemester }) => {
  return (
    <div className="mt-6">
      <label className="block text-gray-700 font-medium">Select Your Semester</label>
      <select
        value={semester}
        onChange={e => setSemester(e.target.value)}
        className="mt-1 p-2 border rounded-lg w-full"
      >
        <option value="">Select Semester</option>
        <option value="1st">1st Semester</option>
        <option value="2nd">2nd Semester</option>
        <option value="3rd">3rd Semester</option>
        <option value="Last">Last Semester</option>
      </select>
    </div>
  );
};

export default SemesterSelector;
