import { useParams, Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { 
  Calendar, 
  User, 
  Eye, 
  MessageSquare, 
  Share2, 
  Heart,
  ArrowLeft,
  Tag,
  Clock
} from "lucide-react";
import { useState } from "react";
import { getPostBySlug, getRecentPosts } from "@/lib/mockData";

const mockComments = [
  {
    id: 1,
    authorName: "Hassan Alami",
    authorEmail: "hassan@example.com",
    content: "What a match! I was there and the atmosphere was incredible. Mehdi's goal will be remembered forever!",
    createdAt: "2024-01-15T12:30:00Z",
    status: "approved"
  },
  {
    id: 2,
    authorName: "Fatima Zahra",
    authorEmail: "fatima@example.com", 
    content: "So proud of our team! This victory shows that hard work and dedication pay off. Congratulations ASA!",
    createdAt: "2024-01-15T14:15:00Z",
    status: "approved"
  },
  {
    id: 3,
    authorName: "Mohamed Tazi",
    authorEmail: "mohamed@example.com",
    content: "The best match I've seen in years. Both teams played their hearts out, but ASA deserved this win.",
    createdAt: "2024-01-15T16:45:00Z",
    status: "approved"
  }
];

export default function BlogPost() {
  const { slug } = useParams();
  const [liked, setLiked] = useState(false);
  const [commentForm, setCommentForm] = useState({
    name: "",
    email: "",
    content: ""
  });

  const post = getPostBySlug(slug || '');
  const relatedPosts = getRecentPosts(2);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In real app, submit to Supabase
    console.log('Comment submitted:', commentForm);
    setCommentForm({ name: "", email: "", content: "" });
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: post.title,
        text: post.excerpt,
        url: window.location.href,
      });
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
    }
  };

  if (!post) {
    return (
      <div className="text-center py-12">
        <h1 className="text-2xl font-bold text-foreground mb-4">Post Not Found</h1>
        <p className="text-muted-foreground">The post you're looking for doesn't exist or hasn't been published yet.</p>
        <Link to="/blog" className="mt-4 inline-block">
          <Button>Back to Blog</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Back Button */}
      <Link to="/blog">
        <Button variant="ghost" size="sm">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Blog
        </Button>
      </Link>

      {/* Article Header */}
      <article className="space-y-6">
        {/* Featured Image */}
        <div className="relative h-64 md:h-96 rounded-lg overflow-hidden">
          <img
            src={post.featuredImageUrl}
            alt={post.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Article Meta */}
        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <Badge variant="secondary">{post.category.name}</Badge>
            <div className="flex items-center space-x-1">
              <Calendar className="h-4 w-4" />
              <span>{formatDate(post.publishedAt)}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Clock className="h-4 w-4" />
              <span>{post.readingTime} min read</span>
            </div>
            <div className="flex items-center space-x-1">
              <Eye className="h-4 w-4" />
              <span>{post.views.toLocaleString()} views</span>
            </div>
            <div className="flex items-center space-x-1">
              <MessageSquare className="h-4 w-4" />
              <span>{post.commentsCount} comments</span>
            </div>
          </div>

          {/* Title */}
          <h1 className="text-3xl md:text-4xl font-bold text-foreground leading-tight">
            {post.title}
          </h1>

          {/* Author & Actions */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                <User className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="font-medium text-foreground">{post.author.name}</p>
                <p className="text-sm text-muted-foreground">{post.author.bio}</p>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setLiked(!liked)}
                className={liked ? "text-red-500" : ""}
              >
                <Heart className={`h-4 w-4 mr-1 ${liked ? "fill-current" : ""}`} />
                Like
              </Button>
              <Button variant="ghost" size="sm" onClick={handleShare}>
                <Share2 className="h-4 w-4 mr-1" />
                Share
              </Button>
            </div>
          </div>
        </div>

        {/* Article Content */}
        <Card className="p-8">
          <div 
            className="prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </Card>

        {/* Tags */}
        <div className="flex items-center space-x-2">
          <Tag className="h-4 w-4 text-muted-foreground" />
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <Link key={tag.slug} to={`/blog/tag/${tag.slug}`}>
                <Badge variant="outline" className="hover:bg-primary hover:text-primary-foreground transition-colors">
                  {tag.name}
                </Badge>
              </Link>
            ))}
          </div>
        </div>
      </article>

      {/* Comments Section */}
      <Card className="p-6">
        <h2 className="text-2xl font-bold text-foreground mb-6">
          Comments ({mockComments.length})
        </h2>

        {/* Comment Form */}
        <form onSubmit={handleCommentSubmit} className="space-y-4 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              placeholder="Your Name"
              value={commentForm.name}
              onChange={(e) => setCommentForm({ ...commentForm, name: e.target.value })}
              required
            />
            <Input
              type="email"
              placeholder="Your Email"
              value={commentForm.email}
              onChange={(e) => setCommentForm({ ...commentForm, email: e.target.value })}
              required
            />
          </div>
          <Textarea
            placeholder="Write your comment..."
            value={commentForm.content}
            onChange={(e) => setCommentForm({ ...commentForm, content: e.target.value })}
            rows={4}
            required
          />
          <Button type="submit">Post Comment</Button>
        </form>

        {/* Comments List */}
        <div className="space-y-6">
          {mockComments.map((comment) => (
            <div key={comment.id} className="border-b border-border pb-6 last:border-b-0">
              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center flex-shrink-0">
                  <User className="h-5 w-5 text-muted-foreground" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <h4 className="font-medium text-foreground">{comment.authorName}</h4>
                    <span className="text-sm text-muted-foreground">
                      {formatDate(comment.createdAt)}
                    </span>
                  </div>
                  <p className="text-muted-foreground">{comment.content}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Related Posts */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-foreground">Related Posts</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {relatedPosts.slice(0, 2).map((relatedPost) => (
            <Card key={relatedPost.id} className="overflow-hidden hover-lift">
              <div className="relative h-48">
                <img
                  src={relatedPost.featuredImageUrl}
                  alt={relatedPost.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-foreground hover:text-primary transition-colors mb-2">
                  <Link to={`/blog/post/${relatedPost.slug}`}>
                    {relatedPost.title}
                  </Link>
                </h3>
                <p className="text-sm text-muted-foreground">
                  {formatDate(relatedPost.publishedAt)}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}