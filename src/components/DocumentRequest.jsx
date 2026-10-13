import React, { useState } from "react";
import { ClipboardList, Plus, Minus, X, Filter } from "lucide-react";
import { DOCUMENT_CATALOG } from "../data/mockData";

export default function DocumentRequest({
  setActiveView,
  adminRequests,
  setAdminRequests,
  showToast,
}) {
  const [selectedDocs, setSelectedDocs] = useState({});
  const [purpose, setPurpose] = useState("");
  const [delivery, setDelivery] = useState("Pick-up");

  const handleToggleDoc = (docName) => {
    const updated = { ...selectedDocs };
    if (updated[docName]) {
      delete updated[docName];
    } else {
      updated[docName] = { copies: 1 };
    }
    setSelectedDocs(updated);
  };

  const handleUpdateCopies = (docName, amount) => {
    const current = selectedDocs[docName].copies;
    if (current + amount > 0) {
      setSelectedDocs({
        ...selectedDocs,
        [docName]: { copies: current + amount },
      });
    }
  };

  const handleCreateRequest = (e) => {
    e.preventDefault();
    const docNames = Object.keys(selectedDocs);

    if (docNames.length === 0 || !purpose) {
      showToast("Please select at least one document and a purpose.", "error");
      return;
    }

    const formattedDocs = docNames
      .map((doc) => `${doc} (${selectedDocs[doc].copies})`)
      .join(", ");

    const newRequest = {
      id: `REQ-${Math.floor(1000 + Math.random() * 9000)}`,
      studentName: "Juan Dela Cruz",
      studentId: "2023-0142",
      docType: formattedDocs,
      purpose: purpose,
      copies: 1, // Handled in string above
      delivery: delivery,
      dateRequested: new Date().toLocaleDateString(),
      status: "Submitted",
    };

    setAdminRequests([newRequest, ...adminRequests]);
    showToast("Bulk document request submitted successfully!");
    setActiveView("my-records");
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center space-x-3">
        <div className="p-3 bg-[#0F3EAB] text-white rounded-lg shadow-sm">
          <ClipboardList className="w-7 h-7" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-slate-800">
            Bulk Document Request
          </h1>
          <p className="text-xs text-slate-500">
            Select multiple documents to request in a single transaction.
          </p>
        </div>
      </div>

      <form
        onSubmit={handleCreateRequest}
        className="bg-white rounded-2xl border p-6 md:p-8 space-y-6 shadow-sm"
      >
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-3">
            Select Documents Needed <span className="text-red-500">*</span>
          </label>
          <div className="space-y-4">
            {DOCUMENT_CATALOG.map((group) => (
              <div
                key={group.category}
                className="border rounded-xl p-4 bg-slate-50"
              >
                <div className="text-xs font-bold text-slate-500 mb-3 uppercase tracking-wider">
                  {group.category}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {group.items.map((doc) => (
                    <div
                      key={doc}
                      className={`flex items-center justify-between p-3 rounded-lg border ${selectedDocs[doc] ? "bg-blue-50 border-blue-300" : "bg-white border-slate-200"}`}
                    >
                      <label className="flex items-center space-x-3 cursor-pointer flex-1">
                        <input
                          type="checkbox"
                          checked={!!selectedDocs[doc]}
                          onChange={() => handleToggleDoc(doc)}
                          className="w-4 h-4 text-[#0F3EAB] rounded border-slate-300"
                        />
                        <span className="text-sm font-semibold">{doc}</span>
                      </label>
                      {selectedDocs[doc] && (
                        <div className="flex items-center space-x-2 bg-white border rounded-md px-2 py-1">
                          <button
                            type="button"
                            onClick={() => handleUpdateCopies(doc, -1)}
                            className="p-1 hover:bg-slate-100"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-xs font-bold w-4 text-center">
                            {selectedDocs[doc].copies}
                          </span>
                          <button
                            type="button"
                            onClick={() => handleUpdateCopies(doc, 1)}
                            className="p-1 hover:bg-slate-100"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">
              Purpose
            </label>
            <select
              value={purpose}
              onChange={(e) => setPurpose(e.target.value)}
              className="w-full p-2.5 border border-slate-300 rounded-xl text-sm"
              required
            >
              <option value="">-- Select Purpose --</option>
              <option value="Transfer Application">Transfer Application</option>
              <option value="Employment">Employment</option>
              <option value="Board Exam">Board Exam</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">
              Delivery Method
            </label>
            <select
              value={delivery}
              onChange={(e) => setDelivery(e.target.value)}
              className="w-full p-2.5 border border-slate-300 rounded-xl text-sm"
            >
              <option value="Pick-up">Pick-up at Registrar's Office</option>
              <option value="Email">Email Digital Copy</option>
            </select>
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-[#0F3EAB] hover:bg-blue-800 text-white font-bold rounded-xl shadow-md transition flex items-center justify-center space-x-2"
        >
          <Filter className="w-4 h-4 rotate-90" />
          <span>Submit Request Batch</span>
        </button>
      </form>
    </div>
  );
}
