import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CarProvider } from "@/context/CarContext";
import Index from "./pages/index";
import Garage from "./pages/Garage";
import Compare from "./pages/Compare";
import CarDetails from "./pages/CarDetails";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <CarProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/garage" element={<Garage />} />
            <Route path="/compare" element={<Compare />} />
            <Route path="/car/:id" element={<CarDetails />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </CarProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
