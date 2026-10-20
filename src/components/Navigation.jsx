import React from "react";
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
  Menu,
} from "lucide-react";

export function Navbar({
  currentUser,
  setActiveView,
  isMobileOpen,
  setIsMobileOpen,
}) {
  return (
    <header className="bg-[#0F3EAB] text-white h-16 flex items-center justify-between px-4 md:px-6 shadow-md z-20 sticky top-0">
      <div className="flex items-center space-x-3 md:space-x-4">
        {/* Mobile Hamburger Menu Toggle Button */}
        <button
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className="md:hidden p-1.5 rounded-lg text-white hover:bg-blue-800 focus:outline-none transition cursor-pointer"
          aria-label="Toggle Navigation Menu"
        >
          {isMobileOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>

        <img
          src="/cmu-logo.png"
          alt="CMU Logo"
          className="w-9 h-9 md:w-10 md:h-10 object-contain bg-white rounded-full p-0.5 shadow"
        />

        <div>
          <h1 className="text-xs sm:text-sm md:text-base font-bold tracking-wide whitespace-nowrap text-white">
            CITY OF MALABON UNIVERSITY
          </h1>
        </div>

        <div className="hidden sm:flex items-center pl-4 border-l border-blue-600/50">
          <span className="text-xs md:text-sm font-light text-blue-100">
            {currentUser?.role === "student"
              ? "Student Portal"
              : "Registrar Portal"}
          </span>
        </div>
      </div>

      <div className="flex items-center space-x-3 md:space-x-5">
        <button className="relative text-blue-100 hover:text-white p-1 rounded-full transition cursor-pointer">
          <Bell className="w-5 h-5 md:w-6 md:h-6" />
          <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full ring-2 ring-[#0F3EAB]" />
        </button>

        <div
          onClick={() => setActiveView("profile")}
          className="flex items-center space-x-2 md:space-x-3 border-l border-blue-600/50 pl-3 md:pl-4 cursor-pointer hover:opacity-80 transition"
        >
          <div className="w-8 h-8 md:w-9 md:h-9 rounded-full bg-white/20 p-0.5 overflow-hidden">
            <div className="w-full h-full rounded-full bg-sky-200 flex items-center justify-center">
              <User className="w-4 h-4 md:w-5 md:h-5 text-blue-900" />
            </div>
          </div>
          <div className="text-left hidden md:block">
            <div className="text-sm font-bold leading-tight">
              {currentUser?.name || "User"}
            </div>
            <div className="text-xs text-blue-200">
              {currentUser?.course || ""}
            </div>
          </div>
          <ChevronDown className="w-4 h-4 text-blue-200 hidden sm:block" />
        </div>
      </div>
    </header>
  );
}

export function Sidebar({
  currentUser,
  activeView,
  setActiveView,
  recordsTab,
  setRecordsTab,
  adminTabFilter,
  setAdminTabFilter,
  handleLogout,
  showToast,
  isMobileOpen,
  setIsMobileOpen,
}) {
  const handleNavClick = (viewAction) => {
    viewAction();
    if (setIsMobileOpen) setIsMobileOpen(false);
  };

  return (
    <>
      {/* Dark Backdrop Overlay on Mobile when Sidebar is open */}
      {isMobileOpen && (
        <div
          onClick={() => setIsMobileOpen(false)}
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-30 md:hidden transition-opacity"
        />
      )}

      <aside
        className={`
        fixed md:static inset-y-0 left-0 z-40
        w-64 bg-[#0F3EAB] text-white flex flex-col justify-between py-6 px-3 
        border-t border-blue-700/40 select-none shadow-xl md:shadow-none
        transform transition-transform duration-300 ease-in-out
        ${isMobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
      `}
      >
        <nav className="space-y-1 overflow-y-auto">
          {currentUser?.role === "student" ? (
            <>
              <button
                onClick={() =>
                  handleNavClick(() => setActiveView("student-home"))
                }
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition cursor-pointer ${
                  activeView === "student-home"
                    ? "bg-blue-700/80 text-white"
                    : "text-blue-100 hover:bg-blue-800/50"
                }`}
              >
                <Home className="w-5 h-5" />
                <span>Home</span>
              </button>

              <div>
                <button
                  onClick={() =>
                    handleNavClick(() => setActiveView("my-records"))
                  }
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
                        onClick={() => handleNavClick(() => setRecordsTab(tab))}
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
                onClick={() =>
                  handleNavClick(() => setActiveView("document-request"))
                }
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
                  handleNavClick(() => setActiveView("track-requests"))
                }
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition cursor-pointer ${
                  activeView === "track-requests"
                    ? "bg-blue-700/80 text-white"
                    : "text-blue-100 hover:bg-blue-800/50"
                }`}
              >
                <TrendingUp className="w-5 h-5" />
                <span>Track Requests</span>
              </button>

              <button
                onClick={() =>
                  handleNavClick(() => setActiveView("announcements"))
                }
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition cursor-pointer ${
                  activeView === "announcements"
                    ? "bg-blue-700/80 text-white"
                    : "text-blue-100 hover:bg-blue-800/50"
                }`}
              >
                <Megaphone className="w-5 h-5" />
                <span>Announcement</span>
              </button>

              <button
                onClick={() => handleNavClick(() => setActiveView("help"))}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition cursor-pointer ${
                  activeView === "help"
                    ? "bg-blue-700/80 text-white"
                    : "text-blue-100 hover:bg-blue-800/50"
                }`}
              >
                <HelpCircle className="w-5 h-5" />
                <span>Help & support</span>
              </button>
            </>
          ) : (
            <>
              <div>
                <button
                  onClick={() =>
                    handleNavClick(() => setActiveView("admin-requests"))
                  }
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
                      onClick={() =>
                        handleNavClick(() => {
                          setAdminTabFilter(tab);
                          setActiveView("admin-requests");
                        })
                      }
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
                onClick={() =>
                  handleNavClick(() => setActiveView("admin-students"))
                }
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition cursor-pointer ${
                  activeView === "admin-students"
                    ? "bg-blue-700/80 text-white"
                    : "text-blue-100 hover:bg-blue-800/50"
                }`}
              >
                <Users className="w-5 h-5" />
                <span>Students Records</span>
              </button>

              <button
                onClick={() =>
                  handleNavClick(() => setActiveView("admin-inventory"))
                }
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition cursor-pointer ${
                  activeView === "admin-inventory"
                    ? "bg-blue-700/80 text-white"
                    : "text-blue-100 hover:bg-blue-800/50"
                }`}
              >
                <Box className="w-5 h-5" />
                <span>Document Inventory</span>
              </button>

              <button
                onClick={() => handleNavClick(() => setActiveView("settings"))}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition cursor-pointer ${
                  activeView === "settings"
                    ? "bg-blue-700/80 text-white"
                    : "text-blue-100 hover:bg-blue-800/50"
                }`}
              >
                <TrendingUp className="w-5 h-5" />
                <span>Monitoring & Settings</span>
              </button>
            </>
          )}
        </nav>

        <div className="pt-6 border-t border-blue-700/50">
          <button
            onClick={() => handleNavClick(handleLogout)}
            className="w-full flex items-center space-x-3 px-4 py-2.5 rounded-lg text-sm font-medium text-blue-100 hover:bg-blue-800 transition cursor-pointer"
          >
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
}
