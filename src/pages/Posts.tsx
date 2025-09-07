@@ .. @@
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
+import { dbService } from "@/lib/supabase";
+import { useToast } from "@/hooks/use-toast";

 const statusColors = {
@@ .. @@
   const [selectedPosts, setSelectedPosts] = useState<number[]>([]);
   const [showEditor, setShowEditor] = useState(false);
   const [editingPost, setEditingPost] = useState<any>(null);
+  const { toast } = useToast();

   const filteredPosts = posts.filter(post => {
@@ .. @@
   const handleSavePost = (postData: any) => {
     console.log('Saving post:', postData);
     
-    if (postData.id) {
-      // Update existing post
-      updatePost(postData.id, postData);
-    } else {
-      // Create new post
-      createPost(postData);
+    try {
+      if (postData.id) {
+        // Update existing post
+        updatePost(postData.id, postData);
+      } else {
+        // Create new post
+        createPost(postData);
+      }
+      
+      // Refresh posts list
+      setPosts(getAdminPosts());
+      setShowEditor(false);
+      setEditingPost(null);
+      
+      toast({
+        title: "Success",
+        description: `Post ${postData.status === 'published' ? 'published' : 'saved'} successfully`,
+      });
+      
+    } catch (error) {
+      console.error('Error saving post:', error);
+      toast({
+        title: "Error",
+        description: "Failed to save post. Please try again.",
+        variant: "destructive"
+      });
     }
-    
-    // Refresh posts list
-    setPosts(getAdminPosts());
-    setShowEditor(false);
-    setEditingPost(null);
   };

   const handleCancelEdit = () => {