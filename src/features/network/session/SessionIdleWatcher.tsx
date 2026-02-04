import { useEffect, useRef, useState } from "react";

type Props = {
  idleAfterMs?: number;     // default 5 min
  warningBeforeMs?: number; // default 30 sec
};

export function SessionIdleWatcher({
  idleAfterMs = 5 * 60 * 1000,
  warningBeforeMs = 30 * 1000
}: Props) {
  const [showWarning, setShowWarning] = useState(false);
  const timerRef = useRef<number>();
  const warningTimerRef = useRef<number>();

  const resetTimers = () => {
    window.clearTimeout(timerRef.current);
    window.clearTimeout(warningTimerRef.current);

    setShowWarning(false);

    warningTimerRef.current = window.setTimeout(() => {
      setShowWarning(true);
    }, idleAfterMs - warningBeforeMs);

    timerRef.current = window.setTimeout(() => {
      // later you can connect logout here
      console.warn("User session expired due to inactivity");
      setShowWarning(false);
    }, idleAfterMs);
  };

  useEffect(() => {
    const events = [
      "mousemove",
      "keydown",
      "click",
      "scroll",
      "touchstart"
    ];

    events.forEach((e) =>
      window.addEventListener(e, resetTimers)
    );

    resetTimers();

    return () => {
      events.forEach((e) =>
        window.removeEventListener(e, resetTimers)
      );
      window.clearTimeout(timerRef.current);
      window.clearTimeout(warningTimerRef.current);
    };
  }, []);

  if (!showWarning) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 200,
        background: "rgba(0,0,0,0.45)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      <div
        style={{
          background: "#fff",
          padding: 20,
          borderRadius: 8,
          width: 320,
          textAlign: "center"
        }}
      >
        <h3>Session Expiring</h3>
        <p style={{ fontSize: 14, marginTop: 8 }}>
          You have been inactive for a while.
          Your session will expire soon.
        </p>

        <button
          onClick={resetTimers}
          style={{
            marginTop: 12,
            padding: "8px 14px",
            borderRadius: 6,
            border: "none",
            background: "#16a34a",
            color: "#fff",
            cursor: "pointer"
          }}
        >
          Stay logged in
        </button>
      </div>
    </div>
  );
}
