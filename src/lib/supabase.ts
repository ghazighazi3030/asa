import { createClient } from '@supabase/supabase-js';
import type { Database } from '@/integrations/supabase/types';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase environment variables not found. Using mock data.');
}

export const supabase = supabaseUrl && supabaseAnonKey 
  ? createClient<Database>(supabaseUrl, supabaseAnonKey)
  : null;

// Database service functions
export const dbService = {
  // Posts
  async createPost(postData: any) {
    if (!supabase) {
      console.log('Using mock data - Supabase not configured');
      return { data: null, error: null };
    }

    try {
      const { data, error } = await supabase
        .from('posts')
        .insert({
          title: postData.title,
          slug: postData.slug,
          excerpt: postData.excerpt,
          content: postData.content,
          featured_image_url: postData.featuredImage,
          author_id: postData.authorId || '00000000-0000-0000-0000-000000000000',
          category_id: postData.categoryId,
          status: postData.status,
          scheduled_at: postData.scheduledAt,
          meta_title: postData.metaTitle,
          meta_description: postData.metaDescription,
          meta_keywords: postData.metaKeywords,
          published_at: postData.status === 'published' ? new Date().toISOString() : null
        })
        .select()
        .single();

      return { data, error };
    } catch (err) {
      console.error('Error creating post:', err);
      return { data: null, error: err };
    }
  },

  async updatePost(id: string, postData: any) {
    if (!supabase) {
      console.log('Using mock data - Supabase not configured');
      return { data: null, error: null };
    }

    try {
      const { data, error } = await supabase
        .from('posts')
        .update({
          title: postData.title,
          slug: postData.slug,
          excerpt: postData.excerpt,
          content: postData.content,
          featured_image_url: postData.featuredImage,
          category_id: postData.categoryId,
          status: postData.status,
          scheduled_at: postData.scheduledAt,
          meta_title: postData.metaTitle,
          meta_description: postData.metaDescription,
          meta_keywords: postData.metaKeywords,
          published_at: postData.status === 'published' && !postData.publishedAt 
            ? new Date().toISOString() 
            : postData.publishedAt
        })
        .eq('id', id)
        .select()
        .single();

      return { data, error };
    } catch (err) {
      console.error('Error updating post:', err);
      return { data: null, error: err };
    }
  },

  async getPosts() {
    if (!supabase) {
      console.log('Using mock data - Supabase not configured');
      return { data: [], error: null };
    }

    try {
      const { data, error } = await supabase
        .from('posts')
        .select(`
          *,
          profiles:author_id (display_name),
          categories (name, slug)
        `)
        .order('created_at', { ascending: false });

      return { data, error };
    } catch (err) {
      console.error('Error fetching posts:', err);
      return { data: [], error: err };
    }
  },

  async getCategories() {
    if (!supabase) {
      console.log('Using mock data - Supabase not configured');
      return { data: [], error: null };
    }

    try {
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .order('name');

      return { data, error };
    } catch (err) {
      console.error('Error fetching categories:', err);
      return { data: [], error: err };
    }
  },

  // Test connection
  async testConnection() {
    if (!supabase) {
      return { connected: false, error: 'Supabase not configured' };
    }

    try {
      const { data, error } = await supabase
        .from('categories')
        .select('count')
        .limit(1);

      return { connected: !error, error: error?.message };
    } catch (err) {
      return { connected: false, error: (err as Error).message };
    }
  }
};