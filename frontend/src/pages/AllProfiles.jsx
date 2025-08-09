// src/pages/AllProfiles.jsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const AllProfiles = () => {
  const [profiles, setProfiles] = useState([]);

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const res = await fetch("https://devconnect-backend-xvdx.onrender.com/api/form/profiles");
        const data = await res.json();
        if (data.success) {
          setProfiles(data.data);
        }
      } catch (err) {
        console.error("Failed to fetch profiles:", err.message);
      }
    };

    fetchProfiles();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">🌐 All Developer Profiles</h1>

      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
        {profiles.map((profile) => (
          <Link
            to={`/profile/${profile._id}`}
            key={profile._id}
            className="border p-4 rounded shadow hover:shadow-md transition"
          >
            <h2 className="text-lg font-semibold">{profile.name}</h2>
            <p className="text-sm text-zinc-600">{profile.bio}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default AllProfiles;
