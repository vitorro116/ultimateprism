
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Forum from "./pages/Forum";
import ForumCategory from "./pages/ForumCategory";
import ForumTopic from "./pages/ForumTopic";
import ProfilePage from "./pages/Profile";
import NotFound from "./pages/NotFound";
import Events from "./pages/Events";
import Memes from "./pages/Memes";
import Laboratory from "./pages/Laboratory";
import ArchivePage from "./pages/Archive";
import Pixels from "./pages/Pixels";
import Join from "./pages/Join";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/forum" element={<Forum />} />
            <Route path="/forum/category/:id" element={<ForumCategory />} />
            <Route path="/forum/topic/:id" element={<ForumTopic />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/events" element={<Events />} />
            <Route path="/memes" element={<Memes />} />
            <Route path="/lab" element={<Laboratory />} />
            <Route path="/vault" element={<ArchivePage />} />
            <Route path="/pixels" element={<Pixels />} />
            <Route path="/join" element={<Join />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </TooltipProvider>
      </AuthProvider>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;
