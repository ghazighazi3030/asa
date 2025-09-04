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
import { Label } from "@/components/ui/label";
import { 
  Plus, 
  Search, 
  MoreHorizontal, 
  Edit, 
  Trash, 
  Tag,
  FileText,
  Calendar,
  TrendingUp,
  Eye,
  Users,
  Archive,
  Copy
} from "lucide-react";

// Mock categories data
const initialCategories = [
  {
    id: 1,
    name: "Match Reports",
    slug: "match-reports",
    description: "Detailed coverage of ASA matches, including analysis and highlights",
    postsCount: 24,
    color: "#dc2626",
    isActive: true,
    createdAt: "2023-08-15T10:00:00Z",
    updatedAt: "2024-01-15T10:00:00Z"
  },
  {
    id: 2,
    name: "Transfers",
    slug: "transfers",
    description: "Latest news on player transfers, signings, and contract updates",
    postsCount: 18,
    color: "#2563eb",
    isActive: true,
    createdAt: "2023-08-20T10:00:00Z",
    updatedAt: "2024-01-14T10:00:00Z"
  },
  {
    id: 3,
    name: "Training",
    slug: "training",
    description: "Behind-the-scenes look at training sessions and preparation",
    postsCount: 15,
    color: "#16a34a",
    isActive: true,
    createdAt: "2023-09-01T10:00:00Z",
    updatedAt: "2024-01-12T10:00:00Z"
  },
  {
    id: 4,
    name: "Youth Academy",
    slug: "youth",
    description: "Stories from our youth development program and rising stars",
    postsCount: 12,
    color: "#ca8a04",
    isActive: true,
    createdAt: "2023-09-15T10:00:00Z",
    updatedAt: "2024-01-10T10:00:00Z"
  },
  {
    id: 5,
    name: "Infrastructure",
    slug: "infrastructure",
    description: "Updates on stadium, facilities, and club infrastructure",
    postsCount: 8,
    color: "#7c3aed",
    isActive: true,
    createdAt: "2023-10-01T10:00:00Z",
    updatedAt: "2024-01-08T10:00:00Z"
  },
  {
    id: 6,
    name: "Community",
    slug: "community",
    description: "ASA's involvement in community projects and social initiatives",
    postsCount: 10,
    color: "#ea580c",
    isActive: false,
    createdAt: "2023-10-15T10:00:00Z",
    updatedAt: "2024-01-05T10:00:00Z"
  }
];

const colorOptions = [
  { value: "#dc2626", label: "Red", color: "#dc2626" },
  { value: "#2563eb", label: "Blue", color: "#2563eb" },
  { value: "#16a34a", label: "Green", color: "#16a34a" },
  { value: "#ca8a04", label: "Yellow", color: "#ca8a04" },
  { value: "#7c3aed", label: "Purple", color: "#7c3aed" },
  { value: "#ea580c", label: "Orange", color: "#ea580c" },
  { value: "#0891b2", label: "Cyan", color: "#0891b2" },
  { value: "#be185d", label: "Pink", color: "#be185d" }
];

