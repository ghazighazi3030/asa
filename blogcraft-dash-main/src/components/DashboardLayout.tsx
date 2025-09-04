import { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { 
  LayoutDashboard, 
  FileText, 
  Users, 
  Tags, 
  MessageSquare, 
  Image, 
  Search, 
  Settings, 
  BarChart3,
  Menu,
  X,
  Shield,
  Palette
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navigation = [
  { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { name: 'Posts', href: '/admin/posts', icon: FileText },
  { name: 'Users', href: '/admin/users', icon: Users },
  { name: 'Categories', href: '/admin/categories', icon: Tags },
  { name: 'Comments', href: '/admin/comments', icon: MessageSquare },
  { name: 'Media', href: '/admin/media', icon: Image },
  { name: 'SEO', href: '/admin/seo', icon: Search },
  { name: 'Analytics', href: '/admin/analytics', icon: BarChart3 },
  { name: 'Appearance', href: '/admin/appearance', icon: Palette },
  { name: 'Security', href: '/admin/security', icon: Shield },
  { name: 'Settings', href: '/admin/settings', icon: Settings },
];

export default function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  const isActive = (href: string) => {
    if (href === '/admin') {
      return location.pathname === '/admin';
    }
    return location.pathname.startsWith(href);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={cn(
        "fixed inset-y-0 left-0 z-50 w-72 bg-card border-r border-border transform transition-transform duration-300 ease-in-out lg:translate-x-0",
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        {/* Sidebar header */}
        <div className="flex items-center justify-between h-16 px-6 border-b border-border">
          <div className="flex items-center space-x-3">
            <img 
              src="/lovable-uploads/b0c00b55-d393-495d-b9e7-ca27a59bd8cf.png" 
              alt="ASA Logo" 
              className="h-8 w-8"
            />
            <h1 className="text-xl font-semibold text-foreground">Blog Admin</h1>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="lg:hidden"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Navigation */}
        <nav className="mt-6 px-3">
          <div className="space-y-1">
            {navigation.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.href);
              
              return (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    window.location.href = item.href;
                  }}
                  className={cn(
                    "group flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-custom",
                    active
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                  )}
                >
                  <Icon className={cn(
                    "mr-3 h-5 w-5 transition-custom",
                    active ? "text-primary-foreground" : "text-muted-foreground group-hover:text-foreground"
                  )} />
                  {item.name}
                </a>
              );
            })}
          </div>
        </nav>
      </div>

      {/* Main content */}
      <div className="lg:ml-72">
        {/* Top bar */}
        <header className="bg-card border-b border-border">
          <div className="flex items-center justify-between h-16 px-6">
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="h-5 w-5" />
            </Button>
            
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="search"
                  placeholder="Search..."
                  className="pl-10 pr-4 py-2 w-64 text-sm bg-secondary border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-custom"
                />
              </div>
              
              <div className="flex items-center space-x-2">
                <a href="/blog" target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" size="sm">
                    View Blog
                  </Button>
                </a>
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                  <span className="text-sm font-medium text-primary-foreground">A</span>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}