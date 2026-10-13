import React, { useState } from "react";
import { User, Mail, Shield, BookOpen, Key, Check } from "lucide-react";

export default function Profile({ currentUser, showToast }) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: currentUser.name,
    email:
      currentUser.role === "student"
        ? "juandelacruz@student.cmu.edu.ph"
        : "admin.registrar@cmu.edu.ph",
    contact: "+63 912 345 6789",
    course: currentUser.course || "BSIT • 2nd Year",
  });

  const handleSave = (e) => {
    e.preventDefault();
    setIsEditing(false);
    showToast("Profile updated successfully!");
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center space-x-3">
        <div className="p-3 bg-[#0F3EAB] text-white rounded-lg shadow-sm">
          <User className="w-7 h-7" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-slate-800">User Profile</h1>
          <p className="text-xs text-slate-500">
            Manage your account information and credentials.
          </p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8 space-y-8">
        {/* Header Profile Info */}
        <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6 pb-6 border-b border-slate-100">
          <div className="w-24 h-24 rounded-full bg-blue-100 border-4 border-white shadow-md flex items-center justify-center text-[#0F3EAB]">
            <User className="w-12 h-12" />
          </div>
          <div className="text-center md:text-left space-y-1">
            <h2 className="text-xl font-bold text-slate-800">
              {formData.name}
            </h2>
            <p className="text-sm font-semibold text-blue-600">
              {formData.course}
            </p>
            <span className="inline-block px-3 py-0.5 rounded-full text-xs font-bold bg-slate-100 text-slate-600 uppercase tracking-wider">
              Role: {currentUser.role}
            </span>
          </div>
        </div>

        {/* Profile Details Form */}
        <form onSubmit={handleSave} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-2">
                Full Name
              </label>
              <input
                type="text"
                disabled={!isEditing}
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full px-4 py-2.5 border border-slate-300 rounded-xl text-sm disabled:bg-slate-50 disabled:text-slate-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                disabled={!isEditing}
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="w-full px-4 py-2.5 border border-slate-300 rounded-xl text-sm disabled:bg-slate-50 disabled:text-slate-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-2">
                Contact Number
              </label>
              <input
                type="text"
                disabled={!isEditing}
                value={formData.contact}
                onChange={(e) =>
                  setFormData({ ...formData, contact: e.target.value })
                }
                className="w-full px-4 py-2.5 border border-slate-300 rounded-xl text-sm disabled:bg-slate-50 disabled:text-slate-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-2">
                Program / Department
              </label>
              <input
                type="text"
                disabled={!isEditing}
                value={formData.course}
                onChange={(e) =>
                  setFormData({ ...formData, course: e.target.value })
                }
                className="w-full px-4 py-2.5 border border-slate-300 rounded-xl text-sm disabled:bg-slate-50 disabled:text-slate-500"
              />
            </div>
          </div>

          <div className="flex justify-end space-x-3 pt-4 border-t border-slate-100">
            {isEditing ? (
              <>
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-5 py-2.5 border border-slate-300 text-slate-700 font-medium rounded-xl text-xs hover:bg-slate-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-xl text-xs flex items-center space-x-2 shadow-sm cursor-pointer"
                >
                  <Check className="w-4 h-4" />
                  <span>Save Changes</span>
                </button>
              </>
            ) : (
              <button
                type="button"
                onClick={() => setIsEditing(true)}
                className="px-6 py-2.5 bg-[#0F3EAB] hover:bg-blue-800 text-white font-medium rounded-xl text-xs shadow-sm cursor-pointer"
              >
                Edit Profile
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
