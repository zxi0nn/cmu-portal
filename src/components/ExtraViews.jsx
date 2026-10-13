import React from "react";
import {
  Home,
  TrendingUp,
  Megaphone,
  HelpCircle,
  Users,
  Box,
  Settings,
  CheckCircle,
  Clock,
  FileText,
} from "lucide-react";

export function StudentDashboard({ currentUser, adminRequests }) {
  const pendingCount = adminRequests.filter(
    (req) => req.status === "Submitted" || req.status === "For Release",
  ).length;

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div className="bg-[#0F3EAB] rounded-2xl p-8 text-white shadow-sm flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold mb-2">
            Welcome back, {currentUser.name}!
          </h1>
          <p className="text-blue-200 text-sm">
            City of Malabon University Student Portal • {currentUser.course}
          </p>
        </div>
        <Home className="w-12 h-12 text-blue-300/50" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-slate-700">Pending Requests</h3>
            <Clock className="w-5 h-5 text-amber-500" />
          </div>
          <p className="text-4xl font-extrabold text-slate-800">
            {pendingCount}
          </p>
        </div>
        <div className="bg-white p-6 rounded-2xl border shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-slate-700">Completed</h3>
            <CheckCircle className="w-5 h-5 text-emerald-500" />
          </div>
          <p className="text-4xl font-extrabold text-slate-800">
            {adminRequests.filter((req) => req.status === "Released").length}
          </p>
        </div>
        <div className="bg-white p-6 rounded-2xl border shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-slate-700">Available Files</h3>
            <FileText className="w-5 h-5 text-blue-500" />
          </div>
          <p className="text-4xl font-extrabold text-slate-800">5</p>
        </div>
      </div>
    </div>
  );
}

export function AdminDashboard({ adminRequests }) {
  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div className="bg-slate-800 rounded-2xl p-8 text-white shadow-sm flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold mb-2">
            Registrar Overview Dashboard
          </h1>
          <p className="text-slate-400 text-sm">
            Monitor system activity and pending document requests.
          </p>
        </div>
        <Home className="w-12 h-12 text-slate-600" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          {
            title: "Total Requests",
            count: adminRequests.length,
            color: "text-blue-500",
          },
          {
            title: "New (Submitted)",
            count: adminRequests.filter((r) => r.status === "Submitted").length,
            color: "text-amber-500",
          },
          {
            title: "For Release",
            count: adminRequests.filter((r) => r.status === "For Release")
              .length,
            color: "text-purple-500",
          },
          {
            title: "Released Today",
            count: adminRequests.filter((r) => r.status === "Released").length,
            color: "text-emerald-500",
          },
        ].map((stat) => (
          <div
            key={stat.title}
            className="bg-white p-6 rounded-2xl border shadow-sm"
          >
            <h3 className="font-bold text-slate-500 text-xs uppercase mb-2">
              {stat.title}
            </h3>
            <p className={`text-4xl font-extrabold ${stat.color}`}>
              {stat.count}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export function Announcements() {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center space-x-3 mb-8">
        <div className="p-3 bg-[#0F3EAB] text-white rounded-lg">
          <Megaphone className="w-7 h-7" />
        </div>
        <h1 className="text-2xl font-bold text-slate-800">
          University Announcements
        </h1>
      </div>
      {[
        {
          title: "Enrollment for AY 2026-2027",
          date: "May 15, 2026",
          desc: "Official enrollment begins next week. Ensure all clearance requirements are met.",
        },
        {
          title: "Registrar Office Maintenance",
          date: "May 10, 2026",
          desc: "The physical office will be closed on Friday for system upgrades. Digital requests remain active.",
        },
      ].map((ann) => (
        <div
          key={ann.title}
          className="bg-white p-6 rounded-2xl border shadow-sm"
        >
          <div className="text-xs font-bold text-blue-600 mb-2">{ann.date}</div>
          <h3 className="text-lg font-bold text-slate-800 mb-2">{ann.title}</h3>
          <p className="text-sm text-slate-600">{ann.desc}</p>
        </div>
      ))}
    </div>
  );
}

export function TrackRequests({ adminRequests }) {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center space-x-3 mb-8">
        <div className="p-3 bg-[#0F3EAB] text-white rounded-lg">
          <TrendingUp className="w-7 h-7" />
        </div>
        <h1 className="text-2xl font-bold text-slate-800">
          Transaction Tracking
        </h1>
      </div>
      <div className="bg-white rounded-2xl border shadow-sm p-6">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b text-slate-500">
              <th className="pb-3">Tracking ID</th>
              <th className="pb-3">Document</th>
              <th className="pb-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {adminRequests.map((req) => (
              <tr key={req.id} className="border-b last:border-0">
                <td className="py-4 font-bold">{req.id}</td>
                <td className="py-4">{req.docType}</td>
                <td className="py-4">
                  <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-bold">
                    {req.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function PlaceholderView({ title, icon: Icon, desc }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="w-20 h-20 bg-blue-100 text-[#0F3EAB] rounded-full flex items-center justify-center mb-6">
        <Icon className="w-10 h-10" />
      </div>
      <h1 className="text-2xl font-bold text-slate-800 mb-2">{title}</h1>
      <p className="text-slate-500 max-w-md">{desc}</p>
    </div>
  );
}
