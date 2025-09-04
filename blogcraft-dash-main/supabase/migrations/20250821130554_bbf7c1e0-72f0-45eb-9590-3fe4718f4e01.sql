-- Create profiles table for user information
CREATE TABLE public.profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  display_name TEXT,
  avatar_url TEXT,
  bio TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create categories table
CREATE TABLE public.categories (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create tags table
CREATE TABLE public.tags (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  slug TEXT NOT NULL UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create posts table with SEO fields
CREATE TABLE public.posts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  excerpt TEXT,
  content TEXT NOT NULL,
  featured_image_url TEXT,
  author_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  category_id UUID REFERENCES public.categories(id) ON DELETE SET NULL,
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'scheduled')),
  scheduled_at TIMESTAMP WITH TIME ZONE,
  -- SEO fields
  meta_title TEXT,
  meta_description TEXT,
  meta_keywords TEXT[],
  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  published_at TIMESTAMP WITH TIME ZONE
);

-- Create post_tags junction table
CREATE TABLE public.post_tags (
  post_id UUID NOT NULL REFERENCES public.posts(id) ON DELETE CASCADE,
  tag_id UUID NOT NULL REFERENCES public.tags(id) ON DELETE CASCADE,
  PRIMARY KEY (post_id, tag_id)
);

-- Create comments table
CREATE TABLE public.comments (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  post_id UUID NOT NULL REFERENCES public.posts(id) ON DELETE CASCADE,
  author_name TEXT NOT NULL,
  author_email TEXT NOT NULL,
  content TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected', 'spam')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.post_tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.comments ENABLE ROW LEVEL SECURITY;

-- RLS Policies for profiles
CREATE POLICY "Profiles are viewable by everyone" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Users can update their own profile" ON public.profiles FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own profile" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = user_id);

-- RLS Policies for categories (public read, admin write)
CREATE POLICY "Categories are viewable by everyone" ON public.categories FOR SELECT USING (true);

-- RLS Policies for tags (public read, admin write)
CREATE POLICY "Tags are viewable by everyone" ON public.tags FOR SELECT USING (true);

-- RLS Policies for posts
CREATE POLICY "Published posts are viewable by everyone" ON public.posts 
FOR SELECT USING (status = 'published' AND (scheduled_at IS NULL OR scheduled_at <= now()));

CREATE POLICY "Authors can view their own posts" ON public.posts 
FOR SELECT USING (auth.uid() IN (SELECT user_id FROM public.profiles WHERE id = author_id));

CREATE POLICY "Authors can manage their own posts" ON public.posts 
FOR ALL USING (auth.uid() IN (SELECT user_id FROM public.profiles WHERE id = author_id));

-- RLS Policies for post_tags
CREATE POLICY "Post tags are viewable with posts" ON public.post_tags FOR SELECT USING (true);

-- RLS Policies for comments
CREATE POLICY "Approved comments are viewable by everyone" ON public.comments 
FOR SELECT USING (status = 'approved');

CREATE POLICY "Anyone can insert comments" ON public.comments 
FOR INSERT WITH CHECK (true);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_posts_updated_at
  BEFORE UPDATE ON public.posts
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Create indexes for better performance
CREATE INDEX idx_posts_status_published_at ON public.posts(status, published_at DESC);
CREATE INDEX idx_posts_category_id ON public.posts(category_id);
CREATE INDEX idx_posts_author_id ON public.posts(author_id);
CREATE INDEX idx_posts_slug ON public.posts(slug);
CREATE INDEX idx_categories_slug ON public.categories(slug);
CREATE INDEX idx_tags_slug ON public.tags(slug);
CREATE INDEX idx_comments_post_id_status ON public.comments(post_id, status);