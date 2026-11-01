import React, { useState } from "react";
import {
  ClipboardList,
  Search,
  CheckSquare,
  Zap,
  RotateCcw,
  Check,
  X,
  Clock,
} from "lucide-react";

export default function AdminPortal({
  adminRequests = [],
  setAdminRequests,
  adminTabFilter = "All Requests",
  setAdminTabFilter,
  showToast,
}) {
  const [adminSearch, setAdminSearch] = useState("");
  const [docTypeFilter, setDocTypeFilter] = useState("All Types");
  const [adminStatusFilter, setAdminStatusFilter] = useState("All statuses");

  // Selection states
  const [selectedIds, setSelectedIds] = useState([]);
  const [lastCheckedIndex, setLastCheckedIndex] = useState(null);

  // Filter requests
  const filteredAdminRequests = adminRequests.filter((req) => {
    const matchesTab =
      adminTabFilter === "All Requests" || req.status === adminTabFilter;
    const matchesSearch =
      (req.studentName &&
        req.studentName.toLowerCase().includes(adminSearch.toLowerCase())) ||
      (req.studentId &&
        req.studentId.toLowerCase().includes(adminSearch.toLowerCase())) ||
      (req.docType &&
        req.docType.toLowerCase().includes(adminSearch.toLowerCase())) ||
      (req.id && req.id.toLowerCase().includes(adminSearch.toLowerCase()));
    const matchesDocType =
      docTypeFilter === "All Types" || req.docType?.includes(docTypeFilter);
    const matchesStatus =
      adminStatusFilter === "All statuses" || req.status === adminStatusFilter;
    return matchesTab && matchesSearch && matchesDocType && matchesStatus;
  });

  const isAllVisibleSelected =
    filteredAdminRequests.length > 0 &&
    filteredAdminRequests.every((req) => selectedIds.includes(req.id));

  const handleSelectAllVisible = () => {
    const visibleIds = filteredAdminRequests.map((r) => r.id);
    if (isAllVisibleSelected) {
      setSelectedIds(selectedIds.filter((id) => !visibleIds.includes(id)));
    } else {
      const combined = Array.from(new Set([...selectedIds, ...visibleIds]));
      setSelectedIds(combined);
    }
  };

  // Quick Preset: Select all "Submitted" status
  const handleSelectAllSubmitted = () => {
    const submitIds = adminRequests
      .filter((r) => r.status === "Submitted")
      .map((r) => r.id);
    setSelectedIds(Array.from(new Set([...selectedIds, ...submitIds])));
    showToast(`Selected all ${submitIds.length} submitted requests.`, "info");
  };

  const handleToggleRow = (reqId, index, event) => {
    let updatedSelected = [...selectedIds];

    if (event.nativeEvent.shiftKey && lastCheckedIndex !== null) {
      const start = Math.min(lastCheckedIndex, index);
      const end = Math.max(lastCheckedIndex, index);
      const rangeIds = filteredAdminRequests
        .slice(start, end + 1)
        .map((r) => r.id);

      if (updatedSelected.includes(reqId)) {
        updatedSelected = updatedSelected.filter(
          (id) => !rangeIds.includes(id),
        );
      } else {
        updatedSelected = Array.from(
          new Set([...updatedSelected, ...rangeIds]),
        );
      }
    } else {
      if (updatedSelected.includes(reqId)) {
        updatedSelected = updatedSelected.filter((id) => id !== reqId);
      } else {
        updatedSelected.push(reqId);
      }
    }

    setLastCheckedIndex(index);
    setSelectedIds(updatedSelected);
  };

  const handleStatusChange = (reqId, newStatus) => {
    if (setAdminRequests) {
      setAdminRequests((prev) =>
        prev.map((item) =>
          item.id === reqId ? { ...item, status: newStatus } : item,
        ),
      );
    }
    showToast(`Request ${reqId} updated to "${newStatus}"`);
  };

  const handleExecuteBatchUpdate = (newStatus) => {
    if (selectedIds.length === 0) return;

    if (setAdminRequests) {
      setAdminRequests((prev) =>
        prev.map((item) =>
          selectedIds.includes(item.id) ? { ...item, status: newStatus } : item,
        ),
      );
    }

    showToast(
      `Successfully updated ${selectedIds.length} request(s) to "${newStatus}"!`,
    );
    setSelectedIds([]);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-3 bg-[#0F3EAB] text-white rounded-lg shadow-sm">
            <ClipboardList className="w-7 h-7" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-800">
              Document Requests Management
            </h1>
            <p className="text-xs text-slate-500">
              Bulk select and process student requests efficiently.
            </p>
          </div>
        </div>
      </div>

      {/* ENHANCED BATCH ACTION TOOLBAR */}
      <div
        className={`p-4 rounded-2xl transition-all duration-200 border ${
          selectedIds.length > 0
            ? "bg-[#0F3EAB] text-white shadow-lg border-blue-800"
            : "bg-white text-slate-700 border-slate-200 shadow-sm"
        }`}
      >
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-3 w-full md:w-auto">
            <div
              className={`px-3 py-1.5 rounded-xl font-extrabold text-xs flex items-center space-x-1.5 ${
                selectedIds.length > 0
                  ? "bg-white text-[#0F3EAB]"
                  : "bg-slate-100 text-slate-600"
              }`}
            >
              <CheckSquare className="w-4 h-4" />
              <span>{selectedIds.length} selected</span>
            </div>

            <div className="flex items-center space-x-2 text-xs">
              <button
                onClick={handleSelectAllVisible}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition ${
                  selectedIds.length > 0
                    ? "bg-blue-800 text-white hover:bg-blue-700"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                {isAllVisibleSelected
                  ? "Deselect Visible"
                  : `Select All Visible (${filteredAdminRequests.length})`}
              </button>

              <button
                onClick={handleSelectAllSubmitted}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition flex items-center space-x-1 ${
                  selectedIds.length > 0
                    ? "bg-blue-800 text-white hover:bg-blue-700"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                <Zap className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                <span>Select All 'Submitted'</span>
              </button>

              {selectedIds.length > 0 && (
                <button
                  onClick={() => setSelectedIds([])}
                  className="px-2.5 py-1.5 text-blue-200 hover:text-white text-xs font-medium cursor-pointer underline flex items-center space-x-1"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Clear</span>
                </button>
              )}
            </div>
          </div>

          {/* Batch Status Action Buttons (Added Processing) */}
          <div className="flex flex-wrap items-center space-x-2 w-full md:w-auto justify-end">
            <span
              className={`text-xs font-semibold mr-1 ${selectedIds.length > 0 ? "text-blue-100" : "text-slate-500"}`}
            >
              Batch Update To:
            </span>

            <button
              onClick={() => handleExecuteBatchUpdate("Processing")}
              disabled={selectedIds.length === 0}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition shadow-xs cursor-pointer flex items-center space-x-1 ${
                selectedIds.length > 0
                  ? "bg-purple-600 hover:bg-purple-700 text-white"
                  : "bg-slate-200 text-slate-400 cursor-not-allowed"
              }`}
            >
              <Clock className="w-3.5 h-3.5" />
              <span>Processing</span>
            </button>

            <button
              onClick={() => handleExecuteBatchUpdate("For Release")}
              disabled={selectedIds.length === 0}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition shadow-xs cursor-pointer flex items-center space-x-1 ${
                selectedIds.length > 0
                  ? "bg-amber-500 hover:bg-amber-600 text-white"
                  : "bg-slate-200 text-slate-400 cursor-not-allowed"
              }`}
            >
              <Check className="w-3.5 h-3.5" />
              <span>For Release</span>
            </button>

            <button
              onClick={() => handleExecuteBatchUpdate("Released")}
              disabled={selectedIds.length === 0}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition shadow-xs cursor-pointer flex items-center space-x-1 ${
                selectedIds.length > 0
                  ? "bg-emerald-600 hover:bg-emerald-700 text-white"
                  : "bg-slate-200 text-slate-400 cursor-not-allowed"
              }`}
            >
              <Check className="w-3.5 h-3.5" />
              <span>Released</span>
            </button>

            <button
              onClick={() => handleExecuteBatchUpdate("Cancelled")}
              disabled={selectedIds.length === 0}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition shadow-xs cursor-pointer flex items-center space-x-1 ${
                selectedIds.length > 0
                  ? "bg-red-600 hover:bg-red-700 text-white"
                  : "bg-slate-200 text-slate-400 cursor-not-allowed"
              }`}
            >
              <X className="w-3.5 h-3.5" />
              <span>Cancel</span>
            </button>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center space-x-6 border-b border-slate-200 pb-2 overflow-x-auto text-xs">
        {[
          { name: "All Requests", count: adminRequests.length },
          {
            name: "Submitted",
            count: adminRequests.filter((r) => r.status === "Submitted").length,
          },
          {
            name: "Processing",
            count: adminRequests.filter((r) => r.status === "Processing")
              .length,
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
            onClick={() => {
              setAdminTabFilter(item.name);
              setSelectedIds([]);
            }}
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

      {/* Main Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-400" />
            <input
              type="text"
              value={adminSearch}
              onChange={(e) => setAdminSearch(e.target.value)}
              placeholder="Search request ID, student name, document..."
              className="w-full pl-8 pr-4 py-1.5 border border-slate-300 rounded-full focus:outline-none focus:ring-1 focus:ring-blue-600"
            />
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
              <option value="Processing">Processing</option>
              <option value="For Release">For Release</option>
              <option value="Released">Released</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>
        </div>

        <div className="border border-slate-200 rounded-xl overflow-hidden min-h-[300px]">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-xs font-semibold text-slate-600">
                <th className="py-3 px-4 w-10 text-center">
                  <input
                    type="checkbox"
                    checked={isAllVisibleSelected}
                    onChange={handleSelectAllVisible}
                    className="w-4 h-4 text-[#0F3EAB] rounded border-slate-300 focus:ring-blue-500 cursor-pointer"
                  />
                </th>
                <th className="py-3 px-4">Req ID</th>
                <th className="py-3 px-4">Student</th>
                <th className="py-3 px-4">Document Details</th>
                <th className="py-3 px-4">Fee Standing</th>
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4 text-center">Update Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {filteredAdminRequests.length > 0 ? (
                filteredAdminRequests.map((req, idx) => {
                  const isChecked = selectedIds.includes(req.id);
                  return (
                    <tr
                      key={req.id}
                      className={`transition ${
                        isChecked
                          ? "bg-blue-50/70 hover:bg-blue-100/60"
                          : "hover:bg-slate-50/80"
                      }`}
                    >
                      <td className="py-3 px-4 text-center">
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={(e) => handleToggleRow(req.id, idx, e)}
                          className="w-4 h-4 text-[#0F3EAB] rounded border-slate-300 focus:ring-blue-500 cursor-pointer"
                        />
                      </td>
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
                        <div className="text-[10px] text-slate-400">
                          {req.copies || 1} copy(ies) •{" "}
                          {req.delivery || "Pick-up"}
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <span
                          className={`inline-block text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                            req.fee === 0
                              ? "bg-emerald-100 text-emerald-800"
                              : "bg-amber-100 text-amber-800"
                          }`}
                        >
                          {req.fee === 0
                            ? "FREE (1st Request)"
                            : `₱${req.fee || 50}.00`}
                        </span>
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
                              : req.status === "Processing"
                                ? "bg-purple-100 text-purple-700"
                                : req.status === "For Release"
                                  ? "bg-amber-100 text-amber-700"
                                  : req.status === "Released"
                                    ? "bg-emerald-100 text-emerald-700"
                                    : "bg-red-100 text-red-700"
                          }`}
                        >
                          <option value="Submitted">Submitted</option>
                          <option value="Processing">Processing</option>
                          <option value="For Release">For Release</option>
                          <option value="Released">Released</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td
                    colSpan={7}
                    className="py-16 text-center text-slate-400 font-medium"
                  >
                    No requests found matching the active filter.
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
