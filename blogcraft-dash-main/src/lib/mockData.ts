// Mock data store for posts - In real app, this would be Supabase

// Categories data
let mockCategories = [
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
    name: "Programming",
    slug: "programming",
    description: "Programming tutorials and guides",
    postsCount: 8,
    color: "#7c3aed",
    isActive: true,
    createdAt: "2023-09-05T10:00:00Z",
    updatedAt: "2024-01-10T10:00:00Z"
  },
  {
    id: 5,
    name: "Development",
    slug: "development",
    description: "Web development and software engineering",
    postsCount: 12,
    color: "#ea580c",
    isActive: true,
    createdAt: "2023-09-10T10:00:00Z",
    updatedAt: "2024-01-08T10:00:00Z"
  },
  {
    id: 6,
    name: "Design",
    slug: "design",
    description: "UI/UX design and visual design principles",
    postsCount: 6,
    color: "#db2777",
    isActive: true,
    createdAt: "2023-09-15T10:00:00Z",
    updatedAt: "2024-01-05T10:00:00Z"
  }
];

// Unified posts storage - both admin and public posts use this
let allPosts = [
  {
    id: 1,
    title: "ASA Wins Championship Final Against Wydad Casablanca",
    slug: "asa-wins-championship-final-wydad",
    excerpt: "In a thrilling match that went into extra time, ASA secured their first championship title in over a decade with a spectacular 3-2 victory.",
    content: `
      <div class="prose prose-lg max-w-none">
        <p>In a thrilling match that will be remembered for years to come, ASA secured their first championship title in over a decade with a spectacular 3-2 victory against Wydad Casablanca at the Mohammed V Stadium.</p>
        
        <h2>Match Highlights</h2>
        <p>The match started with high intensity from both sides. ASA took an early lead in the 15th minute through a brilliant strike from Youssef Amrani, who curled the ball into the top corner from 25 yards out.</p>
        
        <p>Wydad responded quickly, equalizing just 10 minutes later through their captain Badr Benoun. The first half ended 1-1, setting up what would be an unforgettable second half.</p>
        
        <h2>Second Half Drama</h2>
        <p>The second half saw end-to-end action with both teams creating numerous chances. ASA regained the lead in the 65th minute when striker Ahmed Reda capitalized on a defensive error to slot home from close range.</p>
        
        <p>Just when it seemed ASA had secured the victory, Wydad struck back in the 88th minute through a controversial penalty, sending the match into extra time.</p>
        
        <h2>Extra Time Glory</h2>
        <p>In the 105th minute of extra time, substitute Mehdi Alaoui became the hero, scoring the winning goal with a spectacular overhead kick that sent the ASA fans into delirium.</p>
        
        <p>This victory marks ASA's return to the top of Moroccan football and validates the hard work put in by coach Rachid Taoussi and his squad throughout the season.</p>
        
        <h2>What This Means</h2>
        <p>This championship win is more than just a trophy – it represents the culmination of years of rebuilding and investment in youth development. The victory also secures ASA's place in next season's CAF Champions League.</p>
      </div>
    `,
    featuredImageUrl: "https://images.pexels.com/photos/274506/pexels-photo-274506.jpeg",
    author: {
      name: "Ahmed Benali",
      bio: "Sports journalist covering ASA for over 10 years",
      avatar: null
    },
    category: {
      name: "Match Reports",
      slug: "match-reports"
    },
    tags: [
      { name: "Championship", slug: "championship" },
      { name: "Victory", slug: "victory" },
      { name: "Wydad", slug: "wydad" },
      { name: "Final", slug: "final" }
    ],
    status: "published",
    publishedAt: "2024-01-15T10:00:00Z",
    scheduledAt: null,
    updatedAt: "2024-01-15T10:00:00Z",
    views: 2847,
    commentsCount: 45,
    readingTime: 5,
    metaTitle: "ASA Wins Championship Final Against Wydad Casablanca - Historic Victory",
    metaDescription: "ASA secured their first championship title in over a decade with a spectacular 3-2 victory against Wydad Casablanca in extra time."
  },
  {
    id: 2,
    title: "New Signing: Youssef Amrani Joins ASA",
    slug: "new-signing-youssef-amrani",
    excerpt: "The talented midfielder from Raja Casablanca brings experience and skill to strengthen our midfield.",
    content: `
      <div class="prose prose-lg max-w-none">
        <p>ASA is delighted to announce the signing of midfielder Youssef Amrani from Raja Casablanca on a three-year deal.</p>
        
        <h2>Player Profile</h2>
        <p>Amrani, 26, brings a wealth of experience having made over 100 appearances for Raja Casablanca and earned 15 caps for the Moroccan national team.</p>
        
        <p>Known for his technical ability, vision, and leadership qualities, Amrani will add significant depth to ASA's midfield options for the upcoming season.</p>
        
        <h2>Manager's Comments</h2>
        <p>"Youssef is exactly the type of player we've been looking for," said head coach Rachid Taoussi. "His experience at the highest level and his understanding of Moroccan football will be invaluable to our squad."</p>
        
        <p>"I'm excited to work with him and I'm confident he'll make an immediate impact on our team's performance."</p>
        
        <h2>Player's Statement</h2>
        <p>"I'm thrilled to join ASA," said Amrani. "This is a club with great ambition and I'm looking forward to contributing to the team's success."</p>
        
        <p>"The project here is very exciting and I can't wait to get started and meet my new teammates."</p>
      </div>
    `,
    featuredImageUrl: "https://images.pexels.com/photos/1884574/pexels-photo-1884574.jpeg",
    author: {
      name: "Sara Alami",
      bio: "Transfer news specialist",
      avatar: null
    },
    category: {
      name: "Transfers",
      slug: "transfers"
    },
    tags: [
      { name: "Transfer", slug: "transfer" },
      { name: "New Player", slug: "new-player" },
      { name: "Midfielder", slug: "midfielder" }
    ],
    status: "published",
    publishedAt: "2024-01-14T15:30:00Z",
    scheduledAt: null,
    updatedAt: "2024-01-14T15:30:00Z",
    views: 1249,
    commentsCount: 23,
    readingTime: 3,
    metaTitle: "New Signing: Youssef Amrani Joins ASA",
    metaDescription: "The talented midfielder from Raja Casablanca brings experience and skill to strengthen our midfield."
  },
  {
    id: 3,
    title: "Advanced TypeScript Techniques",
    slug: "advanced-typescript-techniques",
    excerpt: "Learn advanced TypeScript patterns and techniques to write better, more maintainable code.",
    content: `
      <div class="prose prose-lg max-w-none">
        <p>TypeScript has revolutionized the way we write JavaScript, providing type safety and better developer experience. In this comprehensive guide, we'll explore advanced TypeScript techniques that will take your coding skills to the next level.</p>
        
        <h2>Generic Types and Constraints</h2>
        <p>Generics are one of TypeScript's most powerful features, allowing you to write reusable code that works with multiple types while maintaining type safety.</p>
        
        <h2>Conditional Types</h2>
        <p>Conditional types enable you to create types that depend on a condition, making your type definitions more flexible and expressive.</p>
        
        <h2>Mapped Types</h2>
        <p>Mapped types allow you to create new types by transforming properties of existing types, providing powerful ways to manipulate type definitions.</p>
        
        <h2>Template Literal Types</h2>
        <p>Template literal types combine the power of template literals with TypeScript's type system, enabling sophisticated string manipulation at the type level.</p>
        
        <h2>Utility Types</h2>
        <p>TypeScript provides many built-in utility types that help you transform and manipulate types in common ways, making your code more concise and readable.</p>
      </div>
    `,
    featuredImageUrl: "https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg",
    author: {
      name: "Mike Chen",
      bio: "Senior TypeScript Developer",
      avatar: null
    },
    category: {
      name: "Programming",
      slug: "programming"
    },
    tags: [
      { name: "TypeScript", slug: "typescript" },
      { name: "JavaScript", slug: "javascript" },
      { name: "Programming", slug: "programming" }
    ],
    status: "draft",
    publishedAt: null,
    scheduledAt: null,
    updatedAt: "2024-01-13T10:00:00Z",
    views: 0,
    commentsCount: 0,
    readingTime: 8,
    metaTitle: "Advanced TypeScript Techniques - Complete Guide",
    metaDescription: "Learn advanced TypeScript patterns and techniques to write better, more maintainable code."
  },
  {
    id: 4,
    title: "Building Modern Web Apps",
    slug: "building-modern-web-apps",
    excerpt: "A comprehensive guide to building modern web applications with the latest technologies and best practices.",
    content: `
      <div class="prose prose-lg max-w-none">
        <p>Modern web development has evolved significantly over the past few years. Today's web applications are more sophisticated, performant, and user-friendly than ever before.</p>
        
        <h2>The Modern Web Stack</h2>
        <p>Today's web applications typically use a combination of modern frameworks, build tools, and deployment strategies to deliver exceptional user experiences.</p>
        
        <h2>Frontend Frameworks</h2>
        <p>React, Vue, and Angular continue to dominate the frontend landscape, each offering unique advantages for different types of applications.</p>
        
        <h2>State Management</h2>
        <p>Managing application state effectively is crucial for building scalable web applications. Modern solutions include Redux, Zustand, and built-in framework state management.</p>
        
        <h2>Performance Optimization</h2>
        <p>Performance is key to user satisfaction. Learn about code splitting, lazy loading, and other optimization techniques.</p>
        
        <h2>Deployment and DevOps</h2>
        <p>Modern deployment strategies using CI/CD pipelines, containerization, and cloud platforms ensure reliable and scalable applications.</p>
      </div>
    `,
    featuredImageUrl: "https://images.pexels.com/photos/11035471/pexels-photo-11035471.jpeg",
    author: {
      name: "Alex Kumar",
      bio: "Full Stack Developer",
      avatar: null
    },
    category: {
      name: "Development",
      slug: "development"
    },
    tags: [
      { name: "Web Development", slug: "web-development" },
      { name: "Modern", slug: "modern" },
      { name: "Apps", slug: "apps" }
    ],
    status: "published",
    publishedAt: "2024-01-14T09:00:00Z",
    scheduledAt: null,
    updatedAt: "2024-01-14T09:00:00Z",
    views: 2847,
    commentsCount: 45,
    readingTime: 6,
    metaTitle: "Building Modern Web Apps - Complete Guide",
    metaDescription: "A comprehensive guide to building modern web applications with the latest technologies and best practices."
  },
  {
    id: 5,
    title: "CSS Grid Layout Guide",
    slug: "css-grid-layout-guide",
    excerpt: "Master CSS Grid Layout with this comprehensive guide covering all the essential concepts and practical examples.",
    content: `
      <div class="prose prose-lg max-w-none">
        <p>CSS Grid Layout is a powerful two-dimensional layout system that has revolutionized how we create web layouts. This guide will take you from beginner to advanced Grid techniques.</p>
        
        <h2>Grid Basics</h2>
        <p>Understanding the fundamental concepts of CSS Grid, including grid containers, grid items, and the grid coordinate system.</p>
        
        <h2>Grid Template Areas</h2>
        <p>Learn how to create complex layouts using named grid areas, making your CSS more readable and maintainable.</p>
        
        <h2>Responsive Grid Layouts</h2>
        <p>Discover how to create responsive layouts that adapt to different screen sizes using Grid's powerful features.</p>
        
        <h2>Grid vs Flexbox</h2>
        <p>Understand when to use Grid versus Flexbox, and how they can work together to create sophisticated layouts.</p>
        
        <h2>Advanced Grid Techniques</h2>
        <p>Explore advanced Grid features like subgrid, implicit grids, and complex alignment options.</p>
      </div>
    `,
    featuredImageUrl: "https://images.pexels.com/photos/11035540/pexels-photo-11035540.jpeg",
    author: {
      name: "Emma Wilson",
      bio: "CSS Specialist and UI Designer",
      avatar: null
    },
    category: {
      name: "Design",
      slug: "design"
    },
    tags: [
      { name: "CSS", slug: "css" },
      { name: "Layout", slug: "layout" },
      { name: "Grid", slug: "grid" }
    ],
    status: "scheduled",
    publishedAt: null,
    scheduledAt: "2024-01-20T10:00:00Z",
    updatedAt: "2024-01-13T14:00:00Z",
    views: 0,
    commentsCount: 0,
    readingTime: 7,
    metaTitle: "CSS Grid Layout Guide - Master Modern CSS Layouts",
    metaDescription: "Master CSS Grid Layout with this comprehensive guide covering all the essential concepts and practical examples."
  },
  {
    id: 6,
    title: "agareb",
    slug: "agareb",
    excerpt: "Brief excerpt for agareb",
    content: "<h2>Welcome to agareb</h2><p>This is the main content of the post...</p>",
    featuredImageUrl: "https://images.pexels.com/photos/274506/pexels-photo-274506.jpeg",
    author: {
      name: "Current User",
      bio: "Blog author",
      avatar: null
    },
    category: {
      name: "Transfers",
      slug: "transfers"
    },
    tags: [],
    status: "published",
    publishedAt: "2025-08-28T22:00:00Z",
    scheduledAt: null,
    updatedAt: "2025-08-28T22:00:00Z",
    views: 0,
    commentsCount: 0,
    readingTime: 1,
    metaTitle: "agareb",
    metaDescription: "Learn about agareb"
  }
];

