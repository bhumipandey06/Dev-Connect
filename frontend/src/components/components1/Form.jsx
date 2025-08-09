import { useState } from "react";
import { useNavigate } from "react-router-dom";

// Tech stack options
const techOptions = {
  Frontend: [
    "HTML",
    "CSS",
    "JavaScript",
    "TypeScript",
    "React",
    "Next.js",
    "Tailwind CSS",
    "Bootstrap",
  ],
  Backend: [
    "Node.js",
    "Express.js",
    "MongoDB",
    "Firebase",
    "PostgreSQL",
    "GraphQL",
    "Socket.IO",
    "Prisma",
  ],
  Tools: [
    "Git",
    "GitHub",
    "Vercel",
    "Netlify",
    "Render",
    "Docker",
    "AWS",
    "Linux",
    "Figma",
  ],
  Languages: ["Python", "Java", "C++", "Go", "Rust"],
  Other: ["Zustand", "Other"],
};

const Form = ({
  name,
  setName,
  bio,
  setBio,
  techStack,
  setTechStack,
  github,
  setGithub,
  linkedin,
  setLinkedin,
  portfolio,
  setPortfolio,
  profileImage,
  setProfileImage,
  savedProfiles,
  setSavedProfiles,
  selectedProfileId,
  setSelectedProfileId,
}) => {
  const navigate = useNavigate();
  const [error, setError] = useState("");

  // ✅ Handle checkbox selection
  const handleCheckboxChange = (tech) => {
    if (techStack.includes(tech)) {
      setTechStack(techStack.filter((t) => t !== tech));
    } else {
      setTechStack([...techStack, tech]);
    }
  };

  // ✅ Save new profile
  const handleSaveProfile = async () => {
    if (!name.trim()) {
      setError("Name is required.");
      return;
    }
    if (github && !github.startsWith("https://")) {
      setError("GitHub link must start with https://");
      return;
    }
    if (linkedin && !linkedin.startsWith("https://")) {
      setError("Linkedin link must start with https://");
      return;
    }
    if (portfolio && !portfolio.startsWith("https://")) {
      setError("Portfolio link must start with https://");
      return;
    }

    setError(""); // Clear errors

    const profileData = {
      name,
      bio,
      github,
      linkedin,
      portfolio,
      techStack,
      profileImage,
    };

    try {
      if (selectedProfileId) {
        // 🔄 Update existing profile (NO PROMPT)
        const response = await fetch(
          `https://devconnect-backend-xvdx.onrender.com/api/form/${selectedProfileId}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(profileData),
          }
        );
        const result = await response.json();
        if (result.success) {
          alert("✅ Profile updated successfully!");
        } else {
          alert("⚠️ Failed to update profile.");
        }
      } else {
        // ➕ Create new profile — this should not be reached if you're always selecting
        alert("❌ Please use 'Save New Profile' to create a new profile.");
        return;
      }

      // 🔄 Refresh saved profiles
      const updatedProfilesResponse = await fetch(
        "https://devconnect-backend-xvdx.onrender.com/api/form/profiles"
      );
      const updated = await updatedProfilesResponse.json();
      if (updated.success) {
        setSavedProfiles(updated.data);
      }
    } catch (err) {
      console.error("Save error:", err.message);
      alert("❌ An error occurred while saving the profile.");
    }
  };

  // create new profile
  const handleSaveAsNew = async () => {
    const profileLabel = prompt("Enter a name for this saved profile:");
    if (!profileLabel) return;

    if (!name.trim()) {
      setError("Name is required.");
      return;
    }
    if (github && !github.startsWith("https://")) {
      setError("GitHub link must start with https://");
      return;
    }
    if (linkedin && !linkedin.startsWith("https://")) {
      setError("Linkedin link must start with https://");
      return;
    }
    if (portfolio && !portfolio.startsWith("https://")) {
      setError("Portfolio link must start with https://");
      return;
    }

    const profileData = {
      name, // ✅ full name of user
      bio,
      github,
      linkedin,
      portfolio,
      techStack,
      profileImage,
      label: profileLabel, // ✅ label shown in dropdown
    };

    try {
      const response = await fetch("https://devconnect-backend-xvdx.onrender.com/api/form/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(profileData),
      });

      const result = await response.json();
      if (result.success) {
        alert("✅ Profile saved as new successfully!");

        // Refresh saved profiles
        const updatedProfiles = await fetch(
          "https://devconnect-backend-xvdx.onrender.com/api/form/profiles"
        );
        const data = await updatedProfiles.json();
        if (data.success) {
          setSavedProfiles(data.data);
        }
      } else {
        alert("❌ Failed to save new profile.");
      }
    } catch (err) {
      console.error("Save as new error:", err.message);
      alert("❌ Error saving new profile.");
    }
  };

  // ✅ Unified load + select logic
  const handleSelectProfile = (e) => {
    const selectedId = e.target.value;
    setSelectedProfileId(selectedId); // set this for deletion too
    if (!selectedId) return;

    const selectedProfile = savedProfiles.find((p) => p._id === selectedId);
    if (!selectedProfile) return;

    const {
      name: savedName,
      bio: savedBio,
      github: savedGithub,
      linkedin: savedLinkedin,
      portfolio: savedPortfolio,
      techStack: savedTechStack,
      profileImage: savedProfileImage,
    } = selectedProfile;

    setName(savedName || "");
    setBio(savedBio || "");
    setGithub(savedGithub || "");
    setLinkedin(savedLinkedin || "");
    setPortfolio(savedPortfolio || "");
    setTechStack(savedTechStack || []);
    setProfileImage(savedProfileImage || "");
  };

  // ✅ Delete selected profile
  const handleDeleteProfile = async () => {
    if (!selectedProfileId) return;

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this profile?"
    );
    if (!confirmDelete) return;

    try {
      const res = await fetch(
        `https://devconnect-backend-xvdx.onrender.com/api/form/${selectedProfileId}`,
        {
          method: "DELETE",
        }
      );

      const result = await res.json(); // ✅ Safe now

      if (!res.ok) {
        throw new Error(result.message || "Failed to delete");
      }

      alert("🗑️ Profile deleted successfully!");

      // Refresh list
      const updatedProfilesRes = await fetch(
        "https://devconnect-backend-xvdx.onrender.com/api/form/profiles"
      );
      const updatedData = await updatedProfilesRes.json();
      setSavedProfiles(updatedData.data);

      // Reset form
      setSelectedProfileId("");
      setName("");
      setBio("");
      setGithub("");
      setLinkedin("");
      setPortfolio("");
      setTechStack([]);
      setProfileImage("");
    } catch (err) {
      console.error("Delete error:", err.message);
      alert("❌ Failed to delete profile.");
    }
  };

  return (
    <form
      className="space-y-6 p-6 bg-white dark:bg-zinc-900 rounded-lg shadow"
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      {/* 🔹 Profile Selector + Delete */}
      <div className="mb-4">
        <label className="block font-medium mb-1">Select Saved Profile</label>
        <div className="flex flex-col sm:flex-row gap-2 items-start sm:items-center">
          <select
            onChange={handleSelectProfile}
            className="w-full sm:w-2/3 px-3 py-2 border rounded bg-white text-black"
            value={selectedProfileId}
          >
            <option value="" disabled>
              -- Select a Profile --
            </option>
            {savedProfiles.map((profile) => (
              <option key={profile._id} value={profile._id}>
                {profile.label || profile.name}
              </option>
            ))}
          </select>

          <button
            type="button"
            onClick={handleDeleteProfile}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 disabled:bg-gray-400"
            disabled={!selectedProfileId}
          >
            Delete
          </button>
        </div>
      </div>

      {/* 🔹 Name Input */}
      <div>
        <label className="block mb-1 font-medium">Full Name</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g. Bhumi Pandey"
          className="w-full px-4 py-2 text-sm border rounded"
        />
        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
      </div>

      {/* 🔹 Bio Input */}
      <div>
        <label className="block mb-1 font-medium">Bio</label>
        <textarea
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          placeholder="e.g. Full Stack Developer"
          className="w-full px-4 py-2 text-sm border rounded"
        />
      </div>

      {/* Tech Stack Section */}
      <div>
        <label className="block mb-1 font-medium">Tech Stack</label>

        {Object.entries(techOptions).map(([category, techList]) => (
          <div key={category} className="mb-4">
            <h4 className="font-semibold text-sm text-zinc-700 dark:text-zinc-300 mb-2">
              {category}
            </h4>
            <div className="flex flex-wrap gap-4">
              {techList.map((tech) => (
                <label key={tech} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={techStack.includes(tech)}
                    onChange={() => handleCheckboxChange(tech)}
                  />
                  <span>{tech}</span>
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* 🔹 Links */}
      <div>
        <label className="block mb-1 font-medium">GitHub Link</label>
        <input
          type="url"
          value={github}
          onChange={(e) => setGithub(e.target.value)}
          placeholder="https://github.com/username"
          className="w-full px-4 py-2 border rounded"
        />
      </div>

      <div>
        <label className="block mb-1 font-medium">LinkedIn Link</label>
        <input
          type="url"
          value={linkedin}
          onChange={(e) => setLinkedin(e.target.value)}
          placeholder="https://linkedin.com/in/username"
          className="w-full px-4 py-2 border rounded"
        />
      </div>

      <div>
        <label className="block mb-1 font-medium">Portfolio Link</label>
        <input
          type="url"
          value={portfolio}
          onChange={(e) => setPortfolio(e.target.value)}
          placeholder="https://yourportfolio.com"
          className="w-full px-4 py-2 border rounded"
        />
      </div>

      {/* 🔹 Upload Profile Picture */}
      <div>
        <label className="block mb-1 font-medium">Upload Profile Picture</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files[0];
            if (file) {
              const reader = new FileReader();
              reader.onloadend = () => {
                setProfileImage(reader.result);
              };
              reader.readAsDataURL(file);
            }
          }}
          className="block w-full"
        />
      </div>

      {/* 🔹 Actions */}
      <div className="flex flex-col sm:flex-row gap-3 mt-4">
        {selectedProfileId && (
          <button
            type="button"
            onClick={() => navigate(`/profile/${selectedProfileId}`)}
            className="bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700"
          >
            View My Public Profile
          </button>
        )}

        <button
          type="button"
          onClick={handleSaveProfile}
          className="bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700"
        >
          Save Profile
        </button>

        <button
          type="button"
          onClick={handleSaveAsNew}
          className="bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700"
        >
          Save New Profile
        </button>

        <button
          type="button"
          onClick={() => {
            localStorage.removeItem("devconnect_profile");
            window.location.reload();
          }}
          className="bg-red-600 text-white px-4 py-2 rounded shadow hover:bg-red-700"
        >
          Clear Profile
        </button>
      </div>
    </form>
  );
};

export default Form;
