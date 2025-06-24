import { Switch, Route } from "wouter";
import { lazy, Suspense } from "react";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import ModernHome from "@/pages/modern-home";
import NotFound from "@/pages/not-found";

const PrivacyPolicy = lazy(() => import("@/pages/privacy-policy"));
const TermsOfService = lazy(() => import("@/pages/terms-of-service"));

function Router() {
  return (
    <Switch>
      <Route path="/" component={ModernHome} />
      <Route path="/privacy-policy">
        <Suspense fallback={<div className="min-h-screen bg-slate-900 flex items-center justify-center text-white">Carregando...</div>}>
          <PrivacyPolicy />
        </Suspense>
      </Route>
      <Route path="/terms-of-service">
        <Suspense fallback={<div className="min-h-screen bg-slate-900 flex items-center justify-center text-white">Carregando...</div>}>
          <TermsOfService />
        </Suspense>
      </Route>
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
