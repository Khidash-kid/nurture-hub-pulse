import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

type CommandItem = {
  label: string;
  path: string;
};

/*
  You can extend this list later without touching app logic
*/
const COMMANDS: CommandItem[] = [
  { label: "Dashboard", path: "/" },
  { label: "Attendance", path: "/attendance" },
  { label: "Leave Management", path: "/leave" },
  { label: "Employees", path: "/employees" },
  { label: "Reports", path: "/reports" }
];

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((v) => !v);
      }
    };

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  if (!open) return null;

  const filtered = COMMANDS.filter((c) =>
    c.label.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 200,
        background: "rgba(0,0,0,0.4)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      <div
        style={{
          width: 360,
          background: "#fff",
          borderRadius: 8,
          overflow: "hidden"
        }}
      >
        <input
          autoFocus
          placeholder="Type a command..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={{
            width: "100%",
            padding: 12,
            border: "none",
            outline: "none",
            borderBottom: "1px solid #eee"
          }}
        />

        <div style={{ maxHeight: 260, overflowY: "auto" }}>
          {filtered.map((item) => (
            <div
              key={item.path}
              onClick={() => {
                navigate(item.path);
                setOpen(false);
                setQuery("");
              }}
              style={{
                padding: "10px 12px",
                cursor: "pointer"
              }}
            >
              {item.label}
            </div>
          ))}

          {filtered.length === 0 && (
            <div style={{ padding: 12, fontSize: 13, color: "#666" }}>
              No matching command
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
