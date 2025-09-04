import { useState } from "react";
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
import { Textarea } from "@/components/ui/textarea";
import { 
  Upload, 
  Search, 
  Filter, 
  MoreHorizontal, 
  Edit, 
  Trash, 
  Download,
  Copy,
  Eye,
  Image as ImageIcon,
  Video,
  FileText,
  Music,
  Archive,
  Grid3X3,
  List,
  Calendar,
  HardDrive,
  FolderPlus,
  Folder,
  X,
  Check,
  Star,
  Share2
} from "lucide-react";

// Mock media data
const initialMediaFiles = [
  {
    id: 1,
    name: "asa-championship-celebration.jpg",
    originalName: "Championship Celebration Photo",
    type: "image",
    mimeType: "image/jpeg",
    size: 2048576, // 2MB
    url: "https://images.pexels.com/photos/274506/pexels-photo-274506.jpeg",
    thumbnailUrl: "https://images.pexels.com/photos/274506/pexels-photo-274506.jpeg?w=300&h=200&fit=crop",
    uploadedAt: "2024-01-15T10:00:00Z",
    uploadedBy: "Ahmed Benali",
    folder: "match-photos",
    alt: "ASA players celebrating championship victory",
    caption: "ASA team celebrating their historic championship win",
    tags: ["championship", "celebration", "victory", "team"],
    usageCount: 5,
    isFavorite: true
  },
  {
    id: 2,
    name: "youssef-amrani-signing.jpg",
    originalName: "Youssef Amrani Signing Photo",
    type: "image",
    mimeType: "image/jpeg",
    size: 1536000, // 1.5MB
    url: "https://images.pexels.com/photos/1884574/pexels-photo-1884574.jpeg",
    thumbnailUrl: "https://images.pexels.com/photos/1884574/pexels-photo-1884574.jpeg?w=300&h=200&fit=crop",
    uploadedAt: "2024-01-14T15:30:00Z",
    uploadedBy: "Sara Alami",
    folder: "transfers",
    alt: "Youssef Amrani signing contract",
    caption: "New midfielder Youssef Amrani signing his contract",
    tags: ["transfer", "signing", "player", "contract"],
    usageCount: 3,
    isFavorite: false
  },
  {
    id: 3,
    name: "training-session-video.mp4",
    originalName: "Training Session Highlights",
    type: "video",
    mimeType: "video/mp4",
    size: 15728640, // 15MB
    url: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4",
    thumbnailUrl: "https://images.pexels.com/photos/3621104/pexels-photo-3621104.jpeg?w=300&h=200&fit=crop",
    uploadedAt: "2024-01-13T09:15:00Z",
    uploadedBy: "Mohamed Tazi",
    folder: "training",
    alt: "Training session video",
    caption: "Highlights from yesterday's training session",
    tags: ["training", "video", "highlights", "preparation"],
    usageCount: 2,
    isFavorite: false
  },
  {
    id: 4,
    name: "stadium-aerial-view.jpg",
    originalName: "Stadium Aerial View",
    type: "image",
    mimeType: "image/jpeg",
    size: 3145728, // 3MB
    url: "https://images.pexels.com/photos/209977/pexels-photo-209977.jpeg",
    thumbnailUrl: "https://images.pexels.com/photos/209977/pexels-photo-209977.jpeg?w=300&h=200&fit=crop",
    uploadedAt: "2024-01-12T14:20:00Z",
    uploadedBy: "Fatima Zahra",
    folder: "infrastructure",
    alt: "Aerial view of ASA stadium",
    caption: "Beautiful aerial shot of our home stadium",
    tags: ["stadium", "aerial", "infrastructure", "home"],
    usageCount: 8,
    isFavorite: true
  },
  {
    id: 5,
    name: "press-conference-audio.mp3",
    originalName: "Post-Match Press Conference",
    type: "audio",
    mimeType: "audio/mpeg",
    size: 5242880, // 5MB
    url: "#",
    thumbnailUrl: null,
    uploadedAt: "2024-01-11T18:45:00Z",
    uploadedBy: "Ahmed Benali",
    folder: "press",
    alt: "Press conference audio recording",
    caption: "Coach's post-match press conference",
    tags: ["press", "conference", "audio", "interview"],
    usageCount: 1,
    isFavorite: false
  },
  {
    id: 6,
    name: "match-report-template.pdf",
    originalName: "Match Report Template",
    type: "document",
    mimeType: "application/pdf",
    size: 1048576, // 1MB
    url: "#",
    thumbnailUrl: null,
    uploadedAt: "2024-01-10T11:30:00Z",
    uploadedBy: "Sara Alami",
    folder: "templates",
    alt: "Match report template document",
    caption: "Standard template for match reports",
    tags: ["template", "document", "report", "match"],
    usageCount: 12,
    isFavorite: true
  }
];

