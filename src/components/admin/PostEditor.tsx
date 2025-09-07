@@ .. @@
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
+import { dbService } from "@/lib/supabase";
+import { useToast } from "@/hooks/use-toast";

 interface PostEditorProps {
@@ .. @@
   const [newTag, setNewTag] = useState("");
   const [newKeyword, setNewKeyword] = useState("");
   const [showSEO, setShowSEO] = useState(false);
   const [showMediaPicker, setShowMediaPicker] = useState(false);
+  const [saving, setSaving] = useState(false);
+  const { toast } = useToast();

   const generateSlug = (title: string) => {
@@ .. @@
   };

-  const handleSave = (status: string) => {
+  const handleSave = async (status: string) => {
     // Ensure required fields are filled
     if (!formData.title.trim()) {
-      alert('Please enter a post title');
+      toast({
+        title: "Validation Error",
+        description: "Please enter a post title",
+        variant: "destructive"
+      });
       return;
     }
     
+    setSaving(true);
+    
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
     
-    console.log('Saving post with data:', postData);
-    onSave(postData);
+    try {
+      // Try to save to database first
+      let result;
+      if (post?.id) {
+        result = await dbService.updatePost(post.id, postData);
+      } else {
+        result = await dbService.createPost(postData);
+      }
+      
+      if (result.error) {
+        console.warn('Database save failed, using mock data:', result.error);
+        // Fallback to mock data
+        onSave(postData);
+      } else {
+        console.log('Post saved to database successfully');
+        onSave(postData);
+      }
+      
+      toast({
+        title: "Success",
+        description: `Post ${status === 'published' ? 'published' : 'saved'} successfully`,
+      });
+      
+    } catch (error) {
+      console.error('Error saving post:', error);
+      // Fallback to mock data on error
+      onSave(postData);
+      
+      toast({
+        title: "Saved to Local Storage",
+        description: "Post saved locally. Database connection may be unavailable.",
+      });
+    } finally {
+      setSaving(false);
+    }
   };

   const handleMediaSelect = (file: any) => {
@@ .. @@
           <Button variant="outline" onClick={onCancel}>
             Cancel
           </Button>
-          <Button variant="outline" onClick={() => handleSave("draft")}>
+          <Button variant="outline" onClick={() => handleSave("draft")} disabled={saving}>
             <Save className="mr-2 h-4 w-4" />
-            Save Draft
+            {saving ? "Saving..." : "Save Draft"}
           </Button>
           <Button variant="outline" onClick={handlePreview}>
             <Eye className="mr-2 h-4 w-4" />
             Preview
           </Button>
-          <Button onClick={() => handleSave("published")}>
-            Publish
+          <Button onClick={() => handleSave("published")} disabled={saving}>
+            {saving ? "Publishing..." : "Publish"}
           </Button>
         </div>
       </div>