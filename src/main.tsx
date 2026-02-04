import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { ShortcutHelp } from "./features/network/shortcuts/ShortcutHelp.tsx";
import { OnlineStatusBanner } from "./features/network/OnlineStatusBanner.tsx";

createRoot(document.getElementById("root")!).render(<App />);

