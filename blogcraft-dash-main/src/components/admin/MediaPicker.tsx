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
  Upload, 
  Check,
  Image as ImageIcon,
  Video,
  FileText,
  Music,
  Grid3X3,
  List
} from "lucide-react";

interface MediaPickerProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (file: any) => void;
  allowedTypes?: string[];
  multiple?: boolean;
}

// Mock media files for picker
const mediaFiles = [
  {
    id: 1,
    name: "asa-championship-celebration.jpg",
    originalName: "Championship Celebration Photo",
    type: "image",
    url: "https://images.pexels.com/photos/274506/pexels-photo-274506.jpeg",
    thumbnailUrl: "https://images.pexels.com/photos/274506/pexels-photo-274506.jpeg?w=300&h=200&fit=crop",
    size: 2048576,
    folder: "match-photos"
  },
  {
    id: 2,
    name: "youssef-amrani-signing.jpg",
    originalName: "Youssef Amrani Signing Photo",
    type: "image",
    url: "https://images.pexels.com/photos/1884574/pexels-photo-1884574.jpeg",
    thumbnailUrl: "https://images.pexels.com/photos/1884574/pexels-photo-1884574.jpeg?w=300&h=200&fit=crop",
    size: 1536000,
    folder: "transfers"
  },
  {
    id: 3,
    name: "training-session-video.mp4",
    originalName: "Training Session Highlights",
    type: "video",
    url: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4",
    thumbnailUrl: "https://images.pexels.com/photos/3621104/pexels-photo-3621104.jpeg?w=300&h=200&fit=crop",
    size: 15728640,
    folder: "training"
  },
  {
    id: 4,
    name: "stadium-aerial-view.jpg",
    originalName: "Stadium Aerial View",
    type: "image",
    url: "https://images.pexels.com/photos/209977/pexels-photo-209977.jpeg",
    thumbnailUrl: "https://images.pexels.com/photos/209977/pexels-photo-209977.jpeg?w=300&h=200&fit=crop",
    size: 3145728,
    folder: "infrastructure"
  }
];

const fileTypeIcons = {
  image: ImageIcon,
  video: Video,
  audio: Music,
  document: FileText
};

export default function MediaPicker({ 
  isOpen, 
  onClose, 
  onSelect, 
  allowedTypes = ["image", "video", "audio", "document"],
  multiple = false 
}: MediaPickerProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [folderFilter, setFolderFilter] = useState("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [selectedFiles, setSelectedFiles] = useState<number[]>([]);

  const filteredFiles = mediaFiles.filter(file => {
    const matchesSearch = file.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         file.originalName.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = typeFilter === "all" || file.type === typeFilter;
    const matchesFolder = folderFilter === "all" || file.folder === folderFilter;
    const isAllowedType = allowedTypes.includes(file.type);
    
    return matchesSearch && matchesType && matchesFolder && isAllowedType;
  });

  const handleSelectFile = (fileId: number) => {
    if (multiple) {
      setSelectedFiles(prev => 
        prev.includes(fileId) 
          ? prev.filter(id => id !== fileId)
          : [...prev, fileId]
      );
    } else {
      const file = mediaFiles.find(f => f.id === fileId);
      if (file) {
        onSelect(file);
        onClose();
      }
    }
  };

  const handleConfirmSelection = () => {
    const files = mediaFiles.filter(f => selectedFiles.includes(f.id));
    onSelect(multiple ? files : files[0]);
    onClose();
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[900px] max-h-[80vh]">
        <DialogHeader>
          <DialogTitle>Select Media</DialogTitle>
          <DialogDescription>
            Choose {multiple ? "one or more files" : "a file"} from your media library.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          {/* Filters */}
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
                  {allowedTypes.map(type => (
                    <SelectItem key={type} value={type}>
                      {type.charAt(0).toUpperCase() + type.slice(1)}s
                    </SelectItem>
                  ))}
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
          <div className="max-h-96 overflow-y-auto">
            {viewMode === "grid" ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {filteredFiles.map((file) => {
                  const Icon = fileTypeIcons[file.type as keyof typeof fileTypeIcons];
                  const isSelected = selectedFiles.includes(file.id);
                  
                  return (
                    <Card 
                      key={file.id} 
                      className={`overflow-hidden cursor-pointer transition-all hover:shadow-md ${
                        isSelected ? 'ring-2 ring-primary' : ''
                      }`}
                      onClick={() => handleSelectFile(file.id)}
                    >
                      <div className="relative aspect-square bg-secondary/30 flex items-center justify-center">
                        {file.thumbnailUrl ? (
                          <img
                            src={file.thumbnailUrl}
                            alt={file.originalName}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <Icon className="h-8 w-8 text-muted-foreground" />
                        )}
                        
                        {isSelected && (
                          <div className="absolute inset-0 bg-primary/20 flex items-center justify-center">
                            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                              <Check className="h-4 w-4 text-primary-foreground" />
                            </div>
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
                {filteredFiles.map((file) => {
                  const Icon = fileTypeIcons[file.type as keyof typeof fileTypeIcons];
                  const isSelected = selectedFiles.includes(file.id);
                  
                  return (
                    <div
                      key={file.id}
                      onClick={() => handleSelectFile(file.id)}
                      className={`flex items-center space-x-3 p-3 rounded-lg cursor-pointer transition-all hover:bg-secondary/50 ${
                        isSelected ? 'bg-primary/10 border border-primary' : 'border border-transparent'
                      }`}
                    >
                      <div className="w-12 h-12 bg-secondary rounded-lg flex items-center justify-center overflow-hidden flex-shrink-0">
                        {file.thumbnailUrl ? (
                          <img
                            src={file.thumbnailUrl}
                            alt={file.originalName}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <Icon className="h-6 w-6 text-muted-foreground" />
                        )}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-foreground truncate">
                          {file.originalName}
                        </h4>
                        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                          <span>{file.type}</span>
                          <span>•</span>
                          <span>{formatFileSize(file.size)}</span>
                          <span>•</span>
                          <span>{file.folder}</span>
                        </div>
                      </div>
                      
                      {isSelected && (
                        <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                          <Check className="h-4 w-4 text-primary-foreground" />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Empty State */}
          {filteredFiles.length === 0 && (
            <div className="text-center py-8">
              <ImageIcon className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">No files found</h3>
              <p className="text-muted-foreground">
                {searchTerm 
                  ? `No files match your search for "${searchTerm}"`
                  : "No files available in the selected filters"
                }
              </p>
            </div>
          )}
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          {multiple && selectedFiles.length > 0 && (
            <Button onClick={handleConfirmSelection}>
              Select {selectedFiles.length} File{selectedFiles.length !== 1 ? 's' : ''}
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}