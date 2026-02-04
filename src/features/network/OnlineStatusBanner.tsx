import { WifiOff } from "lucide-react";
import { useOnlineStatus } from "./useOnlineStatus";

export function OnlineStatusBanner() {
  const isOnline = useOnlineStatus();

  if (isOnline) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 rounded-md bg-destructive px-4 py-2 text-white shadow-lg flex items-center gap-2">
      <WifiOff size={18} />
      <span className="text-sm">You are offline</span>
    </div>
  );
}

