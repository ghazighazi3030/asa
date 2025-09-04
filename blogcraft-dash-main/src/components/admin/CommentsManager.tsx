import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { 
  Search, 
  MoreHorizontal, 
  Check, 
  X, 
  Flag,
  Clock,
  Calendar,
  User,
  MessageSquare,
  Edit,
  Trash,
  Eye,
  Reply
} from "lucide-react";

const comments = [
  {
    id: 1,
    content: "Great match! ASA played brilliantly and deserved this victory. The team showed real character in extra time.",
    author: {
      name: "Hassan Alami",
      email: "hassan@example.com",
      avatar: null
    },
    post: {
      title: "ASA Wins Championship Final Against Wydad",
      slug: "asa-wins-championship-final-wydad"
    },
    status: "pending",
    createdAt: "2024-01-15T14:30:00Z",
    ipAddress: "192.168.1.100",
    userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"
  },
  {
    id: 2,
    content: "Amazing performance! This is why I love ASA. Keep up the great work team!",
    author: {
      name: "Fatima Zahra",
      email: "fatima@example.com",
      avatar: null
    },
    post: {
      title: "ASA Wins Championship Final Against Wydad",
      slug: "asa-wins-championship-final-wydad"
    },
    status: "approved",
    createdAt: "2024-01-15T16:45:00Z",
    ipAddress: "10.0.0.50",
    userAgent: "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X)"
  },
  {
    id: 3,
    content: "This is spam content with suspicious links and promotional material that should be filtered out.",
    author: {
      name: "Spam User",
      email: "spam@suspicious.com",
      avatar: null
    },
    post: {
      title: "New Signing: Youssef Amrani",
      slug: "new-signing-youssef-amrani"
    },
    status: "spam",
    createdAt: "2024-01-14T09:20:00Z",
    ipAddress: "203.0.113.1",
    userAgent: "Bot/1.0"
  },
  {
    id: 4,
    content: "Not impressed with this signing. We needed a defender, not another midfielder.",
    author: {
      name: "Mohamed Tazi",
      email: "mohamed@example.com",
      avatar: null
    },
    post: {
      title: "New Signing: Youssef Amrani",
      slug: "new-signing-youssef-amrani"
    },
    status: "rejected",
    createdAt: "2024-01-14T11:15:00Z",
    ipAddress: "172.16.0.10",
    userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)"
  }
];

const statusColors = {
  pending: "bg-warning/10 text-warning",
  approved: "bg-success/10 text-success",
  rejected: "bg-destructive/10 text-destructive",
  spam: "bg-muted text-muted-foreground"
};