// Helper function to convert full post to admin format
const toAdminFormat = (post: any) => ({
  id: post.id,
  title: post.title,
  slug: post.slug,
  author: post.author.name,
  status: post.status,
  category: post.category.name,
  tags: post.tags.map((tag: any) => typeof tag === 'string' ? tag : tag.name),
  publishDate: post.publishedAt ? post.publishedAt.split('T')[0] : null,
  views: post.views,
  comments: post.commentsCount
});

// Helper function to convert category name to proper format
const formatCategoryName = (categorySlug: string) => {
  const categoryMap: { [key: string]: string } = {
    'match-reports': 'Match Reports',
    'transfers': 'Transfers',
    'training': 'Training',
    'programming': 'Programming',
    'development': 'Development',
    'design': 'Design',
    'youth': 'Youth Academy',
    'infrastructure': 'Infrastructure',
    'community': 'Community'
  };
  
  return categoryMap[categorySlug] || categorySlug.replace(/[-_]/g, ' ').replace(/\b\w/g, (l: string) => l.toUpperCase());
};

// Helper function to generate reading time
const calculateReadingTime = (content: string) => {
  const wordsPerMinute = 200;
  const textContent = content.replace(/<[^>]*>/g, ''); // Remove HTML tags
  const wordCount = textContent.split(/\s+/).length;
  return Math.ceil(wordCount / wordsPerMinute);
};

