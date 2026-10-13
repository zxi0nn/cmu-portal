import React, { useState } from "react";
import { Folder, Search, Filter, Download, Eye, Upload } from "lucide-react";

export default function StudentRecords({
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
          <h1 className="text-2xl font-bold text-slate-800">My Records</h1>
        </div>
        <div className="flex items-center space-x-3">
          <div className="relative w-64 md:w-80">
            <Search className="w-4 h-4 absolute left-3 top-2 text-slate-400" />
            <input
              type="text"
              value={recordSearch}
              onChange={(e) => setRecordSearch(e.target.value)}
              placeholder="Find records, documents..."
              className="w-full pl-9 pr-4 py-1.5 border border-slate-300 rounded-full text-xs"
            />
          </div>
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
              className={`pb-3 px-6 text-sm font-semibold transition relative ${recordsTab === tab ? "text-[#0F3EAB]" : "text-slate-500 hover:text-slate-700"}`}
            >
              {tab}
              {recordsTab === tab && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#0F3EAB]" />
              )}
            </button>
          ))}
        </div>

        {recordsTab === "Academic Records" ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200 text-xs font-semibold text-slate-600">
                  <th className="py-3 px-4">Document Name</th>
                  <th className="py-3 px-4">Description</th>
                  <th className="py-3 px-4 text-center">Status</th>
                  <th className="py-3 px-4 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm">
                {filteredStudentRecords.map((doc) => (
                  <tr key={doc.id} className="hover:bg-slate-50/80">
                    <td className="py-3.5 px-4 font-medium text-slate-800">
                      {doc.name}
                    </td>
                    <td className="py-3.5 px-4 text-slate-500 text-xs">
                      {doc.description}
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      <span
                        className={`inline-flex items-center px-3 py-0.5 rounded-full text-xs font-semibold ${
                          doc.status === "Available"
                            ? "bg-emerald-500 text-white"
                            : doc.status === "Not Submitted"
                              ? "bg-red-500 text-white"
                              : doc.status === "Submitted"
                                ? "bg-blue-500 text-white"
                                : "bg-amber-500 text-white"
                        }`}
                      >
                        {doc.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      <div className="flex justify-center space-x-2 text-slate-400">
                        {doc.status === "Available" ? (
                          <>
                            <button
                              onClick={() =>
                                showToast(`Downloading ${doc.name}`)
                              }
                            >
                              <Download className="w-4 h-4 hover:text-blue-600" />
                            </button>
                            <button
                              onClick={() =>
                                showToast(`Previewing ${doc.name}`)
                              }
                            >
                              <Eye className="w-4 h-4 hover:text-blue-600" />
                            </button>
                          </>
                        ) : (
                          <button
                            onClick={() =>
                              showToast("Upload proof triggered", "info")
                            }
                          >
                            <Upload className="w-4 h-4 hover:text-blue-600" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="py-12 text-center text-slate-400 text-sm">
            No records found for tab "{recordsTab}".
          </div>
        )}
      </div>
    </div>
  );
}
