import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  FileText, 
  Users, 
  MessageSquare, 
  Eye, 
  TrendingUp, 
  Plus,
  ArrowUpRight,
  Calendar,
  Clock,
  Activity,
  AlertCircle,
  CheckCircle,
  XCircle
} from "lucide-react";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, BarChart, Bar } from "recharts";
import QuickActions from "@/components/admin/QuickActions";

const statsCards = [
  {
    title: "Total Posts",
    value: "247",
    change: "+12%",
    changeType: "positive" as const,
    icon: FileText,
    href: "/posts"
  },
  {
    title: "Total Users",
    value: "1,429",
    change: "+5%",
    changeType: "positive" as const,
    icon: Users,
    href: "/users"
  },
  {
    title: "Comments",
    value: "2,847",
    change: "-2%",
    changeType: "negative" as const,
    icon: MessageSquare,
    href: "/comments"
  },
  {
    title: "Total Views",
    value: "89,429",
    change: "+18%",
    changeType: "positive" as const,
    icon: Eye,
    href: "/analytics"
  }
];

// Mock analytics data
const analyticsData = [
  { name: 'Jan', posts: 12, views: 2400, comments: 45 },
  { name: 'Feb', posts: 19, views: 1398, comments: 32 },
  { name: 'Mar', posts: 15, views: 9800, comments: 67 },
  { name: 'Apr', posts: 22, views: 3908, comments: 89 },
  { name: 'May', posts: 18, views: 4800, comments: 54 },
  { name: 'Jun', posts: 25, views: 3800, comments: 76 }
];

const chartConfig = {
  posts: {
    label: "Posts",
    color: "hsl(var(--primary))",
  },
  views: {
    label: "Views",
    color: "hsl(var(--accent))",
  },
  comments: {
    label: "Comments",
    color: "hsl(var(--success))",
  },
};

const recentPosts = [
  {
    title: "Getting Started with React 18",
    status: "published",
    author: "Sarah Johnson",
    date: "2 hours ago",
    views: 1249
  },
  {
    title: "Advanced TypeScript Techniques",
    status: "draft",
    author: "Mike Chen",
    date: "5 hours ago",
    views: 0
  },
  {
    title: "Building Modern Web Apps",
    status: "published",
    author: "Alex Kumar", 
    date: "1 day ago",
    views: 2847
  },
  {
    title: "CSS Grid Layout Guide",
    status: "scheduled",
    author: "Emma Wilson",
    date: "Tomorrow",
    views: 0
  }
];

const recentActivity = [
  {
    id: 1,
    type: "post_published",
    title: "New post published: 'ASA Wins Championship'",
    user: "Ahmed Benali",
    time: "2 minutes ago",
    icon: CheckCircle,
    color: "text-success"
  },
  {
    id: 2,
    type: "comment_pending",
    title: "New comment awaiting moderation",
    user: "Hassan Alami",
    time: "15 minutes ago",
    icon: AlertCircle,
    color: "text-warning"
  },
  {
    id: 3,
    type: "user_registered",
    title: "New user registered",
    user: "Fatima Zahra",
    time: "1 hour ago",
    icon: Users,
    color: "text-accent"
  },
  {
    id: 4,
    type: "post_draft",
    title: "Draft saved: 'Training Camp Updates'",
    user: "Mohamed Tazi",
    time: "2 hours ago",
    icon: FileText,
    color: "text-muted-foreground"
  },
  {
    id: 5,
    type: "comment_spam",
    title: "Comment marked as spam",
    user: "System",
    time: "3 hours ago",
    icon: XCircle,
    color: "text-destructive"
  }
];

const pendingTasks = [
  {
    id: 1,
    title: "Review 5 pending comments",
    priority: "high",
    count: 5,
    href: "/admin/comments"
  },
  {
    id: 2,
    title: "Approve 3 scheduled posts",
    priority: "medium",
    count: 3,
    href: "/admin/posts"
  },
  {
    id: 3,
    title: "Update site settings",
    priority: "low",
    count: 1,
    href: "/admin/settings"
  }
];

const quickActions = [
  { title: "New Post", icon: FileText, href: "/posts/new", color: "primary" },
  { title: "Add User", icon: Users, href: "/users/new", color: "secondary" },
  { title: "View Analytics", icon: TrendingUp, href: "/analytics", color: "accent" }
];

