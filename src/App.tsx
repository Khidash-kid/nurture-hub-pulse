import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import { OnlineStatusBanner } from "./features/network/OnlineStatusBanner";
import { ShortcutHelp } from "./features/network/shortcuts/ShortcutHelp";
import { GlobalActivityLogger } from "./features/network/activity/GlobalActivityLogger";
import { BugReportWidget } from "./features/network/feedback/BugReportWidget";
import { SessionIdleWatcher } from "./features/network/session/SessionIdleWatcher";
import { CommandPalette } from "./features/network/command/CommandPalette";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <CommandPalette />
        <SessionIdleWatcher />
        <BugReportWidget />
        <GlobalActivityLogger />
        <ShortcutHelp />
        <OnlineStatusBanner />
        <Routes>
          <Route path="/" element={<Index />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
