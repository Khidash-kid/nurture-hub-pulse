import { useState } from "react";
import { useLocation } from "react-router-dom";

type BugReport = {
  message: string;
  page: string;
  userAgent: string;
  time: string;
};

const STORAGE_KEY = "nhp_bug_reports";

function saveReport(report: BugReport) {
  const raw = localStorage.getItem(STORAGE_KEY);
  const list = raw ? JSON.parse(raw) : [];
  list.push(report);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
}

export function BugReportWidget() {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const location = useLocation();

  const submit = () => {
    if (!message.trim()) return;

    saveReport({
      message,
      page: location.pathname,
      userAgent: navigator.userAgent,
      time: new Date().toISOString()
    });

    setMessage("");
    setOpen(false);
    alert("Feedback sent successfully");
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setOpen(true)}
        style={{
          position: "fixed",
          bottom: 20,
          left: 20,
          zIndex: 50,
          padding: "10px 14px",
          borderRadius: 999,
          border: "none",
          background: "#2563eb",
          color: "white",
          cursor: "pointer",
          fontSize: 14
        }}
      >
        Report
      </button>

      {/* Modal */}
      {open && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.4)",
            zIndex: 100,
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <div
            style={{
              width: 340,
              background: "white",
              borderRadius: 8,
              padding: 16
            }}
          >
            <h3 style={{ marginBottom: 8 }}>Report an issue</h3>

            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Describe the problem..."
              style={{
                width: "100%",
                height: 90,
                padding: 8,
                resize: "none"
              }}
            />

            <div
              style={{
                marginTop: 12,
                display: "flex",
                gap: 8,
                justifyContent: "flex-end"
              }}
            >
              <button onClick={() => setOpen(false)}>Cancel</button>
              <button onClick={submit}>Submit</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

/* Optional helpers for later use */
export function getAllBugReports(): BugReport[] {
  const raw = localStorage.getItem(STORAGE_KEY);
  return raw ? JSON.parse(raw) : [];
}
