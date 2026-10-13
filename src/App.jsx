import React, { useState } from "react";
import {
  User,
  Lock,
  Shield,
  LogOut,
  FileCheck,
  HelpCircle,
  Users,
  Box,
  Settings as SettingsIcon,
} from "lucide-react";

import {
  INITIAL_STUDENT_RECORDS,
  INITIAL_ADMIN_REQUESTS,
} from "./data/mockData";
import { Navbar, Sidebar } from "./components/Navigation";
import StudentRecords from "./components/StudentRecords";
import DocumentRequest from "./components/DocumentRequest";
import AdminPortal from "./components/AdminPortal";
import Profile from "./components/Profile";
import {
  StudentDashboard,
  AdminDashboard,
  Announcements,
  TrackRequests,
  PlaceholderView,
} from "./components/ExtraViews";

function Toast({ toast }) {
  if (!toast) return null;
  return (
    <div
      className={`fixed top-4 right-4 z-50 px-4 py-3 rounded-lg shadow-lg text-white font-medium flex items-center space-x-2 ${toast.type === "error" ? "bg-red-600" : toast.type === "info" ? "bg-blue-600" : "bg-emerald-600"}`}
    >
      <FileCheck className="w-5 h-5" />
      <span>{toast.message}</span>
    </div>
  );
}

function Login({ handleLogin }) {
  return (
    <div className="min-h-screen w-full flex flex-col md:flex-row bg-slate-50 font-sans">
      <div className="md:w-1/2 bg-[#0F3EAB] text-white p-8 md:p-12 flex flex-col justify-between relative">
        <div className="flex items-center space-x-4 z-10">
          <img
            src="/cmu-logo.png"
            alt="CMU Logo"
            className="w-16 h-16 object-contain drop-shadow-md bg-white rounded-full p-1"
          />
          <div>
            <h1 className="text-2xl font-bold tracking-wide">
              CITY OF MALABON
            </h1>
            <h1 className="text-2xl font-bold tracking-wide -mt-1">
              UNIVERSITY
            </h1>
          </div>
        </div>
        <div className="my-12 z-10">
          <h2 className="text-2xl md:text-3xl font-bold leading-snug mb-3">
            Student Document & Records Management System
          </h2>
        </div>
      </div>
      <div className="md:w-1/2 flex items-center justify-center p-6 bg-white">
        <div className="w-full max-w-md border border-slate-200 rounded-2xl p-8 shadow-sm">
          <h2 className="text-xl font-bold text-slate-800 text-center mb-6">
            PORTAL LOGIN
          </h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleLogin("student");
            }}
            className="space-y-4"
          >
            <div className="relative">
              <User className="absolute top-2.5 left-3 w-5 h-5 text-slate-400" />
              <input
                type="text"
                placeholder="Username"
                defaultValue="student_2023"
                required
                className="w-full pl-10 pr-4 py-2.5 border rounded-full text-sm"
              />
            </div>
            <div className="relative">
              <Lock className="absolute top-2.5 left-3 w-5 h-5 text-slate-400" />
              <input
                type="password"
                placeholder="Password"
                defaultValue="••••••••"
                required
                className="w-full pl-10 pr-4 py-2.5 border rounded-full text-sm"
              />
            </div>
            <div className="pt-2 space-y-3">
              <button
                type="submit"
                className="w-full bg-[#0F3EAB] hover:bg-blue-800 text-white font-medium py-3 rounded-xl flex justify-center space-x-2 transition cursor-pointer"
              >
                <LogOut className="w-5 h-5 rotate-180" />
                <span>Login as Student</span>
              </button>
              <button
                type="button"
                onClick={() => handleLogin("admin")}
                className="w-full bg-slate-800 hover:bg-slate-900 text-white font-medium py-3 rounded-xl flex justify-center space-x-2 transition cursor-pointer"
              >
                <Shield className="w-5 h-5 text-amber-400" />
                <span>Login as Registrar Admin</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [activeView, setActiveView] = useState("my-records");
  const [recordsTab, setRecordsTab] = useState("Academic Records");
  const [studentRecords, setStudentRecords] = useState(INITIAL_STUDENT_RECORDS);
  const [adminRequests, setAdminRequests] = useState(INITIAL_ADMIN_REQUESTS);
  const [toast, setToast] = useState(null);

  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };

  const handleLogin = (role) => {
    setCurrentUser(
      role === "student"
        ? { name: "Juan Dela Cruz", course: "BSIT", role: "student" }
        : { name: "Admin Staff", course: "Registrar Admin", role: "admin" },
    );
    setActiveView(role === "student" ? "student-home" : "admin-home");
  };

  if (!currentUser) return <Login handleLogin={handleLogin} />;

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans text-slate-800">
      <Toast toast={toast} />
      <Navbar currentUser={currentUser} setActiveView={setActiveView} />

      <div className="flex-1 flex overflow-hidden">
        <Sidebar
          currentUser={currentUser}
          activeView={activeView}
          setActiveView={setActiveView}
          handleLogout={() => setCurrentUser(null)}
        />

        <main className="flex-1 p-6 md:p-8 overflow-y-auto">
          {activeView === "my-records" && (
            <StudentRecords
              studentRecords={studentRecords}
              recordsTab={recordsTab}
              setRecordsTab={setRecordsTab}
              showToast={showToast}
            />
          )}
          {activeView === "document-request" && (
            <DocumentRequest
              setActiveView={setActiveView}
              adminRequests={adminRequests}
              setAdminRequests={setAdminRequests}
              showToast={showToast}
            />
          )}
          {activeView === "admin-requests" && (
            <AdminPortal
              adminRequests={adminRequests}
              setAdminRequests={setAdminRequests}
              showToast={showToast}
            />
          )}
          {activeView === "profile" && (
            <Profile currentUser={currentUser} showToast={showToast} />
          )}

          {activeView === "student-home" && (
            <StudentDashboard
              currentUser={currentUser}
              adminRequests={adminRequests}
            />
          )}
          {activeView === "admin-home" && (
            <AdminDashboard adminRequests={adminRequests} />
          )}
          {activeView === "announcements" && <Announcements />}
          {activeView === "track-requests" && (
            <TrackRequests adminRequests={adminRequests} />
          )}

          {activeView === "help" && (
            <PlaceholderView
              title="Help & Support"
              icon={HelpCircle}
              desc="Contact the Registrar's Office at registrar@cmu.edu.ph or call (02) 8123-4567 for assistance."
            />
          )}
          {activeView === "admin-students" && (
            <PlaceholderView
              title="Student Masterlist"
              icon={Users}
              desc="Database integration required to view the full student directory."
            />
          )}
          {activeView === "admin-inventory" && (
            <PlaceholderView
              title="Document Inventory"
              icon={Box}
              desc="Manage document types, physical stock, and catalog requirements."
            />
          )}
          {activeView === "settings" && (
            <PlaceholderView
              title="Account Settings"
              icon={SettingsIcon}
              desc="Update your password, notification preferences, and profile details here."
            />
          )}
        </main>
      </div>
    </div>
  );
}
