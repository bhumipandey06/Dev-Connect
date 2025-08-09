import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import ProfileCard from "../components/components1/ProfileCard";

const ProfileDetails = () => {
  const { id } = useParams();
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch(`https://devconnect-backend-xvdx.onrender.com/api/form/${id}`);
        if (!res.ok) {
          const { message } = await res.json();
          throw new Error(message || "Failed to fetch");
        }
        const data = await res.json();
        setProfile(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchProfile();
  }, [id]);

  const handleCopy = () => {
    const profileUrl = `${window.location.origin}/profile/${id}`;
    navigator.clipboard.writeText(profileUrl).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  if (error) {
    return (
      <div className="text-center mt-10">
        <p className="text-red-500 text-lg font-medium">❌ {error}</p>
        <p className="text-gray-500 mt-2">The profile you're looking for may have been deleted or doesn't exist.</p>
      </div>
    );
  }
  

  if (!profile) {
    return <p className="text-gray-500 text-center mt-10">Loading profile...</p>;
  }

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-900 text-zinc-800 dark:text-zinc-100">
      <div className="max-w-3xl mx-auto py-10 px-4">
        <h2 className="text-xl font-bold mb-6 text-center">👤 Public Profile</h2>
        <ProfileCard {...profile} />

        {/* 🔁 Buttons */}
        <div className="text-center mt-6 space-y-4">
          <button
            onClick={handleCopy}
            className="bg-green-600 text-white px-4 py-2 rounded shadow hover:bg-green-700"
          >
            Copy Profile Link
          </button>
          {copied && <p className="text-green-600 text-sm">✅ Link copied!</p>}

          <div>
            <Link
              to="/"
              className="inline-block mt-4 bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-900"
            >
              ← Back to Edit Profile
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileDetails;
