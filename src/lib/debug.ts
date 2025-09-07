import { dbService } from './supabase';
import { createPost } from './mockData';

// Debug utilities for troubleshooting database issues
export const debugUtils = {
  async testSupabaseConnection() {
    console.log('Testing Supabase connection...');
    const result = await dbService.testConnection();
    console.log('Connection result:', result);
    return result;
  },

  async createTestPost() {
    console.log('Creating test post...');
    
    const testPostData = {
      title: "Test Post - Database Connection",
      slug: "test-post-database-connection",
      excerpt: "This is a test post to verify database connectivity",
      content: "<h2>Test Post</h2><p>This post was created to test the database connection.</p>",
      status: "draft",
      category: "general",
      tags: ["test", "database"],
      featuredImage: "https://images.pexels.com/photos/274506/pexels-photo-274506.jpeg",
      metaTitle: "Test Post - Database Connection",
      metaDescription: "Test post for database connectivity"
    };

    try {
      // Try database first
      const dbResult = await dbService.createPost(testPostData);
      
      if (dbResult.error) {
        console.warn('Database creation failed, using mock data:', dbResult.error);
        // Fallback to mock data
        const mockResult = createPost(testPostData);
        console.log('Mock post created:', mockResult);
        return { success: true, method: 'mock', data: mockResult };
      } else {
        console.log('Database post created:', dbResult.data);
        return { success: true, method: 'database', data: dbResult.data };
      }
    } catch (error) {
      console.error('Error creating test post:', error);
      // Fallback to mock data
      const mockResult = createPost(testPostData);
      console.log('Fallback to mock post:', mockResult);
      return { success: true, method: 'mock-fallback', data: mockResult, error };
    }
  },

  async getDatabaseStatus() {
    const connection = await this.testSupabaseConnection();
    const envVars = {
      VITE_SUPABASE_URL: import.meta.env.VITE_SUPABASE_URL ? 'Set' : 'Missing',
      VITE_SUPABASE_ANON_KEY: import.meta.env.VITE_SUPABASE_ANON_KEY ? 'Set' : 'Missing'
    };
    
    return {
      connection,
      envVars,
      timestamp: new Date().toISOString()
    };
  },

  quickDebugPosts() {
    console.log('=== QUICK POST DEBUG ===');
    console.log('Environment variables:', {
      VITE_SUPABASE_URL: import.meta.env.VITE_SUPABASE_URL ? 'Set' : 'Missing',
      VITE_SUPABASE_ANON_KEY: import.meta.env.VITE_SUPABASE_ANON_KEY ? 'Set' : 'Missing'
    });
    
    // Test mock data functions
    try {
      const mockPosts = createPost({
        title: "Debug Test Post",
        slug: "debug-test-post",
        excerpt: "Debug test",
        content: "<p>Debug content</p>",
        status: "draft"
      });
      console.log('Mock post creation works:', mockPosts);
    } catch (error) {
      console.error('Mock post creation failed:', error);
    }
    
    console.log('=== END DEBUG ===');
  }
};

// Make debug functions available globally for console access
if (typeof window !== 'undefined') {
  (window as any).quickDebugPosts = debugUtils.quickDebugPosts;
  (window as any).createTestPost = debugUtils.createTestPost;
  (window as any).testSupabaseConnection = debugUtils.testSupabaseConnection;
  (window as any).getDatabaseStatus = debugUtils.getDatabaseStatus;
}