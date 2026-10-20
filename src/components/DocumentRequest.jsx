import React, { useState } from "react";
import {
  ClipboardList,
  Plus,
  Minus,
  Filter,
  X,
  FileText,
  Upload,
  CheckCircle,
  Download,
  ShieldAlert,
} from "lucide-react";

const DOCUMENT_CATALOG = [
  {
    category: "---- Documents ----",
    items: ["Honorable Dismissal", "Form 137", "Diploma"],
  },
  {
    category: "---- Certificates & Clearances ----",
    items: [
      "Certificate of Enrollment",
      "Certificate of Grades",
      "Certificate of Good Moral",
      "Transcript of Records",
      "Student Clearance",
    ],
  },
];

export default function DocumentRequest({
  setActiveView,
  onSubmitRequest,
  showToast,
}) {
  const [selectedDocs, setSelectedDocs] = useState({});
  const [purpose, setPurpose] = useState("");
  const [delivery, setDelivery] = useState("Pick-up");
  const [submitting, setSubmitting] = useState(false);

  // Clearance Modal and Upload States
  const [showClearanceModal, setShowClearanceModal] = useState(false);
  const [uploadedClearance, setUploadedClearance] = useState(null);

  // Pre-filled Student Info for CMU Clearance Form MCG-CMU-OUR-FO-001
  const [clearanceForm, setClearanceForm] = useState({
    dateOfApplication: new Date().toISOString().split("T")[0],
    title: "Mr.",
    lastName: "Dela Cruz",
    firstName: "Juan",
    middleName: "Gonzales",
    maidenName: "N/A",
    studentNo: "2023-0142",
    address: "Malabon City, Metro Manila",
    dob: "2002-05-14",
    pob: "Malabon City",
    accountName: "juandelacruz@gmail.com",
    contactNo: "09123456789",
    program: "BSIT",
    lastSemAttended: "1st Sem AY 2025-2026",
    schoolLastAttended: "Malabon National High School",
    yearGraduated: "N/A",
  });

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

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploadedClearance(file);
      showToast("Clearance PDF attached successfully!", "success");
    }
  };

  const handleInitiateRequest = (e) => {
    e.preventDefault();
    const docNames = Object.keys(selectedDocs);

    if (docNames.length === 0 || !purpose) {
      showToast("Please select at least one document and a purpose.", "error");
      return;
    }

    // Opens the Clearance Modal step
    setShowClearanceModal(true);
  };

  // Generates and downloads a real .pdf file directly to the student's Downloads folder
  const handleDownloadClearancePDF = () => {
    showToast("Generating PDF Clearance Form...", "info");

    const element = document.createElement("div");
    element.style.padding = "24px";
    element.style.fontFamily = "Arial, sans-serif";
    element.style.color = "#1e293b";
    element.style.backgroundColor = "#ffffff";

    element.innerHTML = `
      <div style="text-align: center; border-bottom: 2px solid #0F3EAB; padding-bottom: 12px; margin-bottom: 16px;">
        <p style="margin: 0; font-size: 10px; color: #64748b; font-weight: bold; text-transform: uppercase;">REPUBLIC OF THE PHILIPPINES • CITY OF MALABON</p>
        <h1 style="color: #0F3EAB; margin: 4px 0; font-size: 20px; font-weight: bold;">CITY OF MALABON UNIVERSITY</h1>
        <p style="margin: 0; font-size: 12px; font-weight: bold; color: #334155;">STUDENT CLEARANCE (Form MCG-CMU-OUR-FO-001)</p>
      </div>

      <div style="background: #0F3EAB; color: white; padding: 5px 10px; font-weight: bold; font-size: 11px; text-transform: uppercase; margin-top: 15px; border-radius: 4px;">
        Student Personal Information
      </div>
      <table style="width: 100%; margin-top: 8px; font-size: 11px; border-collapse: collapse;">
        <tr>
          <td style="padding: 4px; font-weight: bold; color: #475569;">Date of Application: <span style="color: #0f172a;">${clearanceForm.dateOfApplication}</span></td>
          <td style="padding: 4px; font-weight: bold; color: #475569;">Student ID No.: <span style="color: #0f172a;">${clearanceForm.studentNo}</span></td>
          <td style="padding: 4px; font-weight: bold; color: #475569;">Title: <span style="color: #0f172a;">${clearanceForm.title}</span></td>
        </tr>
        <tr>
          <td style="padding: 4px; font-weight: bold; color: #475569;">Last Name: <span style="color: #0f172a;">${clearanceForm.lastName}</span></td>
          <td style="padding: 4px; font-weight: bold; color: #475569;">First Name: <span style="color: #0f172a;">${clearanceForm.firstName}</span></td>
          <td style="padding: 4px; font-weight: bold; color: #475569;">Middle Name: <span style="color: #0f172a;">${clearanceForm.middleName}</span></td>
        </tr>
      </table>

      <div style="background: #0F3EAB; color: white; padding: 5px 10px; font-weight: bold; font-size: 11px; text-transform: uppercase; margin-top: 15px; border-radius: 4px;">
        Academic Information
      </div>
      <table style="width: 100%; margin-top: 8px; font-size: 11px; border-collapse: collapse;">
        <tr>
          <td style="padding: 4px; font-weight: bold; color: #475569;">Program / Course: <span style="color: #0f172a;">${clearanceForm.program}</span></td>
          <td style="padding: 4px; font-weight: bold; color: #475569;">Last Semester Attended: <span style="color: #0f172a;">${clearanceForm.lastSemAttended}</span></td>
        </tr>
      </table>

      <div style="background: #0F3EAB; color: white; padding: 5px 10px; font-weight: bold; font-size: 11px; text-transform: uppercase; margin-top: 15px; border-radius: 4px;">
        Required Office Clearances
      </div>
      <table style="width: 100%; border-collapse: collapse; margin-top: 10px; font-size: 11px;">
        <thead>
          <tr style="background-color: #f8fafc;">
            <th style="border: 1px solid #cbd5e1; padding: 8px; text-align: left;">Office / Department</th>
            <th style="border: 1px solid #cbd5e1; padding: 8px; text-align: center;">Status</th>
            <th style="border: 1px solid #cbd5e1; padding: 8px; text-align: center; width: 40%;">Signature / Stamp</th>
          </tr>
        </thead>
        <tbody>
          <tr><td style="border: 1px solid #cbd5e1; padding: 8px;">University Library</td><td style="border: 1px solid #cbd5e1; padding: 8px; text-align: center; color: #059669; font-weight: bold;">CLEARED</td><td style="border: 1px solid #cbd5e1; padding: 8px;"></td></tr>
          <tr><td style="border: 1px solid #cbd5e1; padding: 8px;">Office of the Student Affairs</td><td style="border: 1px solid #cbd5e1; padding: 8px; text-align: center; color: #059669; font-weight: bold;">CLEARED</td><td style="border: 1px solid #cbd5e1; padding: 8px;"></td></tr>
          <tr><td style="border: 1px solid #cbd5e1; padding: 8px;">Finance Office</td><td style="border: 1px solid #cbd5e1; padding: 8px; text-align: center; color: #059669; font-weight: bold;">CLEARED</td><td style="border: 1px solid #cbd5e1; padding: 8px;"></td></tr>
          <tr><td style="border: 1px solid #cbd5e1; padding: 8px;">Program Chair</td><td style="border: 1px solid #cbd5e1; padding: 8px; text-align: center; color: #059669; font-weight: bold;">CLEARED</td><td style="border: 1px solid #cbd5e1; padding: 8px;"></td></tr>
          <tr><td style="border: 1px solid #cbd5e1; padding: 8px;">Dean</td><td style="border: 1px solid #cbd5e1; padding: 8px; text-align: center; color: #059669; font-weight: bold;">CLEARED</td><td style="border: 1px solid #cbd5e1; padding: 8px;"></td></tr>
        </tbody>
      </table>

      <table style="width: 100%; margin-top: 60px; font-size: 11px;">
        <tr>
          <td style="text-align: center; width: 45%;">
            <div style="border-top: 1px solid #334155; padding-top: 4px; font-weight: bold;">Signature over Printed Name of Student</div>
          </td>
          <td style="width: 10%;"></td>
          <td style="text-align: center; width: 45%;">
            <div style="border-top: 1px solid #334155; padding-top: 4px; font-weight: bold;">Registrar Authorized Representative</div>
          </td>
        </tr>
      </table>
    `;

    const generateAndSavePDF = () => {
      const opt = {
        margin: 0.3,
        filename: `CMU_Student_Clearance_${clearanceForm.studentNo}.pdf`,
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2, logging: false },
        jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
      };

      window
        .html2pdf()
        .set(opt)
        .from(element)
        .save()
        .then(() => {
          showToast(
            "Clearance Form saved as PDF to your Downloads folder!",
            "success",
          );
        });
    };

    if (window.html2pdf) {
      generateAndSavePDF();
    } else {
      const script = document.createElement("script");
      script.src =
        "https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js";
      script.onload = () => {
        generateAndSavePDF();
      };
      document.body.appendChild(script);
    }
  };

  const handleFinalSubmit = async () => {
    if (!uploadedClearance) {
      showToast(
        "Please attach your filled Student Clearance PDF to proceed.",
        "error",
      );
      return;
    }

    setSubmitting(true);
    const docNames = Object.keys(selectedDocs);
    const formattedDocs = docNames
      .map((doc) => `${doc} (${selectedDocs[doc].copies})`)
      .join(", ");
    const totalCopies = Object.values(selectedDocs).reduce(
      (sum, doc) => sum + doc.copies,
      0,
    );

    if (onSubmitRequest) {
      await onSubmitRequest({
        purpose: purpose,
        copies: totalCopies,
        delivery: delivery,
        docType: formattedDocs,
        clearanceFile: uploadedClearance.name,
        clearanceStatus: "Submitted for Review",
      });
    } else {
      showToast(
        "Document request submitted successfully with Clearance!",
        "success",
      );
      setActiveView("my-records");
    }

    setSubmitting(false);
    setShowClearanceModal(false);
    setSelectedDocs({});
    setPurpose("");
    setDelivery("Pick-up");
    setUploadedClearance(null);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
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
              Select documents and submit required clearance for processing.
            </p>
          </div>
        </div>
        <button
          onClick={() => setActiveView("my-records")}
          className="flex items-center space-x-1.5 px-3 py-1.5 bg-white border border-slate-300 rounded-full text-xs font-medium text-slate-700 hover:bg-slate-50 shadow-sm cursor-pointer"
        >
          <ClipboardList className="w-3.5 h-3.5" />
          <span>View my requests</span>
        </button>
      </div>

      <form
        onSubmit={handleInitiateRequest}
        className="bg-white rounded-2xl border border-slate-200 p-6 md:p-8 space-y-6 shadow-sm"
      >
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-3">
            Select Documents Needed <span className="text-red-500">*</span>
          </label>
          <div className="space-y-4">
            {DOCUMENT_CATALOG.map((group) => (
              <div
                key={group.category}
                className="border border-slate-200 rounded-xl p-4 bg-slate-50"
              >
                <div className="text-xs font-bold text-slate-500 mb-3 uppercase tracking-wider">
                  {group.category}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {group.items.map((doc) => (
                    <div
                      key={doc}
                      className={`flex items-center justify-between p-3 rounded-lg border ${
                        selectedDocs[doc]
                          ? "bg-blue-50 border-blue-300"
                          : "bg-white border-slate-200"
                      }`}
                    >
                      <label className="flex items-center space-x-3 cursor-pointer flex-1">
                        <input
                          type="checkbox"
                          checked={!!selectedDocs[doc]}
                          onChange={() => handleToggleDoc(doc)}
                          className="w-4 h-4 text-[#0F3EAB] rounded border-slate-300"
                        />
                        <span className="text-sm font-semibold text-slate-700">
                          {doc}
                        </span>
                      </label>
                      {selectedDocs[doc] && (
                        <div className="flex items-center space-x-2 bg-white border border-slate-300 rounded-md px-2 py-1">
                          <button
                            type="button"
                            onClick={() => handleUpdateCopies(doc, -1)}
                            className="p-1 hover:bg-slate-100 text-slate-600 rounded cursor-pointer"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-xs font-bold w-4 text-center text-slate-800">
                            {selectedDocs[doc].copies}
                          </span>
                          <button
                            type="button"
                            onClick={() => handleUpdateCopies(doc, 1)}
                            className="p-1 hover:bg-slate-100 text-slate-600 rounded cursor-pointer"
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
              Purpose <span className="text-red-500">*</span>
            </label>
            <select
              value={purpose}
              onChange={(e) => setPurpose(e.target.value)}
              className="w-full p-2.5 border border-slate-300 rounded-xl text-sm bg-white focus:outline-none focus:ring-1 focus:ring-blue-600"
              required
            >
              <option value="">-- Select Purpose --</option>
              <option value="Transfer Application">Transfer Application</option>
              <option value="Employment Requirement">
                Employment Requirement
              </option>
              <option value="Board Exam Requirement">
                Board Exam Requirement
              </option>
              <option value="Scholarship Application">
                Scholarship Application
              </option>
              <option value="Personal Copy">Personal Copy</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">
              Delivery Method <span className="text-red-500">*</span>
            </label>
            <select
              value={delivery}
              onChange={(e) => setDelivery(e.target.value)}
              className="w-full p-2.5 border border-slate-300 rounded-xl text-sm bg-white focus:outline-none focus:ring-1 focus:ring-blue-600"
            >
              <option value="Pick-up">Pick-up at Registrar's Office</option>
              <option value="Email">Email Digital Copy</option>
            </select>
          </div>
        </div>

        <div className="pt-2 flex items-center space-x-4">
          <button
            type="submit"
            className="px-6 py-2.5 bg-[#0F3EAB] hover:bg-blue-800 text-white font-medium rounded-xl text-xs flex items-center space-x-2 shadow-sm transition cursor-pointer"
          >
            <FileText className="w-4 h-4" />
            <span>Proceed to Student Clearance</span>
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

      {/* --- CMU STUDENT CLEARANCE MODAL --- */}
      {showClearanceModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-3xl w-full p-6 md:p-8 space-y-6 max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200">
            <div className="border-b pb-4 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <img
                  src="/cmu-logo.png"
                  alt="CMU Logo"
                  className="w-12 h-12 object-contain"
                />
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                    Republic of the Philippines • City of Malabon
                  </div>
                  <h2 className="text-lg font-bold text-[#0F3EAB]">
                    CITY OF MALABON UNIVERSITY
                  </h2>
                  <p className="text-xs font-semibold text-slate-600">
                    STUDENT CLEARANCE (Form MCG-CMU-OUR-FO-001)
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowClearanceModal(false)}
                className="text-slate-400 hover:text-slate-600 p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-xs text-amber-800 flex items-start space-x-2">
              <ShieldAlert className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
              <span>
                Every document request requires a completed Student Clearance
                form. Verify your information, download the PDF file to your
                computer, and attach your signed copy before submitting.
              </span>
            </div>

            <div className="space-y-4">
              <div className="text-xs font-bold text-white bg-[#0F3EAB] px-3 py-1.5 rounded-md uppercase tracking-wider">
                Student Personal Information
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                <div>
                  <label className="block font-semibold text-slate-600 mb-1">
                    Date of Application
                  </label>
                  <input
                    type="date"
                    value={clearanceForm.dateOfApplication}
                    onChange={(e) =>
                      setClearanceForm({
                        ...clearanceForm,
                        dateOfApplication: e.target.value,
                      })
                    }
                    className="w-full p-2 border rounded-lg"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-600 mb-1">
                    Student ID No.
                  </label>
                  <input
                    type="text"
                    value={clearanceForm.studentNo}
                    readOnly
                    className="w-full p-2 border rounded-lg bg-slate-100 font-bold"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-600 mb-1">
                    Title / Salutation
                  </label>
                  <select
                    value={clearanceForm.title}
                    onChange={(e) =>
                      setClearanceForm({
                        ...clearanceForm,
                        title: e.target.value,
                      })
                    }
                    className="w-full p-2 border rounded-lg bg-white"
                  >
                    <option value="Mr.">Mr.</option>
                    <option value="Ms.">Ms.</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-slate-600 mb-1">
                    Last Name (Surname)
                  </label>
                  <input
                    type="text"
                    value={clearanceForm.lastName}
                    onChange={(e) =>
                      setClearanceForm({
                        ...clearanceForm,
                        lastName: e.target.value,
                      })
                    }
                    className="w-full p-2 border rounded-lg"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-600 mb-1">
                    First Name
                  </label>
                  <input
                    type="text"
                    value={clearanceForm.firstName}
                    onChange={(e) =>
                      setClearanceForm({
                        ...clearanceForm,
                        firstName: e.target.value,
                      })
                    }
                    className="w-full p-2 border rounded-lg"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-600 mb-1">
                    Middle Name
                  </label>
                  <input
                    type="text"
                    value={clearanceForm.middleName}
                    onChange={(e) =>
                      setClearanceForm({
                        ...clearanceForm,
                        middleName: e.target.value,
                      })
                    }
                    className="w-full p-2 border rounded-lg"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="text-xs font-bold text-white bg-[#0F3EAB] px-3 py-1.5 rounded-md uppercase tracking-wider">
                Academic Information
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="block font-semibold text-slate-600 mb-1">
                    Program / Course
                  </label>
                  <input
                    type="text"
                    value={clearanceForm.program}
                    onChange={(e) =>
                      setClearanceForm({
                        ...clearanceForm,
                        program: e.target.value,
                      })
                    }
                    className="w-full p-2 border rounded-lg"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-600 mb-1">
                    Last Semester/Academic Year Attended
                  </label>
                  <input
                    type="text"
                    value={clearanceForm.lastSemAttended}
                    onChange={(e) =>
                      setClearanceForm({
                        ...clearanceForm,
                        lastSemAttended: e.target.value,
                      })
                    }
                    className="w-full p-2 border rounded-lg"
                  />
                </div>
              </div>

              <div className="border rounded-xl p-4 bg-slate-50 space-y-2 text-xs">
                <span className="font-bold text-slate-700 block mb-1">
                  Required Office Clearances:
                </span>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-slate-600">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                    <span>University Library</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Office of Student Affairs</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Finance Office</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Program Chair</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Dean</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t pt-4 space-y-4">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={handleDownloadClearancePDF}
                  className="w-full sm:w-auto px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl text-xs flex items-center justify-center space-x-2 border transition cursor-pointer"
                >
                  <Download className="w-4 h-4 text-blue-700" />
                  <span>Save Clearance PDF</span>
                </button>

                <div className="w-full sm:w-auto flex items-center space-x-2">
                  <label className="cursor-pointer bg-blue-50 border border-blue-300 hover:bg-blue-100 text-[#0F3EAB] px-4 py-2 rounded-xl text-xs font-bold flex items-center space-x-2 transition">
                    <Upload className="w-4 h-4" />
                    <span>
                      {uploadedClearance
                        ? uploadedClearance.name
                        : "Attach Signed Clearance PDF"}
                    </span>
                    <input
                      type="file"
                      accept=".pdf,.jpg,.png"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>

              <div className="flex items-center justify-end space-x-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowClearanceModal(false)}
                  className="px-5 py-2.5 bg-white border border-slate-300 text-slate-700 rounded-xl text-xs font-medium hover:bg-slate-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleFinalSubmit}
                  disabled={submitting || !uploadedClearance}
                  className={`px-6 py-2.5 text-white font-bold rounded-xl text-xs flex items-center space-x-2 transition shadow-md cursor-pointer ${
                    uploadedClearance
                      ? "bg-emerald-600 hover:bg-emerald-700"
                      : "bg-slate-400 cursor-not-allowed"
                  }`}
                >
                  <Filter className="w-3.5 h-3.5 rotate-90" />
                  <span>
                    {submitting ? "Submitting..." : "Submit Batch Request"}
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