// Public blog functions
export const getAllPosts = () => {
  return allPosts.filter(post => post.status === 'published');
};

export const getPostBySlug = (slug: string) => {
  return allPosts.find(post => post.slug === slug && post.status === 'published');
};

export const getPostsByCategory = (categorySlug: string) => {
  return allPosts.filter(post => 
    post.status === 'published' && 
    post.category.slug === categorySlug
  );
};

export const getFeaturedPost = () => {
  const publishedPosts = allPosts.filter(post => post.status === 'published');
  return publishedPosts.length > 0 ? publishedPosts[0] : null;
};

export const getRecentPosts = (limit: number = 4) => {
  return allPosts
    .filter(post => post.status === 'published')
    .sort((a, b) => new Date(b.publishedAt || '').getTime() - new Date(a.publishedAt || '').getTime())
    .slice(0, limit);
};

// Admin functions
export const getAdminPosts = () => {
  return allPosts.map(toAdminFormat);
};

export const getAdminPostById = (id: number) => {
  return allPosts.find(post => post.id === id);
};

export const createPost = (postData: any) => {
  const newId = Math.max(...allPosts.map(p => p.id), 0) + 1;
  
  const newPost = {
    id: newId,
    title: postData.title || "Untitled Post",
    slug: postData.slug || `untitled-post-${newId}`,
    excerpt: postData.excerpt || `Brief excerpt for ${postData.title || 'Untitled Post'}`,
    content: postData.content || `<h2>Welcome to ${postData.title || 'Untitled Post'}</h2><p>This is the main content of the post...</p>`,
    featuredImageUrl: postData.featuredImage || "https://images.pexels.com/photos/274506/pexels-photo-274506.jpeg",
    author: {
      name: "Current User",
      bio: "Blog author",
      avatar: null
    },
    category: {
      name: formatCategoryName(postData.category || 'general'),
      slug: postData.category || 'general'
    },
    tags: (postData.tags || []).map((tag: string) => ({ 
      name: tag, 
      slug: tag.toLowerCase().replace(/\s+/g, '-') 
    })),
    status: postData.status || 'draft',
    publishedAt: postData.status === 'published' ? new Date().toISOString() : null,
    scheduledAt: postData.scheduledAt || null,
    updatedAt: new Date().toISOString(),
    views: 0,
    commentsCount: 0,
    readingTime: calculateReadingTime(postData.content || ''),
    metaTitle: postData.metaTitle || postData.title || "Untitled Post",
    metaDescription: postData.metaDescription || postData.excerpt || `Learn about ${postData.title || 'this topic'}`
  };
  
  allPosts.unshift(newPost); // Add to beginning for latest posts
  return toAdminFormat(newPost);
};

