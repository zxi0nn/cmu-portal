import React, { useState } from "react";
import {
  ClipboardList,
  Plus,
  Minus,
  Filter,
  Upload,
  X,
  FileText,
  Download,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

export const DOCUMENT_CATALOG = [
  {
    category: "Certificates & Clearances",
    items: [
      "Certificate of Enrollment",
      "Certificate of Grades",
      "Transcript of Records",
      "Certificate of Good Moral",
    ],
  },
  {
    category: "Official Graduation & Transfer Records",
    items: ["Honorable Dismissal", "Form 137", "Diploma"],
  },
];

export default function DocumentRequest({
  setActiveView,
  onSubmitRequest,
  adminRequests = [],
  showToast,
}) {
  const [selectedDocs, setSelectedDocs] = useState({});
  const [purpose, setPurpose] = useState("");
  const [delivery, setDelivery] = useState("Pick-up");

  // Modal State
  const [showModal, setShowModal] = useState(false);
  const [modalForm, setModalForm] = useState({
    dateOfApplication: "2026-10-20",
    studentId: "2023-0142",
    salutation: "Mr.",
    lastName: "Dela Cruz",
    firstName: "Juan",
    middleName: "Gonzales",
    program: "BSIT",
    lastSemester: "1st Sem AY 2025-2026",
  });
  const [clearanceFile, setClearanceFile] = useState(null);

  // Check historical requests for document type fee evaluation
  const hasRequestedBefore = (docName) => {
    return adminRequests.some(
      (req) =>
        req.docType?.toLowerCase().includes(docName.toLowerCase()) &&
        req.status !== "Cancelled",
    );
  };

  const handleToggleDoc = (docName) => {
    const updated = { ...selectedDocs };
    if (updated[docName]) {
      delete updated[docName];
    } else {
      updated[docName] = { copies: 1 };
    }
    setSelectedDocs(updated);
  };

  const handleUpdateCopies = (docName, delta) => {
    if (!selectedDocs[docName]) return;
    const current = selectedDocs[docName].copies;
    const newCount = current + delta;
    if (newCount >= 1) {
      setSelectedDocs({
        ...selectedDocs,
        [docName]: { copies: newCount },
      });
    }
  };

  const selectedDocKeys = Object.keys(selectedDocs);

  // Calculate itemized fees: 1st request 1st copy is FREE; extra copies & repeat requests are ₱50/copy
  const calculatedItems = selectedDocKeys.map((docName) => {
    const copies = selectedDocs[docName].copies;
    const isRepeat = hasRequestedBefore(docName);

    let itemFee = 0;
    if (isRepeat) {
      itemFee = copies * 50;
    } else {
      itemFee = Math.max(0, copies - 1) * 50;
    }

    return {
      docName,
      copies,
      isRepeat,
      itemFee,
    };
  });

  const totalFee = calculatedItems.reduce((sum, item) => sum + item.itemFee, 0);

  // Trigger Pop-up Modal when student clicks initial Submit
  const handleOpenModalPrompt = (e) => {
    e.preventDefault();

    if (selectedDocKeys.length === 0) {
      showToast("Please select at least one document to request.", "error");
      return;
    }

    if (!purpose) {
      showToast("Please select a purpose for your request.", "error");
      return;
    }

    setShowModal(true);
  };

  // Finalize Submission from inside Pop-Up Modal
  const handleFinalBatchSubmit = () => {
    if (!clearanceFile) {
      showToast(
        "Please attach your signed Student Clearance PDF before submitting.",
        "error",
      );
      return;
    }

    const docTypeSummary = calculatedItems
      .map(
        (item) =>
          `${item.docName} (${item.copies} ${item.copies > 1 ? "copies" : "copy"})`,
      )
      .join(", ");

    const payload = {
      docType: docTypeSummary,
      purpose,
      delivery,
      fee: totalFee,
      items: calculatedItems,
      copies: calculatedItems.reduce((acc, curr) => acc + curr.copies, 0),
      clearanceFile: clearanceFile.name,
      clearanceStatus: "Submitted for Review",
      studentDetails: modalForm,
    };

    onSubmitRequest(payload);
    setShowModal(false);
  };

  // Dynamic Browser PDF Download Trigger
  const handleSaveClearancePDF = () => {
    const clearanceText = `
================================================================================
                        CITY OF MALABON UNIVERSITY
                        OFFICIAL STUDENT CLEARANCE
================================================================================

APPLICATION DETAILS:
--------------------------------------------------------------------------------
Date of Application : ${modalForm.dateOfApplication}
Student ID Number   : ${modalForm.studentId}
Salutation / Name   : ${modalForm.salutation} ${modalForm.firstName} ${modalForm.middleName} ${modalForm.lastName}
Program / Course    : ${modalForm.program}
Last Term Attended  : ${modalForm.lastSemester}

DEPARTMENT CLEARANCE VERIFICATIONS:
--------------------------------------------------------------------------------
[✓] University Library         : APPROVED / CLEARED
[✓] Office of Student Affairs  : APPROVED / CLEARED
[✓] Finance Office             : APPROVED / CLEARED
[✓] Program Chair              : APPROVED / CLEARED
[✓] Dean                       : APPROVED / CLEARED

REQUESTED DOCUMENTS SUMMARY:
--------------------------------------------------------------------------------
${calculatedItems.map((item, idx) => `${idx + 1}.${item.docName} - ${item.copies} copy(ies) [Fee:${item.itemFee === 0 ? "FREE" : `₱${item.itemFee}.00`}]`).join("\n")}

Total Fee Standing: ${totalFee === 0 ? "FREE (1st Request)" : `₱${totalFee}.00`}

--------------------------------------------------------------------------------
AUTHORIZATION & SIGNATURES:
--------------------------------------------------------------------------------

Student Signature: ___________________________   Date: ______________

Registrar Officer: ___________________________   Date: ______________

================================================================================
           Official Copy Generated by CMU Registrar Student Portal
================================================================================
`;

    const blob = new Blob([clearanceText], { type: "application/pdf" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    const filename = `CMU_Clearance_${modalForm.lastName.replace(/\s+/g, "_")}_${modalForm.studentId}.pdf`;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    showToast(
      `Downloaded ${filename}! Attach this file below to complete submission.`,
    );
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 relative">
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
              Select documents, set copy counts, and verify clearance on
              submission.
            </p>
          </div>
        </div>

        <button
          onClick={() => setActiveView("track-requests")}
          className="flex items-center space-x-1.5 px-3 py-1.5 bg-white border border-slate-300 rounded-full text-xs font-medium text-slate-700 hover:bg-slate-50 shadow-sm cursor-pointer"
        >
          <ClipboardList className="w-3.5 h-3.5" />
          <span>Track my requests</span>
        </button>
      </div>

      {/* Main Request Form */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 md:p-8">
        <form onSubmit={handleOpenModalPrompt} className="space-y-6">
          {/* Multi-Document Selection Grid */}
          <div>
            <label className="block text-xs font-bold text-slate-800 mb-1">
              Select Document(s) & Set Copy Count{" "}
              <span className="text-red-500">*</span>
            </label>
            <p className="text-[11px] text-slate-500 mb-3">
              Check the documents you need and adjust the copy count for each
              document.
            </p>

            <div className="space-y-4">
              {DOCUMENT_CATALOG.map((group) => (
                <div
                  key={group.category}
                  className="border border-slate-200 rounded-xl p-4 bg-slate-50/60"
                >
                  <div className="text-xs font-bold text-[#0F3EAB] uppercase tracking-wider mb-3 flex items-center space-x-1.5">
                    <FileText className="w-4 h-4 text-[#0F3EAB]" />
                    <span>{group.category}</span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {group.items.map((docName) => {
                      const isSelected = !!selectedDocs[docName];
                      const isRepeat = hasRequestedBefore(docName);
                      const currentCopies = selectedDocs[docName]?.copies || 1;

                      return (
                        <div
                          key={docName}
                          className={`p-3.5 rounded-xl border transition flex flex-col justify-between space-y-2 ${
                            isSelected
                              ? "bg-blue-50/80 border-blue-400 shadow-xs"
                              : "bg-white border-slate-200 hover:border-slate-300"
                          }`}
                        >
                          <div className="flex items-start justify-between">
                            <label className="flex items-start space-x-2.5 cursor-pointer select-none flex-1 pr-2">
                              <input
                                type="checkbox"
                                checked={isSelected}
                                onChange={() => handleToggleDoc(docName)}
                                className="mt-0.5 w-4 h-4 text-[#0F3EAB] rounded border-slate-300 focus:ring-blue-500 cursor-pointer"
                              />
                              <div>
                                <span className="text-xs font-bold text-slate-800 block">
                                  {docName}
                                </span>
                                <span
                                  className={`inline-block mt-0.5 text-[10px] font-semibold px-2 py-0.2 rounded-full ${
                                    isRepeat
                                      ? "bg-amber-100 text-amber-800"
                                      : "bg-emerald-100 text-emerald-800"
                                  }`}
                                >
                                  {isRepeat
                                    ? "💳 Repeat Request (₱50/copy)"
                                    : "🆓 1st Request (1st Copy FREE)"}
                                </span>
                              </div>
                            </label>
                          </div>

                          {isSelected && (
                            <div className="pt-2 border-t border-blue-200/60 flex items-center justify-between">
                              <span className="text-[11px] font-medium text-slate-600">
                                Copies needed:
                              </span>
                              <div className="inline-flex items-center border border-slate-300 rounded-lg bg-white overflow-hidden shadow-xs">
                                <button
                                  type="button"
                                  onClick={() =>
                                    handleUpdateCopies(docName, -1)
                                  }
                                  className="px-2.5 py-1 text-slate-600 hover:bg-slate-100 cursor-pointer"
                                >
                                  <Minus className="w-3 h-3" />
                                </button>
                                <span className="px-3 py-0.5 text-xs font-bold text-slate-800">
                                  {currentCopies}
                                </span>
                                <button
                                  type="button"
                                  onClick={() => handleUpdateCopies(docName, 1)}
                                  className="px-2.5 py-1 text-slate-600 hover:bg-slate-100 cursor-pointer"
                                >
                                  <Plus className="w-3 h-3" />
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Itemized Fee Breakdown Summary */}
          {selectedDocKeys.length > 0 && (
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 md:p-5 space-y-3">
              <h3 className="text-xs font-bold text-slate-800 border-b border-slate-200 pb-2 flex items-center justify-between">
                <span>Selected Documents Fee Summary</span>
                <span className="text-[#0F3EAB] font-extrabold text-sm">
                  Total: {totalFee === 0 ? "FREE" : `₱${totalFee}.00`}
                </span>
              </h3>

              <div className="space-y-2 text-xs">
                {calculatedItems.map((item) => (
                  <div
                    key={item.docName}
                    className="flex items-center justify-between py-1 border-b border-slate-100 last:border-0"
                  >
                    <div>
                      <span className="font-semibold text-slate-800">
                        {item.docName}
                      </span>
                      <span className="text-slate-500 ml-2">
                        ({item.copies} {item.copies > 1 ? "copies" : "copy"})
                      </span>
                      <span className="ml-2 text-[10px] text-slate-400">
                        {item.isRepeat
                          ? "• Subsequent Request"
                          : "• 1st Request (1st copy Free)"}
                      </span>
                    </div>
                    <span className="font-bold text-slate-700">
                      {item.itemFee === 0 ? "FREE" : `₱${item.itemFee}.00`}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Purpose Selection */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Purpose <span className="text-red-500">*</span>
            </label>
            <select
              value={purpose}
              onChange={(e) => setPurpose(e.target.value)}
              className="w-full px-4 py-2.5 bg-white border border-slate-300 rounded-full text-xs text-slate-700 focus:outline-none focus:ring-1 focus:ring-blue-600"
              required
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

          {/* Delivery Options */}
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
                  checked={delivery === "Pick-up"}
                  onChange={(e) => setDelivery(e.target.value)}
                  className="text-[#0F3EAB] focus:ring-blue-500"
                />
                <span>Pick-up (Registrar's Office)</span>
              </label>

              <label className="flex items-center space-x-2.5 text-slate-700 cursor-pointer">
                <input
                  type="radio"
                  name="delivery"
                  value="Email"
                  checked={delivery === "Email"}
                  onChange={(e) => setDelivery(e.target.value)}
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
              <span>
                Submit Request ({selectedDocKeys.length} Doc
                {selectedDocKeys.length !== 1 ? "s" : ""} •{" "}
                {totalFee === 0 ? "FREE" : `₱${totalFee}.00`})
              </span>
            </button>

            <button
              type="button"
              onClick={() => {
                setSelectedDocs({});
                setPurpose("");
                setDelivery("Pick-up");
              }}
              className="px-6 py-2.5 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 font-medium rounded-xl text-xs flex items-center space-x-1.5 transition cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
              <span>Clear Form</span>
            </button>
          </div>
        </form>
      </div>

      {/* POP-UP MODAL PROMPT FOR STUDENT CLEARANCE FORM */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-2xl w-full p-6 md:p-8 space-y-5 animate-fadeIn my-8">
            {/* Top Warning Banner */}
            <div className="p-3.5 bg-amber-50 border border-amber-200 rounded-xl text-amber-900 text-xs flex items-start space-x-2.5">
              <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <p className="leading-snug">
                Every document request requires a completed Student Clearance
                form. Verify your information below, save the form, and attach
                your signed copy before submitting.
              </p>
            </div>

            {/* Student Personal Information Header & Fields */}
            <div className="space-y-3">
              <div className="bg-[#0F3EAB] text-white text-xs font-bold uppercase tracking-wider py-2 px-4 rounded-lg">
                STUDENT PERSONAL INFORMATION
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                <div>
                  <label className="block text-slate-600 font-semibold mb-1">
                    Date of Application
                  </label>
                  <input
                    type="date"
                    value={modalForm.dateOfApplication}
                    onChange={(e) =>
                      setModalForm({
                        ...modalForm,
                        dateOfApplication: e.target.value,
                      })
                    }
                    className="w-full px-3 py-1.5 border border-slate-300 rounded-lg text-slate-800 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-slate-600 font-semibold mb-1">
                    Student ID No.
                  </label>
                  <input
                    type="text"
                    value={modalForm.studentId}
                    onChange={(e) =>
                      setModalForm({ ...modalForm, studentId: e.target.value })
                    }
                    className="w-full px-3 py-1.5 border border-slate-300 rounded-lg bg-slate-50 text-slate-800 font-bold"
                  />
                </div>

                <div>
                  <label className="block text-slate-600 font-semibold mb-1">
                    Title / Salutation
                  </label>
                  <select
                    value={modalForm.salutation}
                    onChange={(e) =>
                      setModalForm({ ...modalForm, salutation: e.target.value })
                    }
                    className="w-full px-3 py-1.5 border border-slate-300 rounded-lg text-slate-800"
                  >
                    <option value="Mr.">Mr.</option>
                    <option value="Ms.">Ms.</option>
                    <option value="Mrs.">Mrs.</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-600 font-semibold mb-1">
                    Last Name (Surname)
                  </label>
                  <input
                    type="text"
                    value={modalForm.lastName}
                    onChange={(e) =>
                      setModalForm({ ...modalForm, lastName: e.target.value })
                    }
                    className="w-full px-3 py-1.5 border border-slate-300 rounded-lg text-slate-800"
                  />
                </div>

                <div>
                  <label className="block text-slate-600 font-semibold mb-1">
                    First Name
                  </label>
                  <input
                    type="text"
                    value={modalForm.firstName}
                    onChange={(e) =>
                      setModalForm({ ...modalForm, firstName: e.target.value })
                    }
                    className="w-full px-3 py-1.5 border border-slate-300 rounded-lg text-slate-800"
                  />
                </div>

                <div>
                  <label className="block text-slate-600 font-semibold mb-1">
                    Middle Name
                  </label>
                  <input
                    type="text"
                    value={modalForm.middleName}
                    onChange={(e) =>
                      setModalForm({ ...modalForm, middleName: e.target.value })
                    }
                    className="w-full px-3 py-1.5 border border-slate-300 rounded-lg text-slate-800"
                  />
                </div>
              </div>
            </div>

            {/* Academic Information Header & Fields */}
            <div className="space-y-3">
              <div className="bg-[#0F3EAB] text-white text-xs font-bold uppercase tracking-wider py-2 px-4 rounded-lg">
                ACADEMIC INFORMATION
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="block text-slate-600 font-semibold mb-1">
                    Program / Course
                  </label>
                  <input
                    type="text"
                    value={modalForm.program}
                    onChange={(e) =>
                      setModalForm({ ...modalForm, program: e.target.value })
                    }
                    className="w-full px-3 py-1.5 border border-slate-300 rounded-lg text-slate-800"
                  />
                </div>

                <div>
                  <label className="block text-slate-600 font-semibold mb-1">
                    Last Semester/Academic Year Attended
                  </label>
                  <input
                    type="text"
                    value={modalForm.lastSemester}
                    onChange={(e) =>
                      setModalForm({
                        ...modalForm,
                        lastSemester: e.target.value,
                      })
                    }
                    className="w-full px-3 py-1.5 border border-slate-300 rounded-lg text-slate-800"
                  />
                </div>
              </div>

              {/* Office Clearances Indicators */}
              <div className="p-3.5 border border-slate-300 rounded-xl bg-slate-50 space-y-2">
                <span className="text-xs font-bold text-slate-700 block">
                  Required Office Clearances:
                </span>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-xs font-medium text-slate-700">
                  <div className="flex items-center space-x-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>University Library</span>
                  </div>
                  <div className="flex items-center space-x-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Office of Student Affairs</span>
                  </div>
                  <div className="flex items-center space-x-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Finance Office</span>
                  </div>
                  <div className="flex items-center space-x-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Program Chair</span>
                  </div>
                  <div className="flex items-center space-x-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Dean</span>
                  </div>
                </div>
              </div>
            </div>

            <hr className="border-slate-200" />

            {/* Bottom Modal Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-1">
              <button
                type="button"
                onClick={handleSaveClearancePDF}
                className="w-full sm:w-auto px-4 py-2 border border-slate-300 hover:bg-slate-50 rounded-xl text-xs font-bold text-slate-700 flex items-center justify-center space-x-2 transition cursor-pointer"
              >
                <Download className="w-4 h-4 text-slate-600" />
                <span>Save Clearance PDF</span>
              </button>

              <div className="flex items-center space-x-2 w-full sm:w-auto">
                <label className="flex-1 sm:flex-none px-4 py-2 bg-blue-50 border border-blue-300 hover:bg-blue-100 text-[#0F3EAB] rounded-xl text-xs font-bold flex items-center justify-center space-x-2 transition cursor-pointer shadow-xs">
                  <Upload className="w-4 h-4" />
                  <span>
                    {clearanceFile
                      ? clearanceFile.name
                      : "Attach Signed Clearance PDF"}
                  </span>
                  <input
                    type="file"
                    accept=".pdf"
                    className="hidden"
                    onChange={(e) => {
                      if (e.target.files?.[0]) {
                        setClearanceFile(e.target.files[0]);
                        showToast(`Attached: ${e.target.files[0].name}`);
                      }
                    }}
                  />
                </label>
              </div>
            </div>

            <div className="flex items-center justify-end space-x-3 pt-2">
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="px-5 py-2.5 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 font-semibold rounded-xl text-xs transition cursor-pointer"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleFinalBatchSubmit}
                className="px-6 py-2.5 bg-[#0F3EAB] hover:bg-blue-800 text-white font-bold rounded-xl text-xs flex items-center space-x-2 shadow-md transition cursor-pointer"
              >
                <Filter className="w-3.5 h-3.5 rotate-90" />
                <span>Submit Batch Request</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
