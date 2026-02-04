import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/*
  Global Activity Logger
  - Logs page route changes
  - Logs section usage (manually via logSectionActivity)
  - Stores everything in localStorage
*/

export type ActivityEvent = {
  type: "page" | "section";
  name: string;
  path?: string;
  time: string;
};

const STORAGE_KEY = "nhp_activity_log";

function getActivities(): ActivityEvent[] {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return [];

  try {
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

function saveActivity(event: ActivityEvent) {
  const existing = getActivities();
  existing.push(event);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(existing));
}

/* -------------------------
   Component – page tracker
--------------------------*/
export function GlobalActivityLogger() {
  const location = useLocation();

  useEffect(() => {
    saveActivity({
      type: "page",
      name: document.title || location.pathname,
      path: location.pathname,
      time: new Date().toISOString()
    });
  }, [location.pathname]);

  return null;
}

/* -------------------------
   Helper – section logger
--------------------------*/
export function logSectionActivity(sectionName: string) {
  if (!sectionName) return;

  saveActivity({
    type: "section",
    name: sectionName,
    time: new Date().toISOString()
  });
}

/* -------------------------
   Optional helpers
--------------------------*/
export function getAllActivities(): ActivityEvent[] {
  return getActivities();
}

export function clearAllActivities() {
  localStorage.removeItem(STORAGE_KEY);
}
