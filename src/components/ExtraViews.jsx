import React from "react";
import { TrendingUp, Ban, Lock, HelpCircle } from "lucide-react";

export function TrackRequests({ adminRequests = [], onCancelRequest }) {
  // E-commerce style 3-Day cutoff rule for request cancellation
  const isCancellable = (req) => {
    if (req.status !== "Submits") return false;
    if (req.dateRequested === "Just Now") return true;

    const reqDate = new Date(req.dateRequested);
    const today = new Date();
    const diffDays = Math.floor((today - reqDate) / (1000 * 60 * 60 * 24));

    return diffDays < 3;
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="flex items-center space-x-3">
        <div className="p-3 bg-[#0F3EAB] text-white rounded-lg shadow-sm">
          <TrendingUp className="w-7 h-7" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-slate-800">
            Track Document Requests
          </h1>
          <p className="text-xs text-slate-500">
            Real-time status tracking and cancellation management.
          </p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4">
        {adminRequests.length > 0 ? (
          <div className="space-y-4">
            {adminRequests.map((req) => {
              const canCancel = isCancellable(req);

              return (
                <div
                  key={req.id}
                  className="border border-slate-200 rounded-xl p-5 hover:border-blue-300 transition bg-slate-50/50"
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center space-x-3">
                        <span className="font-bold text-blue-900 text-sm">
                          {req.id}
                        </span>
                        <span
                          className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                            req.status === "Submits"
                              ? "bg-blue-100 text-blue-700"
                              : req.status === "For Release"
                                ? "bg-amber-100 text-amber-700"
                                : req.status === "Released"
                                  ? "bg-emerald-100 text-emerald-700"
                                  : "bg-red-100 text-red-700"
                          }`}
                        >
                          {req.status}
                        </span>
                        <span className="text-xs font-bold text-slate-600">
                          {req.fee === 0 ? "FREE" : `₱${req.fee || 50}.00`}
                        </span>
                      </div>
                      <h3 className="text-base font-bold text-slate-800">
                        {req.docType}
                      </h3>
                      <p className="text-xs text-slate-500">
                        Purpose: {req.purpose} • Delivery: {req.delivery} (
                        {req.copies} copies)
                      </p>
                      <p className="text-[11px] text-slate-400">
                        Date Requested: {req.dateRequested}
                      </p>
                    </div>

                    {/* Shopee/Lazada Style Cancellation Action */}
                    <div className="flex flex-col items-end justify-center space-y-1.5 border-t md:border-t-0 pt-3 md:pt-0">
                      {canCancel ? (
                        <button
                          onClick={() => onCancelRequest(req.id)}
                          className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-semibold flex items-center space-x-1.5 transition shadow-xs cursor-pointer"
                        >
                          <Ban className="w-3.5 h-3.5" />
                          <span>Cancel Request</span>
                        </button>
                      ) : (
                        <div className="flex items-center space-x-1.5 text-slate-400 text-xs bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200">
                          <Lock className="w-3.5 h-3.5 text-slate-500" />
                          <span>
                            {req.status === "Cancelled"
                              ? "Request Cancelled"
                              : req.status !== "Submits"
                                ? "Locked (Processing Started)"
                                : "Locked (Past 3-Day Window)"}
                          </span>
                        </div>
                      )}

                      {canCancel && (
                        <span className="text-[10px] text-amber-700 font-medium">
                          ⚡ Cancellable within 3 days before verification
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="py-12 text-center text-slate-400 text-sm">
            No active document requests found.
          </div>
        )}
      </div>
    </div>
  );
}

export function PlaceholderView({ title, icon: Icon, desc }) {
  return (
    <div className="max-w-4xl mx-auto py-12 text-center space-y-4">
      <div className="w-16 h-16 mx-auto bg-blue-100 text-[#0F3EAB] rounded-full flex items-center justify-center">
        <Icon className="w-8 h-8" />
      </div>
      <h2 className="text-2xl font-bold text-slate-800">{title}</h2>
      <p className="text-xs text-slate-500 max-w-md mx-auto">{desc}</p>
    </div>
  );
}

export function StudentDashboard({ currentUser, adminRequests = [] }) {
  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="bg-[#0F3EAB] text-white p-6 rounded-2xl shadow-sm flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Welcome, {currentUser?.name}!</h1>
          <p className="text-xs text-blue-200 mt-1">
            City of Malabon University Student Portal ({currentUser?.course})
          </p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-5 bg-white border border-slate-200 rounded-2xl shadow-xs">
          <div className="text-xs text-slate-500 font-semibold">
            Pending Requests
          </div>
          <div className="text-3xl font-extrabold text-blue-900 mt-2">
            {adminRequests.filter((r) => r.status === "Submits").length}
          </div>
        </div>
        <div className="p-5 bg-white border border-slate-200 rounded-2xl shadow-xs">
          <div className="text-xs text-slate-500 font-semibold">
            Ready for Release
          </div>
          <div className="text-3xl font-extrabold text-amber-600 mt-2">
            {adminRequests.filter((r) => r.status === "For Release").length}
          </div>
        </div>
        <div className="p-5 bg-white border border-slate-200 rounded-2xl shadow-xs">
          <div className="text-xs text-slate-500 font-semibold">
            Completed Documents
          </div>
          <div className="text-3xl font-extrabold text-emerald-600 mt-2">
            {adminRequests.filter((r) => r.status === "Released").length}
          </div>
        </div>
      </div>
    </div>
  );
}

export function AdminDashboard({ adminRequests = [] }) {
  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="bg-slate-800 text-white p-6 rounded-2xl shadow-sm">
        <h1 className="text-2xl font-bold">
          Registrar Administrative Dashboard
        </h1>
        <p className="text-xs text-slate-300 mt-1">
          Real-time overview of incoming student document requests.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="p-5 bg-white border border-slate-200 rounded-2xl shadow-xs">
          <div className="text-xs text-slate-500 font-semibold">
            Total Requests
          </div>
          <div className="text-2xl font-extrabold text-slate-800 mt-2">
            {adminRequests.length}
          </div>
        </div>
        <div className="p-5 bg-white border border-slate-200 rounded-2xl shadow-xs">
          <div className="text-xs text-slate-500 font-semibold">
            New Submissions
          </div>
          <div className="text-2xl font-extrabold text-blue-600 mt-2">
            {adminRequests.filter((r) => r.status === "Submits").length}
          </div>
        </div>
        <div className="p-5 bg-white border border-slate-200 rounded-2xl shadow-xs">
          <div className="text-xs text-slate-500 font-semibold">
            For Release
          </div>
          <div className="text-2xl font-extrabold text-amber-600 mt-2">
            {adminRequests.filter((r) => r.status === "For Release").length}
          </div>
        </div>
        <div className="p-5 bg-white border border-slate-200 rounded-2xl shadow-xs">
          <div className="text-xs text-slate-500 font-semibold">Released</div>
          <div className="text-2xl font-extrabold text-emerald-600 mt-2">
            {adminRequests.filter((r) => r.status === "Released").length}
          </div>
        </div>
      </div>
    </div>
  );
}

export function Announcements() {
  return (
    <div className="max-w-4xl mx-auto space-y-4">
      <h1 className="text-2xl font-bold text-slate-800">
        University Announcements
      </h1>
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <p className="text-sm font-semibold text-blue-900">
          Registrar Operations for AY 2025-2026
        </p>
        <p className="text-xs text-slate-500 mt-1">
          First-time requests per document type are free of charge. Online
          release requests require clearance validation.
        </p>
      </div>
    </div>
  );
}
