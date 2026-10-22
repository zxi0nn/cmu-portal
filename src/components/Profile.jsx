import React, { useState, useEffect } from "react";
import {
  User,
  Mail,
  Phone,
  MapPin,
  BookOpen,
  Save,
  ShieldCheck,
} from "lucide-react";

export default function Profile({ currentUser, onUpdateProfile, showToast }) {
  const [formData, setFormData] = useState({
    name: currentUser?.name || "Juan Dela Cruz",
    course: currentUser?.course || "BSIT",
    studentId: currentUser?.studentId || "2023-0142",
    email: currentUser?.email || "juan.delacruz@cmu.edu.ph",
    phone: currentUser?.phone || "09123456789",
    address: currentUser?.address || "Malabon City, Philippines",
    yearLevel: currentUser?.yearLevel || "3rd Year",
  });

  // Sync state whenever parent currentUser state is updated
  useEffect(() => {
    if (currentUser) {
      setFormData((prev) => ({
        ...prev,
        ...currentUser,
      }));
    }
  }, [currentUser]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onUpdateProfile) {
      onUpdateProfile(formData);
    }
    showToast("Profile changes saved successfully!");
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
            Manage and update your personal and contact details.
          </p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 md:p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex items-center space-x-4 border-b border-slate-200 pb-6">
            <div className="w-16 h-16 rounded-full bg-blue-100 text-[#0F3EAB] flex items-center justify-center font-bold text-xl border-2 border-blue-200">
              {formData.name ? formData.name.charAt(0) : "U"}
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-800">
                {formData.name}
              </h2>
              <span className="text-xs text-blue-800 bg-blue-50 px-2.5 py-0.5 rounded-full font-semibold border border-blue-200">
                {currentUser?.role === "admin"
                  ? "Registrar Administrator"
                  : `${formData.course} • ${formData.yearLevel}`}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Full Name
              </label>
              <div className="relative">
                <User className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full pl-9 pr-4 py-2 border border-slate-300 rounded-xl text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-600"
                />
              </div>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Student ID / Admin ID
              </label>
              <div className="relative">
                <ShieldCheck className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
                <input
                  type="text"
                  name="studentId"
                  value={formData.studentId}
                  onChange={handleChange}
                  required
                  className="w-full pl-9 pr-4 py-2 border border-slate-300 rounded-xl text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-600"
                />
              </div>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Program / Course
              </label>
              <div className="relative">
                <BookOpen className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
                <input
                  type="text"
                  name="course"
                  value={formData.course}
                  onChange={handleChange}
                  required
                  className="w-full pl-9 pr-4 py-2 border border-slate-300 rounded-xl text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-600"
                />
              </div>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full pl-9 pr-4 py-2 border border-slate-300 rounded-xl text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-600"
                />
              </div>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Contact Number
              </label>
              <div className="relative">
                <Phone className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full pl-9 pr-4 py-2 border border-slate-300 rounded-xl text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-600"
                />
              </div>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Home Address
              </label>
              <div className="relative">
                <MapPin className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                  className="w-full pl-9 pr-4 py-2 border border-slate-300 rounded-xl text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-600"
                />
              </div>
            </div>
          </div>

          <div className="pt-4 flex justify-end">
            <button
              type="submit"
              className="px-6 py-2.5 bg-[#0F3EAB] hover:bg-blue-800 text-white font-bold rounded-xl text-xs flex items-center space-x-2 shadow-md transition cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>Save Profile Changes</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
