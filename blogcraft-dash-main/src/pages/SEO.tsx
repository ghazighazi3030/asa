import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { 
  Search, 
  TrendingUp, 
  Globe, 
  FileText, 
  Settings,
  BarChart3,
  Eye,
  Link2,
  Target,
  AlertCircle,
  CheckCircle,
  XCircle,
  Plus,
  Edit,
  Trash,
  Download,
  Upload,
  RefreshCw,
  ExternalLink
} from "lucide-react";

// Mock SEO data
const seoMetrics = {
  overallScore: 85,
  totalPages: 247,
  indexedPages: 234,
  crawlErrors: 3,
  avgLoadTime: 1.2,
  mobileScore: 92,
  desktopScore: 88
};

const seoIssues = [
  {
    id: 1,
    type: "error",
    title: "Missing Meta Descriptions",
    description: "3 pages are missing meta descriptions",
    pages: ["About Page", "Contact Page", "Privacy Policy"],
    priority: "high",
    impact: "High impact on search rankings"
  },
  {
    id: 2,
    type: "warning", 
    title: "Large Image Files",
    description: "5 images are larger than recommended size",
    pages: ["Championship Post", "Stadium Gallery"],
    priority: "medium",
    impact: "May slow down page loading"
  },
  {
    id: 3,
    type: "info",
    title: "Missing Alt Text",
    description: "2 images missing alt text for accessibility",
    pages: ["Training Post"],
    priority: "medium",
    impact: "Affects accessibility and SEO"
  }
];

const keywordRankings = [
  { keyword: "ASA football", position: 3, change: "+2", volume: 1200, difficulty: "Medium" },
  { keyword: "Agadir sports", position: 7, change: "-1", volume: 800, difficulty: "Low" },
  { keyword: "Morocco football", position: 15, change: "+5", volume: 5000, difficulty: "High" },
  { keyword: "ASA championship", position: 1, change: "0", volume: 600, difficulty: "Low" },
  { keyword: "football training", position: 12, change: "+3", volume: 2400, difficulty: "Medium" }
];

const sitemapPages = [
  { url: "/blog", status: "indexed", lastCrawled: "2024-01-15", priority: "1.0" },
  { url: "/blog/about", status: "indexed", lastCrawled: "2024-01-14", priority: "0.8" },
  { url: "/blog/categories", status: "indexed", lastCrawled: "2024-01-13", priority: "0.8" },
  { url: "/blog/post/asa-wins-championship", status: "indexed", lastCrawled: "2024-01-15", priority: "0.9" },
  { url: "/blog/post/new-signing-youssef", status: "pending", lastCrawled: "2024-01-12", priority: "0.8" }
];

