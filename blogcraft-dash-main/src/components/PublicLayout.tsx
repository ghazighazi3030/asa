import { useState } from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import { Search, Menu, X, Home, Tag, User, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const navigation = [
  { name: 'Home', href: '/blog', icon: Home },
  { name: 'Categories', href: '/blog/categories', icon: Tag },
  { name: 'About', href: '/blog/about', icon: User },
];

export default function PublicLayout() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const location = useLocation();

  const isActive = (href: string) => {
    if (href === '/blog') {
      return location.pathname === '/blog' || location.pathname === '/';
    }
    return location.pathname.startsWith(href);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/blog" className="flex items-center space-x-3">
              <img 
                src="/lovable-uploads/b0c00b55-d393-495d-b9e7-ca27a59bd8cf.png" 
                alt="ASA Logo" 
                className="h-8 w-8"
              />
              <span className="text-xl font-bold text-foreground">ASA Sports Blog</span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {navigation.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={cn(
                      "flex items-center space-x-2 text-sm font-medium transition-colors hover:text-primary",
                      isActive(item.href) ? "text-primary" : "text-muted-foreground"
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </nav>

            {/* Search Bar */}
            <div className="hidden md:flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search posts..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
              <Link to="/admin">
                <Button variant="outline" size="sm">
                  Admin
                </Button>
              </Link>
            </div>

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-border bg-background">
            <div className="container mx-auto px-4 py-4 space-y-4">
              {/* Mobile Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search posts..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>

              {/* Mobile Navigation Links */}
              <nav className="space-y-2">
                {navigation.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.name}
                      to={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={cn(
                        "flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                        isActive(item.href) 
                          ? "bg-primary/10 text-primary" 
                          : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                      )}
                    >
                      <Icon className="h-4 w-4" />
                      <span>{item.name}</span>
                    </Link>
                  );
                })}
                <Link
                  to="/admin"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
                >
                  <User className="h-4 w-4" />
                  <span>Admin Panel</span>
                </Link>
              </nav>
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-secondary/30 border-t border-border mt-16">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* About */}
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <img 
                  src="/lovable-uploads/b0c00b55-d393-495d-b9e7-ca27a59bd8cf.png" 
                  alt="ASA Logo" 
                  className="h-8 w-8"
                />
                <span className="text-lg font-bold text-foreground">ASA Sports</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Official blog of Astre Sportif D'Agadir. Stay updated with the latest news, 
                match reports, and insights from our football club.
              </p>
            </div>

            {/* Quick Links */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-foreground">Quick Links</h3>
              <ul className="space-y-2">
                {navigation.map((item) => (
                  <li key={item.name}>
                    <Link 
                      to={item.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Categories */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-foreground">Categories</h3>
              <ul className="space-y-2">
                <li><Link to="/blog/category/news" className="text-sm text-muted-foreground hover:text-foreground transition-colors">News</Link></li>
                <li><Link to="/blog/category/matches" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Matches</Link></li>
                <li><Link to="/blog/category/players" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Players</Link></li>
                <li><Link to="/blog/category/training" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Training</Link></li>
              </ul>
            </div>

            {/* Contact */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-foreground">Contact</h3>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p>Agadir, Morocco</p>
                <p>contact@asa-sports.com</p>
                <p>+212 123 456 789</p>
              </div>
            </div>
          </div>

          <div className="border-t border-border mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-muted-foreground">
              © 2024 ASA Sports Blog. All rights reserved.
            </p>
            <div className="flex items-center space-x-4 mt-4 md:mt-0">
              <Link to="/blog/privacy" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Privacy Policy
              </Link>
              <Link to="/blog/terms" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}