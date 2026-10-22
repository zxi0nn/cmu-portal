import React, { useState } from "react";
import {
  User,
  Lock,
  FileCheck,
  HelpCircle,
  Users,
  Box,
  Settings as SettingsIcon,
  LogIn,
} from "lucide-react";
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

const INITIAL_ADMIN_REQUESTS = [
  {
    id: "REQ-1001",
    studentName: "Juan Dela Cruz",
    studentId: "2023-0142",
    docType: "Certificate of Enrollment (1 copy)",
    purpose: "Scholarship Application",
    copies: 1,
    delivery: "Pick-up",
    dateRequested: "May 02, 2026",
    status: "Submitted",
    fee: 0,
  },
  {
    id: "REQ-1002",
    studentName: "Maria Santos",
    studentId: "2022-0891",
    docType: "Transcript of Records (1 copy)",
    purpose: "Employment Requirement",
    copies: 1,
    delivery: "Email",
    dateRequested: "May 05, 2026",
    status: "Processing",
    fee: 50,
  },
  {
    id: "REQ-1003",
    studentName: "Mark Reyes",
    studentId: "2023-0512",
    docType: "Certificate of Good Moral (2 copies)",
    purpose: "Transfer Application",
    copies: 2,
    delivery: "Pick-up",
    dateRequested: "May 08, 2026",
    status: "For Release",
    fee: 50,
  },
];

const INITIAL_STUDENT_RECORDS = [
  {
    id: "REC-001",
    name: "Certificate of Enrollment",
    description: "Official proof of current term enrollment for AY 2025-2026",
    dateIssued: "10/12/25",
    status: "Available",
    fileUrl: "#",
  },
  {
    id: "REC-002",
    name: "Certificate of Grades",
    description: "Certified transcript of completed semester grades",
    dateIssued: "01/15/26",
    status: "Missing",
    fileUrl: "#",
  },
  {
    id: "REC-003",
    name: "Student clearance",
    description: "Library and departmental clearance document",
    dateIssued: "02/01/26",
    status: "Available",
    fileUrl: "#",
  },
  {
    id: "REC-004",
    name: "Transcript of Records",
    description: "Official complete transcript of academic record",
    dateIssued: "Pending",
    status: "Missing",
    fileUrl: "#",
  },
  {
    id: "REC-005",
    name: "Certificate of Good Moral",
    description: "Complete academic transcript & conduct record",
    dateIssued: "02/18/26",
    status: "Processing",
    fileUrl: "#",
  },
];

function Toast({ toast }) {
  if (!toast) return null;
  return (
    <div
      className={`fixed top-4 right-4 z-50 px-4 py-3 rounded-lg shadow-lg text-white font-medium flex items-center space-x-2 ${
        toast.type === "error"
          ? "bg-red-600"
          : toast.type === "info"
            ? "bg-blue-600"
            : "bg-emerald-600"
      }`}
    >
      <FileCheck className="w-5 h-5" />
      <span>{toast.message}</span>
    </div>
  );
}

