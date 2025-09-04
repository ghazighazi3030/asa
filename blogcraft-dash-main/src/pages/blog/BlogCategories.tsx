import { useState } from "react";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Tag, Calendar, User, Eye, MessageSquare } from "lucide-react";
import { getAllCategories, getPostsByCategory } from "@/lib/mockData";

export default function BlogCategories() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = getAllCategories().map(cat => ({
    ...cat,
    color: "bg-primary/10 text-primary" // Default color class for display
  }));

  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    category.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-3xl md:text-4xl font-bold text-foreground">Categories</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Explore our content organized by topics. From match reports to community stories, 
          find exactly what you're looking for.
        </p>
      </div>

      {/* Search */}
      <div className="max-w-md mx-auto">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search categories..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCategories.map((category) => (
          <Card 
            key={category.id} 
            className="p-6 hover-lift cursor-pointer transition-all duration-300"
            onClick={() => setSelectedCategory(selectedCategory === category.slug ? null : category.slug)}
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className={`p-3 rounded-lg ${category.color}`}>
                  <Tag className="h-6 w-6" />
                </div>
                <Badge variant="secondary">
                  {getPostsByCategory(category.slug).length} posts
                </Badge>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  {category.name}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {category.description}
                </p>
              </div>
              
              <Link to={`/blog/category/${category.slug}`}>
                <Button variant="outline" className="w-full">
                  View Posts
                </Button>
              </Link>
            </div>
          </Card>
        ))}
      </div>

      {/* Recent Posts from Selected Category */}
      {selectedCategory && (
        <div className="space-y-6">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-foreground">
              Recent posts in {categories.find(c => c.slug === selectedCategory)?.name}
            </h2>
          </div>
          
          {(() => {
            const categoryPosts = getPostsByCategory(selectedCategory);
            return categoryPosts.length > 0 ? (
              <div className="grid gap-6">
                {categoryPosts.slice(0, 3).map((post) => (
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
                              </Button>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            ) : (
              <Card className="p-8 text-center">
                <Tag className="h-8 w-8 text-muted-foreground mx-auto mb-3" />
                <p className="text-muted-foreground">No posts in this category yet.</p>
              </Card>
            );
          })()}
          
          <div className="text-center">
            <Link to={`/blog/category/${selectedCategory}`}>
              <Button>
                View All Posts in {categories.find(c => c.slug === selectedCategory)?.name}
              </Button>
            </Link>
          </div>
        </div>
      )}

      {/* Stats Section */}
      <Card className="p-8 bg-gradient-to-r from-primary/5 to-accent/5">
        <div className="text-center space-y-4">
          <h2 className="text-2xl font-bold text-foreground">Content Statistics</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">
                {categories.reduce((sum, cat) => sum + getPostsByCategory(cat.slug).length, 0)}
              </div>
              <div className="text-sm text-muted-foreground">Total Posts</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-accent">
                {categories.length}
              </div>
              <div className="text-sm text-muted-foreground">Categories</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-success">
                156
              </div>
              <div className="text-sm text-muted-foreground">Comments</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-warning">
                12.5K
              </div>
              <div className="text-sm text-muted-foreground">Total Views</div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}