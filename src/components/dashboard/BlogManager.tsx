import { useState } from 'react';
import { Plus, Trash, Edit } from 'lucide-react';
import { toast } from 'sonner';
import RichTextEditor from '../RichTextEditor';
import { updateUserProfile } from '../../lib/firebase';

interface BlogPost {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  date: string;
  image: string;
}

interface BlogManagerProps {
  posts: BlogPost[];
  setPosts: (posts: BlogPost[]) => void;
  userId: string;
}

export default function BlogManager({ posts, setPosts, userId }: BlogManagerProps) {
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);

  const addNewPost = () => {
    const newPost = {
      id: crypto.randomUUID(),
      title: '',
      content: '',
      excerpt: '',
      date: new Date().toISOString(),
      image: ''
    };
    setPosts([...posts, newPost]);
  };

  const removePost = (id: string) => {
    setPosts(posts.filter(post => post.id !== id));
  };

  const updatePost = (id: string, field: keyof BlogPost, value: string) => {
    setPosts(posts.map(post =>
      post.id === id ? { ...post, [field]: value } : post
    ));
  };

  const savePosts = async () => {
    try {
      await updateUserProfile(userId, { blogPosts: posts });
      toast.success('Blog posts saved successfully!');
    } catch (error: any) {
      toast.error(error.message || 'Failed to save blog posts');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold dark:text-white">Blog Posts</h2>
        <button onClick={addNewPost} className="btn-primary">
          <Plus className="w-5 h-5 mr-2" />
          Add New Post
        </button>
      </div>

      <div className="space-y-6">
        {posts.map((post) => (
          <div key={post.id} className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
            <div className="flex justify-between items-start mb-4">
              <div className="flex-1">
                <input
                  type="text"
                  value={post.title}
                  onChange={(e) => updatePost(post.id, 'title', e.target.value)}
                  placeholder="Post Title"
                  className="text-xl font-bold mb-2 w-full bg-transparent border-none focus:ring-0"
                />
                <input
                  type="text"
                  value={post.excerpt}
                  onChange={(e) => updatePost(post.id, 'excerpt', e.target.value)}
                  placeholder="Post Excerpt"
                  className="text-gray-600 dark:text-gray-300 w-full bg-transparent border-none focus:ring-0"
                />
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setEditingPost(post)}
                  className="p-2 text-blue-600 hover:bg-blue-100 rounded-full"
                >
                  <Edit className="w-4 h-4" />
                </button>
                <button
                  onClick={() => removePost(post.id)}
                  className="p-2 text-red-600 hover:bg-red-100 rounded-full"
                >
                  <Trash className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="mt-4">
              <RichTextEditor
                content={post.content}
                onChange={(content) => updatePost(post.id, 'content', content)}
              />
            </div>
          </div>
        ))}
      </div>

      {posts.length > 0 && (
        <button onClick={savePosts} className="btn-primary w-full">
          Save All Posts
        </button>
      )}
    </div>
  );
}