import { useEffect, useState } from "react";
import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Analytics } from "@vercel/analytics/react";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/theme-provider";
import "./index.css";
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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = window.setTimeout(() => setLoading(false), 850);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
        <TooltipProvider>
          {loading ? <LoadingScreen /> : <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}><Router /></WouterRouter>}
          <Toaster />
          <Analytics />
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

function LoadingScreen() {
  return (
    <div className="portfolio-loader" role="status" aria-label="Loading portfolio">
      <span className="portfolio-loader-name">Cargando...</span>
      <span className="portfolio-loader-line" />
    </div>
  );
}

export default App;
