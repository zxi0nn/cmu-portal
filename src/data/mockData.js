export const INITIAL_STUDENT_RECORDS = [
  {
    id: "REC-001",
    name: "Certificate of Enrollment",
    description: "Official proof of current term enrollment",
    dateIssued: "10/12/25",
    status: "Available",
  },
  {
    id: "REC-002",
    name: "Form 137",
    description: "Permanent Student Record",
    dateIssued: "Pending",
    status: "Not Submitted",
  },
  {
    id: "REC-003",
    name: "Diploma",
    description: "Official University Diploma",
    dateIssued: "Pending",
    status: "Not Submitted",
  },
  {
    id: "REC-004",
    name: "Honorable Dismissal",
    description: "Transfer Credential",
    dateIssued: "02/18/26",
    status: "Submitted",
  },
  {
    id: "REC-005",
    name: "Transcript of Records",
    description: "Complete academic transcript",
    dateIssued: "Pending",
    status: "Not Submitted",
  },
];

export const INITIAL_ADMIN_REQUESTS = [
  {
    id: "REQ-1001",
    studentName: "Juan Dela Cruz",
    studentId: "2023-0142",
    docType: "Form 137 (1), Diploma (1)",
    purpose: "Transfer Application",
    delivery: "Pick-up",
    dateRequested: "May 02, 2026",
    status: "Submitted",
  },
];

export const DOCUMENT_CATALOG = [
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