export const updatePost = (id: number, postData: any) => {
  const index = allPosts.findIndex(p => p.id === id);
  if (index === -1) return null;
  
  const existingPost = allPosts[index];
  
  const updatedPost = {
    ...existingPost,
    title: postData.title || existingPost.title,
    slug: postData.slug || existingPost.slug,
    excerpt: postData.excerpt || existingPost.excerpt,
    content: postData.content || existingPost.content,
    featuredImageUrl: postData.featuredImage || existingPost.featuredImageUrl,
    category: {
      name: formatCategoryName(postData.category || existingPost.category.slug),
      slug: postData.category || existingPost.category.slug
    },
    tags: (postData.tags || []).map((tag: string) => ({ 
      name: tag, 
      slug: tag.toLowerCase().replace(/\s+/g, '-') 
    })),
    status: postData.status || existingPost.status,
    publishedAt: postData.status === 'published' ? 
      (existingPost.publishedAt || new Date().toISOString()) : 
      (postData.status === 'draft' ? null : existingPost.publishedAt),
    scheduledAt: postData.scheduledAt || existingPost.scheduledAt,
    updatedAt: new Date().toISOString(),
    readingTime: calculateReadingTime(postData.content || existingPost.content),
    metaTitle: postData.metaTitle || existingPost.metaTitle,
    metaDescription: postData.metaDescription || existingPost.metaDescription
  };
  
  allPosts[index] = updatedPost;
  return toAdminFormat(updatedPost);
};

