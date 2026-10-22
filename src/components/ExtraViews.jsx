import React, { useState } from "react";
import {
  ClipboardList,
  Clock,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Megaphone,
  TrendingUp,
  Calendar,
  ArrowRight,
  ShieldAlert,
  Ban,
  FileText,
} from "lucide-react";

// Student Dashboard View
export function StudentDashboard({ currentUser, adminRequests = [] }) {
  const myRequests = adminRequests.filter(
    (req) =>
      req.studentName === currentUser?.name || req.studentId === "2023-0142",
  );
  const pendingCount = myRequests.filter(
    (r) =>
      r.status === "Submitted" ||
      r.status === "Processing" ||
      r.status === "Submits",
  ).length;
  const readyCount = myRequests.filter(
    (r) => r.status === "For Release",
  ).length;
  const completedCount = myRequests.filter(
    (r) => r.status === "Released",
  ).length;

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="bg-[#0F3EAB] text-white rounded-2xl p-6 md:p-8 shadow-md flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-blue-200">
            Welcome Back
          </span>
          <h1 className="text-2xl md:text-3xl font-bold mt-1">
            {currentUser?.name || "Student"}
          </h1>
          <p className="text-xs text-blue-100 mt-1">
            Program: {currentUser?.course || "BSIT"} • Student ID: 2023-0142
          </p>
        </div>
        <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 text-xs border border-white/20">
          <span className="text-blue-200 block text-[10px] uppercase font-bold">
            Academic Status
          </span>
          <span className="text-white font-bold text-sm">
            Regular Enrolled Student
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center space-x-4">
          <div className="p-3 bg-blue-100 text-[#0F3EAB] rounded-xl">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <span className="text-2xl font-bold text-slate-800">
              {pendingCount}
            </span>
            <span className="text-xs text-slate-500 block font-medium">
              Pending Requests
            </span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center space-x-4">
          <div className="p-3 bg-amber-100 text-amber-700 rounded-xl">
            <AlertCircle className="w-6 h-6" />
          </div>
          <div>
            <span className="text-2xl font-bold text-slate-800">
              {readyCount}
            </span>
            <span className="text-xs text-slate-500 block font-medium">
              Ready for Release
            </span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center space-x-4">
          <div className="p-3 bg-emerald-100 text-emerald-700 rounded-xl">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div>
            <span className="text-2xl font-bold text-slate-800">
              {completedCount}
            </span>
            <span className="text-xs text-slate-500 block font-medium">
              Completed Documents
            </span>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4 shadow-xs">
        <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider flex items-center justify-between">
          <span>Recent Request Activity</span>
        </h3>

        {myRequests.length > 0 ? (
          <div className="space-y-3">
            {myRequests.slice(0, 3).map((req) => (
              <div
                key={req.id}
                className="p-4 rounded-xl border border-slate-200 bg-slate-50/60 flex items-center justify-between text-xs"
              >
                <div>
                  <span className="font-bold text-blue-900 block">
                    {req.id} • {req.docType}
                  </span>
                  <span className="text-slate-500 text-[11px]">
                    {req.purpose} • Requested {req.dateRequested}
                  </span>
                </div>
                <span
                  className={`px-2.5 py-1 rounded-full font-bold text-[10px] ${
                    req.status === "Submitted" || req.status === "Submits"
                      ? "bg-blue-100 text-blue-700"
                      : req.status === "Processing"
                        ? "bg-purple-100 text-purple-700"
                        : req.status === "For Release"
                          ? "bg-amber-100 text-amber-700"
                          : req.status === "Released"
                            ? "bg-emerald-100 text-emerald-700"
                            : "bg-red-100 text-red-700"
                  }`}
                >
                  {req.status}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-xs text-slate-400 py-6 text-center">
            No recent document request activity.
          </p>
        )}
      </div>
    </div>
  );
}

// Admin Dashboard View
export function AdminDashboard({ adminRequests = [] }) {
  const totalRequests = adminRequests.length;
  const pendingRequests = adminRequests.filter(
    (r) => r.status === "Submitted" || r.status === "Submits",
  ).length;
  const processingRequests = adminRequests.filter(
    (r) => r.status === "Processing",
  ).length;
  const forReleaseRequests = adminRequests.filter(
    (r) => r.status === "For Release",
  ).length;

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="bg-slate-800 text-white rounded-2xl p-6 md:p-8 shadow-md">
        <h1 className="text-2xl font-bold">
          Registrar Administrative Overview
        </h1>
        <p className="text-xs text-slate-300 mt-1">
          Real-time monitoring of document queue and processing throughput.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <span className="text-xs font-bold text-slate-500 uppercase block">
            Total Queue
          </span>
          <span className="text-2xl font-extrabold text-slate-800">
            {totalRequests}
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <span className="text-xs font-bold text-blue-600 uppercase block">
            New Submitted
          </span>
          <span className="text-2xl font-extrabold text-blue-700">
            {pendingRequests}
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <span className="text-xs font-bold text-purple-600 uppercase block">
            Processing
          </span>
          <span className="text-2xl font-extrabold text-purple-700">
            {processingRequests}
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <span className="text-xs font-bold text-amber-600 uppercase block">
            Ready for Release
          </span>
          <span className="text-2xl font-extrabold text-amber-700">
            {forReleaseRequests}
          </span>
        </div>
      </div>
    </div>
  );
}

// Track Requests View with Fixed Cancellation Logic
export function TrackRequests({ adminRequests = [], onCancelRequest }) {
  const [cancellingId, setCancellingId] = useState(null);

  // Shopee/Lazada 3-Day Rule logic
  const isEligibleForCancellation = (req) => {
    // Must be in "Submitted" or legacy "Submits" status
    const isSubmittedState =
      req.status === "Submitted" || req.status === "Submits";
    if (!isSubmittedState) return false;

    // Check if requested recently
    if (req.dateRequested === "Just Now") return true;

    // Evaluate 3-day window
    try {
      const reqDate = new Date(req.dateRequested);
      const now = new Date();
      const diffTime = Math.abs(now - reqDate);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays <= 3;
    } catch {
      return true;
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center space-x-3">
        <div className="p-3 bg-[#0F3EAB] text-white rounded-lg shadow-sm">
          <TrendingUp className="w-7 h-7" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-slate-800">
            Track Document Requests
          </h1>
          <p className="text-xs text-slate-500">
            Monitor processing status. You may cancel requests within 3 days
            while in "Submitted" status.
          </p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4">
        {adminRequests.length > 0 ? (
          <div className="space-y-4">
            {adminRequests.map((req) => {
              const canCancel = isEligibleForCancellation(req);

              return (
                <div
                  key={req.id}
                  className={`p-5 rounded-2xl border transition ${
                    req.status === "Cancelled"
                      ? "bg-slate-50 border-slate-200 opacity-75"
                      : "bg-white border-slate-200 shadow-xs"
                  }`}
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <span className="font-extrabold text-blue-900 text-sm">
                          {req.id}
                        </span>
                        <span
                          className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                            req.status === "Submitted" ||
                            req.status === "Submits"
                              ? "bg-blue-100 text-blue-700"
                              : req.status === "Processing"
                                ? "bg-purple-100 text-purple-700"
                                : req.status === "For Release"
                                  ? "bg-amber-100 text-amber-700"
                                  : req.status === "Released"
                                    ? "bg-emerald-100 text-emerald-700"
                                    : "bg-red-100 text-red-700"
                          }`}
                        >
                          {req.status}
                        </span>
                        <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
                          {req.fee === 0 ? "FREE" : `₱${req.fee}.00`}
                        </span>
                      </div>

                      <h3 className="font-bold text-slate-800 text-sm">
                        {req.docType}
                      </h3>

                      <div className="text-xs text-slate-500 space-y-0.5">
                        <p>
                          Purpose:{" "}
                          <span className="font-semibold text-slate-700">
                            {req.purpose}
                          </span>{" "}
                          • Delivery:{" "}
                          <span className="font-semibold text-slate-700">
                            {req.delivery} ({req.copies || 1} copy/ies)
                          </span>
                        </p>
                        <p className="text-[11px] text-slate-400">
                          Date Requested: {req.dateRequested}
                        </p>
                      </div>
                    </div>

                    {/* Action Controls */}
                    <div className="flex items-center space-x-2 shrink-0">
                      {req.status === "Cancelled" ? (
                        <span className="px-3 py-1.5 bg-red-50 text-red-600 rounded-xl text-xs font-semibold flex items-center space-x-1 border border-red-200">
                          <Ban className="w-3.5 h-3.5" />
                          <span>Request Cancelled</span>
                        </span>
                      ) : canCancel ? (
                        <button
                          onClick={() => {
                            if (
                              window.confirm(
                                `Are you sure you want to cancel document request ${req.id}?`,
                              )
                            ) {
                              onCancelRequest(req.id);
                            }
                          }}
                          className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl text-xs shadow-xs transition cursor-pointer flex items-center space-x-1.5"
                        >
                          <Ban className="w-3.5 h-3.5" />
                          <span>Cancel Request</span>
                        </button>
                      ) : (
                        <span className="px-3 py-1.5 bg-slate-100 text-slate-500 rounded-xl text-xs font-medium border border-slate-200 flex items-center space-x-1 cursor-not-allowed">
                          <Clock className="w-3.5 h-3.5 text-slate-400" />
                          <span>Locked (Processing Started)</span>
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="py-12 text-center text-slate-400 text-xs">
            No document requests found. Create a request from the Document
            Request page.
          </div>
        )}
      </div>
    </div>
  );
}

// Announcements View
export function Announcements() {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center space-x-3">
        <div className="p-3 bg-[#0F3EAB] text-white rounded-lg shadow-sm">
          <Megaphone className="w-7 h-7" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-slate-800">
            Registrar Announcements
          </h1>
          <p className="text-xs text-slate-500">
            Official university notices, clearance deadlines, and schedule
            updates.
          </p>
        </div>
      </div>

      <div className="space-y-4">
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span className="font-bold text-[#0F3EAB] uppercase">
              Clearance Notice
            </span>
            <span>October 20, 2026</span>
          </div>
          <h2 className="text-base font-bold text-slate-800">
            2nd Semester Student Clearance Submission
          </h2>
          <p className="text-xs text-slate-600 leading-relaxed">
            All graduating students and transferees must submit their signed
            Student Clearance forms prior to applying for official Transcripts
            of Records (TOR) or Diplomas.
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span className="font-bold text-emerald-600 uppercase">
              Policy Update
            </span>
            <span>October 15, 2026</span>
          </div>
          <h2 className="text-base font-bold text-slate-800">
            First Request Copy Fee Exemption
          </h2>
          <p className="text-xs text-slate-600 leading-relaxed">
            First-time requests for student records entitle students to 1 FREE
            copy. Subsequent requests or extra copies are charged ₱50.00 per
            copy.
          </p>
        </div>
      </div>
    </div>
  );
}

// Generic Placeholder View for Other Navigation Links
export function PlaceholderView({ title, icon: Icon, desc }) {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center space-x-3">
        <div className="p-3 bg-[#0F3EAB] text-white rounded-lg shadow-sm">
          {Icon && <Icon className="w-7 h-7" />}
        </div>
        <div>
          <h1 className="text-2xl font-bold text-slate-800">{title}</h1>
          <p className="text-xs text-slate-500">{desc}</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center space-y-3 shadow-xs">
        <div className="w-12 h-12 bg-blue-50 text-[#0F3EAB] rounded-full flex items-center justify-center mx-auto">
          {Icon && <Icon className="w-6 h-6" />}
        </div>
        <h3 className="text-base font-bold text-slate-800">
          {title} Portal Module
        </h3>
        <p className="text-xs text-slate-500 max-w-md mx-auto">
          This feature module is connected to the Registrar database pipeline
          and ready for operations.
        </p>
      </div>
    </div>
  );
}
