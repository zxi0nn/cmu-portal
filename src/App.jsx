import React, { useState } from "react";
import {
  FileText,
  Shield,
  Search,
  Filter,
  Bell,
  Download,
  Eye,
  Upload,
  Plus,
  Minus,
  LogOut,
  Home,
  Folder,
  ClipboardList,
  Megaphone,
  HelpCircle,
  Users,
  Box,
  TrendingUp,
  ChevronDown,
  User,
  Lock,
  X,
  FileCheck,
} from "lucide-react";

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

const INITIAL_ADMIN_REQUESTS = [
  {
    id: "REQ-1001",
    studentName: "Juan Dela Cruz",
    studentId: "2023-0142",
    docType: "Certificate of Enrollment",
    purpose: "Scholarship Application",
    copies: 2,
    delivery: "Pick-up",
    dateRequested: "May 02, 2026",
    status: "Submits",
  },
  {
    id: "REQ-1002",
    studentName: "Maria Santos",
    studentId: "2022-0891",
    docType: "Transcript of Records",
    purpose: "Employment Requirement",
    copies: 1,
    delivery: "Email",
    dateRequested: "May 05, 2026",
    status: "For Release",
  },
  {
    id: "REQ-1003",
    studentName: "Mark Reyes",
    studentId: "2023-0512",
    docType: "Certificate of Good Moral",
    purpose: "Transfer Application",
    copies: 3,
    delivery: "Pick-up",
    dateRequested: "May 08, 2026",
    status: "Released",
  },
  {
    id: "REQ-1004",
    studentName: "Angela Castro",
    studentId: "2021-0034",
    docType: "Certificate of Grades",
    purpose: "Board Exam Requirement",
    copies: 1,
    delivery: "Email",
    dateRequested: "May 10, 2026",
    status: "Submits",
  },
  {
    id: "REQ-1005",
    studentName: "Gabriel Mendoza",
    studentId: "2024-0012",
    docType: "Student clearance",
    purpose: "Personal Copy",
    copies: 1,
    delivery: "Pick-up",
    dateRequested: "May 12, 2026",
    status: "Cancelled",
  },
];

