import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function Profile() {
  // Example user data
  const user = {
    name: "Farad Alam Foisal",
    email: "farad.dev@gmail.com",
    phone: "+8801575061066",
    bio: "Django & Flask backend developer passionate about building scalable, user-focused applications.",
    image:
      "https://img.freepik.com/premium-vector/man-avatar-profile-picture-isolated-background-avatar-profile-picture-man_1293239-4841.jpg", // Replace with real profile image
    coverImage:
      "https://img.freepik.com/free-photo/gradient-dark-blue-futuristic-digital-grid-background_53876-129728.jpg",
    dob: "1998-07-01",
    joinDate: "2022-05-15",
    location: "Rajshahi, Bangladesh",
    gender: "Male",
    website: "https://github.com/farad-alam",
    role: "Backend Developer",
    skills: ["Python", "Django", "Flask", "PostgreSQL", "JavaScript", "React"],
    education: "BSc in Zoology, Rajshahi University (2022)",
    experience: "3+ years in backend development",
    status: "Active",
  };

  return (
    <section className="py-20 min-h-screen flex items-center">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-base-100 rounded-2xl shadow-lg overflow-hidden border border-gray-100"
        >
          {/* Cover Image */}
          <div className="relative">
            <img
              src={user.coverImage}
              alt="Cover"
              className="w-full h-48 object-cover"
            />
            {/* Profile Image */}
            <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2">
              <img
                src={user.image}
                alt={user.name}
                className="w-32 h-32 rounded-full border-4 border-white shadow-md"
              />
            </div>
          </div>

          {/* Profile Header */}
          <div className="pt-20 pb-8 px-6 text-center border-b border-gray-200">
            <h1 className="text-3xl font-bold text-gray-800">{user.name}</h1>
            <p className="text-gray-500">{user.role}</p>
            <p className="text-base-content/80 max-w-xl mx-auto mt-4">
              {user.bio}
            </p>
          </div>

          {/* Profile Details */}
          <div className="p-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
            <Detail label="Email" value={user.email} />
            <Detail label="Phone" value={user.phone} />
            <Detail label="Date of Birth" value={user.dob} />
            <Detail label="Join Date" value={user.joinDate} />
            <Detail label="Location" value={user.location} />
            <Detail label="Gender" value={user.gender} />
            <Detail
              label="Website"
              value={
                <a
                  href={user.website}
                  className="text-blue-600 hover:underline"
                >
                  {user.website}
                </a>
              }
            />
            <Detail label="Education" value={user.education} />
            <Detail label="Experience" value={user.experience} />
            <Detail label="Status" value={user.status} />
            <Detail label="Skills" value={user.skills.join(", ")} />
          </div>

          {/* Actions */}
          <div className="p-8 flex flex-col sm:flex-row gap-4 justify-center border-t border-gray-200">
            <Link
              to="/edit-profile"
              className="inline-flex items-center px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-all font-medium shadow-md hover:shadow-lg"
            >
              Edit Profile
            </Link>
            <Link
              to="/"
              className="inline-flex items-center px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-all font-medium"
            >
              Back to Home
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// Reusable detail row
function Detail({ label, value }) {
  return (
    <div className="flex flex-col">
      <span className="text-gray-400 text-sm">{label}</span>
      <span className="text-gray-800 font-medium">{value}</span>
    </div>
  );
}
