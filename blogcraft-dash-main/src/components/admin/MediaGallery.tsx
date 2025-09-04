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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { 
  Search, 
  Grid3X3, 
  List,
  Image as ImageIcon,
  Video,
  FileText,
  Music,
  Eye,
  Download,
  Copy,
  Edit,
  Trash,
  Star,
  Calendar,
  HardDrive
} from "lucide-react";

interface MediaGalleryProps {
  files: any[];
  onFileSelect?: (file: any) => void;
  onFileEdit?: (file: any) => void;
  onFileDelete?: (fileId: number) => void;
  selectable?: boolean;
  viewMode?: "grid" | "list";
}

const fileTypeIcons = {
  image: ImageIcon,
  video: Video,
  audio: Music,
  document: FileText
};

export default function MediaGallery({ 
  files, 
  onFileSelect,
  onFileEdit,
  onFileDelete,
  selectable = false,
  viewMode: initialViewMode = "grid"
}: MediaGalleryProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [folderFilter, setFolderFilter] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [viewMode, setViewMode] = useState(initialViewMode);
  const [selectedFile, setSelectedFile] = useState<any>(null);
  const [showPreview, setShowPreview] = useState(false);

  const filteredFiles = files.filter(file => {
    const matchesSearch = file.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         file.originalName.toLowerCase().includes(searchTerm.toLowerCase());
    
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
      default:
        return 0;
    }
  });

  const handleFileClick = (file: any) => {
    if (selectable && onFileSelect) {
      onFileSelect(file);
    } else {
      setSelectedFile(file);
      setShowPreview(true);
    }
  };

  const handleFileAction = (action: string, file: any) => {
    switch (action) {
      case 'edit':
        onFileEdit?.(file);
        break;
      case 'delete':
        onFileDelete?.(file.id);
        break;
      case 'copy':
        navigator.clipboard.writeText(file.url);
        break;
      case 'download':
        const link = document.createElement('a');
        link.href = file.url;
        link.download = file.name;
        link.click();
        break;
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
      day: 'numeric'
    });
  };

  const uniqueFolders = [...new Set(files.map(f => f.folder))];

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search files..."
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
              {uniqueFolders.map((folder) => (
                <SelectItem key={folder} value={folder}>
                  {folder}
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

      {/* Files Display */}
      {viewMode === "grid" ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {sortedFiles.map((file) => {
            const Icon = fileTypeIcons[file.type as keyof typeof fileTypeIcons];
            return (
              <Card 
                key={file.id} 
                className="overflow-hidden hover-lift cursor-pointer group"
                onClick={() => handleFileClick(file)}
              >
                <div className="relative aspect-square bg-secondary/30 flex items-center justify-center">
                  {file.thumbnailUrl ? (
                    <img
                      src={file.thumbnailUrl}
                      alt={file.alt}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <Icon className="h-8 w-8 text-muted-foreground" />
                  )}
                  
                  {/* Overlay Controls */}
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-1">
                    <Button size="sm" variant="secondary" onClick={(e) => {
                      e.stopPropagation();
                      setSelectedFile(file);
                      setShowPreview(true);
                    }}>
                      <Eye className="h-3 w-3" />
                    </Button>
                    <Button size="sm" variant="secondary" onClick={(e) => {
                      e.stopPropagation();
                      handleFileAction('copy', file);
                    }}>
                      <Copy className="h-3 w-3" />
                    </Button>
                    <Button size="sm" variant="secondary" onClick={(e) => {
                      e.stopPropagation();
                      handleFileAction('download', file);
                    }}>
                      <Download className="h-3 w-3" />
                    </Button>
                  </div>
                  
                  {file.isFavorite && (
                    <div className="absolute top-2 right-2">
                      <Star className="h-4 w-4 text-yellow-500 fill-current" />
                    </div>
                  )}
                  
                  <div className="absolute bottom-2 left-2">
                    <Badge variant="secondary" className="text-xs">
                      {file.type}
                    </Badge>
                  </div>
                </div>
                
                <div className="p-3">
                  <h4 className="font-medium text-foreground text-sm truncate">
                    {file.originalName}
                  </h4>
                  <p className="text-xs text-muted-foreground">
                    {formatFileSize(file.size)}
                  </p>
                </div>
              </Card>
            );
          })}
        </div>
      ) : (
        <div className="space-y-2">
          {sortedFiles.map((file) => {
            const Icon = fileTypeIcons[file.type as keyof typeof fileTypeIcons];
            return (
              <Card 
                key={file.id} 
                className="p-4 hover:bg-secondary/20 cursor-pointer transition-colors"
                onClick={() => handleFileClick(file)}
              >
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-secondary rounded-lg flex items-center justify-center overflow-hidden flex-shrink-0">
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
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2">
                      <h4 className="font-medium text-foreground truncate">
                        {file.originalName}
                      </h4>
                      {file.isFavorite && (
                        <Star className="h-4 w-4 text-yellow-500 fill-current flex-shrink-0" />
                      )}
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                      <Badge variant="secondary" className="text-xs">{file.type}</Badge>
                      <span>{formatFileSize(file.size)}</span>
                      <span>•</span>
                      <span>{file.folder}</span>
                      <span>•</span>
                      <span>{formatDate(file.uploadedAt)}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="sm" onClick={(e) => {
                      e.stopPropagation();
                      handleFileAction('copy', file);
                    }}>
                      <Copy className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={(e) => {
                      e.stopPropagation();
                      handleFileAction('download', file);
                    }}>
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      )}

      {/* Empty State */}
      {sortedFiles.length === 0 && (
        <Card className="p-12 text-center">
          <ImageIcon className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-foreground mb-2">No files found</h3>
          <p className="text-muted-foreground">
            {searchTerm 
              ? `No files match your search for "${searchTerm}"`
              : "No files available"
            }
          </p>
        </Card>
      )}

      {/* File Preview Dialog */}
      <Dialog open={showPreview} onOpenChange={setShowPreview}>
        <DialogContent className="sm:max-w-[700px]">
          <DialogHeader>
            <DialogTitle>File Preview</DialogTitle>
            <DialogDescription>
              {selectedFile?.originalName}
            </DialogDescription>
          </DialogHeader>
          
          {selectedFile && (
            <div className="space-y-4">
              {/* File Preview */}
              <div className="bg-secondary/20 rounded-lg p-4 text-center">
                {selectedFile.type === 'image' ? (
                  <img
                    src={selectedFile.url}
                    alt={selectedFile.alt}
                    className="max-w-full max-h-96 mx-auto rounded-lg"
                  />
                ) : selectedFile.type === 'video' ? (
                  <video
                    src={selectedFile.url}
                    controls
                    className="max-w-full max-h-96 mx-auto rounded-lg"
                  />
                ) : selectedFile.type === 'audio' ? (
                  <div className="py-8">
                    <Music className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                    <audio src={selectedFile.url} controls className="mx-auto" />
                  </div>
                ) : (
                  <div className="py-8">
                    <FileText className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">Document preview not available</p>
                  </div>
                )}
              </div>
              
              {/* File Details */}
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="font-medium text-foreground">File Name</p>
                  <p className="text-muted-foreground">{selectedFile.name}</p>
                </div>
                <div>
                  <p className="font-medium text-foreground">File Size</p>
                  <p className="text-muted-foreground">{formatFileSize(selectedFile.size)}</p>
                </div>
                <div>
                  <p className="font-medium text-foreground">Type</p>
                  <p className="text-muted-foreground">{selectedFile.type}</p>
                </div>
                <div>
                  <p className="font-medium text-foreground">Folder</p>
                  <p className="text-muted-foreground">{selectedFile.folder}</p>
                </div>
                <div>
                  <p className="font-medium text-foreground">Uploaded</p>
                  <p className="text-muted-foreground">{formatDate(selectedFile.uploadedAt)}</p>
                </div>
                <div>
                  <p className="font-medium text-foreground">Usage</p>
                  <p className="text-muted-foreground">{selectedFile.usageCount} times</p>
                </div>
              </div>
              
              {selectedFile.alt && (
                <div>
                  <p className="font-medium text-foreground text-sm">Alt Text</p>
                  <p className="text-muted-foreground text-sm">{selectedFile.alt}</p>
                </div>
              )}
              
              {selectedFile.caption && (
                <div>
                  <p className="font-medium text-foreground text-sm">Caption</p>
                  <p className="text-muted-foreground text-sm">{selectedFile.caption}</p>
                </div>
              )}
              
              {/* File URL */}
              <div>
                <p className="font-medium text-foreground text-sm mb-2">File URL</p>
                <div className="flex items-center space-x-2">
                  <Input
                    value={selectedFile.url}
                    readOnly
                    className="text-sm"
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => navigator.clipboard.writeText(selectedFile.url)}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          )}
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowPreview(false)}>
              Close
            </Button>
            {selectedFile && (
              <div className="flex items-center space-x-2">
                <Button variant="outline" onClick={() => handleFileAction('edit', selectedFile)}>
                  <Edit className="mr-2 h-4 w-4" />
                  Edit
                </Button>
                <Button variant="outline" onClick={() => handleFileAction('download', selectedFile)}>
                  <Download className="mr-2 h-4 w-4" />
                  Download
                </Button>
              </div>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );

  function formatFileSize(bytes: number) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  function formatDate(dateString: string) {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  }
}