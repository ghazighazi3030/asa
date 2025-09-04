import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Calendar, User, Tag, AlertCircle } from "lucide-react";

export default function BlogPreview() {
  const [previewPost, setPreviewPost] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedPreview = sessionStorage.getItem('previewPost');
    if (storedPreview) {
      setPreviewPost(JSON.parse(storedPreview));
    }
  }, []);

  const formatDate = (dateString?: string) => {
    if (!dateString) return new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (!previewPost) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="p-8 text-center max-w-md">
          <AlertCircle className="h-12 w-12 text-warning mx-auto mb-4" />
          <h1 className="text-xl font-bold text-foreground mb-2">No Preview Available</h1>
          <p className="text-muted-foreground mb-4">
            No preview data found. Please go back to the editor and try again.
          </p>
          <Button onClick={() => window.close()}>
            Close Preview
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" onClick={() => window.close()}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Close Preview
              </Button>
              <Badge variant="outline" className="bg-warning/10 text-warning">
                Preview Mode
              </Badge>
            </div>
            <div className="flex items-center space-x-3">
              <img 
                src="/lovable-uploads/b0c00b55-d393-495d-b9e7-ca27a59bd8cf.png" 
                alt="ASA Logo" 
                className="h-8 w-8"
              />
              <span className="text-lg font-bold text-foreground">ASA Sports Blog</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <article className="space-y-6">
          {/* Featured Image */}
          {previewPost.featuredImage && (
            <div className="relative h-64 md:h-96 rounded-lg overflow-hidden">
              <img
                src={previewPost.featuredImage}
                alt={previewPost.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Article Meta */}
          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              {previewPost.category && (
                <Badge variant="secondary">
                  {previewPost.category.replace('-', ' ').replace(/\b\w/g, (l: string) => l.toUpperCase())}
                </Badge>
              )}
              <div className="flex items-center space-x-1">
                <Calendar className="h-4 w-4" />
                <span>{formatDate(previewPost.scheduledAt)}</span>
              </div>
              <div className="flex items-center space-x-1">
                <User className="h-4 w-4" />
                <span>Preview Author</span>
              </div>
            </div>

            {/* Title */}
            <h1 className="text-3xl md:text-4xl font-bold text-foreground leading-tight">
              {previewPost.title || "Untitled Post"}
            </h1>

            {/* Excerpt */}
            {previewPost.excerpt && (
              <p className="text-lg text-muted-foreground leading-relaxed">
                {previewPost.excerpt}
              </p>
            )}
          </div>

          {/* Article Content */}
          <Card className="p-8">
            <div 
              className="prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{ 
                __html: previewPost.content || "<p>No content available</p>" 
              }}
            />
          </Card>

          {/* Tags */}
          {previewPost.tags && previewPost.tags.length > 0 && (
            <div className="flex items-center space-x-2">
              <Tag className="h-4 w-4 text-muted-foreground" />
              <div className="flex flex-wrap gap-2">
                {previewPost.tags.map((tag: string) => (
                  <Badge key={tag} variant="outline">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* SEO Preview */}
          {(previewPost.metaTitle || previewPost.metaDescription) && (
            <Card className="p-6 bg-secondary/20">
              <h3 className="text-lg font-semibold text-foreground mb-4">SEO Preview</h3>
              <div className="space-y-2">
                <div className="text-blue-600 text-lg font-medium">
                  {previewPost.metaTitle || previewPost.title}
                </div>
                <div className="text-green-700 text-sm">
                  https://asa-blog.com/blog/post/{previewPost.slug || 'post-slug'}
                </div>
                <div className="text-gray-600 text-sm">
                  {previewPost.metaDescription || previewPost.excerpt || "No meta description"}
                </div>
              </div>
            </Card>
          )}
        </article>
      </main>
    </div>
  );
}