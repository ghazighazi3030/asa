import { useParams, Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, User, Eye, MessageSquare, Tag } from "lucide-react";
import { getPostsByCategory, getAllCategories } from "@/lib/mockData";


export default function BlogCategoryPage() {
  const { slug } = useParams();
  
  // Get category info and posts from mock data
  const categories = getAllCategories();
  const category = categories.find(cat => cat.slug === slug);
  const posts = getPostsByCategory(slug || '');

  if (!category) {
    return (
      <div className="text-center space-y-4">
        <h1 className="text-2xl font-bold text-foreground">Category Not Found</h1>
        <p className="text-muted-foreground">The category you're looking for doesn't exist.</p>
        <Link to="/blog/categories">
          <Button>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Categories
          </Button>
        </Link>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="space-y-8">
      {/* Back Button */}
      <Link to="/blog/categories">
        <Button variant="ghost" size="sm">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Categories
        </Button>
      </Link>

      {/* Category Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center space-x-3">
          <div className="p-3 bg-primary/10 rounded-lg">
            <Tag className="h-8 w-8 text-primary" />
          </div>
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground">{category.name}</h1>
            <p className="text-lg text-muted-foreground mt-2">{category.description}</p>
          </div>
        </div>
        <Badge variant="secondary" className="text-sm">
          {posts.length} posts in this category
        </Badge>
      </div>

      {/* Posts Grid */}
      <div className="space-y-6">
        {posts.length > 0 ? posts.map((post) => (
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
                <div className="space-y-4">
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-4 w-4" />
                      <span>{formatDate(post.publishedAt)}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <User className="h-4 w-4" />
                      <span>{post.author.name}</span>
                    </div>
                  </div>
                  
                  <h2 className="text-xl md:text-2xl font-semibold text-foreground hover:text-primary transition-colors">
                    <Link to={`/blog/post/${post.slug}`}>
                      {post.title}
                    </Link>
                  </h2>
                  
                  <p className="text-muted-foreground leading-relaxed">
                    {post.excerpt}
                  </p>
                  
                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <Badge key={typeof tag === 'string' ? tag : tag.slug} variant="outline" className="text-xs">
                        {typeof tag === 'string' ? tag : tag.name}
                      </Badge>
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-between pt-2">
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
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
                      <Button>
                        Read More
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        )) : (
          <Card className="p-12 text-center">
            <Tag className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">No posts in this category</h3>
            <p className="text-muted-foreground">
              There are no published posts in the {category.name} category yet.
            </p>
          </Card>
        )}
      </div>

      {/* Load More */}
      <div className="text-center">
        <Button variant="outline" size="lg">
          Load More Posts
        </Button>
      </div>

      {/* Related Categories */}
      <Card className="p-6 bg-gradient-to-r from-secondary/20 to-accent/10">
        <h3 className="text-lg font-semibold text-foreground mb-4">Explore Other Categories</h3>
        <div className="flex flex-wrap gap-2">
          <Link to="/blog/category/transfers">
            <Badge variant="outline" className="hover:bg-primary hover:text-primary-foreground transition-colors">
              Transfers
            </Badge>
          </Link>
          <Link to="/blog/category/training">
            <Badge variant="outline" className="hover:bg-primary hover:text-primary-foreground transition-colors">
              Training
            </Badge>
          </Link>
          <Link to="/blog/category/youth">
            <Badge variant="outline" className="hover:bg-primary hover:text-primary-foreground transition-colors">
              Youth Academy
            </Badge>
          </Link>
          <Link to="/blog/category/community">
            <Badge variant="outline" className="hover:bg-primary hover:text-primary-foreground transition-colors">
              Community
            </Badge>
          </Link>
        </div>
      </Card>
    </div>
  );
}