export default function CommentsManager() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [postFilter, setPostFilter] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [selectedComments, setSelectedComments] = useState<number[]>([]);
  const [editingComment, setEditingComment] = useState<any>(null);
  const [showReply, setShowReply] = useState<number | null>(null);
  const [replyContent, setReplyContent] = useState("");

  const filteredComments = comments.filter(comment => {
    const matchesSearch = comment.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         comment.author.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         comment.author.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || comment.status === statusFilter;
    const matchesPost = postFilter === "all" || comment.post.slug === postFilter;
    
    return matchesSearch && matchesStatus && matchesPost;
  });

  const sortedComments = [...filteredComments].sort((a, b) => {
    switch (sortBy) {
      case "newest":
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      case "oldest":
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      case "author":
        return a.author.name.localeCompare(b.author.name);
      default:
        return 0;
    }
  });

  const handleSelectComment = (commentId: number) => {
    setSelectedComments(prev => 
      prev.includes(commentId) 
        ? prev.filter(id => id !== commentId)
        : [...prev, commentId]
    );
  };

  const handleSelectAll = () => {
    setSelectedComments(
      selectedComments.length === sortedComments.length 
        ? [] 
        : sortedComments.map(comment => comment.id)
    );
  };

  const handleBulkAction = (action: string) => {
    console.log(`Bulk action: ${action} on comments:`, selectedComments);
    setSelectedComments([]);
  };

  const handleCommentAction = (action: string, commentId: number) => {
    console.log(`Action: ${action} on comment:`, commentId);
    if (action === 'edit') {
      const comment = comments.find(c => c.id === commentId);
      setEditingComment(comment);
    }
  };

  const handleSaveEdit = () => {
    console.log('Saving edited comment:', editingComment);
    setEditingComment(null);
  };

  const handleReply = (commentId: number) => {
    console.log('Replying to comment:', commentId, 'with content:', replyContent);
    setShowReply(null);
    setReplyContent("");
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const pendingCount = comments.filter(c => c.status === 'pending').length;
  const spamCount = comments.filter(c => c.status === 'spam').length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Comments</h1>
          <p className="mt-2 text-muted-foreground">Moderate and manage user comments.</p>
        </div>
        <div className="flex items-center space-x-2 mt-4 sm:mt-0">
          {pendingCount > 0 && (
            <Badge variant="outline" className="bg-warning/10 text-warning">
              {pendingCount} pending
            </Badge>
          )}
          {spamCount > 0 && (
            <Badge variant="outline" className="bg-destructive/10 text-destructive">
              {spamCount} spam
            </Badge>
          )}
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-6">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <MessageSquare className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Total Comments</p>
              <p className="text-2xl font-bold text-foreground">{comments.length}</p>
            </div>
          </div>
        </Card>
        
        <Card className="p-6">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-warning/10 rounded-lg">
              <Clock className="h-6 w-6 text-warning" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Pending</p>
              <p className="text-2xl font-bold text-foreground">{pendingCount}</p>
            </div>
          </div>
        </Card>
        
        <Card className="p-6">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-success/10 rounded-lg">
              <Check className="h-6 w-6 text-success" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Approved</p>
              <p className="text-2xl font-bold text-foreground">
                {comments.filter(c => c.status === 'approved').length}
              </p>
            </div>
          </div>
        </Card>
        
        <Card className="p-6">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-destructive/10 rounded-lg">
              <Flag className="h-6 w-6 text-destructive" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Spam</p>
              <p className="text-2xl font-bold text-foreground">{spamCount}</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Filters */}
      <Card className="p-6">
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search comments, authors, or content..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <div className="flex items-center gap-2">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                  <SelectItem value="spam">Spam</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest</SelectItem>
                  <SelectItem value="oldest">Oldest</SelectItem>
                  <SelectItem value="author">Author A-Z</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          {/* Bulk Actions */}
          {selectedComments.length > 0 && (
            <div className="flex items-center justify-between p-3 bg-primary/5 rounded-lg">
              <span className="text-sm font-medium text-foreground">
                {selectedComments.length} comment{selectedComments.length > 1 ? 's' : ''} selected
              </span>
              <div className="flex items-center space-x-2">
                <Button size="sm" variant="outline" onClick={() => handleBulkAction('approve')}>
                  <Check className="mr-1 h-3 w-3" />
                  Approve
                </Button>
                <Button size="sm" variant="outline" onClick={() => handleBulkAction('reject')}>
                  <X className="mr-1 h-3 w-3" />
                  Reject
                </Button>
                <Button size="sm" variant="outline" onClick={() => handleBulkAction('spam')}>
                  <Flag className="mr-1 h-3 w-3" />
                  Mark Spam
                </Button>
                <Button size="sm" variant="destructive" onClick={() => handleBulkAction('delete')}>
                  <Trash className="mr-1 h-3 w-3" />
                  Delete
                </Button>
              </div>
            </div>
          )}
        </div>
      </Card>

      {/* Comments List */}
      <div className="space-y-4">
        {sortedComments.map((comment) => (
          <Card key={comment.id} className="p-6">
            <div className="space-y-4">
              {/* Comment Header */}
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3">
                  <input
                    type="checkbox"
                    checked={selectedComments.includes(comment.id)}
                    onChange={() => handleSelectComment(comment.id)}
                    className="mt-1 rounded border-border"
                  />
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <User className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <h4 className="font-medium text-foreground">{comment.author.name}</h4>
                      <Badge className={statusColors[comment.status as keyof typeof statusColors]}>
                        {comment.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{comment.author.email}</p>
                    <div className="flex items-center space-x-4 mt-1 text-xs text-muted-foreground">
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-3 w-3" />
                        <span>{formatDate(comment.createdAt)}</span>
                      </div>
                      <span>on "{comment.post.title}"</span>
                    </div>
                  </div>
                </div>
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    {comment.status === 'pending' && (
                      <>
                        <DropdownMenuItem onClick={() => handleCommentAction('approve', comment.id)}>
                          <Check className="mr-2 h-4 w-4" />
                          Approve
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleCommentAction('reject', comment.id)}>
                          <X className="mr-2 h-4 w-4" />
                          Reject
                        </DropdownMenuItem>
                      </>
                    )}
                    <DropdownMenuItem onClick={() => handleCommentAction('edit', comment.id)}>
                      <Edit className="mr-2 h-4 w-4" />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setShowReply(comment.id)}>
                      <Reply className="mr-2 h-4 w-4" />
                      Reply
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleCommentAction('view', comment.id)}>
                      <Eye className="mr-2 h-4 w-4" />
                      View Post
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => handleCommentAction('spam', comment.id)}>
                      <Flag className="mr-2 h-4 w-4" />
                      Mark as Spam
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      onClick={() => handleCommentAction('delete', comment.id)}
                      className="text-destructive"
                    >
                      <Trash className="mr-2 h-4 w-4" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              {/* Comment Content */}
              <div className="ml-13">
                <p className="text-foreground leading-relaxed">{comment.content}</p>
              </div>

              {/* Comment Actions */}
              <div className="ml-13 flex items-center space-x-2">
                {comment.status === 'pending' && (
                  <>
                    <Button size="sm" onClick={() => handleCommentAction('approve', comment.id)}>
                      <Check className="mr-1 h-3 w-3" />
                      Approve
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => handleCommentAction('reject', comment.id)}>
                      <X className="mr-1 h-3 w-3" />
                      Reject
                    </Button>
                  </>
                )}
                <Button size="sm" variant="ghost" onClick={() => setShowReply(comment.id)}>
                  <Reply className="mr-1 h-3 w-3" />
                  Reply
                </Button>
              </div>

              {/* Reply Form */}
              {showReply === comment.id && (
                <div className="ml-13 mt-4 space-y-3">
                  <Textarea
                    placeholder="Write your reply..."
                    value={replyContent}
                    onChange={(e) => setReplyContent(e.target.value)}
                    rows={3}
                  />
                  <div className="flex items-center space-x-2">
                    <Button size="sm" onClick={() => handleReply(comment.id)}>
                      Send Reply
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => setShowReply(null)}>
                      Cancel
                    </Button>
                  </div>
                </div>
              )}

              {/* Technical Info */}
              <div className="ml-13 text-xs text-muted-foreground">
                <details className="cursor-pointer">
                  <summary>Technical Details</summary>
                  <div className="mt-2 space-y-1">
                    <p>IP Address: {comment.ipAddress}</p>
                    <p>User Agent: {comment.userAgent}</p>
                  </div>
                </details>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {sortedComments.length === 0 && (
        <Card className="p-12 text-center">
          <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-foreground mb-2">No comments found</h3>
          <p className="text-muted-foreground">
            {searchTerm 
              ? `No comments match your search for "${searchTerm}"`
              : "No comments to moderate at the moment"
            }
          </p>
        </Card>
      )}

      {/* Edit Comment Dialog */}
      <Dialog open={!!editingComment} onOpenChange={() => setEditingComment(null)}>
        <DialogContent className="sm:max-w-[525px]">
          <DialogHeader>
            <DialogTitle>Edit Comment</DialogTitle>
            <DialogDescription>
              Make changes to the comment content. The author will be notified of any edits.
            </DialogDescription>
          </DialogHeader>
          {editingComment && (
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="author">Author</Label>
                <Input
                  id="author"
                  value={editingComment.author.name}
                  onChange={(e) => setEditingComment({
                    ...editingComment,
                    author: { ...editingComment.author, name: e.target.value }
                  })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={editingComment.author.email}
                  onChange={(e) => setEditingComment({
                    ...editingComment,
                    author: { ...editingComment.author, email: e.target.value }
                  })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="content">Content</Label>
                <Textarea
                  id="content"
                  value={editingComment.content}
                  onChange={(e) => setEditingComment({
                    ...editingComment,
                    content: e.target.value
                  })}
                  rows={4}
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditingComment(null)}>
              Cancel
            </Button>
            <Button onClick={handleSaveEdit}>
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}