import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DashboardLayout from "./components/DashboardLayout";
import Dashboard from "./components/Dashboard";
import Posts from "./pages/Posts";
import Users from "./pages/Users";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import PublicLayout from "./components/PublicLayout";
import BlogHome from "./pages/blog/BlogHome";
import BlogPost from "./pages/blog/BlogPost";
import BlogCategories from "./pages/blog/BlogCategories";
import BlogCategoryPage from "./pages/blog/BlogCategoryPage";
import BlogAbout from "./pages/blog/BlogAbout";
import BlogPreview from "./pages/blog/BlogPreview";
import CommentsManager from "./components/admin/CommentsManager";
import Categories from "./pages/Categories";
import Media from "./pages/Media";
import SEO from "./pages/SEO";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Public Blog Routes */}
          <Route path="/blog" element={<PublicLayout />}>
            <Route index element={<BlogHome />} />
            <Route path="post/:slug" element={<BlogPost />} />
            <Route path="post/preview" element={<BlogPreview />} />
            <Route path="categories" element={<BlogCategories />} />
            <Route path="category/:slug" element={<BlogCategoryPage />} />
            <Route path="about" element={<BlogAbout />} />
          </Route>
          
          {/* Redirect root to blog */}
          <Route path="/" element={<PublicLayout />}>
            <Route index element={<BlogHome />} />
          </Route>
          
          {/* Admin Routes */}
          <Route path="/admin" element={<DashboardLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="posts" element={<Posts />} />
            <Route path="users" element={<Users />} />
            <Route path="settings" element={<Settings />} />
            <Route path="categories" element={<Categories />} />
            <Route path="comments" element={<CommentsManager />} />
            <Route path="media" element={<Media />} />
            <Route path="seo" element={<SEO />} />
            <Route path="analytics" element={<div className="p-6"><h1 className="text-2xl font-bold">Analytics - Coming Soon</h1></div>} />
            <Route path="appearance" element={<div className="p-6"><h1 className="text-2xl font-bold">Appearance - Coming Soon</h1></div>} />
            <Route path="security" element={<div className="p-6"><h1 className="text-2xl font-bold">Security - Coming Soon</h1></div>} />
          </Route>
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