const folders = [
  { name: "match-photos", count: 45, color: "#dc2626" },
  { name: "transfers", count: 23, color: "#2563eb" },
  { name: "training", count: 34, color: "#16a34a" },
  { name: "infrastructure", count: 18, color: "#ca8a04" },
  { name: "press", count: 12, color: "#7c3aed" },
  { name: "templates", count: 8, color: "#ea580c" }
];

const fileTypeIcons = {
  image: ImageIcon,
  video: Video,
  audio: Music,
  document: FileText
};

export default function Media() {
  const [mediaFiles, setMediaFiles] = useState(initialMediaFiles);
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [folderFilter, setFolderFilter] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [selectedFiles, setSelectedFiles] = useState<number[]>([]);
  const [showUpload, setShowUpload] = useState(false);
  const [showCreateFolder, setShowCreateFolder] = useState(false);
  const [editingFile, setEditingFile] = useState<any>(null);
  const [newFolder, setNewFolder] = useState("");
  const [uploadFiles, setUploadFiles] = useState<File[]>([]);
  const [dragOver, setDragOver] = useState(false);

  const filteredFiles = mediaFiles.filter(file => {
    const matchesSearch = file.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         file.originalName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         file.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesType = typeFilter === "all" || file.type === typeFilter;
    const matchesFolder = folderFilter === "all" || file.folder === folderFilter;
    
    return matchesSearch && matchesType && matchesFolder;
  });

  const sortedFiles = [...filteredFiles].sort((a, b) => {
    switch (sortBy) {
      case "newest":
        return new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime();
      case "oldest":
        return new Date(a.uploadedAt).getTime() - new Date(b.uploadedAt).getTime();
      case "name":
        return a.name.localeCompare(b.name);
      case "size":
        return b.size - a.size;
      case "usage":
        return b.usageCount - a.usageCount;
      default:
        return 0;
    }
  });

  const handleSelectFile = (fileId: number) => {
    setSelectedFiles(prev => 
      prev.includes(fileId) 
        ? prev.filter(id => id !== fileId)
        : [...prev, fileId]
    );
  };

  const handleSelectAll = () => {
    setSelectedFiles(
      selectedFiles.length === sortedFiles.length 
        ? [] 
        : sortedFiles.map(file => file.id)
    );
  };

  const handleBulkAction = (action: string) => {
    console.log(`Bulk action: ${action} on files:`, selectedFiles);
    
    if (action === 'delete') {
      setMediaFiles(prev => prev.filter(file => !selectedFiles.includes(file.id)));
    } else if (action === 'favorite') {
      setMediaFiles(prev => prev.map(file => 
        selectedFiles.includes(file.id) 
          ? { ...file, isFavorite: true }
          : file
      ));
    } else if (action === 'unfavorite') {
      setMediaFiles(prev => prev.map(file => 
        selectedFiles.includes(file.id) 
          ? { ...file, isFavorite: false }
          : file
      ));
    }
    
    setSelectedFiles([]);
  };

  const handleFileAction = (action: string, fileId: number) => {
    const file = mediaFiles.find(f => f.id === fileId);
    
    if (action === 'edit') {
      setEditingFile(file);
    } else if (action === 'delete') {
      setMediaFiles(prev => prev.filter(f => f.id !== fileId));
    } else if (action === 'favorite') {
      setMediaFiles(prev => prev.map(f => 
        f.id === fileId ? { ...f, isFavorite: !f.isFavorite } : f
      ));
    } else if (action === 'copy') {
      if (file) {
        navigator.clipboard.writeText(file.url);
      }
    } else if (action === 'download') {
      if (file) {
        const link = document.createElement('a');
        link.href = file.url;
        link.download = file.name;
        link.click();
      }
    }
  };

  const handleFileUpload = (files: FileList | File[]) => {
    const fileArray = Array.from(files);
    setUploadFiles(fileArray);
    setShowUpload(true);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileUpload(files);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
  };

  const processUpload = () => {
    const newFiles = uploadFiles.map((file, index) => {
      const newId = Math.max(...mediaFiles.map(f => f.id)) + index + 1;
      const fileType = file.type.startsWith('image/') ? 'image' :
                      file.type.startsWith('video/') ? 'video' :
                      file.type.startsWith('audio/') ? 'audio' : 'document';
      
      return {
        id: newId,
        name: file.name,
        originalName: file.name.replace(/\.[^/.]+$/, ""),
        type: fileType,
        mimeType: file.type,
        size: file.size,
        url: URL.createObjectURL(file),
        thumbnailUrl: fileType === 'image' ? URL.createObjectURL(file) : null,
        uploadedAt: new Date().toISOString(),
        uploadedBy: "Current User",
        folder: "uploads",
        alt: "",
        caption: "",
        tags: [],
        usageCount: 0,
        isFavorite: false
      };
    });

    setMediaFiles(prev => [...newFiles, ...prev]);
    setUploadFiles([]);
    setShowUpload(false);
  };

  const handleSaveEdit = () => {
    if (editingFile) {
      setMediaFiles(prev => prev.map(file => 
        file.id === editingFile.id ? editingFile : file
      ));
      setEditingFile(null);
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
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

  const totalSize = mediaFiles.reduce((sum, file) => sum + file.size, 0);
  const totalFiles = mediaFiles.length;
  const imageCount = mediaFiles.filter(f => f.type === 'image').length;
  const videoCount = mediaFiles.filter(f => f.type === 'video').length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Media Library</h1>
          <p className="mt-2 text-muted-foreground">Manage your images, videos, and documents.</p>
        </div>
        <div className="flex items-center space-x-2 mt-4 sm:mt-0">
          <Button variant="outline" onClick={() => setShowCreateFolder(true)}>
            <FolderPlus className="mr-2 h-4 w-4" />
            New Folder
          </Button>
          <Button onClick={() => setShowUpload(true)}>
            <Upload className="mr-2 h-4 w-4" />
            Upload Files
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-6">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <HardDrive className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Total Files</p>
              <p className="text-2xl font-bold text-foreground">{totalFiles}</p>
            </div>
          </div>
        </Card>
        
        <Card className="p-6">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-accent/10 rounded-lg">
              <ImageIcon className="h-6 w-6 text-accent" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Images</p>
              <p className="text-2xl font-bold text-foreground">{imageCount}</p>
            </div>
          </div>
        </Card>
        
        <Card className="p-6">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-success/10 rounded-lg">
              <Video className="h-6 w-6 text-success" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Videos</p>
              <p className="text-2xl font-bold text-foreground">{videoCount}</p>
            </div>
          </div>
        </Card>
        
        <Card className="p-6">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-warning/10 rounded-lg">
              <Archive className="h-6 w-6 text-warning" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Storage Used</p>
              <p className="text-2xl font-bold text-foreground">{formatFileSize(totalSize)}</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Folders */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold text-foreground mb-4">Folders</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {folders.map((folder) => (
            <div
              key={folder.name}
              onClick={() => setFolderFilter(folder.name)}
              className={`p-4 rounded-lg border cursor-pointer transition-all hover:shadow-md ${
                folderFilter === folder.name 
                  ? 'border-primary bg-primary/5' 
                  : 'border-border hover:border-primary/50'
              }`}
            >
              <div className="flex items-center space-x-2 mb-2">
                <Folder className="h-5 w-5" style={{ color: folder.color }} />
                <span className="text-sm font-medium text-foreground truncate">
                  {folder.name}
                </span>
              </div>
              <p className="text-xs text-muted-foreground">{folder.count} files</p>
            </div>
          ))}
        </div>
      </Card>

      {/* Filters and Controls */}
      <Card className="p-6">
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search files by name, tags, or description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <div className="flex items-center gap-2">
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="w-[120px]">
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="image">Images</SelectItem>
                  <SelectItem value="video">Videos</SelectItem>
                  <SelectItem value="audio">Audio</SelectItem>
                  <SelectItem value="document">Documents</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={folderFilter} onValueChange={setFolderFilter}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Folder" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Folders</SelectItem>
                  {folders.map((folder) => (
                    <SelectItem key={folder.name} value={folder.name}>
                      {folder.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[120px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest</SelectItem>
                  <SelectItem value="oldest">Oldest</SelectItem>
                  <SelectItem value="name">Name A-Z</SelectItem>
                  <SelectItem value="size">File Size</SelectItem>
                  <SelectItem value="usage">Most Used</SelectItem>
                </SelectContent>
              </Select>
              
              <div className="flex items-center border border-border rounded-lg">
                <Button
                  variant={viewMode === "grid" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                  className="rounded-r-none"
                >
                  <Grid3X3 className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                  className="rounded-l-none"
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
          
          {/* Bulk Actions */}
          {selectedFiles.length > 0 && (
            <div className="flex items-center justify-between p-3 bg-primary/5 rounded-lg">
              <span className="text-sm font-medium text-foreground">
                {selectedFiles.length} file{selectedFiles.length > 1 ? 's' : ''} selected
              </span>
              <div className="flex items-center space-x-2">
                <Button size="sm" variant="outline" onClick={() => handleBulkAction('favorite')}>
                  <Star className="mr-1 h-3 w-3" />
                  Favorite
                </Button>
                <Button size="sm" variant="outline" onClick={() => handleBulkAction('download')}>
                  <Download className="mr-1 h-3 w-3" />
                  Download
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
                      <AlertDialogTitle>Delete Files</AlertDialogTitle>
                      <AlertDialogDescription>
                        Are you sure you want to delete {selectedFiles.length} file{selectedFiles.length > 1 ? 's' : ''}? This action cannot be undone.
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

      {/* File Upload Drop Zone */}
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={`border-2 border-dashed rounded-lg p-8 text-center transition-all ${
          dragOver 
            ? 'border-primary bg-primary/5' 
            : 'border-border hover:border-primary/50'
        }`}
      >
        <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-foreground mb-2">
          Drop files here to upload
        </h3>
        <p className="text-muted-foreground mb-4">
          Or click to browse and select files from your computer
        </p>
        <input
          type="file"
          multiple
          accept="image/*,video/*,audio/*,.pdf,.doc,.docx"
          onChange={(e) => e.target.files && handleFileUpload(e.target.files)}
          className="hidden"
          id="file-upload"
        />
        <label htmlFor="file-upload">
          <Button asChild>
            <span>Choose Files</span>
          </Button>
        </label>
      </div>

      {/* Files Display */}
      {viewMode === "grid" ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {sortedFiles.map((file) => {
            const Icon = fileTypeIcons[file.type as keyof typeof fileTypeIcons];
            return (
              <Card key={file.id} className="overflow-hidden hover-lift group">
                <div className="relative">
                  {/* File Preview */}
                  <div className="aspect-square bg-secondary/30 flex items-center justify-center">
                    {file.thumbnailUrl ? (
                      <img
                        src={file.thumbnailUrl}
                        alt={file.alt}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <Icon className="h-12 w-12 text-muted-foreground" />
                    )}
                  </div>
                  
                  {/* Overlay Controls */}
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-2">
                    <Button size="sm" variant="secondary" onClick={() => handleFileAction('edit', file.id)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="secondary" onClick={() => handleFileAction('copy', file.id)}>
                      <Copy className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="secondary" onClick={() => handleFileAction('download', file.id)}>
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  {/* Selection Checkbox */}
                  <div className="absolute top-2 left-2">
                    <input
                      type="checkbox"
                      checked={selectedFiles.includes(file.id)}
                      onChange={() => handleSelectFile(file.id)}
                      className="rounded border-border bg-background/80"
                    />
                  </div>
                  
                  {/* Favorite Star */}
                  {file.isFavorite && (
                    <div className="absolute top-2 right-2">
                      <Star className="h-4 w-4 text-yellow-500 fill-current" />
                    </div>
                  )}
                  
                  {/* File Type Badge */}
                  <div className="absolute bottom-2 left-2">
                    <Badge variant="secondary" className="text-xs">
                      {file.type}
                    </Badge>
                  </div>
                </div>
                
                {/* File Info */}
                <div className="p-4">
                  <h3 className="font-medium text-foreground text-sm truncate mb-1">
                    {file.originalName}
                  </h3>
                  <div className="space-y-1 text-xs text-muted-foreground">
                    <p>{formatFileSize(file.size)}</p>
                    <p>{formatDate(file.uploadedAt)}</p>
                    <p>Used {file.usageCount} times</p>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      ) : (
        <Card className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-secondary/30 border-b border-border">
                <tr>
                  <th className="text-left py-4 px-6 font-medium text-foreground w-12">
                    <input
                      type="checkbox"
                      checked={selectedFiles.length === sortedFiles.length && sortedFiles.length > 0}
                      onChange={handleSelectAll}
                      className="rounded border-border"
                    />
                  </th>
                  <th className="text-left py-4 px-6 font-medium text-foreground">Preview</th>
                  <th className="text-left py-4 px-6 font-medium text-foreground">Name</th>
                  <th className="text-left py-4 px-6 font-medium text-foreground">Type</th>
                  <th className="text-left py-4 px-6 font-medium text-foreground">Size</th>
                  <th className="text-left py-4 px-6 font-medium text-foreground">Folder</th>
                  <th className="text-left py-4 px-6 font-medium text-foreground">Uploaded</th>
                  <th className="text-left py-4 px-6 font-medium text-foreground">Usage</th>
                  <th className="text-right py-4 px-6 font-medium text-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {sortedFiles.map((file) => {
                  const Icon = fileTypeIcons[file.type as keyof typeof fileTypeIcons];
                  return (
                    <tr key={file.id} className="border-b border-border last:border-b-0 hover:bg-secondary/20 transition-custom">
                      <td className="py-4 px-6">
                        <input
                          type="checkbox"
                          checked={selectedFiles.includes(file.id)}
                          onChange={() => handleSelectFile(file.id)}
                          className="rounded border-border"
                        />
                      </td>
                      <td className="py-4 px-6">
                        <div className="w-12 h-12 bg-secondary rounded-lg flex items-center justify-center overflow-hidden">
                          {file.thumbnailUrl ? (
                            <img
                              src={file.thumbnailUrl}
                              alt={file.alt}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <Icon className="h-6 w-6 text-muted-foreground" />
                          )}
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center space-x-2">
                          <div>
                            <p className="font-medium text-foreground">{file.originalName}</p>
                            <p className="text-sm text-muted-foreground">{file.name}</p>
                          </div>
                          {file.isFavorite && (
                            <Star className="h-4 w-4 text-yellow-500 fill-current" />
                          )}
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <Badge variant="secondary">{file.type}</Badge>
                      </td>
                      <td className="py-4 px-6">
                        <span className="text-sm text-muted-foreground">
                          {formatFileSize(file.size)}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <span className="text-sm text-muted-foreground">{file.folder}</span>
                      </td>
                      <td className="py-4 px-6">
                        <div className="text-sm text-muted-foreground">
                          <p>{formatDate(file.uploadedAt)}</p>
                          <p>by {file.uploadedBy}</p>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <span className="text-sm text-muted-foreground">
                          {file.usageCount} times
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center justify-end space-x-2">
                          <Button variant="ghost" size="sm" onClick={() => handleFileAction('edit', file.id)}>
                            <Edit className="h-4 w-4" />
                          </Button>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuItem onClick={() => handleFileAction('copy', file.id)}>
                                <Copy className="mr-2 h-4 w-4" />
                                Copy URL
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleFileAction('download', file.id)}>
                                <Download className="mr-2 h-4 w-4" />
                                Download
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleFileAction('favorite', file.id)}>
                                <Star className="mr-2 h-4 w-4" />
                                {file.isFavorite ? 'Remove from' : 'Add to'} Favorites
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem 
                                onClick={() => handleFileAction('delete', file.id)}
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
                  );
                })}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {/* Empty State */}
      {sortedFiles.length === 0 && (
        <Card className="p-12 text-center">
          <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-foreground mb-2">No files found</h3>
          <p className="text-muted-foreground mb-4">
            {searchTerm 
              ? `No files match your search for "${searchTerm}"`
              : "Upload your first file to get started"
            }
          </p>
          <Button onClick={() => setShowUpload(true)}>
            <Upload className="mr-2 h-4 w-4" />
            Upload Files
          </Button>
        </Card>
      )}

      {/* Upload Dialog */}
      <Dialog open={showUpload} onOpenChange={setShowUpload}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Upload Files</DialogTitle>
            <DialogDescription>
              Upload images, videos, audio files, or documents to your media library.
            </DialogDescription>
          </DialogHeader>
          
          {uploadFiles.length > 0 ? (
            <div className="space-y-4">
              <div className="max-h-60 overflow-y-auto space-y-2">
                {uploadFiles.map((file, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-secondary/30 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                        {file.type.startsWith('image/') ? (
                          <ImageIcon className="h-5 w-5 text-primary" />
                        ) : file.type.startsWith('video/') ? (
                          <Video className="h-5 w-5 text-primary" />
                        ) : file.type.startsWith('audio/') ? (
                          <Music className="h-5 w-5 text-primary" />
                        ) : (
                          <FileText className="h-5 w-5 text-primary" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{file.name}</p>
                        <p className="text-sm text-muted-foreground">{formatFileSize(file.size)}</p>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setUploadFiles(prev => prev.filter((_, i) => i !== index))}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
              
              <div className="flex items-center space-x-2">
                <Label htmlFor="upload-folder">Upload to folder:</Label>
                <Select defaultValue="uploads">
                  <SelectTrigger className="w-[200px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="uploads">uploads</SelectItem>
                    {folders.map((folder) => (
                      <SelectItem key={folder.name} value={folder.name}>
                        {folder.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          ) : (
            <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
              <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground mb-4">No files selected</p>
              <input
                type="file"
                multiple
                accept="image/*,video/*,audio/*,.pdf,.doc,.docx"
                onChange={(e) => e.target.files && setUploadFiles(Array.from(e.target.files))}
                className="hidden"
                id="dialog-file-upload"
              />
              <label htmlFor="dialog-file-upload">
                <Button variant="outline" asChild>
                  <span>Choose Files</span>
                </Button>
              </label>
            </div>
          )}
          
          <DialogFooter>
            <Button variant="outline" onClick={() => {
              setShowUpload(false);
              setUploadFiles([]);
            }}>
              Cancel
            </Button>
            <Button onClick={processUpload} disabled={uploadFiles.length === 0}>
              Upload {uploadFiles.length} File{uploadFiles.length !== 1 ? 's' : ''}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit File Dialog */}
      <Dialog open={!!editingFile} onOpenChange={() => setEditingFile(null)}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Edit File Details</DialogTitle>
            <DialogDescription>
              Update file information, alt text, and metadata.
            </DialogDescription>
          </DialogHeader>
          {editingFile && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-name" className="text-right">
                  Display Name
                </Label>
                <Input
                  id="edit-name"
                  value={editingFile.originalName}
                  onChange={(e) => setEditingFile({
                    ...editingFile,
                    originalName: e.target.value
                  })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-alt" className="text-right">
                  Alt Text
                </Label>
                <Input
                  id="edit-alt"
                  value={editingFile.alt}
                  onChange={(e) => setEditingFile({
                    ...editingFile,
                    alt: e.target.value
                  })}
                  className="col-span-3"
                  placeholder="Describe the image for accessibility"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-caption" className="text-right">
                  Caption
                </Label>
                <Textarea
                  id="edit-caption"
                  value={editingFile.caption}
                  onChange={(e) => setEditingFile({
                    ...editingFile,
                    caption: e.target.value
                  })}
                  className="col-span-3"
                  rows={2}
                  placeholder="Optional caption for the file"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-folder" className="text-right">
                  Folder
                </Label>
                <Select 
                  value={editingFile.folder} 
                  onValueChange={(value) => setEditingFile({
                    ...editingFile,
                    folder: value
                  })}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {folders.map((folder) => (
                      <SelectItem key={folder.name} value={folder.name}>
                        {folder.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              {/* File Preview */}
              <div className="col-span-4">
                <Label className="text-sm font-medium text-foreground mb-2 block">Preview</Label>
                <div className="border border-border rounded-lg p-4 bg-secondary/20">
                  {editingFile.thumbnailUrl ? (
                    <img
                      src={editingFile.thumbnailUrl}
                      alt={editingFile.alt}
                      className="max-w-full h-32 object-contain mx-auto"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-32">
                      {(() => {
                        const Icon = fileTypeIcons[editingFile.type as keyof typeof fileTypeIcons];
                        return <Icon className="h-12 w-12 text-muted-foreground" />;
                      })()}
                    </div>
                  )}
                  <div className="mt-2 text-center text-sm text-muted-foreground">
                    {editingFile.name} • {formatFileSize(editingFile.size)}
                  </div>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditingFile(null)}>
              Cancel
            </Button>
            <Button onClick={handleSaveEdit}>
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Create Folder Dialog */}
      <Dialog open={showCreateFolder} onOpenChange={setShowCreateFolder}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Create New Folder</DialogTitle>
            <DialogDescription>
              Create a new folder to organize your media files.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="folder-name" className="text-right">
                Name
              </Label>
              <Input
                id="folder-name"
                value={newFolder}
                onChange={(e) => setNewFolder(e.target.value)}
                className="col-span-3"
                placeholder="Folder name"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => {
              setShowCreateFolder(false);
              setNewFolder("");
            }}>
              Cancel
            </Button>
            <Button onClick={() => {
              console.log('Creating folder:', newFolder);
              setShowCreateFolder(false);
              setNewFolder("");
            }}>
              Create Folder
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}