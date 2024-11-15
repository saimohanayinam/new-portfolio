import { useState, useEffect } from 'react';
import { Plus, Trash, Edit, Loader } from 'lucide-react';
import { toast } from 'sonner';
import RichTextEditor from '../RichTextEditor';
import { createBlogPost, updateBlogPost, deleteBlogPost, getBlogPosts, getUserProfile } from '../../lib/firebase';
import { useAuthStore } from '../../lib/store';
import ImageUpload from '../blog/ImageUpload';
import TagInput from '../blog/TagInput';

interface Author {
  name: string;
  avatar: string;
}

interface BlogPost {
  id?: string;
  title: string;
  content: string;
  excerpt: string;
  date: string;
  readTime: string;
  image: string;
  author: Author;
  tags: string[];
}

interface BlogManagerProps {
  userId: string;
}

export default function BlogManager({ userId }: BlogManagerProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [author, setAuthor] = useState<Author>({
    name: 'Anonymous',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e'
  });
  const user = useAuthStore(state => state.user);

  useEffect(() => {
    loadData();
  }, [user]);

  const loadData = async () => {
    if (!user) return;
    try {
      setIsFetching(true);
      // Load user profile
      const { data: profile } = await getUserProfile(user.uid);
      if (profile) {
        setAuthor({
          name: profile.name || user.displayName || 'Anonymous',
          avatar: profile.avatar || user.photoURL || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e'
        });
      }

      // Load blog posts
      const { blogs, error } = await getBlogPosts(user.uid);
      if (error) throw new Error(error);
      setPosts(blogs);
    } catch (error: any) {
      toast.error('Failed to load blog posts');
    } finally {
      setIsFetching(false);
    }
  };

  const calculateReadTime = (content: string): string => {
    const wordsPerMinute = 200;
    const words = content.trim().split(/\s+/).length;
    const minutes = Math.ceil(words / wordsPerMinute);
    return `${minutes} min read`;
  };

  const addNewPost = () => {
    const newPost: BlogPost = {
      title: '',
      content: '',
      excerpt: '',
      date: new Date().toISOString(),
      readTime: '1 min read',
      image: '',
      author,
      tags: []
    };
    setSelectedPost(newPost);
  };

  const handleSave = async () => {
    if (!selectedPost) return;
    if (!selectedPost.title.trim()) {
      toast.error('Title is required');
      return;
    }
    if (!selectedPost.content.trim()) {
      toast.error('Content is required');
      return;
    }
    if (!selectedPost.image) {
      toast.error('Cover image is required');
      return;
    }

    try {
      setIsLoading(true);
      
      const readTime = calculateReadTime(selectedPost.content);
      const postData = {
        ...selectedPost,
        readTime,
        date: new Date().toISOString(),
        author
      };

      if (selectedPost.id) {
        // Update existing post
        const { error } = await updateBlogPost(userId, selectedPost.id, postData);
        if (error) throw new Error(error);
        setPosts(posts.map(p => p.id === selectedPost.id ? { ...postData, id: selectedPost.id } : p));
        toast.success('Blog post updated successfully!');
      } else {
        // Create new post
        const { id, error } = await createBlogPost(userId, postData);
        if (error) throw new Error(error);
        if (id) {
          setPosts([{ ...postData, id }, ...posts]);
          toast.success('Blog post created successfully!');
        }
      }
      setSelectedPost(null);
    } catch (error: any) {
      toast.error(error.message || 'Failed to save blog post');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (postId: string) => {
    if (!confirm('Are you sure you want to delete this post?')) return;

    try {
      setIsLoading(true);
      const { error } = await deleteBlogPost(userId, postId);
      if (error) throw new Error(error);
      setPosts(posts.filter(p => p.id !== postId));
      toast.success('Blog post deleted successfully!');
    } catch (error: any) {
      toast.error(error.message || 'Failed to delete blog post');
    } finally {
      setIsLoading(false);
    }
  };

  if (isFetching) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold dark:text-white">Blog Posts</h2>
        <button onClick={addNewPost} className="btn-primary" disabled={isLoading}>
          <Plus className="w-5 h-5 mr-2" />
          New Post
        </button>
      </div>

      {selectedPost && (
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm space-y-6">
          <div className="flex items-center gap-4 mb-6">
            <img
              src={author.avatar}
              alt={author.name}
              className="w-12 h-12 rounded-full object-cover"
            />
            <div>
              <p className="font-medium dark:text-white">{author.name}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Author</p>
            </div>
          </div>

          <input
            type="text"
            value={selectedPost.title}
            onChange={(e) => setSelectedPost({ ...selectedPost, title: e.target.value })}
            placeholder="Post Title"
            className="text-2xl font-bold w-full bg-transparent border-none focus:ring-0 dark:text-white"
          />

          <input
            type="text"
            value={selectedPost.excerpt}
            onChange={(e) => setSelectedPost({ ...selectedPost, excerpt: e.target.value })}
            placeholder="Post Excerpt"
            className="w-full bg-transparent border-b dark:border-gray-700 pb-2 focus:ring-0 dark:text-gray-300"
          />

          <div className="space-y-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Cover Image
            </label>
            <ImageUpload
              value={selectedPost.image}
              onChange={(url) => setSelectedPost({ ...selectedPost, image: url })}
            />
          </div>

          <div className="space-y-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Tags
            </label>
            <TagInput
              tags={selectedPost.tags}
              onChange={(tags) => setSelectedPost({ ...selectedPost, tags })}
            />
          </div>

          <div className="space-y-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Content
            </label>
            <RichTextEditor
              content={selectedPost.content}
              onChange={(content) => setSelectedPost({ ...selectedPost, content })}
            />
          </div>

          <div className="flex justify-end gap-4">
            <button 
              onClick={() => setSelectedPost(null)} 
              className="btn-secondary"
              disabled={isLoading}
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={isLoading}
              className="btn-primary"
            >
              {isLoading ? 'Saving...' : selectedPost.id ? 'Update Post' : 'Publish Post'}
            </button>
          </div>
        </div>
      )}

      <div className="grid gap-6">
        {posts.map((post) => (
          <div key={post.id} className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <img
                    src={post.author.avatar}
                    alt={post.author.name}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {post.author.name}
                  </span>
                </div>
                <h3 className="text-xl font-semibold mb-2 dark:text-white">{post.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">{post.excerpt}</p>
                <div className="flex gap-2 mt-2">
                  {post.tags.map((tag, index) => (
                    <span 
                      key={index}
                      className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100 text-sm rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setSelectedPost(post)}
                  className="p-2 text-blue-600 hover:bg-blue-100 rounded-full"
                  disabled={isLoading}
                >
                  <Edit className="w-4 h-4" />
                </button>
                <button
                  onClick={() => post.id && handleDelete(post.id)}
                  className="p-2 text-red-600 hover:bg-red-100 rounded-full"
                  disabled={isLoading}
                >
                  <Trash className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}

        {posts.length === 0 && (
          <div className="text-center py-12 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <p className="text-gray-500 dark:text-gray-400">No blog posts yet. Click the button above to create your first post.</p>
          </div>
        )}
      </div>
    </div>
  );
}