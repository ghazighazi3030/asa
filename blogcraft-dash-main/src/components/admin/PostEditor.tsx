import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Save, 
  Eye, 
  Upload, 
  X, 
  Plus,
  Calendar,
  Tag,
  Image as ImageIcon
} from "lucide-react";
import MediaPicker from "./MediaPicker";

interface PostEditorProps {
  post?: {
    id?: string;
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    status: string;
    category: string;
    tags: string[];
    featuredImage?: string;
    scheduledAt?: string;
    metaTitle?: string;
    metaDescription?: string;
    metaKeywords?: string[];
  };
  onSave: (post: any) => void;
  onCancel: () => void;
}

const categories = [
  { value: "match-reports", label: "Match Reports" },
  { value: "transfers", label: "Transfers" },
  { value: "training", label: "Training" },
  { value: "youth", label: "Youth Academy" },
  { value: "infrastructure", label: "Infrastructure" },
  { value: "community", label: "Community" },
  { value: "development", label: "Development" },
  { value: "programming", label: "Programming" },
  { value: "design", label: "Design" }
];

export default function PostEditor({ post, onSave, onCancel }: PostEditorProps) {
  const [formData, setFormData] = useState({
    title: post?.title || "",
    slug: post?.slug || "",
    excerpt: post?.excerpt || "",
    content: post?.content || "",
    status: post?.status || "draft",
    category: post?.category || "",
    tags: post?.tags || [],
    featuredImage: post?.featuredImage || "",
    scheduledAt: post?.scheduledAt || "",
    metaTitle: post?.metaTitle || "",
    metaDescription: post?.metaDescription || "",
    metaKeywords: post?.metaKeywords || []
  });

  const [newTag, setNewTag] = useState("");
  const [newKeyword, setNewKeyword] = useState("");
  const [showSEO, setShowSEO] = useState(false);
  const [showMediaPicker, setShowMediaPicker] = useState(false);

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  };

  const handleTitleChange = (title: string) => {
    setFormData({
      ...formData,
      title,
      slug: generateSlug(title)
    });
  };

  const addTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData({
        ...formData,
        tags: [...formData.tags, newTag.trim()]
      });
      setNewTag("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter(tag => tag !== tagToRemove)
    });
  };

  const addKeyword = () => {
    if (newKeyword.trim() && !formData.metaKeywords.includes(newKeyword.trim())) {
      setFormData({
        ...formData,
        metaKeywords: [...formData.metaKeywords, newKeyword.trim()]
      });
      setNewKeyword("");
    }
  };

  const removeKeyword = (keywordToRemove: string) => {
    setFormData({
      ...formData,
      metaKeywords: formData.metaKeywords.filter(keyword => keyword !== keywordToRemove)
    });
  };

  const handleSave = (status: string) => {
    // Ensure required fields are filled
    if (!formData.title.trim()) {
      alert('Please enter a post title');
      return;
    }
    
    const postData = {
      ...formData,
      status,
      id: post?.id,
      // Generate default content if empty
      content: formData.content.trim() || `<div class="prose prose-lg max-w-none"><h2>${formData.title}</h2><p>This is the content for ${formData.title}. Edit this post to add your actual content.</p></div>`,
      excerpt: formData.excerpt.trim() || `Brief excerpt for ${formData.title}`,
      category: formData.category || 'general',
      featuredImage: formData.featuredImage || "https://images.pexels.com/photos/274506/pexels-photo-274506.jpeg"
    };
    
    console.log('Saving post with data:', postData);
    onSave(postData);
  };

  const handleMediaSelect = (file: any) => {
    setFormData({
      ...formData,
      featuredImage: file.url
    });
    setShowMediaPicker(false);
  };

  const handlePreview = () => {
    const previewData = {
      ...formData,
      id: post?.id || 'preview'
    };
    
    sessionStorage.setItem('previewPost', JSON.stringify(previewData));
    window.open('/blog/post/preview', '_blank');
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // In real app, upload to storage and get URL
      const imageUrl = URL.createObjectURL(file);
      setFormData({
        ...formData,
        featuredImage: imageUrl
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-foreground">
          {post?.id ? "Edit Post" : "Create New Post"}
        </h1>
        <div className="flex items-center space-x-2">
          <Button variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button variant="outline" onClick={() => handleSave("draft")}>
            <Save className="mr-2 h-4 w-4" />
            Save Draft
          </Button>
          <Button variant="outline" onClick={handlePreview}>
            <Eye className="mr-2 h-4 w-4" />
            Preview
          </Button>
          <Button onClick={() => handleSave("published")}>
            Publish
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Information */}
          <Card className="p-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Title *
                </label>
                <Input
                  value={formData.title}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  placeholder="Enter post title..."
                  className="text-lg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Slug
                </label>
                <Input
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  placeholder="post-url-slug"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Excerpt
                </label>
                <Textarea
                  value={formData.excerpt}
                  onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                  placeholder="Brief description of the post..."
                  rows={3}
                />
              </div>
            </div>
          </Card>

          {/* Featured Image */}
          <Card className="p-6">
            <div className="space-y-4">
              <label className="block text-sm font-medium text-foreground">
                Featured Image
              </label>
              
              {formData.featuredImage ? (
                <div className="relative">
                  <img
                    src={formData.featuredImage}
                    alt="Featured"
                    className="w-full h-48 object-cover rounded-lg"
                  />
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => setShowMediaPicker(true)}
                    onClick={() => setFormData({ ...formData, featuredImage: "" })}
                  >
                    Choose from Library
                  </Button>
                </div>
              ) : (
                <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                  <ImageIcon className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground mb-4">Upload a featured image</p>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    id="image-upload"
                  />
                  <label htmlFor="image-upload">
                    <Button variant="outline" asChild>
                      <span>
                        <Upload className="mr-2 h-4 w-4" />
                        Choose Image
                      </span>
                    </Button>
                  </label>
                </div>
              )}
            </div>
          </Card>

          {/* Content Editor */}
          <Card className="p-6">
            <div className="space-y-4">
              <label className="block text-sm font-medium text-foreground">
                Content *
              </label>
              <Textarea
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                placeholder="Write your post content here..."
                rows={20}
                className="font-mono"
              />
              <p className="text-sm text-muted-foreground">
                You can use HTML tags for formatting.
              </p>
            </div>
          </Card>

          {/* SEO Section */}
          <Card className="p-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-foreground">SEO Settings</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowSEO(!showSEO)}
                >
                  {showSEO ? "Hide" : "Show"} SEO Options
                </Button>
              </div>

              {showSEO && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Meta Title
                    </label>
                    <Input
                      value={formData.metaTitle}
                      onChange={(e) => setFormData({ ...formData, metaTitle: e.target.value })}
                      placeholder="SEO title for search engines..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Meta Description
                    </label>
                    <Textarea
                      value={formData.metaDescription}
                      onChange={(e) => setFormData({ ...formData, metaDescription: e.target.value })}
                      placeholder="SEO description for search engines..."
                      rows={3}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Meta Keywords
                    </label>
                    <div className="flex space-x-2 mb-2">
                      <Input
                        value={newKeyword}
                        onChange={(e) => setNewKeyword(e.target.value)}
                        placeholder="Add keyword..."
                        onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addKeyword())}
                      />
                      <Button onClick={addKeyword} size="sm">
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {formData.metaKeywords.map((keyword) => (
                        <Badge key={keyword} variant="secondary" className="flex items-center space-x-1">
                          <span>{keyword}</span>
                          <button onClick={() => removeKeyword(keyword)}>
                            <X className="h-3 w-3" />
                          </button>
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Publish Settings */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">Publish Settings</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Status
                </label>
                <Select value={formData.status} onValueChange={(value) => setFormData({ ...formData, status: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="published">Published</SelectItem>
                    <SelectItem value="scheduled">Scheduled</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {formData.status === "scheduled" && (
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Schedule Date
                  </label>
                  <Input
                    type="datetime-local"
                    value={formData.scheduledAt}
                    onChange={(e) => setFormData({ ...formData, scheduledAt: e.target.value })}
                  />
                </div>
              )}
            </div>
          </Card>

          {/* Category */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">Category</h3>
            <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Select category..." />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category.value} value={category.value}>
                    {category.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Card>

          {/* Tags */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">Tags</h3>
            <div className="space-y-4">
              <div className="flex space-x-2">
                <Input
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  placeholder="Add tag..."
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                />
                <Button onClick={addTag} size="sm">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {formData.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="flex items-center space-x-1">
                    <Tag className="h-3 w-3" />
                    <span>{tag}</span>
                    <button onClick={() => removeTag(tag)}>
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            </div>
          </Card>

          {/* Preview */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">Preview</h3>
            <div className="space-y-3">
              <div className="p-3 bg-secondary/30 rounded-lg">
                <h4 className="font-medium text-foreground text-sm mb-1">
                  {formData.title || "Post Title"}
                </h4>
                <p className="text-xs text-muted-foreground">
                  {formData.excerpt || "Post excerpt will appear here..."}
                </p>
              </div>
              <Button variant="outline" size="sm" className="w-full">
                <Eye className="mr-2 h-4 w-4" />
                Preview Post
              </Button>
            </div>
          </Card>
        </div>
      </div>

      {/* Media Picker */}
      <MediaPicker
        isOpen={showMediaPicker}
        onClose={() => setShowMediaPicker(false)}
        onSelect={handleMediaSelect}
        allowedTypes={["image"]}
      />
    </div>
  );
}