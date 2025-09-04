import { useState, useCallback } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Upload, 
  X, 
  Check, 
  AlertCircle,
  Image as ImageIcon,
  Video,
  FileText,
  Music,
  File
} from "lucide-react";

interface MediaUploaderProps {
  onUploadComplete?: (files: any[]) => void;
  allowedTypes?: string[];
  maxFileSize?: number; // in bytes
  maxFiles?: number;
}

const fileTypeIcons = {
  image: ImageIcon,
  video: Video,
  audio: Music,
  document: FileText,
  other: File
};

const folders = [
  "match-photos",
  "transfers", 
  "training",
  "infrastructure",
  "press",
  "templates",
  "uploads"
];

export default function MediaUploader({ 
  onUploadComplete,
  allowedTypes = ["image", "video", "audio", "document"],
  maxFileSize = 10 * 1024 * 1024, // 10MB default
  maxFiles = 10
}: MediaUploaderProps) {
  const [files, setFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [dragOver, setDragOver] = useState(false);
  const [selectedFolder, setSelectedFolder] = useState("uploads");
  const [fileDetails, setFileDetails] = useState<{[key: string]: {alt: string, caption: string}}>({});

  const getFileType = (file: File) => {
    if (file.type.startsWith('image/')) return 'image';
    if (file.type.startsWith('video/')) return 'video';
    if (file.type.startsWith('audio/')) return 'audio';
    if (file.type.includes('pdf') || file.type.includes('document') || file.type.includes('text')) return 'document';
    return 'other';
  };

  const validateFile = (file: File) => {
    const fileType = getFileType(file);
    
    if (!allowedTypes.includes(fileType)) {
      return `File type ${fileType} is not allowed`;
    }
    
    if (file.size > maxFileSize) {
      return `File size exceeds ${formatFileSize(maxFileSize)} limit`;
    }
    
    return null;
  };

  const handleFileSelect = (selectedFiles: FileList | File[]) => {
    const fileArray = Array.from(selectedFiles);
    const validFiles: File[] = [];
    const errors: string[] = [];

    fileArray.forEach(file => {
      const error = validateFile(file);
      if (error) {
        errors.push(`${file.name}: ${error}`);
      } else {
        validFiles.push(file);
      }
    });

    if (files.length + validFiles.length > maxFiles) {
      errors.push(`Cannot upload more than ${maxFiles} files at once`);
      return;
    }

    if (errors.length > 0) {
      alert(errors.join('\n'));
    }

    setFiles(prev => [...prev, ...validFiles]);
    
    // Initialize file details
    const newDetails: {[key: string]: {alt: string, caption: string}} = {};
    validFiles.forEach(file => {
      newDetails[file.name] = { alt: "", caption: "" };
    });
    setFileDetails(prev => ({ ...prev, ...newDetails }));
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const droppedFiles = e.dataTransfer.files;
    if (droppedFiles.length > 0) {
      handleFileSelect(droppedFiles);
    }
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
  }, []);

  const removeFile = (index: number) => {
    const file = files[index];
    setFiles(prev => prev.filter((_, i) => i !== index));
    setFileDetails(prev => {
      const newDetails = { ...prev };
      delete newDetails[file.name];
      return newDetails;
    });
  };

  const updateFileDetails = (fileName: string, field: 'alt' | 'caption', value: string) => {
    setFileDetails(prev => ({
      ...prev,
      [fileName]: {
        ...prev[fileName],
        [field]: value
      }
    }));
  };

  const handleUpload = async () => {
    setUploading(true);
    setUploadProgress(0);

    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 10;
      });
    }, 200);

    // Simulate upload completion
    setTimeout(() => {
      const uploadedFiles = files.map((file, index) => ({
        id: Date.now() + index,
        name: file.name,
        originalName: file.name.replace(/\.[^/.]+$/, ""),
        type: getFileType(file),
        mimeType: file.type,
        size: file.size,
        url: URL.createObjectURL(file),
        thumbnailUrl: getFileType(file) === 'image' ? URL.createObjectURL(file) : null,
        uploadedAt: new Date().toISOString(),
        uploadedBy: "Current User",
        folder: selectedFolder,
        alt: fileDetails[file.name]?.alt || "",
        caption: fileDetails[file.name]?.caption || "",
        tags: [],
        usageCount: 0,
        isFavorite: false
      }));

      onUploadComplete?.(uploadedFiles);
      setUploading(false);
      setUploadProgress(0);
      setFiles([]);
      setFileDetails({});
    }, 2000);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="space-y-6">
      {/* Drop Zone */}
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
          Or click to browse and select files
        </p>
        <input
          type="file"
          multiple
          accept={allowedTypes.includes('image') ? 'image/*,' : '' +
                  allowedTypes.includes('video') ? 'video/*,' : '' +
                  allowedTypes.includes('audio') ? 'audio/*,' : '' +
                  allowedTypes.includes('document') ? '.pdf,.doc,.docx,' : ''}
          onChange={(e) => e.target.files && handleFileSelect(e.target.files)}
          className="hidden"
          id="file-input"
        />
        <label htmlFor="file-input">
          <Button asChild>
            <span>Choose Files</span>
          </Button>
        </label>
        <p className="text-xs text-muted-foreground mt-2">
          Max {maxFiles} files, {formatFileSize(maxFileSize)} each
        </p>
      </div>

      {/* Selected Files */}
      {files.length > 0 && (
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-foreground">
              Selected Files ({files.length})
            </h3>
            <div className="flex items-center space-x-2">
              <Label htmlFor="folder-select">Upload to:</Label>
              <Select value={selectedFolder} onValueChange={setSelectedFolder}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {folders.map((folder) => (
                    <SelectItem key={folder} value={folder}>
                      {folder}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="space-y-4 max-h-60 overflow-y-auto">
            {files.map((file, index) => {
              const fileType = getFileType(file);
              const Icon = fileTypeIcons[fileType as keyof typeof fileTypeIcons];
              
              return (
                <div key={index} className="flex items-start space-x-3 p-3 bg-secondary/30 rounded-lg">
                  <div className="w-12 h-12 bg-background rounded-lg flex items-center justify-center overflow-hidden flex-shrink-0">
                    {fileType === 'image' ? (
                      <img
                        src={URL.createObjectURL(file)}
                        alt={file.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <Icon className="h-6 w-6 text-muted-foreground" />
                    )}
                  </div>
                  
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-foreground">{file.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {formatFileSize(file.size)} • {fileType}
                        </p>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeFile(index)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                    
                    {fileType === 'image' && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        <Input
                          placeholder="Alt text (for accessibility)"
                          value={fileDetails[file.name]?.alt || ""}
                          onChange={(e) => updateFileDetails(file.name, 'alt', e.target.value)}
                          className="text-sm"
                        />
                        <Input
                          placeholder="Caption (optional)"
                          value={fileDetails[file.name]?.caption || ""}
                          onChange={(e) => updateFileDetails(file.name, 'caption', e.target.value)}
                          className="text-sm"
                        />
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
          
          {/* Upload Progress */}
          {uploading && (
            <div className="mt-4 space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-foreground">Uploading files...</span>
                <span className="text-muted-foreground">{uploadProgress}%</span>
              </div>
              <Progress value={uploadProgress} className="w-full" />
            </div>
          )}
          
          <div className="flex items-center justify-end space-x-2 mt-4">
            <Button variant="outline" onClick={() => setFiles([])}>
              Clear All
            </Button>
            <Button onClick={handleUpload} disabled={uploading || files.length === 0}>
              {uploading ? "Uploading..." : `Upload ${files.length} File${files.length !== 1 ? 's' : ''}`}
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
}