export default function SEO() {
  const [activeTab, setActiveTab] = useState("overview");
  const [seoSettings, setSeoSettings] = useState({
    siteTitle: "ASA Sports Blog",
    siteDescription: "Official blog of Astre Sportif D'Agadir - Latest news, match reports, and insights",
    siteKeywords: ["ASA", "football", "Agadir", "Morocco", "sports", "soccer"],
    robotsTxt: "User-agent: *\nAllow: /\nSitemap: https://asa-blog.com/sitemap.xml",
    enableSitemap: true,
    enableRobots: true,
    enableAnalytics: true,
    googleAnalyticsId: "GA-XXXXXXXXX",
    googleSearchConsole: true,
    enableOpenGraph: true,
    enableTwitterCards: true,
    enableStructuredData: true
  });
  
  const [newKeyword, setNewKeyword] = useState("");
  const [showAddKeyword, setShowAddKeyword] = useState(false);

  const handleSettingChange = (key: string, value: any) => {
    setSeoSettings(prev => ({ ...prev, [key]: value }));
  };

  const handleAddKeyword = () => {
    if (newKeyword.trim()) {
      setSeoSettings(prev => ({
        ...prev,
        siteKeywords: [...prev.siteKeywords, newKeyword.trim()]
      }));
      setNewKeyword("");
      setShowAddKeyword(false);
    }
  };

  const removeKeyword = (keyword: string) => {
    setSeoSettings(prev => ({
      ...prev,
      siteKeywords: prev.siteKeywords.filter(k => k !== keyword)
    }));
  };

  const generateSitemap = () => {
    console.log("Generating sitemap...");
    // In real app, this would trigger sitemap generation
  };

  const submitToSearchEngines = () => {
    console.log("Submitting to search engines...");
    // In real app, this would submit sitemap to search engines
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-success";
    if (score >= 60) return "text-warning";
    return "text-destructive";
  };

  const getIssueIcon = (type: string) => {
    switch (type) {
      case "error": return <XCircle className="h-5 w-5 text-destructive" />;
      case "warning": return <AlertCircle className="h-5 w-5 text-warning" />;
      case "info": return <CheckCircle className="h-5 w-5 text-accent" />;
      default: return <AlertCircle className="h-5 w-5 text-muted-foreground" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">SEO Management</h1>
          <p className="mt-2 text-muted-foreground">Optimize your blog for search engines and track performance.</p>
        </div>
        <div className="flex items-center space-x-2 mt-4 sm:mt-0">
          <Button variant="outline" onClick={generateSitemap}>
            <RefreshCw className="mr-2 h-4 w-4" />
            Generate Sitemap
          </Button>
          <Button onClick={submitToSearchEngines}>
            <Upload className="mr-2 h-4 w-4" />
            Submit to Search Engines
          </Button>
        </div>
      </div>

      {/* SEO Score Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-6">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <TrendingUp className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Overall SEO Score</p>
              <p className={`text-2xl font-bold ${getScoreColor(seoMetrics.overallScore)}`}>
                {seoMetrics.overallScore}/100
              </p>
            </div>
          </div>
        </Card>
        
        <Card className="p-6">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-success/10 rounded-lg">
              <Globe className="h-6 w-6 text-success" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Indexed Pages</p>
              <p className="text-2xl font-bold text-foreground">
                {seoMetrics.indexedPages}/{seoMetrics.totalPages}
              </p>
            </div>
          </div>
        </Card>
        
        <Card className="p-6">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-warning/10 rounded-lg">
              <AlertCircle className="h-6 w-6 text-warning" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Issues Found</p>
              <p className="text-2xl font-bold text-foreground">{seoIssues.length}</p>
            </div>
          </div>
        </Card>
        
        <Card className="p-6">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-accent/10 rounded-lg">
              <BarChart3 className="h-6 w-6 text-accent" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Avg Load Time</p>
              <p className="text-2xl font-bold text-foreground">{seoMetrics.avgLoadTime}s</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
          <TabsTrigger value="keywords">Keywords</TabsTrigger>
          <TabsTrigger value="sitemap">Sitemap</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          {/* SEO Issues */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-foreground">SEO Issues</h2>
              <Button variant="outline" size="sm">
                <RefreshCw className="mr-2 h-4 w-4" />
                Scan Again
              </Button>
            </div>
            
            <div className="space-y-4">
              {seoIssues.map((issue) => (
                <div key={issue.id} className="flex items-start space-x-3 p-4 bg-secondary/20 rounded-lg">
                  {getIssueIcon(issue.type)}
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h3 className="font-medium text-foreground">{issue.title}</h3>
                      <Badge variant={issue.priority === 'high' ? 'destructive' : issue.priority === 'medium' ? 'default' : 'secondary'}>
                        {issue.priority}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{issue.description}</p>
                    <p className="text-xs text-muted-foreground">{issue.impact}</p>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {issue.pages.map((page) => (
                        <Badge key={page} variant="outline" className="text-xs">
                          {page}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    Fix Issue
                  </Button>
                </div>
              ))}
            </div>
          </Card>

          {/* Performance Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">Mobile Performance</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Performance Score</span>
                  <span className={`font-bold ${getScoreColor(seoMetrics.mobileScore)}`}>
                    {seoMetrics.mobileScore}/100
                  </span>
                </div>
                <div className="w-full bg-secondary rounded-full h-2">
                  <div 
                    className="bg-success h-2 rounded-full transition-all"
                    style={{ width: `${seoMetrics.mobileScore}%` }}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">First Contentful Paint</p>
                    <p className="font-medium text-foreground">1.2s</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Largest Contentful Paint</p>
                    <p className="font-medium text-foreground">2.1s</p>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">Desktop Performance</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Performance Score</span>
                  <span className={`font-bold ${getScoreColor(seoMetrics.desktopScore)}`}>
                    {seoMetrics.desktopScore}/100
                  </span>
                </div>
                <div className="w-full bg-secondary rounded-full h-2">
                  <div 
                    className="bg-success h-2 rounded-full transition-all"
                    style={{ width: `${seoMetrics.desktopScore}%` }}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">First Contentful Paint</p>
                    <p className="font-medium text-foreground">0.8s</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Largest Contentful Paint</p>
                    <p className="font-medium text-foreground">1.5s</p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </TabsContent>

        {/* Settings Tab */}
        <TabsContent value="settings" className="space-y-6">
          {/* General SEO Settings */}
          <Card className="p-6">
            <h2 className="text-lg font-semibold text-foreground mb-6">General SEO Settings</h2>
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="site-title">Site Title</Label>
                  <Input
                    id="site-title"
                    value={seoSettings.siteTitle}
                    onChange={(e) => handleSettingChange('siteTitle', e.target.value)}
                    placeholder="Your site title"
                  />
                  <p className="text-xs text-muted-foreground">
                    Appears in search results and browser tabs
                  </p>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="google-analytics">Google Analytics ID</Label>
                  <Input
                    id="google-analytics"
                    value={seoSettings.googleAnalyticsId}
                    onChange={(e) => handleSettingChange('googleAnalyticsId', e.target.value)}
                    placeholder="GA-XXXXXXXXX"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="site-description">Site Description</Label>
                <Textarea
                  id="site-description"
                  value={seoSettings.siteDescription}
                  onChange={(e) => handleSettingChange('siteDescription', e.target.value)}
                  placeholder="Brief description of your site"
                  rows={3}
                />
                <p className="text-xs text-muted-foreground">
                  Used as default meta description for pages without custom descriptions
                </p>
              </div>

              <div className="space-y-2">
                <Label>Site Keywords</Label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {seoSettings.siteKeywords.map((keyword) => (
                    <Badge key={keyword} variant="secondary" className="flex items-center space-x-1">
                      <span>{keyword}</span>
                      <button onClick={() => removeKeyword(keyword)}>
                        <XCircle className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
                <Button variant="outline" size="sm" onClick={() => setShowAddKeyword(true)}>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Keyword
                </Button>
              </div>
            </div>
          </Card>

          {/* Social Media Settings */}
          <Card className="p-6">
            <h2 className="text-lg font-semibold text-foreground mb-6">Social Media & Open Graph</h2>
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <Label>Enable Open Graph Tags</Label>
                  <p className="text-sm text-muted-foreground">Improves sharing on Facebook and LinkedIn</p>
                </div>
                <Switch
                  checked={seoSettings.enableOpenGraph}
                  onCheckedChange={(checked) => handleSettingChange('enableOpenGraph', checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label>Enable Twitter Cards</Label>
                  <p className="text-sm text-muted-foreground">Optimizes sharing on Twitter/X</p>
                </div>
                <Switch
                  checked={seoSettings.enableTwitterCards}
                  onCheckedChange={(checked) => handleSettingChange('enableTwitterCards', checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label>Enable Structured Data</Label>
                  <p className="text-sm text-muted-foreground">Helps search engines understand your content</p>
                </div>
                <Switch
                  checked={seoSettings.enableStructuredData}
                  onCheckedChange={(checked) => handleSettingChange('enableStructuredData', checked)}
                />
              </div>
            </div>
          </Card>

          {/* Technical SEO */}
          <Card className="p-6">
            <h2 className="text-lg font-semibold text-foreground mb-6">Technical SEO</h2>
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <Label>Auto-generate Sitemap</Label>
                  <p className="text-sm text-muted-foreground">Automatically update sitemap when content changes</p>
                </div>
                <Switch
                  checked={seoSettings.enableSitemap}
                  onCheckedChange={(checked) => handleSettingChange('enableSitemap', checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label>Enable Robots.txt</Label>
                  <p className="text-sm text-muted-foreground">Control search engine crawling</p>
                </div>
                <Switch
                  checked={seoSettings.enableRobots}
                  onCheckedChange={(checked) => handleSettingChange('enableRobots', checked)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="robots-txt">Robots.txt Content</Label>
                <Textarea
                  id="robots-txt"
                  value={seoSettings.robotsTxt}
                  onChange={(e) => handleSettingChange('robotsTxt', e.target.value)}
                  rows={6}
                  className="font-mono text-sm"
                />
              </div>
            </div>
          </Card>
        </TabsContent>

        {/* Keywords Tab */}
        <TabsContent value="keywords" className="space-y-6">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-foreground">Keyword Rankings</h2>
              <Button variant="outline" size="sm">
                <RefreshCw className="mr-2 h-4 w-4" />
                Update Rankings
              </Button>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-secondary/30 border-b border-border">
                  <tr>
                    <th className="text-left py-3 px-4 font-medium text-foreground">Keyword</th>
                    <th className="text-left py-3 px-4 font-medium text-foreground">Position</th>
                    <th className="text-left py-3 px-4 font-medium text-foreground">Change</th>
                    <th className="text-left py-3 px-4 font-medium text-foreground">Volume</th>
                    <th className="text-left py-3 px-4 font-medium text-foreground">Difficulty</th>
                    <th className="text-right py-3 px-4 font-medium text-foreground">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {keywordRankings.map((keyword, index) => (
                    <tr key={index} className="border-b border-border last:border-b-0 hover:bg-secondary/20">
                      <td className="py-3 px-4">
                        <span className="font-medium text-foreground">{keyword.keyword}</span>
                      </td>
                      <td className="py-3 px-4">
                        <Badge variant={keyword.position <= 3 ? 'default' : keyword.position <= 10 ? 'secondary' : 'outline'}>
                          #{keyword.position}
                        </Badge>
                      </td>
                      <td className="py-3 px-4">
                        <span className={`text-sm ${
                          keyword.change.startsWith('+') ? 'text-success' : 
                          keyword.change.startsWith('-') ? 'text-destructive' : 
                          'text-muted-foreground'
                        }`}>
                          {keyword.change}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <span className="text-sm text-muted-foreground">
                          {keyword.volume.toLocaleString()}/month
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <Badge variant={
                          keyword.difficulty === 'Low' ? 'secondary' :
                          keyword.difficulty === 'Medium' ? 'default' : 'destructive'
                        }>
                          {keyword.difficulty}
                        </Badge>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center justify-end space-x-1">
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Target className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>

          {/* Keyword Research */}
          <Card className="p-6">
            <h2 className="text-lg font-semibold text-foreground mb-4">Keyword Research</h2>
            <div className="flex space-x-2 mb-4">
              <Input
                placeholder="Enter keyword to research..."
                className="flex-1"
              />
              <Button>
                <Search className="mr-2 h-4 w-4" />
                Research
              </Button>
            </div>
            <p className="text-sm text-muted-foreground">
              Research new keywords to target and track their performance over time.
            </p>
          </Card>
        </TabsContent>

        {/* Sitemap Tab */}
        <TabsContent value="sitemap" className="space-y-6">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-foreground">Sitemap Status</h2>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm">
                  <Download className="mr-2 h-4 w-4" />
                  Download
                </Button>
                <Button variant="outline" size="sm">
                  <ExternalLink className="mr-2 h-4 w-4" />
                  View Sitemap
                </Button>
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-secondary/30 border-b border-border">
                  <tr>
                    <th className="text-left py-3 px-4 font-medium text-foreground">URL</th>
                    <th className="text-left py-3 px-4 font-medium text-foreground">Status</th>
                    <th className="text-left py-3 px-4 font-medium text-foreground">Last Crawled</th>
                    <th className="text-left py-3 px-4 font-medium text-foreground">Priority</th>
                    <th className="text-right py-3 px-4 font-medium text-foreground">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {sitemapPages.map((page, index) => (
                    <tr key={index} className="border-b border-border last:border-b-0 hover:bg-secondary/20">
                      <td className="py-3 px-4">
                        <span className="font-mono text-sm text-foreground">{page.url}</span>
                      </td>
                      <td className="py-3 px-4">
                        <Badge className={page.status === 'indexed' ? 'bg-success/10 text-success' : 'bg-warning/10 text-warning'}>
                          {page.status}
                        </Badge>
                      </td>
                      <td className="py-3 px-4">
                        <span className="text-sm text-muted-foreground">{page.lastCrawled}</span>
                      </td>
                      <td className="py-3 px-4">
                        <span className="text-sm text-muted-foreground">{page.priority}</span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center justify-end space-x-1">
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <RefreshCw className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>

          {/* Sitemap Settings */}
          <Card className="p-6">
            <h2 className="text-lg font-semibold text-foreground mb-4">Sitemap Configuration</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label>Include Images in Sitemap</Label>
                  <p className="text-sm text-muted-foreground">Add image URLs to sitemap for better indexing</p>
                </div>
                <Switch defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label>Include Categories</Label>
                  <p className="text-sm text-muted-foreground">Include category pages in sitemap</p>
                </div>
                <Switch defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label>Include Tags</Label>
                  <p className="text-sm text-muted-foreground">Include tag pages in sitemap</p>
                </div>
                <Switch />
              </div>
            </div>
          </Card>
        </TabsContent>

        {/* Analytics Tab */}
        <TabsContent value="analytics" className="space-y-6">
          <Card className="p-6">
            <h2 className="text-lg font-semibold text-foreground mb-6">Search Console Integration</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-secondary/20 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-success/10 rounded-lg">
                    <CheckCircle className="h-5 w-5 text-success" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Google Search Console</p>
                    <p className="text-sm text-muted-foreground">Connected and verified</p>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Open Console
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-primary/5 rounded-lg">
                  <div className="text-2xl font-bold text-primary">2.4K</div>
                  <div className="text-sm text-muted-foreground">Total Clicks</div>
                </div>
                <div className="text-center p-4 bg-accent/5 rounded-lg">
                  <div className="text-2xl font-bold text-accent">45.2K</div>
                  <div className="text-sm text-muted-foreground">Total Impressions</div>
                </div>
                <div className="text-center p-4 bg-success/5 rounded-lg">
                  <div className="text-2xl font-bold text-success">5.3%</div>
                  <div className="text-sm text-muted-foreground">Average CTR</div>
                </div>
              </div>
            </div>
          </Card>

          {/* Analytics Settings */}
          <Card className="p-6">
            <h2 className="text-lg font-semibold text-foreground mb-6">Analytics Configuration</h2>
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <Label>Enable Google Analytics</Label>
                  <p className="text-sm text-muted-foreground">Track visitor behavior and site performance</p>
                </div>
                <Switch
                  checked={seoSettings.enableAnalytics}
                  onCheckedChange={(checked) => handleSettingChange('enableAnalytics', checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label>Google Search Console</Label>
                  <p className="text-sm text-muted-foreground">Monitor search performance and indexing</p>
                </div>
                <Switch
                  checked={seoSettings.googleSearchConsole}
                  onCheckedChange={(checked) => handleSettingChange('googleSearchConsole', checked)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="analytics-id">Google Analytics Tracking ID</Label>
                <Input
                  id="analytics-id"
                  value={seoSettings.googleAnalyticsId}
                  onChange={(e) => handleSettingChange('googleAnalyticsId', e.target.value)}
                  placeholder="GA-XXXXXXXXX or G-XXXXXXXXXX"
                />
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Add Keyword Dialog */}
      <Dialog open={showAddKeyword} onOpenChange={setShowAddKeyword}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add Keyword</DialogTitle>
            <DialogDescription>
              Add a new keyword to track for SEO performance.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="keyword">Keyword</Label>
              <Input
                id="keyword"
                value={newKeyword}
                onChange={(e) => setNewKeyword(e.target.value)}
                placeholder="Enter keyword to track..."
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddKeyword(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddKeyword}>
              Add Keyword
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button size="lg">
          <Settings className="mr-2 h-4 w-4" />
          Save SEO Settings
        </Button>
      </div>
    </div>
  );
}