function Login({ handleLogin, showToast }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username === "student" && password === "student123") {
      handleLogin("student");
    } else if (username === "admin" && password === "admin123") {
      handleLogin("admin");
    } else {
      showToast(
        "Invalid credentials. Hint: use student/student123 or admin/admin123",
        "error",
      );
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col md:flex-row bg-slate-50 font-sans">
      <div className="md:w-1/2 bg-[#0F3EAB] text-white p-6 md:p-12 flex flex-col justify-between">
        <div className="flex items-center space-x-3 md:space-x-4">
          <img
            src="/cmu-logo.png"
            alt="CMU Logo"
            className="w-12 h-12 md:w-16 md:h-16 object-contain bg-white rounded-full p-1"
          />
          <div>
            <h1 className="text-lg md:text-3xl font-bold tracking-wide whitespace-nowrap">
              CITY OF MALABON UNIVERSITY
            </h1>
          </div>
        </div>
        <div className="my-8 md:my-12">
          <h2 className="text-xl md:text-3xl font-bold leading-snug mb-3">
            Student Document & Records Management System
          </h2>
          <p className="text-blue-200 text-xs md:text-sm">
            Official Web-Based Portal for Student Clearances, Document Requests,
            and Academic Records.
          </p>
        </div>
        <div className="grid grid-cols-3 gap-2 border-t border-blue-600/40 pt-4 text-center text-xs text-blue-200">
          <div>Digital Records</div>
          <div>Secure Tracking</div>
          <div>Fee Transparency</div>
        </div>
      </div>

      <div className="md:w-1/2 flex items-center justify-center p-6 bg-white">
        <div className="w-full max-w-md border border-slate-200 rounded-2xl p-6 md:p-8 shadow-sm">
          <h2 className="text-xl font-bold text-slate-800 text-center mb-6">
            PORTAL LOGIN
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <User className="absolute top-2.5 left-3 w-5 h-5 text-slate-400" />
              <input
                type="text"
                placeholder="Username (student / admin)"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="w-full pl-10 pr-4 py-2.5 border border-slate-300 rounded-full text-sm focus:outline-none focus:ring-1 focus:ring-blue-600"
              />
            </div>
            <div className="relative">
              <Lock className="absolute top-2.5 left-3 w-5 h-5 text-slate-400" />
              <input
                type="password"
                placeholder="Password (student123 / admin123)"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full pl-10 pr-4 py-2.5 border border-slate-300 rounded-full text-sm focus:outline-none focus:ring-1 focus:ring-blue-600"
              />
            </div>
            <div className="pt-2">
              <button
                type="submit"
                className="w-full bg-[#0F3EAB] hover:bg-blue-800 text-white font-medium py-3 rounded-xl flex items-center justify-center space-x-2 transition cursor-pointer"
              >
                <LogIn className="w-5 h-5" />
                <span>Login to Portal</span>
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
  const [activeView, setActiveView] = useState("student-home");
  const [recordsTab, setRecordsTab] = useState("Academic Records");
  const [adminTabFilter, setAdminTabFilter] = useState("All Requests");
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const [studentRecords, setStudentRecords] = useState(INITIAL_STUDENT_RECORDS);
  const [adminRequests, setAdminRequests] = useState(INITIAL_ADMIN_REQUESTS);
  const [toast, setToast] = useState(null);

  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };

  const handleLogin = (role) => {
    if (role === "student") {
      setCurrentUser({
        name: "Juan Dela Cruz",
        course: "BSIT",
        role: "student",
      });
      setActiveView("student-home");
    } else {
      setCurrentUser({
        name: "Admin Staff",
        course: "Registrar Admin",
        role: "admin",
      });
      setActiveView("admin-home");
    }
  };

  const handleCreateRequest = (requestData) => {
    const newId = `REQ-${Math.floor(1000 + Math.random() * 9000)}`;
    const newRequest = {
      id: newId,
      studentName: currentUser?.name || "Juan Dela Cruz",
      studentId: "2023-0142",
      docType: requestData.docType,
      purpose: requestData.purpose,
      copies: requestData.copies,
      delivery: requestData.delivery,
      fee: requestData.fee,
      dateRequested: "Just Now",
      status: "Submitted", // Updated status name
      clearanceFile: requestData.clearanceFile,
    };

    setAdminRequests((prev) => [newRequest, ...prev]);

    setStudentRecords((prev) => [
      {
        id: newId,
        name: requestData.docType,
        description: `Requested for ${requestData.purpose}`,
        dateIssued: "Pending",
        status: "Processing",
        fileUrl: "#",
      },
      ...prev,
    ]);

    showToast(
      `Request submitted! Total Fee: ${requestData.fee === 0 ? "FREE (1st Request)" : `₱${requestData.fee}.00`}`,
    );
    setActiveView("track-requests");
  };

  const handleCancelRequest = (reqId) => {
    setAdminRequests((prev) =>
      prev.map((item) =>
        item.id === reqId ? { ...item, status: "Cancelled" } : item,
      ),
    );
    showToast(`Request ${reqId} has been cancelled successfully.`, "info");
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans text-slate-800">
      <Toast toast={toast} />
      {!currentUser ? (
        <Login handleLogin={handleLogin} showToast={showToast} />
      ) : (
        <>
          <Navbar
            currentUser={currentUser}
            setActiveView={setActiveView}
            isMobileOpen={isMobileOpen}
            setIsMobileOpen={setIsMobileOpen}
          />
          <div className="flex-1 flex overflow-hidden relative">
            <Sidebar
              currentUser={currentUser}
              activeView={activeView}
              setActiveView={setActiveView}
              recordsTab={recordsTab}
              setRecordsTab={setRecordsTab}
              adminTabFilter={adminTabFilter}
              setAdminTabFilter={setAdminTabFilter}
              handleLogout={() => setCurrentUser(null)}
              isMobileOpen={isMobileOpen}
              setIsMobileOpen={setIsMobileOpen}
            />
            <main className="flex-1 w-full min-w-0 bg-slate-100 p-4 md:p-8 overflow-y-auto">
              {activeView === "student-home" && (
                <StudentDashboard
                  currentUser={currentUser}
                  adminRequests={adminRequests}
                />
              )}
              {activeView === "admin-home" && (
                <AdminDashboard adminRequests={adminRequests} />
              )}

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
                  onSubmitRequest={handleCreateRequest}
                  adminRequests={adminRequests}
                  showToast={showToast}
                />
              )}

              {activeView === "admin-requests" && (
                <AdminPortal
                  adminRequests={adminRequests}
                  setAdminRequests={setAdminRequests}
                  adminTabFilter={adminTabFilter}
                  setAdminTabFilter={setAdminTabFilter}
                  showToast={showToast}
                />
              )}

              {activeView === "track-requests" && (
                <TrackRequests
                  adminRequests={adminRequests}
                  onCancelRequest={handleCancelRequest}
                />
              )}

              {activeView === "announcements" && <Announcements />}
              {activeView === "profile" && (
                <Profile currentUser={currentUser} showToast={showToast} />
              )}
              {activeView === "help" && (
                <PlaceholderView
                  title="Help & Support"
                  icon={HelpCircle}
                  desc="Contact the Registrar's Office at registrar@cmu.edu.ph for assistance."
                />
              )}
              {activeView === "admin-students" && (
                <PlaceholderView
                  title="Student Masterlist Records"
                  icon={Users}
                  desc="Student directory and academic profiles management."
                />
              )}
              {activeView === "admin-inventory" && (
                <PlaceholderView
                  title="Document Inventory Management"
                  icon={Box}
                  desc="Manage document catalog and requirement forms."
                />
              )}
              {activeView === "settings" && (
                <PlaceholderView
                  title="Account & Portal Settings"
                  icon={SettingsIcon}
                  desc="Update system security and user preferences."
                />
              )}
            </main>
          </div>
        </>
      )}
    </div>
  );
}
