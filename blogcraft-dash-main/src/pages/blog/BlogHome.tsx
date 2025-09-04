import { useState } from "react";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, User, Eye, MessageSquare, ArrowRight, TrendingUp } from "lucide-react";
import { getAllPosts, getFeaturedPost, getRecentPosts } from "@/lib/mockData";


const popularTags = [
  "Championship", "Victory", "Transfer", "Training", "Youth Academy", 
  "Match Report", "Player Profile", "Stadium", "Fans", "Community"
];

export default function BlogHome() {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const featuredPost = getFeaturedPost();
  const recentPosts = getRecentPosts(4);
  const allPosts = getAllPosts();
  const categories = [
    { name: "Match Reports", slug: "match-reports", count: allPosts.filter(p => p.category.slug === "match-reports").length },
    { name: "Transfers", slug: "transfers", count: allPosts.filter(p => p.category.slug === "transfers").length },
    { name: "Training", slug: "training", count: allPosts.filter(p => p.category.slug === "training").length },
    { name: "Programming", slug: "programming", count: allPosts.filter(p => p.category.slug === "programming").length },
    { name: "Development", slug: "development", count: allPosts.filter(p => p.category.slug === "development").length },
    { name: "Design", slug: "design", count: allPosts.filter(p => p.category.slug === "design").length }
  ].filter(cat => cat.count > 0); // Only show categories with posts

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (!featuredPost) {
    return <div className="text-center py-12">
      <p className="text-muted-foreground">No published posts available yet.</p>
    </div>;
  }

  return (
    <div className="space-y-12">
      {/* Hero Section with Featured Post */}
      <section className="relative">
        <Card className="overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
            <div className="relative h-64 lg:h-96">
              <img
                src={featuredPost.featuredImageUrl}
                alt={featuredPost.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 left-4">
                <Badge className="bg-primary text-primary-foreground">
                  Featured
                </Badge>
              </div>
            </div>
            <div className="p-8 flex flex-col justify-center">
              <div className="space-y-4">
                <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                  <Badge variant="secondary">{featuredPost.category.name}</Badge>
                  <div className="flex items-center space-x-1">
                    <Calendar className="h-4 w-4" />
                    <span>{formatDate(featuredPost.publishedAt)}</span>
                  </div>
                </div>
                
                <h1 className="text-2xl lg:text-3xl font-bold text-foreground leading-tight">
                  {featuredPost.title}
                </h1>
                
                <p className="text-muted-foreground leading-relaxed">
                  {featuredPost.excerpt}
                </p>
                
                <div className="flex items-center justify-between pt-4">
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                    <div className="flex items-center space-x-1">
                      <User className="h-4 w-4" />
                      <span>{featuredPost.author.name}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Eye className="h-4 w-4" />
                      <span>{featuredPost.views.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <MessageSquare className="h-4 w-4" />
                      <span>{featuredPost.commentsCount}</span>
                    </div>
                  </div>
                  
                  <Link to={`/blog/post/${featuredPost.slug}`}>
                    <Button>
                      Read More
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </section>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Posts Section */}
        <div className="lg:col-span-2 space-y-8">
          {/* Category Filter */}
          <div className="flex flex-wrap gap-2">
            <Button
              variant={selectedCategory === "all" ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory("all")}
            >
              All Posts
            </Button>
            {categories.map((category) => (
              <Button
                key={category.slug}
                variant={selectedCategory === category.slug ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category.slug)}
              >
                {category.name}
              </Button>
            ))}
          </div>

          {/* Recent Posts */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-foreground">Latest Posts</h2>
            
            <div className="grid gap-6">
              {recentPosts.length > 0 ? recentPosts.map((post) => (
                <Card key={post.id} className="overflow-hidden hover-lift">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
                    <div className="relative h-48 md:h-full">
                      <img
                        src={post.featuredImageUrl}
                        alt={post.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="md:col-span-2 p-6">
                      <div className="space-y-3">
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                          <Badge variant="secondary">{post.category.name}</Badge>
                          <div className="flex items-center space-x-1">
                            <Calendar className="h-4 w-4" />
                            <span>{formatDate(post.publishedAt)}</span>
                          </div>
                        </div>
                        
                        <h3 className="text-xl font-semibold text-foreground hover:text-primary transition-colors">
                          <Link to={`/blog/post/${post.slug}`}>
                            {post.title}
                          </Link>
                        </h3>
                        
                        <p className="text-muted-foreground">
                          {post.excerpt}
                        </p>
                        
                        {/* Tags */}
                        <div className="flex flex-wrap gap-2">
                          {post.tags.slice(0, 3).map((tag) => (
                            <Badge key={tag.slug} variant="outline" className="text-xs">
                              {tag.name}
                            </Badge>
                          ))}
                        </div>
                        
                        <div className="flex items-center justify-between pt-2">
                          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                            <div className="flex items-center space-x-1">
                              <User className="h-4 w-4" />
                              <span>{post.author.name}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Eye className="h-4 w-4" />
                              <span>{post.views.toLocaleString()}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <MessageSquare className="h-4 w-4" />
                              <span>{post.commentsCount}</span>
                            </div>
                          </div>
                          
                          <Link to={`/blog/post/${post.slug}`}>
                            <Button variant="ghost" size="sm">
                              Read More
                              <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              )) : (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">No recent posts available.</p>
                  <p className="text-sm text-muted-foreground mt-2">Published posts will appear here.</p>
                </div>
              )}
            </div>

            {/* Load More Button */}
            {recentPosts.length > 0 && (
              <div className="text-center">
                <Button variant="outline" size="lg">
                  Load More Posts
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-8">
          {/* Popular Posts */}
          <Card className="p-6">
            <div className="flex items-center space-x-2 mb-4">
              <TrendingUp className="h-5 w-5 text-primary" />
              <h3 className="text-lg font-semibold text-foreground">Popular Posts</h3>
            </div>
            <div className="space-y-4">
              {recentPosts.slice(0, 3).map((post) => (
                <div key={post.id} className="flex space-x-3">
                  <img
                    src={post.featuredImageUrl}
                    alt={post.title}
                    className="w-16 h-16 object-cover rounded-lg flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-medium text-foreground hover:text-primary transition-colors line-clamp-2">
                      <Link to={`/blog/post/${post.slug}`}>
                        {post.title}
                      </Link>
                    </h4>
                    <div className="flex items-center space-x-2 mt-1 text-xs text-muted-foreground">
                      <span>{formatDate(post.publishedAt)}</span>
                      <span>•</span>
                      <span>{post.views} views</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Categories */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">Categories</h3>
            <div className="space-y-2">
              {categories.map((category) => (
                <Link
                  key={category.slug}
                  to={`/blog/category/${category.slug}`}
                  className="flex items-center justify-between p-2 rounded-lg hover:bg-secondary transition-colors"
                >
                  <span className="text-sm text-foreground">{category.name}</span>
                  <Badge variant="secondary" className="text-xs">
                    {category.count}
                  </Badge>
                </Link>
              ))}
            </div>
          </Card>

          {/* Tags */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">Popular Tags</h3>
            <div className="flex flex-wrap gap-2">
              {popularTags.map((tag) => (
                <Link
                  key={tag}
                  to={`/blog/tag/${tag.toLowerCase().replace(/\s+/g, '-')}`}
                >
                  <Badge variant="outline" className="hover:bg-primary hover:text-primary-foreground transition-colors">
                    {tag}
                  </Badge>
                </Link>
              ))}
            </div>
          </Card>

          {/* Newsletter Signup */}
          <Card className="p-6 bg-gradient-to-br from-primary/5 to-accent/5">
            <h3 className="text-lg font-semibold text-foreground mb-2">Stay Updated</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Get the latest ASA news and updates delivered to your inbox.
            </p>
            <div className="space-y-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-3 py-2 text-sm bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
              <Button className="w-full" size="sm">
                Subscribe
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}