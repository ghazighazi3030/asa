import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { FileText, Users, TrendingUp, Plus, Settings, MessageSquare } from "lucide-react";

const quickActions = [
  { 
    title: "New Post", 
    icon: FileText, 
    href: "/admin/posts", 
    color: "primary",
    description: "Create a new blog post"
  },
  { 
    title: "Add User", 
    icon: Users, 
    href: "/admin/users", 
    color: "secondary",
    description: "Add a new user to the system"
  },
  { 
    title: "View Analytics", 
    icon: TrendingUp, 
    href: "/admin/analytics", 
    color: "accent",
    description: "Check site performance"
  },
  { 
    title: "Moderate Comments", 
    icon: MessageSquare, 
    href: "/admin/comments", 
    color: "warning",
    description: "Review pending comments"
  },
  { 
    title: "Site Settings", 
    icon: Settings, 
    href: "/admin/settings", 
    color: "success",
    description: "Configure site settings"
  }
];

export default function QuickActions() {
  const handleAction = (href: string, title: string) => {
    if (title === "New Post") {
      // Navigate to posts page and trigger create
      window.location.href = href + "?action=create";
    } else {
      window.location.href = href;
    }
  };

  return (
    <Card className="p-6">
      <h2 className="text-lg font-semibold text-foreground mb-4">Quick Actions</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3">
        {quickActions.map((action) => {
          const Icon = action.icon;
          return (
            <Button 
              key={action.title}
              variant={action.color === 'primary' ? 'default' : 'outline'}
              className="justify-start h-auto p-4 text-left"
              onClick={() => handleAction(action.href, action.title)}
            >
              <div className="flex items-center space-x-3">
                <div className={`p-2 rounded-lg ${
                  action.color === 'primary' ? 'bg-primary-foreground/20' : 
                  action.color === 'secondary' ? 'bg-secondary' :
                  action.color === 'accent' ? 'bg-accent/20' :
                  action.color === 'warning' ? 'bg-warning/20' :
                  'bg-success/20'
                }`}>
                  <Icon className="h-4 w-4" />
                </div>
                <div className="flex-1">
                  <div className="font-medium">{action.title}</div>
                  <div className="text-xs text-muted-foreground">{action.description}</div>
                </div>
              </div>
            </Button>
          );
        })}
      </div>
    </Card>
  );
}