export default function Dashboard() {
  const formatNumber = (num: number) => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="mt-2 text-muted-foreground">Welcome back! Here's what's happening with your blog.</p>
        </div>
        <Button className="mt-4 sm:mt-0" size="lg" onClick={() => window.location.href = '/admin/posts'}>
          <Plus className="mr-2 h-4 w-4" />
          Create Post
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsCards.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title} className="p-6 hover-lift cursor-pointer group">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                    <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                  </div>
                </div>
                <ArrowUpRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-custom" />
              </div>
              <div className="mt-4 flex items-center">
                <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                  stat.changeType === 'positive' 
                    ? 'bg-success/10 text-success' 
                    : 'bg-destructive/10 text-destructive'
                }`}>
                  {stat.change}
                </span>
                <span className="ml-2 text-xs text-muted-foreground">from last month</span>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content - Left Side */}
        <div className="lg:col-span-2 space-y-8">
          {/* Analytics Chart */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-foreground">Analytics Overview</h2>
              <Button variant="outline" size="sm">
                View Details
              </Button>
            </div>
            
            <ChartContainer config={chartConfig} className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={analyticsData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Line 
                    type="monotone" 
                    dataKey="views" 
                    stroke="var(--color-views)" 
                    strokeWidth={2}
                    dot={{ fill: "var(--color-views)" }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="posts" 
                    stroke="var(--color-posts)" 
                    strokeWidth={2}
                    dot={{ fill: "var(--color-posts)" }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </Card>

          {/* Recent Posts */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-foreground">Recent Posts</h2>
              <Button variant="outline" size="sm">
                View All
              </Button>
            </div>
            
            <div className="space-y-4">
              {recentPosts.map((post, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-secondary/30 rounded-lg hover:bg-secondary/50 transition-custom">
                  <div className="flex-1">
                    <h3 className="font-medium text-foreground hover:text-primary cursor-pointer transition-custom">
                      {post.title}
                    </h3>
                    <div className="flex items-center space-x-4 mt-2 text-sm text-muted-foreground">
                      <span>by {post.author}</span>
                      <div className="flex items-center">
                        <Clock className="h-3 w-3 mr-1" />
                        {post.date}
                      </div>
                      {post.views > 0 && (
                        <div className="flex items-center">
                          <Eye className="h-3 w-3 mr-1" />
                          {post.views.toLocaleString()} views
                        </div>
                      )}
                    </div>
                  </div>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    post.status === 'published' 
                      ? 'bg-success/10 text-success' 
                      : post.status === 'draft'
                      ? 'bg-warning/10 text-warning'
                      : 'bg-accent/10 text-accent'
                  }`}>
                    {post.status}
                  </span>
                </div>
              ))}
            </div>
          </Card>

          {/* Recent Activity */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-foreground">Recent Activity</h2>
              <Button variant="outline" size="sm">
                View All
              </Button>
            </div>
            
            <div className="space-y-4">
              {recentActivity.map((activity) => {
                const Icon = activity.icon;
                return (
                  <div key={activity.id} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-secondary/30 transition-custom">
                    <div className={`p-2 rounded-lg bg-secondary ${activity.color}`}>
                      <Icon className="h-4 w-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground">{activity.title}</p>
                      <div className="flex items-center space-x-2 mt-1">
                        <span className="text-xs text-muted-foreground">by {activity.user}</span>
                        <span className="text-xs text-muted-foreground">•</span>
                        <span className="text-xs text-muted-foreground">{activity.time}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>
        </div>

        {/* Sidebar - Right Side */}
        <div className="space-y-6">
          {/* Pending Tasks */}
          <Card className="p-6">
            <h2 className="text-lg font-semibold text-foreground mb-4">Pending Tasks</h2>
            <div className="space-y-3">
              {pendingTasks.map((task) => (
                <div key={task.id} className="flex items-center justify-between p-3 bg-secondary/30 rounded-lg hover:bg-secondary/50 transition-custom">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground">{task.title}</p>
                    <div className="flex items-center space-x-2 mt-1">
                      <Badge 
                        variant={task.priority === 'high' ? 'destructive' : task.priority === 'medium' ? 'default' : 'secondary'}
                        className="text-xs"
                      >
                        {task.priority}
                      </Badge>
                      <span className="text-xs text-muted-foreground">{task.count} items</span>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" asChild>
                    <a href={task.href}>
                      <ArrowUpRight className="h-4 w-4" />
                    </a>
                  </Button>
                </div>
              ))}
            </div>
          </Card>

          {/* Quick Actions */}
          <QuickActions />

          {/* Today's Summary */}
          <Card className="p-6">
            <h2 className="text-lg font-semibold text-foreground mb-4">Today's Summary</h2>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">New comments</span>
                <span className="text-sm font-medium text-foreground">12</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Page views</span>
                <span className="text-sm font-medium text-foreground">2,847</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">New users</span>
                <span className="text-sm font-medium text-foreground">5</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Published posts</span>
                <span className="text-sm font-medium text-foreground">3</span>
              </div>
            </div>
          </Card>

          {/* System Status */}
          <Card className="p-6">
            <h2 className="text-lg font-semibold text-foreground mb-4">System Status</h2>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Database</span>
                <Badge className="bg-success/10 text-success">Online</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Storage</span>
                <Badge className="bg-success/10 text-success">78% Used</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Email Service</span>
                <Badge className="bg-success/10 text-success">Active</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Backup</span>
                <Badge className="bg-warning/10 text-warning">2 days ago</Badge>
              </div>
            </div>
          </Card>

          {/* Quick Stats */}
          <Card className="p-6">
            <h2 className="text-lg font-semibold text-foreground mb-4">Quick Stats</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-3 bg-primary/5 rounded-lg">
                <div className="text-2xl font-bold text-primary">89%</div>
                <div className="text-xs text-muted-foreground">Engagement</div>
              </div>
              <div className="text-center p-3 bg-accent/5 rounded-lg">
                <div className="text-2xl font-bold text-accent">4.8</div>
                <div className="text-xs text-muted-foreground">Avg Rating</div>
              </div>
              <div className="text-center p-3 bg-success/5 rounded-lg">
                <div className="text-2xl font-bold text-success">+12%</div>
                <div className="text-xs text-muted-foreground">Growth</div>
              </div>
              <div className="text-center p-3 bg-warning/5 rounded-lg">
                <div className="text-2xl font-bold text-warning">2.4K</div>
                <div className="text-xs text-muted-foreground">Subscribers</div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}