import React from "react";
import { degreeTracks } from "../data/courses";

interface Props {
  track: string;
  setTrack: (track: string) => void;
  thesisCourseId: string;
  setSelectedThesisCourse: (id: string) => void;
  setCompletedCourses: React.Dispatch<React.SetStateAction<string[]>>;
}

const TrackSelector: React.FC<Props> = ({
  track,
  setTrack,
  thesisCourseId,
  setSelectedThesisCourse,
  setCompletedCourses
}) => {
  return (
    <div className="mt-6">
      <label className="block text-gray-700 font-medium">Select Your Track</label>
      <select
        value={track}
        onChange={e => {
          const newTrack = e.target.value;
          setTrack(newTrack);

          if (track === "thesis" && newTrack !== "thesis") {
            setSelectedThesisCourse("");
            setCompletedCourses(prev => prev.filter(id => id !== thesisCourseId));
          }
        }}
        className="mt-1 p-2 border rounded-lg w-full"
      >
        {Object.entries(degreeTracks).map(([key, value]) => (
          <option key={key} value={key}>
            {value.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default TrackSelector;