function Toast({ toast }) {
  if (!toast) return null;

  return (
    <div
      className={`fixed top-4 right-4 z-50 px-4 py-3 rounded-lg shadow-lg text-white font-medium flex items-center space-x-2 transition-all transform translate-y-0 ${
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

function Navbar({ currentUser }) {
  return (
    <header className="bg-[#0F3EAB] text-white h-16 flex items-center justify-between px-6 shadow-md z-20">
      <div className="flex items-center space-x-4">
        <div className="w-10 h-10 rounded-full bg-white p-0.5 flex items-center justify-center shadow">
          <div className="w-full h-full rounded-full bg-gradient-to-b from-sky-300 via-green-400 to-green-600 flex items-center justify-center text-[10px] font-bold text-blue-900">
            CMU
          </div>
        </div>
        <div>
          <h1 className="text-base font-bold tracking-tight leading-none">
            CITY OF MALABON
          </h1>
          <p className="text-xs font-semibold tracking-wider text-blue-200 mt-0.5">
            UNIVERSITY
          </p>
        </div>
        <div className="hidden sm:flex items-center pl-4 border-l border-blue-600/50">
          <span className="text-sm font-light text-blue-100">
            {currentUser.role === "student"
              ? "Student Portal"
              : "Registrar Portal"}
          </span>
        </div>
      </div>

      <div className="flex items-center space-x-5">
        <button className="relative text-blue-100 hover:text-white p-1 rounded-full transition cursor-pointer">
          <Bell className="w-6 h-6" />
          <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full ring-2 ring-[#0F3EAB]" />
        </button>

        <div className="flex items-center space-x-3 border-l border-blue-600/50 pl-4">
          <div className="w-9 h-9 rounded-full bg-white/20 p-0.5 overflow-hidden">
            <div className="w-full h-full rounded-full bg-sky-200 flex items-center justify-center">
              <User className="w-5 h-5 text-blue-900" />
            </div>
          </div>
          <div className="text-left hidden md:block">
            <div className="text-sm font-bold leading-tight">
              {currentUser.name}
            </div>
            <div className="text-xs text-blue-200">{currentUser.course}</div>
          </div>
          <ChevronDown className="w-4 h-4 text-blue-200" />
        </div>
      </div>
    </header>
  );
}

function Sidebar({
  currentUser,
  activeView,
  setActiveView,
  recordsTab,
  setRecordsTab,
  adminTabFilter,
  setAdminTabFilter,
  handleLogout,
  showToast,
}) {
  return (
    <aside className="w-64 bg-[#0F3EAB] text-white flex flex-col justify-between py-6 px-3 border-t border-blue-700/40 select-none">
      <nav className="space-y-1">
        {currentUser.role === "student" ? (
          <>
            <button
              onClick={() => setActiveView("home")}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition cursor-pointer ${
                activeView === "home"
                  ? "bg-blue-700/80 text-white"
                  : "text-blue-100 hover:bg-blue-800/50"
              }`}
            >
              <Home className="w-5 h-5" />
              <span>Home</span>
            </button>

            <div>
              <button
                onClick={() => setActiveView("my-records")}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-lg text-sm font-medium transition cursor-pointer ${
                  activeView === "my-records"
                    ? "bg-blue-700/80 text-white"
                    : "text-blue-100 hover:bg-blue-800/50"
                }`}
              >
                <div className="flex items-center space-x-3">
                  <Folder className="w-5 h-5" />
                  <span>My records</span>
                </div>
                <ChevronDown className="w-4 h-4" />
              </button>

              {activeView === "my-records" && (
                <div className="pl-11 pr-2 py-1 space-y-1">
                  {[
                    "Enrollment records",
                    "Academic Records",
                    "Personal information",
                  ].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setRecordsTab(tab)}
                      className={`w-full text-left py-1.5 px-2 text-xs rounded transition cursor-pointer ${
                        recordsTab === tab
                          ? "text-white font-semibold"
                          : "text-blue-200 hover:text-white"
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button
              onClick={() => setActiveView("document-request")}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition cursor-pointer ${
                activeView === "document-request"
                  ? "bg-blue-700/80 text-white"
                  : "text-blue-100 hover:bg-blue-800/50"
              }`}
            >
              <ClipboardList className="w-5 h-5" />
              <span>Document request</span>
            </button>

            <button
              onClick={() =>
                showToast("Announcements feature coming soon", "info")
              }
              className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium text-blue-100 hover:bg-blue-800/50 transition cursor-pointer"
            >
              <Megaphone className="w-5 h-5" />
              <span>Announcement</span>
            </button>

            <button
              onClick={() =>
                showToast("Help & Support line: registrar@cmu.edu.ph", "info")
              }
              className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium text-blue-100 hover:bg-blue-800/50 transition cursor-pointer"
            >
              <HelpCircle className="w-5 h-5" />
              <span>Help & support</span>
            </button>
          </>
        ) : (
          <>
            <div>
              <button
                onClick={() => setActiveView("admin-requests")}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-lg text-sm font-medium transition cursor-pointer ${
                  activeView === "admin-requests"
                    ? "bg-blue-700/80 text-white"
                    : "text-blue-100 hover:bg-blue-800/50"
                }`}
              >
                <div className="flex items-center space-x-3">
                  <ClipboardList className="w-5 h-5" />
                  <span>Document Requests</span>
                </div>
                <ChevronDown className="w-4 h-4" />
              </button>

              <div className="pl-11 pr-2 py-1 space-y-1">
                {[
                  "All Requests",
                  "Submits",
                  "For Release",
                  "Released",
                  "Cancelled",
                ].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => {
                      setAdminTabFilter(tab);
                      setActiveView("admin-requests");
                    }}
                    className={`w-full text-left py-1.5 px-2 text-xs rounded transition cursor-pointer ${
                      adminTabFilter === tab
                        ? "text-white font-bold"
                        : "text-blue-200 hover:text-white"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={() => showToast("Students Records view active", "info")}
              className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium text-blue-100 hover:bg-blue-800/50 transition cursor-pointer"
            >
              <Users className="w-5 h-5" />
              <span>Students Records</span>
            </button>

            <button
              onClick={() => showToast("Document Inventory active", "info")}
              className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium text-blue-100 hover:bg-blue-800/50 transition cursor-pointer"
            >
              <Box className="w-5 h-5" />
              <span>Document Inventory</span>
            </button>

            <button
              onClick={() => showToast("Monitoring & Tracking active", "info")}
              className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium text-blue-100 hover:bg-blue-800/50 transition cursor-pointer"
            >
              <TrendingUp className="w-5 h-5" />
              <span>Monitoring & Tracking</span>
            </button>
          </>
        )}
      </nav>

      <div className="pt-6 border-t border-blue-700/50">
        <button
          onClick={handleLogout}
          className="w-full flex items-center space-x-3 px-4 py-2.5 rounded-lg text-sm font-medium text-blue-100 hover:bg-blue-800 transition cursor-pointer"
        >
          <LogOut className="w-5 h-5" />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}

function Login({ handleLogin }) {
  return (
    <div className="min-h-screen w-full flex flex-col md:flex-row bg-slate-50 font-sans">
      <div className="md:w-1/2 bg-[#0F3EAB] text-white p-8 md:p-12 flex flex-col justify-between relative overflow-hidden">
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 rounded-full bg-white/5 pointer-events-none" />
        <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-80 h-80 rounded-full bg-white/5 pointer-events-none" />

        <div className="flex items-center space-x-4 z-10">
          <div className="w-16 h-16 rounded-full bg-white p-1 flex items-center justify-center shadow-md">
            <div className="w-full h-full rounded-full bg-gradient-to-b from-sky-300 via-green-400 to-green-600 flex items-center justify-center text-xs font-bold text-white overflow-hidden relative">
              <span className="text-blue-900 font-extrabold text-lg">CMU</span>
            </div>
          </div>
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
            Student Document & Records Monitoring and Management System
          </h2>
          <p className="text-blue-200 text-sm md:text-base max-w-md">
            A Web-Based Portal for the Registrar's Office of City of Malabon
            University
          </p>

          <div className="grid grid-cols-3 gap-4 mt-12 max-w-md">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-blue-700/60 border border-blue-400/30 flex items-center justify-center mb-3 shadow-inner">
                <FileText className="w-8 h-8 text-white" />
              </div>
              <span className="text-xs font-medium leading-tight">
                Digital Records
              </span>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-blue-700/60 border border-blue-400/30 flex items-center justify-center mb-3 shadow-inner">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <span className="text-xs font-medium leading-tight">
                Secure & reliable
              </span>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-blue-700/60 border border-blue-400/30 flex items-center justify-center mb-3 shadow-inner">
                <Search className="w-8 h-8 text-white" />
              </div>
              <span className="text-xs font-medium leading-tight">
                Fast Tracking
              </span>
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-blue-600/40 text-xs text-blue-200 font-medium tracking-wider flex justify-center space-x-6 z-10">
          <span>Transparency</span>
          <span>•</span>
          <span>Efficiency</span>
          <span>•</span>
          <span>Accessibility</span>
        </div>
      </div>

      <div className="md:w-1/2 flex items-center justify-center p-6 md:p-12 bg-white">
        <div className="w-full max-w-md border border-slate-200 rounded-2xl p-8 shadow-sm">
          <div className="flex flex-col items-center mb-6">
            <div className="w-20 h-20 rounded-full bg-white border-2 border-slate-200 p-1 mb-4 flex items-center justify-center shadow-sm">
              <div className="w-full h-full rounded-full bg-gradient-to-b from-sky-200 via-emerald-300 to-green-500 flex items-center justify-center">
                <User className="w-10 h-10 text-slate-700 opacity-60" />
              </div>
            </div>
            <h2 className="text-xl font-bold text-slate-800 tracking-wider">
              LOGIN
            </h2>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleLogin("student");
            }}
            className="space-y-4"
          >
            <div>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-slate-400">
                  <User className="w-5 h-5" />
                </span>
                <input
                  type="text"
                  placeholder="Username"
                  defaultValue="student_2023"
                  required
                  className="w-full pl-10 pr-4 py-2.5 border border-slate-300 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-slate-400">
                  <Lock className="w-5 h-5" />
                </span>
                <input
                  type="password"
                  placeholder="Password"
                  defaultValue="••••••••"
                  required
                  className="w-full pl-10 pr-4 py-2.5 border border-slate-300 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                />
              </div>
            </div>

            <div className="pt-2 space-y-3">
              <button
                type="submit"
                className="w-full bg-[#0F3EAB] hover:bg-blue-800 text-white font-medium py-3 px-4 rounded-xl flex items-center justify-center space-x-2 transition shadow-md hover:shadow-lg cursor-pointer"
              >
                <LogOut className="w-5 h-5 rotate-180" />
                <span>Login as Student</span>
              </button>

              <button
                type="button"
                onClick={() => handleLogin("admin")}
                className="w-full bg-slate-800 hover:bg-slate-900 text-white font-medium py-3 px-4 rounded-xl flex items-center justify-center space-x-2 transition shadow-md cursor-pointer"
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

function StudentRecords({
  studentRecords,
  recordsTab,
  setRecordsTab,
  showToast,
}) {
  const [recordSearch, setRecordSearch] = useState("");

  const filteredStudentRecords = studentRecords.filter(
    (rec) =>
      rec.name.toLowerCase().includes(recordSearch.toLowerCase()) ||
      rec.description.toLowerCase().includes(recordSearch.toLowerCase()),
  );

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <div className="p-3 bg-[#0F3EAB] text-white rounded-lg shadow-sm">
            <Folder className="w-7 h-7" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-800">My Records</h1>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <div className="relative w-64 md:w-80">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
              <Search className="w-4 h-4" />
            </span>
            <input
              type="text"
              value={recordSearch}
              onChange={(e) => setRecordSearch(e.target.value)}
              placeholder="Find records, documents, files"
              className="w-full pl-9 pr-4 py-1.5 bg-white border border-slate-300 rounded-full text-xs focus:outline-none focus:ring-1 focus:ring-blue-600"
            />
          </div>
          <button className="flex items-center space-x-1.5 px-3 py-1.5 bg-white border border-slate-300 rounded-full text-xs font-medium text-slate-600 hover:bg-slate-50 cursor-pointer">
            <Filter className="w-3.5 h-3.5" />
            <span>Filter</span>
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
        <div className="flex border-b border-slate-200 mb-6">
          {[
            "Enrollment records",
            "Academic Records",
            "Personal information",
          ].map((tab) => (
            <button
              key={tab}
              onClick={() => setRecordsTab(tab)}
              className={`pb-3 px-6 text-sm font-semibold transition relative cursor-pointer ${
                recordsTab === tab
                  ? "text-[#0F3EAB]"
                  : "text-slate-500 hover:text-slate-700"
              }`}
            >
              {tab}
              {recordsTab === tab && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#0F3EAB]" />
              )}
            </button>
          ))}
        </div>

        {recordsTab === "Academic Records" ? (
          <div>
            <div className="mb-4">
              <h2 className="text-lg font-bold text-slate-800">
                My Academic Documents
              </h2>
              <p className="text-xs text-slate-500">
                View and download your official academic records.
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 text-xs font-semibold text-slate-600">
                    <th className="py-3 px-4">Document Name</th>
                    <th className="py-3 px-4">Description</th>
                    <th className="py-3 px-4">Date issued</th>
                    <th className="py-3 px-4 text-center">Status</th>
                    <th className="py-3 px-4 text-center">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-sm">
                  {filteredStudentRecords.map((doc) => (
                    <tr
                      key={doc.id}
                      className="hover:bg-slate-50/80 transition"
                    >
                      <td className="py-3.5 px-4 font-medium text-slate-800">
                        {doc.name}
                      </td>
                      <td className="py-3.5 px-4 text-slate-500 text-xs max-w-xs">
                        {doc.description}
                      </td>
                      <td className="py-3.5 px-4 text-slate-600 text-xs whitespace-nowrap">
                        {doc.dateIssued}
                      </td>
                      <td className="py-3.5 px-4 text-center">
                        <span
                          className={`inline-flex items-center px-3 py-0.5 rounded-full text-xs font-semibold ${
                            doc.status === "Available"
                              ? "bg-emerald-500 text-white"
                              : doc.status === "Missing"
                                ? "bg-red-500 text-white"
                                : "bg-amber-500 text-white"
                          }`}
                        >
                          {doc.status}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-center">
                        <div className="flex items-center justify-center space-x-2 text-slate-400">
                          {doc.status === "Available" ? (
                            <>
                              <button
                                onClick={() =>
                                  showToast(`Downloading ${doc.name}...`)
                                }
                                className="hover:text-blue-600 transition cursor-pointer"
                                title="Download"
                              >
                                <Download className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() =>
                                  showToast(`Previewing ${doc.name}`)
                                }
                                className="hover:text-blue-600 transition cursor-pointer"
                                title="View"
                              >
                                <Eye className="w-4 h-4" />
                              </button>
                            </>
                          ) : (
                            <button
                              onClick={() =>
                                showToast(
                                  `Upload missing document feature triggered`,
                                  "info",
                                )
                              }
                              className="hover:text-blue-600 transition cursor-pointer"
                              title="Upload proof"
                            >
                              <Upload className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 flex justify-start">
              <button
                onClick={() => showToast("Displaying full archive list")}
                className="text-xs font-semibold text-slate-600 hover:text-blue-700 flex items-center space-x-1 cursor-pointer"
              >
                <span>View all documents</span>
                <span>→</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="py-12 text-center text-slate-400">
            <p className="text-sm font-medium">
              No records found for tab "{recordsTab}".
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

function DocumentRequest({
  setActiveView,
  adminRequests,
  setAdminRequests,
  studentRecords,
  setStudentRecords,
  showToast,
}) {
  const [requestForm, setRequestForm] = useState({
    docType: "",
    purpose: "",
    copies: 1,
    delivery: "Pick-up",
  });

  const handleCreateRequest = (e) => {
    e.preventDefault();
    if (!requestForm.docType || !requestForm.purpose) {
      showToast("Please fill out all required fields.", "error");
      return;
    }

    const newRequest = {
      id: `REQ-${Math.floor(1000 + Math.random() * 9000)}`,
      studentName: "Juan Dela Cruz",
      studentId: "2023-0142",
      docType: requestForm.docType,
      purpose: requestForm.purpose,
      copies: requestForm.copies,
      delivery: requestForm.delivery,
      dateRequested: "Just Now",
      status: "Submits",
    };

    setAdminRequests([newRequest, ...adminRequests]);

    setStudentRecords([
      {
        id: newRequest.id,
        name: newRequest.docType,
        description: `Requested for ${newRequest.purpose}`,
        dateIssued: "Pending",
        status: "Processing",
        fileUrl: "#",
      },
      ...studentRecords,
    ]);

    setRequestForm({
      docType: "",
      purpose: "",
      copies: 1,
      delivery: "Pick-up",
    });
    showToast("Document request submitted successfully!");
    setActiveView("my-records");
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-3 bg-[#0F3EAB] text-white rounded-lg shadow-sm">
            <ClipboardList className="w-7 h-7" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-800">
              Document Request
            </h1>
            <p className="text-xs text-slate-500">
              A request for official documents and track its status.
            </p>
          </div>
        </div>

        <button
          onClick={() => setActiveView("my-records")}
          className="flex items-center space-x-1.5 px-3 py-1.5 bg-white border border-slate-300 rounded-full text-xs font-medium text-slate-700 hover:bg-slate-50 shadow-sm cursor-pointer"
        >
          <ClipboardList className="w-3.5 h-3.5" />
          <span>View my requests</span>
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 md:p-8">
        <div className="mb-6">
          <h2 className="text-lg font-bold text-slate-800">
            Request New Document
          </h2>
          <p className="text-xs text-slate-500">
            Fill out the form below to request an official document.
          </p>
        </div>

        <form onSubmit={handleCreateRequest} className="space-y-5">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Document Type <span className="text-red-500">*</span>
            </label>
            <select
              value={requestForm.docType}
              onChange={(e) =>
                setRequestForm({ ...requestForm, docType: e.target.value })
              }
              className="w-full px-4 py-2 bg-white border border-slate-300 rounded-full text-xs text-slate-700 focus:outline-none focus:ring-1 focus:ring-blue-600"
            >
              <option value="">-- Select Document type --</option>
              <option value="Certificate of Enrollment">
                Certificate of Enrollment
              </option>
              <option value="Certificate of Grades">
                Certificate of Grades
              </option>
              <option value="Student clearance">Student clearance</option>
              <option value="Transcript of Records">
                Transcript of Records
              </option>
              <option value="Certificate of Good Moral">
                Certificate of Good Moral
              </option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Purpose <span className="text-red-500">*</span>
            </label>
            <select
              value={requestForm.purpose}
              onChange={(e) =>
                setRequestForm({ ...requestForm, purpose: e.target.value })
              }
              className="w-full px-4 py-2 bg-white border border-slate-300 rounded-full text-xs text-slate-700 focus:outline-none focus:ring-1 focus:ring-blue-600"
            >
              <option value="">-- Select Purpose --</option>
              <option value="Scholarship Application">
                Scholarship Application
              </option>
              <option value="Employment Requirement">
                Employment Requirement
              </option>
              <option value="Board Exam Requirement">
                Board Exam Requirement
              </option>
              <option value="Transfer Application">Transfer Application</option>
              <option value="Personal Copy">Personal Copy</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Number of Copy(ies) <span className="text-red-500">*</span>
            </label>
            <div className="inline-flex items-center border border-slate-300 rounded-lg overflow-hidden bg-white">
              <button
                type="button"
                onClick={() =>
                  setRequestForm((prev) => ({
                    ...prev,
                    copies: Math.max(1, prev.copies - 1),
                  }))
                }
                className="px-3 py-1.5 text-slate-600 hover:bg-slate-100 transition cursor-pointer"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <span className="px-4 py-1 text-xs font-semibold text-slate-800">
                {requestForm.copies}
              </span>
              <button
                type="button"
                onClick={() =>
                  setRequestForm((prev) => ({
                    ...prev,
                    copies: prev.copies + 1,
                  }))
                }
                className="px-3 py-1.5 text-slate-600 hover:bg-slate-100 transition cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-2">
              Delivery Method <span className="text-red-500">*</span>
            </label>
            <div className="space-y-2 text-xs">
              <label className="flex items-center space-x-2.5 text-slate-700 cursor-pointer">
                <input
                  type="radio"
                  name="delivery"
                  value="Pick-up"
                  checked={requestForm.delivery === "Pick-up"}
                  onChange={(e) =>
                    setRequestForm({ ...requestForm, delivery: e.target.value })
                  }
                  className="text-[#0F3EAB] focus:ring-blue-500"
                />
                <span>Pick-up (Registrar's office)</span>
              </label>

              <label className="flex items-center space-x-2.5 text-slate-700 cursor-pointer">
                <input
                  type="radio"
                  name="delivery"
                  value="Email"
                  checked={requestForm.delivery === "Email"}
                  onChange={(e) =>
                    setRequestForm({ ...requestForm, delivery: e.target.value })
                  }
                  className="text-[#0F3EAB] focus:ring-blue-500"
                />
                <span>Email (Official University Email)</span>
              </label>
            </div>
          </div>

          <div className="pt-4 flex items-center space-x-4">
            <button
              type="submit"
              className="px-6 py-2.5 bg-[#0F3EAB] hover:bg-blue-800 text-white font-medium rounded-xl text-xs flex items-center space-x-2 shadow-sm transition cursor-pointer"
            >
              <Filter className="w-3.5 h-3.5 rotate-90" />
              <span>Submit Request</span>
            </button>

            <button
              type="button"
              onClick={() =>
                setRequestForm({
                  docType: "",
                  purpose: "",
                  copies: 1,
                  delivery: "Pick-up",
                })
              }
              className="px-6 py-2.5 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 font-medium rounded-xl text-xs flex items-center space-x-1.5 transition cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
              <span>Clear Form</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function AdminPortal({
  adminRequests,
  setAdminRequests,
  adminTabFilter,
  setAdminTabFilter,
  showToast,
}) {
  const [adminSearch, setAdminSearch] = useState("");
  const [docTypeFilter, setDocTypeFilter] = useState("All Types");
  const [adminStatusFilter, setAdminStatusFilter] = useState("All statuses");

  const filteredAdminRequests = adminRequests.filter((req) => {
    const matchesTab =
      adminTabFilter === "All Requests" || req.status === adminTabFilter;
    const matchesSearch =
      req.studentName.toLowerCase().includes(adminSearch.toLowerCase()) ||
      req.studentId.toLowerCase().includes(adminSearch.toLowerCase()) ||
      req.docType.toLowerCase().includes(adminSearch.toLowerCase());
    const matchesDocType =
      docTypeFilter === "All Types" || req.docType === docTypeFilter;
    const matchesStatus =
      adminStatusFilter === "All statuses" || req.status === adminStatusFilter;

    return matchesTab && matchesSearch && matchesDocType && matchesStatus;
  });

  const handleStatusChange = (reqId, newStatus) => {
    setAdminRequests((prev) =>
      prev.map((item) =>
        item.id === reqId ? { ...item, status: newStatus } : item,
      ),
    );
    showToast(`Request ${reqId} updated to ${newStatus}`);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex items-center space-x-3">
        <div className="p-3 bg-[#0F3EAB] text-white rounded-lg shadow-sm">
          <ClipboardList className="w-7 h-7" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-slate-800">
            Document Request
          </h1>
          <p className="text-xs text-slate-500">
            Review and manage student document requests.
          </p>
        </div>
      </div>

      <div className="flex items-center space-x-6 border-b border-slate-200 pb-2 overflow-x-auto text-xs">
        {[
          { name: "All Requests", count: adminRequests.length },
          {
            name: "Submits",
            count: adminRequests.filter((r) => r.status === "Submits").length,
          },
          {
            name: "For Release",
            count: adminRequests.filter((r) => r.status === "For Release")
              .length,
          },
          {
            name: "Released",
            count: adminRequests.filter((r) => r.status === "Released").length,
          },
          {
            name: "Cancelled",
            count: adminRequests.filter((r) => r.status === "Cancelled").length,
          },
        ].map((item) => (
          <button
            key={item.name}
            onClick={() => setAdminTabFilter(item.name)}
            className={`flex items-center space-x-2 pb-2 font-semibold transition relative whitespace-nowrap cursor-pointer ${
              adminTabFilter === item.name
                ? "text-[#0F3EAB]"
                : "text-slate-500 hover:text-slate-700"
            }`}
          >
            <span>{item.name}</span>
            <span
              className={`px-2 py-0.5 rounded-full text-[10px] ${
                adminTabFilter === item.name
                  ? "bg-blue-100 text-[#0F3EAB]"
                  : "bg-slate-200 text-slate-600"
              }`}
            >
              {item.count}
            </span>
            {adminTabFilter === item.name && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#0F3EAB]" />
            )}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="relative flex-1 min-w-[200px]">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
              <Search className="w-3.5 h-3.5" />
            </span>
            <input
              type="text"
              value={adminSearch}
              onChange={(e) => setAdminSearch(e.target.value)}
              placeholder="Search request, student..."
              className="w-full pl-8 pr-4 py-1.5 border border-slate-300 rounded-full focus:outline-none focus:ring-1 focus:ring-blue-600"
            />
          </div>

          <div className="flex items-center space-x-1">
            <span className="text-slate-500 font-medium">Document type</span>
            <select
              value={docTypeFilter}
              onChange={(e) => setDocTypeFilter(e.target.value)}
              className="px-3 py-1.5 border border-slate-300 rounded-full bg-white text-slate-700 focus:outline-none"
            >
              <option value="All Types">All Types</option>
              <option value="Certificate of Enrollment">
                Certificate of Enrollment
              </option>
              <option value="Certificate of Grades">
                Certificate of Grades
              </option>
              <option value="Student clearance">Student clearance</option>
              <option value="Transcript of Records">
                Transcript of Records
              </option>
            </select>
          </div>

          <div className="flex items-center space-x-1">
            <span className="text-slate-500 font-medium">Status</span>
            <select
              value={adminStatusFilter}
              onChange={(e) => setAdminStatusFilter(e.target.value)}
              className="px-3 py-1.5 border border-slate-300 rounded-full bg-white text-slate-700 focus:outline-none"
            >
              <option value="All statuses">All statuses</option>
              <option value="Submits">Submits</option>
              <option value="For Release">For Release</option>
              <option value="Released">Released</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>

          <div className="flex items-center space-x-1">
            <select className="px-3 py-1.5 border border-slate-300 rounded-full bg-white text-slate-700 focus:outline-none">
              <option>May 1 - May 20, 2026</option>
              <option>Current Semester</option>
            </select>
          </div>

          <button className="flex items-center space-x-1.5 px-3 py-1.5 border border-slate-300 rounded-full bg-white text-slate-600 hover:bg-slate-50 cursor-pointer">
            <Filter className="w-3.5 h-3.5" />
            <span>Filter</span>
          </button>
        </div>

        <div className="border border-slate-200 rounded-xl overflow-hidden min-h-[300px]">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-xs font-semibold text-slate-600">
                <th className="py-3 px-4">Req ID</th>
                <th className="py-3 px-4">Student</th>
                <th className="py-3 px-4">Document Type</th>
                <th className="py-3 px-4">Copies / Delivery</th>
                <th className="py-3 px-4">Requested</th>
                <th className="py-3 px-4 text-center">Update Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {filteredAdminRequests.length > 0 ? (
                filteredAdminRequests.map((req) => (
                  <tr key={req.id} className="hover:bg-slate-50/80 transition">
                    <td className="py-3 px-4 font-bold text-blue-900">
                      {req.id}
                    </td>
                    <td className="py-3 px-4">
                      <div className="font-semibold text-slate-800">
                        {req.studentName}
                      </div>
                      <div className="text-[10px] text-slate-400">
                        {req.studentId}
                      </div>
                    </td>
                    <td className="py-3 px-4 font-medium text-slate-700">
                      {req.docType}
                    </td>
                    <td className="py-3 px-4 text-slate-600">
                      {req.copies} copy(ies) •{" "}
                      <span className="italic">{req.delivery}</span>
                    </td>
                    <td className="py-3 px-4 text-slate-500 whitespace-nowrap">
                      {req.dateRequested}
                    </td>
                    <td className="py-3 px-4 text-center">
                      <select
                        value={req.status}
                        onChange={(e) =>
                          handleStatusChange(req.id, e.target.value)
                        }
                        className={`px-2.5 py-1 rounded-full text-xs font-semibold border-none focus:ring-1 focus:ring-blue-500 cursor-pointer ${
                          req.status === "Submits"
                            ? "bg-blue-100 text-blue-700"
                            : req.status === "For Release"
                              ? "bg-amber-100 text-amber-700"
                              : req.status === "Released"
                                ? "bg-emerald-100 text-emerald-700"
                                : "bg-red-100 text-red-700"
                        }`}
                      >
                        <option value="Submits">Submits</option>
                        <option value="For Release">For Release</option>
                        <option value="Released">Released</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={6}
                    className="py-16 text-center text-slate-400 font-medium"
                  >
                    No requests found matching the active filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [activeView, setActiveView] = useState("my-records");
  const [recordsTab, setRecordsTab] = useState("Academic Records");
  const [adminTabFilter, setAdminTabFilter] = useState("All Requests");

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
        course: "BSIT • 2nd Year",
        role: "student",
      });
      setActiveView("my-records");
      showToast("Logged in as Student");
    } else {
      setCurrentUser({
        name: "Admin Staff",
        course: "Registrar Admin",
        role: "admin",
      });
      setActiveView("admin-requests");
      showToast("Logged in as Registrar Administrator");
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    showToast("Successfully logged out", "info");
  };

  if (!currentUser) {
    return <Login handleLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans text-slate-800">
      <Toast toast={toast} />
      <Navbar currentUser={currentUser} />

      <div className="flex-1 flex overflow-hidden">
        <Sidebar
          currentUser={currentUser}
          activeView={activeView}
          setActiveView={setActiveView}
          recordsTab={recordsTab}
          setRecordsTab={setRecordsTab}
          adminTabFilter={adminTabFilter}
          setAdminTabFilter={setAdminTabFilter}
          handleLogout={handleLogout}
          showToast={showToast}
        />

        <main className="flex-1 bg-slate-100 p-6 md:p-8 overflow-y-auto">
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
              studentRecords={studentRecords}
              setStudentRecords={setStudentRecords}
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
        </main>
      </div>
    </div>
  );
}