export default function Categories() {
  const [categories, setCategories] = useState(initialCategories);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
  const [showAddCategory, setShowAddCategory] = useState(false);
  const [editingCategory, setEditingCategory] = useState<any>(null);
  const [newCategory, setNewCategory] = useState({
    name: "",
    slug: "",
    description: "",
    color: "#2563eb",
    isActive: true
  });

  const filteredCategories = categories.filter(category => {
    const matchesSearch = category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         category.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || 
                         (statusFilter === "active" && category.isActive) ||
                         (statusFilter === "inactive" && !category.isActive);
    
    return matchesSearch && matchesStatus;
  });

  const sortedCategories = [...filteredCategories].sort((a, b) => {
    switch (sortBy) {
      case "newest":
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      case "oldest":
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      case "name":
        return a.name.localeCompare(b.name);
      case "posts":
        return b.postsCount - a.postsCount;
      default:
        return 0;
    }
  });

  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  };

  const handleSelectCategory = (categoryId: number) => {
    setSelectedCategories(prev => 
      prev.includes(categoryId) 
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const handleSelectAll = () => {
    setSelectedCategories(
      selectedCategories.length === sortedCategories.length 
        ? [] 
        : sortedCategories.map(category => category.id)
    );
  };

  const handleBulkAction = (action: string) => {
    console.log(`Bulk action: ${action} on categories:`, selectedCategories);
    
    if (action === 'activate') {
      setCategories(prev => prev.map(cat => 
        selectedCategories.includes(cat.id) 
          ? { ...cat, isActive: true, updatedAt: new Date().toISOString() }
          : cat
      ));
    } else if (action === 'deactivate') {
      setCategories(prev => prev.map(cat => 
        selectedCategories.includes(cat.id) 
          ? { ...cat, isActive: false, updatedAt: new Date().toISOString() }
          : cat
      ));
    } else if (action === 'delete') {
      setCategories(prev => prev.filter(cat => !selectedCategories.includes(cat.id)));
    }
    
    setSelectedCategories([]);
  };

  const handleCategoryAction = (action: string, categoryId: number) => {
    const category = categories.find(c => c.id === categoryId);
    
    if (action === 'edit') {
      setEditingCategory(category);
      setNewCategory({
        name: category?.name || "",
        slug: category?.slug || "",
        description: category?.description || "",
        color: category?.color || "#2563eb",
        isActive: category?.isActive || true
      });
      setShowAddCategory(true);
    } else if (action === 'duplicate') {
      if (category) {
        const newId = Math.max(...categories.map(c => c.id)) + 1;
        const duplicatedCategory = {
          ...category,
          id: newId,
          name: `${category.name} (Copy)`,
          slug: `${category.slug}-copy`,
          postsCount: 0,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };
        setCategories(prev => [...prev, duplicatedCategory]);
      }
    } else if (action === 'toggle') {
      setCategories(prev => prev.map(cat => 
        cat.id === categoryId 
          ? { ...cat, isActive: !cat.isActive, updatedAt: new Date().toISOString() }
          : cat
      ));
    } else if (action === 'delete') {
      setCategories(prev => prev.filter(cat => cat.id !== categoryId));
    }
  };

  const handleAddCategory = () => {
    if (editingCategory) {
      // Update existing category
      setCategories(prev => prev.map(cat => 
        cat.id === editingCategory.id 
          ? { 
              ...cat, 
              ...newCategory,
              slug: generateSlug(newCategory.name),
              updatedAt: new Date().toISOString()
            }
          : cat
      ));
    } else {
      // Add new category
      const newId = Math.max(...categories.map(c => c.id)) + 1;
      const category = {
        id: newId,
        ...newCategory,
        slug: generateSlug(newCategory.name),
        postsCount: 0,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      setCategories(prev => [...prev, category]);
    }
    
    setShowAddCategory(false);
    setEditingCategory(null);
    setNewCategory({
      name: "",
      slug: "",
      description: "",
      color: "#2563eb",
      isActive: true
    });
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const totalPosts = categories.reduce((sum, cat) => sum + cat.postsCount, 0);
  const activeCategories = categories.filter(cat => cat.isActive).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Categories</h1>
          <p className="mt-2 text-muted-foreground">Organize your content with categories and tags.</p>
        </div>
        <Button className="mt-4 sm:mt-0" size="lg" onClick={() => setShowAddCategory(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add Category
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-6">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Tag className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Total Categories</p>
              <p className="text-2xl font-bold text-foreground">{categories.length}</p>
            </div>
          </div>
        </Card>
        
        <Card className="p-6">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-success/10 rounded-lg">
              <TrendingUp className="h-6 w-6 text-success" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Active Categories</p>
              <p className="text-2xl font-bold text-foreground">{activeCategories}</p>
            </div>
          </div>
        </Card>
        
        <Card className="p-6">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-accent/10 rounded-lg">
              <FileText className="h-6 w-6 text-accent" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Total Posts</p>
              <p className="text-2xl font-bold text-foreground">{totalPosts}</p>
            </div>
          </div>
        </Card>
        
        <Card className="p-6">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-warning/10 rounded-lg">
              <Eye className="h-6 w-6 text-warning" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Avg Posts/Category</p>
              <p className="text-2xl font-bold text-foreground">
                {categories.length > 0 ? Math.round(totalPosts / categories.length) : 0}
              </p>
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
                placeholder="Search categories by name or description..."
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
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest</SelectItem>
                  <SelectItem value="oldest">Oldest</SelectItem>
                  <SelectItem value="name">Name A-Z</SelectItem>
                  <SelectItem value="posts">Most Posts</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          {/* Bulk Actions */}
          {selectedCategories.length > 0 && (
            <div className="flex items-center justify-between p-3 bg-primary/5 rounded-lg">
              <span className="text-sm font-medium text-foreground">
                {selectedCategories.length} categor{selectedCategories.length > 1 ? 'ies' : 'y'} selected
              </span>
              <div className="flex items-center space-x-2">
                <Button size="sm" variant="outline" onClick={() => handleBulkAction('activate')}>
                  <TrendingUp className="mr-1 h-3 w-3" />
                  Activate
                </Button>
                <Button size="sm" variant="outline" onClick={() => handleBulkAction('deactivate')}>
                  <Archive className="mr-1 h-3 w-3" />
                  Deactivate
                </Button>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button size="sm" variant="destructive">
                      <Trash className="mr-1 h-3 w-3" />
                      Delete
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Delete Categories</AlertDialogTitle>
                      <AlertDialogDescription>
                        Are you sure you want to delete {selectedCategories.length} categor{selectedCategories.length > 1 ? 'ies' : 'y'}? 
                        This will also affect all posts in these categories. This action cannot be undone.
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

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedCategories.map((category) => (
          <Card key={category.id} className="p-6 hover-lift">
            <div className="space-y-4">
              {/* Header */}
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes(category.id)}
                    onChange={() => handleSelectCategory(category.id)}
                    className="rounded border-border"
                  />
                  <div 
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: category.color }}
                  />
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem onClick={() => handleCategoryAction('edit', category.id)}>
                      <Edit className="mr-2 h-4 w-4" />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleCategoryAction('duplicate', category.id)}>
                      <Copy className="mr-2 h-4 w-4" />
                      Duplicate
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleCategoryAction('toggle', category.id)}>
                      {category.isActive ? (
                        <>
                          <Archive className="mr-2 h-4 w-4" />
                          Deactivate
                        </>
                      ) : (
                        <>
                          <TrendingUp className="mr-2 h-4 w-4" />
                          Activate
                        </>
                      )}
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem 
                      onClick={() => handleCategoryAction('delete', category.id)}
                      className="text-destructive"
                    >
                      <Trash className="mr-2 h-4 w-4" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              {/* Category Info */}
              <div>
                <div className="flex items-center space-x-2 mb-2">
                  <h3 className="text-lg font-semibold text-foreground">{category.name}</h3>
                  <Badge className={category.isActive ? "bg-success/10 text-success" : "bg-muted text-muted-foreground"}>
                    {category.isActive ? "Active" : "Inactive"}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-3">{category.description}</p>
                <p className="text-xs text-muted-foreground">Slug: /{category.slug}</p>
              </div>

              {/* Stats */}
              <div className="flex items-center justify-between pt-3 border-t border-border">
                <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                  <div className="flex items-center space-x-1">
                    <FileText className="h-4 w-4" />
                    <span>{category.postsCount} posts</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Calendar className="h-4 w-4" />
                    <span>{formatDate(category.updatedAt)}</span>
                  </div>
                </div>
                <Button variant="ghost" size="sm" onClick={() => handleCategoryAction('edit', category.id)}>
                  <Edit className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {sortedCategories.length === 0 && (
        <Card className="p-12 text-center">
          <Tag className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-foreground mb-2">No categories found</h3>
          <p className="text-muted-foreground mb-4">
            {searchTerm 
              ? `No categories match your search for "${searchTerm}"`
              : "Get started by creating your first category"
            }
          </p>
          <Button onClick={() => setShowAddCategory(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Create Category
          </Button>
        </Card>
      )}

      {/* Add/Edit Category Dialog */}
      <Dialog open={showAddCategory} onOpenChange={setShowAddCategory}>
        <DialogContent className="sm:max-w-[525px]">
          <DialogHeader>
            <DialogTitle>{editingCategory ? "Edit Category" : "Add New Category"}</DialogTitle>
            <DialogDescription>
              {editingCategory 
                ? "Update the category information below."
                : "Create a new category to organize your blog posts."
              }
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                value={newCategory.name}
                onChange={(e) => setNewCategory({ 
                  ...newCategory, 
                  name: e.target.value,
                  slug: generateSlug(e.target.value)
                })}
                className="col-span-3"
                placeholder="Category name"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="slug" className="text-right">
                Slug
              </Label>
              <Input
                id="slug"
                value={newCategory.slug}
                onChange={(e) => setNewCategory({ ...newCategory, slug: e.target.value })}
                className="col-span-3"
                placeholder="category-slug"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">
                Description
              </Label>
              <Textarea
                id="description"
                value={newCategory.description}
                onChange={(e) => setNewCategory({ ...newCategory, description: e.target.value })}
                className="col-span-3"
                placeholder="Category description..."
                rows={3}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="color" className="text-right">
                Color
              </Label>
              <div className="col-span-3">
                <div className="flex flex-wrap gap-2">
                  {colorOptions.map((color) => (
                    <button
                      key={color.value}
                      onClick={() => setNewCategory({ ...newCategory, color: color.value })}
                      className={`w-8 h-8 rounded-full border-2 transition-all ${
                        newCategory.color === color.value 
                          ? 'border-foreground scale-110' 
                          : 'border-border hover:scale-105'
                      }`}
                      style={{ backgroundColor: color.color }}
                      title={color.label}
                    />
                  ))}
                </div>
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="active" className="text-right">
                Status
              </Label>
              <div className="col-span-3">
                <Select 
                  value={newCategory.isActive ? "active" : "inactive"} 
                  onValueChange={(value) => setNewCategory({ ...newCategory, isActive: value === "active" })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => {
              setShowAddCategory(false);
              setEditingCategory(null);
              setNewCategory({
                name: "",
                slug: "",
                description: "",
                color: "#2563eb",
                isActive: true
              });
            }}>
              Cancel
            </Button>
            <Button onClick={handleAddCategory}>
              {editingCategory ? "Update Category" : "Add Category"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}