import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Home } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-6">
      <Card className="max-w-md w-full p-8 text-center">
        <div className="mb-6">
          <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-4xl font-bold text-primary">404</span>
          </div>
          <h1 className="text-2xl font-bold text-foreground mb-2">Page Not Found</h1>
          <p className="text-muted-foreground">
            Sorry, we couldn't find the page you're looking for. It might have been moved, deleted, or doesn't exist.
          </p>
        </div>
        
        <div className="space-y-3">
          <Button asChild className="w-full">
            <a href="/">
              <Home className="mr-2 h-4 w-4" />
              Return to Dashboard
            </a>
          </Button>
          <Button variant="outline" onClick={() => window.history.back()} className="w-full">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Go Back
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default NotFound;
