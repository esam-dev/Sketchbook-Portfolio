import { useState, useCallback } from "react";
import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Analytics } from "@vercel/analytics/react";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import BootSequence from "@/components/BootSequence";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import Catlink from "@/pages/Catlink";
import Admin from "@/pages/Admin";
import NotificationsPage from "@/pages/NotificationsPage";

const queryClient = new QueryClient();

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/catlink" component={Catlink} />
      <Route path="/admin/notifications" component={NotificationsPage} />
      <Route path="/admin" component={Admin} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  const [booted, setBooted] = useState(false);
  const handleBootComplete = useCallback(() => setBooted(true), []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        {!booted && <BootSequence onComplete={handleBootComplete} />}
        {booted && (
          <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
            <Router />
          </WouterRouter>
        )}
        <Toaster />
        <Analytics />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
