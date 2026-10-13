import React from "react";
import {
  Bell,
  User,
  ChevronDown,
  Home,
  Folder,
  ClipboardList,
  Megaphone,
  HelpCircle,
  Users,
  Box,
  TrendingUp,
  LogOut,
  Settings,
} from "lucide-react";

export function Navbar({ currentUser, setActiveView }) {
  return (
    <header className="bg-[#0F3EAB] text-white h-16 flex items-center justify-between px-6 shadow-md z-20">
      <div className="flex items-center space-x-4">
        <img
          src="/cmu-logo.png"
          alt="CMU Logo"
          className="w-10 h-10 object-contain drop-shadow-sm bg-white rounded-full p-0.5"
        />
        <div>
          <h1 className="text-base font-bold tracking-tight leading-none">
            CITY OF MALABON
          </h1>
          <p className="text-xs font-semibold tracking-wider text-blue-200 mt-0.5">
            UNIVERSITY
          </p>
        </div>
      </div>
      <div className="flex items-center space-x-5">
        <button className="relative text-blue-100 hover:text-white p-1">
          <Bell className="w-6 h-6" />
          <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full ring-2 ring-[#0F3EAB]" />
        </button>

        {/* Clickable Profile Button */}
        <button
          onClick={() => setActiveView("profile")}
          className="flex items-center space-x-3 border-l border-blue-600/50 pl-4 hover:opacity-80 transition cursor-pointer"
          title="Open Profile"
        >
          <div className="w-9 h-9 rounded-full bg-white/20 p-0.5">
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
        </button>
      </div>
    </header>
  );
}

export function Sidebar({
  currentUser,
  activeView,
  setActiveView,
  handleLogout,
}) {
  return (
    <aside className="w-64 bg-[#0F3EAB] text-white flex flex-col justify-between py-6 px-3 border-t border-blue-700/40">
      <nav className="space-y-1">
        {currentUser.role === "student" ? (
          <>
            <button
              onClick={() => setActiveView("student-home")}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition cursor-pointer ${activeView === "student-home" ? "bg-blue-700/80 text-white" : "text-blue-100 hover:bg-blue-800/50"}`}
            >
              <Home className="w-5 h-5" />
              <span>Dashboard</span>
            </button>
            <button
              onClick={() => setActiveView("my-records")}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition cursor-pointer ${activeView === "my-records" ? "bg-blue-700/80 text-white" : "text-blue-100 hover:bg-blue-800/50"}`}
            >
              <Folder className="w-5 h-5" />
              <span>My records</span>
            </button>
            <button
              onClick={() => setActiveView("document-request")}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition cursor-pointer ${activeView === "document-request" ? "bg-blue-700/80 text-white" : "text-blue-100 hover:bg-blue-800/50"}`}
            >
              <ClipboardList className="w-5 h-5" />
              <span>Document request</span>
            </button>
            <button
              onClick={() => setActiveView("track-requests")}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition cursor-pointer ${activeView === "track-requests" ? "bg-blue-700/80 text-white" : "text-blue-100 hover:bg-blue-800/50"}`}
            >
              <TrendingUp className="w-5 h-5" />
              <span>Track Requests</span>
            </button>
            <button
              onClick={() => setActiveView("announcements")}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition cursor-pointer ${activeView === "announcements" ? "bg-blue-700/80 text-white" : "text-blue-100 hover:bg-blue-800/50"}`}
            >
              <Megaphone className="w-5 h-5" />
              <span>Announcements</span>
            </button>
            <button
              onClick={() => setActiveView("help")}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition cursor-pointer ${activeView === "help" ? "bg-blue-700/80 text-white" : "text-blue-100 hover:bg-blue-800/50"}`}
            >
              <HelpCircle className="w-5 h-5" />
              <span>Help & support</span>
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => setActiveView("admin-home")}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition cursor-pointer ${activeView === "admin-home" ? "bg-blue-700/80 text-white" : "text-blue-100 hover:bg-blue-800/50"}`}
            >
              <Home className="w-5 h-5" />
              <span>Overview Dashboard</span>
            </button>
            <button
              onClick={() => setActiveView("admin-requests")}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition cursor-pointer ${activeView === "admin-requests" ? "bg-blue-700/80 text-white" : "text-blue-100 hover:bg-blue-800/50"}`}
            >
              <ClipboardList className="w-5 h-5" />
              <span>Document Requests</span>
            </button>
            <button
              onClick={() => setActiveView("admin-students")}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition cursor-pointer ${activeView === "admin-students" ? "bg-blue-700/80 text-white" : "text-blue-100 hover:bg-blue-800/50"}`}
            >
              <Users className="w-5 h-5" />
              <span>Student Records</span>
            </button>
            <button
              onClick={() => setActiveView("admin-inventory")}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition cursor-pointer ${activeView === "admin-inventory" ? "bg-blue-700/80 text-white" : "text-blue-100 hover:bg-blue-800/50"}`}
            >
              <Box className="w-5 h-5" />
              <span>Document Inventory</span>
            </button>
          </>
        )}
      </nav>
      <div className="pt-6 border-t border-blue-700/50 space-y-1">
        <button
          onClick={() => setActiveView("settings")}
          className={`w-full flex items-center space-x-3 px-4 py-2.5 rounded-lg text-sm font-medium transition cursor-pointer ${activeView === "settings" ? "bg-blue-700/80 text-white" : "text-blue-100 hover:bg-blue-800"}`}
        >
          <Settings className="w-5 h-5" />
          <span>Settings</span>
        </button>
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