export const deletePost = (id: number) => {
  const index = allPosts.findIndex(p => p.id === id);
  if (index !== -1) {
    allPosts.splice(index, 1);
    return true;
  }
  return false;
};

export const archivePost = (id: number) => {
  const index = allPosts.findIndex(p => p.id === id);
  if (index !== -1) {
    allPosts[index] = {
      ...allPosts[index],
      status: 'archived',
      publishedAt: null,
      updatedAt: new Date().toISOString()
    };
    return toAdminFormat(allPosts[index]);
  }
  return null;
};

export const duplicatePost = (id: number) => {
  const post = allPosts.find(p => p.id === id);
  if (!post) return null;
  
  const newId = Math.max(...allPosts.map(p => p.id)) + 1;
  const duplicatedPost = {
    ...post,
    id: newId,
    title: `${post.title} (Copy)`,
    slug: `${post.slug}-copy-${newId}`,
    status: 'draft',
    publishedAt: null,
    scheduledAt: null,
    views: 0,
    commentsCount: 0,
    updatedAt: new Date().toISOString()
  };
  
  allPosts.push(duplicatedPost);
  return toAdminFormat(duplicatedPost);
};

export const schedulePost = (id: number) => {
  const index = allPosts.findIndex(p => p.id === id);
  if (index !== -1) {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(10, 0, 0, 0);
    
    allPosts[index] = {
      ...allPosts[index],
      status: 'scheduled',
      scheduledAt: tomorrow.toISOString(),
      publishedAt: null,
      updatedAt: new Date().toISOString()
    };
    return toAdminFormat(allPosts[index]);
  }
  return null;
};

// Categories functions
export const getAllCategories = () => {
  return mockCategories;
};

export const getActiveCategories = () => {
  return mockCategories.filter(cat => cat.isActive);
};

export const getCategoryBySlug = (slug: string) => {
  return mockCategories.find(cat => cat.slug === slug);
};

export const createCategory = (categoryData: any) => {
  const newId = Math.max(...mockCategories.map(c => c.id)) + 1;
  const category = {
    id: newId,
    ...categoryData,
    postsCount: 0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  mockCategories.push(category);
  return category;
};

export const updateCategory = (id: number, categoryData: any) => {
  const index = mockCategories.findIndex(c => c.id === id);
  if (index !== -1) {
    mockCategories[index] = {
      ...mockCategories[index],
      ...categoryData,
      updatedAt: new Date().toISOString()
    };
    return mockCategories[index];
  }
  return null;
};

export const deleteCategory = (id: number) => {
  const index = mockCategories.findIndex(c => c.id === id);
  if (index !== -1) {
    mockCategories.splice(index, 1);
    return true;
  }
  return false;
};

export const duplicateCategory = (id: number) => {
  const category = mockCategories.find(c => c.id === id);
  if (!category) return null;
  
  const newId = Math.max(...mockCategories.map(c => c.id)) + 1;
  const duplicatedCategory = {
    ...category,
    id: newId,
    name: `${category.name} (Copy)`,
    slug: `${category.slug}-copy`,
    postsCount: 0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  
  mockCategories.push(duplicatedCategory);
  return duplicatedCategory;
};

export const toggleCategoryStatus = (id: number) => {
  const index = mockCategories.findIndex(c => c.id === id);
  if (index !== -1) {
    mockCategories[index].isActive = !mockCategories[index].isActive;
    mockCategories[index].updatedAt = new Date().toISOString();
    return mockCategories[index];
  }
  return null;
};

export const bulkUpdateCategories = (ids: number[], action: 'activate' | 'deactivate' | 'delete') => {
  if (action === 'delete') {
    ids.forEach(id => deleteCategory(id));
  } else {
    const isActive = action === 'activate';
    ids.forEach(id => {
      const index = mockCategories.findIndex(c => c.id === id);
      if (index !== -1) {
        mockCategories[index].isActive = isActive;
        mockCategories[index].updatedAt = new Date().toISOString();
      }
    });
  }
};