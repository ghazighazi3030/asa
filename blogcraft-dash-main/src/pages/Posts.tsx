import { useState } from "react";
import PostEditor from "@/components/admin/PostEditor";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
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
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { 
  Plus, 
  Search, 
  Filter, 
  MoreHorizontal, 
  Edit, 
  Trash, 
  Eye,
  Calendar,
  User,
  Copy,
  ExternalLink,
  Archive,
  Clock,
  FileText
} from "lucide-react";
import { 
  getAdminPosts, 
  getAdminPostById, 
  createPost, 
  updatePost, 
  deletePost, 
  duplicatePost, 
  schedulePost, 
  archivePost 
} from "@/lib/mockData";

const statusColors = {
  published: "bg-success/10 text-success",
  draft: "bg-warning/10 text-warning",
  scheduled: "bg-accent/10 text-accent",
  archived: "bg-muted text-muted-foreground",
  rejected: "bg-destructive/10 text-destructive"
};

export default function Posts() {
  const [posts, setPosts] = useState(getAdminPosts());
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [selectedPosts, setSelectedPosts] = useState<number[]>([]);
  const [showEditor, setShowEditor] = useState(false);
  const [editingPost, setEditingPost] = useState<any>(null);

  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.category.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || post.status === statusFilter;
    const matchesCategory = categoryFilter === "all" || post.category === categoryFilter;
    
    return matchesSearch && matchesStatus && matchesCategory;
  });

  const sortedPosts = [...filteredPosts].sort((a, b) => {
    switch (sortBy) {
      case "newest":
        return new Date(b.publishDate || "").getTime() - new Date(a.publishDate || "").getTime();
      case "oldest":
        return new Date(a.publishDate || "").getTime() - new Date(b.publishDate || "").getTime();
      case "title":
        return a.title.localeCompare(b.title);
      case "views":
        return b.views - a.views;
      default:
        return 0;
    }
  });

  const handleSelectPost = (postId: number) => {
    setSelectedPosts(prev => 
      prev.includes(postId) 
        ? prev.filter(id => id !== postId)
        : [...prev, postId]
    );
  };

  const handleSelectAll = () => {
    setSelectedPosts(
      selectedPosts.length === sortedPosts.length 
        ? [] 
        : sortedPosts.map(post => post.id)
    );
  };

  const handleBulkAction = (action: string) => {
    console.log(`Bulk action: ${action} on posts:`, selectedPosts);
    // Refresh posts after bulk action
    setPosts(getAdminPosts());
    setSelectedPosts([]);
  };

  const handlePostAction = (action: string, postId: number) => {
    console.log(`Action: ${action} on post:`, postId);
    if (action === 'edit') {
      const post = getAdminPostById(postId);
      if (post) {
        setEditingPost({
          id: post.id,
          title: post.title,
          slug: post.slug,
          excerpt: post.excerpt || `Brief excerpt for ${post.title}`,
          content: post.content || `<h2>Welcome to ${post.title}</h2><p>This is the main content of the post...</p>`,
          status: post.status,
          category: post.category.slug,
          tags: post.tags.map((tag: any) => typeof tag === 'string' ? tag : tag.name),
          featuredImage: post.featuredImageUrl || "",
          scheduledAt: post.scheduledAt || "",
          metaTitle: post.metaTitle || post.title,
          metaDescription: post.metaDescription || `Learn about ${post.title}`,
          metaKeywords: post.tags.map((tag: any) => typeof tag === 'string' ? tag : tag.name)
        });
        setShowEditor(true);
      }
    } else if (action === 'preview') {
      const post = getAdminPostById(postId);
      if (post) {
        // Create preview data
        const previewData = {
          id: post.id,
          title: post.title,
          slug: post.slug,
          excerpt: post.excerpt || `Brief excerpt for ${post.title}`,
          content: post.content || `<h2>Welcome to ${post.title}</h2><p>This is the main content of the post...</p>`,
          status: post.status,
          category: post.category.slug,
          tags: post.tags.map((tag: any) => typeof tag === 'string' ? tag : tag.name),
          featuredImage: post.featuredImageUrl || "https://images.pexels.com/photos/274506/pexels-photo-274506.jpeg",
          scheduledAt: post.scheduledAt || "",
          metaTitle: post.metaTitle || post.title,
          metaDescription: post.metaDescription || `Learn about ${post.title}`,
          metaKeywords: post.tags.map((tag: any) => typeof tag === 'string' ? tag : tag.name)
        };
        
        // Store preview data and open in new tab
        sessionStorage.setItem('previewPost', JSON.stringify(previewData));
        window.open('/blog/post/preview', '_blank');
      }
    } else if (action === 'duplicate') {
      duplicatePost(postId);
      setPosts(getAdminPosts());
    } else if (action === 'schedule') {
      schedulePost(postId);
      setPosts(getAdminPosts());
    } else if (action === 'archive') {
      archivePost(postId);
      setPosts(getAdminPosts());
    } else if (action === 'delete') {
      deletePost(postId);
      setPosts(getAdminPosts());
    } else if (action === 'view') {
      const post = getAdminPostById(postId);
      if (post && post.status === 'published') {
        // Open published post in new tab
        window.open(`/blog/post/${post.slug}`, '_blank');
      } else {
        // Show preview for unpublished posts
        handlePostAction('preview', postId);
      }
    }
  };

  const handleCreatePost = () => {
    setEditingPost(null);
    setShowEditor(true);
  };

  const handleSavePost = (postData: any) => {
    console.log('Saving post:', postData);
    
    if (postData.id) {
      // Update existing post
      updatePost(postData.id, postData);
    } else {
      // Create new post
      createPost(postData);
    }
    
    // Refresh posts list
    setPosts(getAdminPosts());
    setShowEditor(false);
    setEditingPost(null);
  };

  const handleCancelEdit = () => {
    setShowEditor(false);
    setEditingPost(null);
  };

  // If showing editor, render the editor instead of the posts list
  if (showEditor) {
    return (
      <PostEditor
        post={editingPost}
        onSave={handleSavePost}
        onCancel={handleCancelEdit}
      />
    );
  }
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Posts</h1>
          <p className="mt-2 text-muted-foreground">Manage your blog posts and content.</p>
        </div>
        <Button className="mt-4 sm:mt-0" size="lg" onClick={handleCreatePost}>
          <Plus className="mr-2 h-4 w-4" />
          New Post
        </Button>
      </div>

      {/* Filters */}
      <Card className="p-6">
        <div className="space-y-4">
          {/* Search and Primary Filters */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search posts, authors, categories..."
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
                  <SelectItem value="published">Published</SelectItem>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="scheduled">Scheduled</SelectItem>
                  <SelectItem value="archived">Archived</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="Development">Development</SelectItem>
                  <SelectItem value="Programming">Programming</SelectItem>
                  <SelectItem value="Design">Design</SelectItem>
                  <SelectItem value="Match Reports">Match Reports</SelectItem>
                  <SelectItem value="Transfers">Transfers</SelectItem>
                  <SelectItem value="Training">Training</SelectItem>
                  <SelectItem value="Youth Academy">Youth Academy</SelectItem>
                  <SelectItem value="Infrastructure">Infrastructure</SelectItem>
                  <SelectItem value="Community">Community</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest</SelectItem>
                  <SelectItem value="oldest">Oldest</SelectItem>
                  <SelectItem value="title">Title A-Z</SelectItem>
                  <SelectItem value="views">Most Views</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          {/* Bulk Actions */}
          {selectedPosts.length > 0 && (
            <div className="flex items-center justify-between p-3 bg-primary/5 rounded-lg">
              <span className="text-sm font-medium text-foreground">
                {selectedPosts.length} post{selectedPosts.length > 1 ? 's' : ''} selected
              </span>
              <div className="flex items-center space-x-2">
                <Button size="sm" variant="outline" onClick={() => handleBulkAction('publish')}>
                  Publish
                </Button>
                <Button size="sm" variant="outline" onClick={() => handleBulkAction('draft')}>
                  Draft
                </Button>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button size="sm" variant="destructive">
                      Delete
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Delete Posts</AlertDialogTitle>
                      <AlertDialogDescription>
                        Are you sure you want to delete {selectedPosts.length} post{selectedPosts.length > 1 ? 's' : ''}? This action cannot be undone.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={() => handleBulkAction('delete')}>
                        Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>
          )}
        </div>
      </Card>

      {/* Results Summary */}
      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <span>
          Showing {sortedPosts.length} of {posts.length} posts
          {searchTerm && ` for "${searchTerm}"`}
        </span>
        <span>
          {statusFilter !== "all" && `Status: ${statusFilter}`}
          {categoryFilter !== "all" && ` • Category: ${categoryFilter}`}
        </span>
      </div>

      {/* Posts Table */}
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-secondary/30 border-b border-border">
              <tr>
                <th className="text-left py-4 px-6 font-medium text-foreground w-12">
                  <input
                    type="checkbox"
                    checked={selectedPosts.length === sortedPosts.length && sortedPosts.length > 0}
                    onChange={handleSelectAll}
                    className="rounded border-border"
                  />
                </th>
                <th className="text-left py-4 px-6 font-medium text-foreground">Title</th>
                <th className="text-left py-4 px-6 font-medium text-foreground">Author</th>
                <th className="text-left py-4 px-6 font-medium text-foreground">Status</th>
                <th className="text-left py-4 px-6 font-medium text-foreground">Category</th>
                <th className="text-left py-4 px-6 font-medium text-foreground">Date</th>
                <th className="text-left py-4 px-6 font-medium text-foreground">Performance</th>
                <th className="text-right py-4 px-6 font-medium text-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {sortedPosts.map((post) => (
                <tr key={post.id} className="border-b border-border last:border-b-0 hover:bg-secondary/20 transition-custom">
                  <td className="py-4 px-6">
                    <input
                      type="checkbox"
                      checked={selectedPosts.includes(post.id)}
                      onChange={() => handleSelectPost(post.id)}
                      className="rounded border-border"
                    />
                  </td>
                  <td className="py-4 px-6">
                    <div>
                      <h3 className="font-medium text-foreground hover:text-primary cursor-pointer transition-custom">
                        {post.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mt-1">/{post.slug}</p>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {post.tags.slice(0, 2).map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                        {post.tags.length > 2 && (
                          <Badge variant="outline" className="text-xs">
                            +{post.tags.length - 2}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                        <User className="h-4 w-4 text-primary" />
                      </div>
                      <span className="text-sm text-foreground">{post.author}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <Badge className={statusColors[post.status as keyof typeof statusColors]}>
                      {post.status}
                    </Badge>
                  </td>
                  <td className="py-4 px-6">
                    <span className="text-sm text-muted-foreground">{post.category}</span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4 mr-2" />
                      {post.publishDate || "Not scheduled"}
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="space-y-1">
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Eye className="h-4 w-4 mr-2" />
                        {post.views.toLocaleString()} views
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {post.comments} comments
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center justify-end space-x-2">
                      <Button variant="ghost" size="sm" onClick={() => handlePostAction('edit', post.id)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => handlePostAction('view', post.id)}>
                        <Eye className="h-4 w-4" />
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem onClick={() => handlePostAction('duplicate', post.id)}>
                            <Copy className="mr-2 h-4 w-4" />
                            Duplicate
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handlePostAction('preview', post.id)}>
                            <ExternalLink className="mr-2 h-4 w-4" />
                            Preview
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handlePostAction('schedule', post.id)}>
                            <Clock className="mr-2 h-4 w-4" />
                            Schedule
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={() => handlePostAction('archive', post.id)}>
                            <Archive className="mr-2 h-4 w-4" />
                            Archive
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            onClick={() => handlePostAction('delete', post.id)}
                            className="text-destructive"
                          >
                            <Trash className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Empty State */}
      {sortedPosts.length === 0 && (
        <Card className="p-12 text-center">
          <div className="flex justify-center mb-4">
            <FileText className="h-12 w-12 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-semibold text-foreground mb-2">No posts found</h3>
          <p className="text-muted-foreground mb-4">
            {searchTerm 
              ? `No posts match your search for "${searchTerm}"`
              : "Get started by creating your first post"
            }
          </p>
          <Button onClick={handleCreatePost}>
            <Plus className="mr-2 h-4 w-4" />
            Create New Post
          </Button>
        </Card>
      )}

      {/* Pagination */}
      {sortedPosts.length > 0 && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Showing {sortedPosts.length} of {posts.length} posts
          </p>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" disabled>
              Previous
            </Button>
            <Button variant="outline" size="sm">
              1
            </Button>
            <Button variant="outline" size="sm" disabled>
              Next
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}