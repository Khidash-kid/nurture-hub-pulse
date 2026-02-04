import { useState } from "react";
import { useHotkey } from "./useHotKey";

export function ShortcutHelp() {
  const [open, setOpen] = useState(false);

  useHotkey("?", () => setOpen(true));
  useHotkey("Escape", () => setOpen(false));

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
      <div className="bg-background rounded-lg p-6 w-[360px] shadow-xl">
        <h2 className="text-lg font-semibold mb-3">Keyboard Shortcuts</h2>

        <ul className="space-y-2 text-sm">
          <li><b>?</b> – Open this panel</li>
          <li><b>Esc</b> – Close panel</li>
        </ul>

        <button
          onClick={() => setOpen(false)}
          className="mt-4 w-full rounded-md border px-3 py-2 text-sm"
        >
          Close
        </button>
      </div>
    </div>
  );
}
