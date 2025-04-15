import React from "react";

interface Props {
  missingRequirements: string[];
}

const RequirementChecklist: React.FC<Props> = ({ missingRequirements }) => {
  if (missingRequirements.length === 0) return null;

  return (
    <div className="mt-4 bg-red-100 border-l-4 border-red-500 p-4">
      <h3 className="text-red-700 font-semibold">Incomplete Requirements:</h3>
      <ul className="list-disc list-inside text-red-600">
        {missingRequirements.map((req, index) => (
          <li key={index}>{req}</li>
        ))}
      </ul>
    </div>
  );
};

export default RequirementChecklist;
