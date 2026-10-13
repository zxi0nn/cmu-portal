import React, { useState } from "react";
import { ClipboardList, Search, Filter } from "lucide-react";

export default function AdminPortal({
  adminRequests,
  setAdminRequests,
  showToast,
}) {
  const [adminSearch, setAdminSearch] = useState("");
  const [docTypeFilter, setDocTypeFilter] = useState("All Types");
  const [adminStatusFilter, setAdminStatusFilter] = useState("All statuses");
  const [adminTabFilter, setAdminTabFilter] = useState("All Requests");

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
            Document Requests
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
            name: "Submitted",
            count: adminRequests.filter((r) => r.status === "Submitted").length,
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
            <Search className="w-3.5 h-3.5 absolute left-3 top-2 text-slate-400" />
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
              <option value="Submitted">Submitted</option>
              <option value="For Release">For Release</option>
              <option value="Released">Released</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>

          <button className="flex items-center space-x-1.5 px-3 py-1.5 border border-slate-300 rounded-full bg-white text-slate-600 hover:bg-slate-50">
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
                      {req.copies || 1} copy(ies) •{" "}
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
                          req.status === "Submitted"
                            ? "bg-blue-100 text-blue-700"
                            : req.status === "For Release"
                              ? "bg-amber-100 text-amber-700"
                              : req.status === "Released"
                                ? "bg-emerald-100 text-emerald-700"
                                : "bg-red-100 text-red-700"
                        }`}
                      >
                        <option value="Submitted">Submitted</option>
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
