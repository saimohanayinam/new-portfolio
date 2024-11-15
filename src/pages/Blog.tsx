import { Link } from 'react-router-dom';
import { Calendar, Clock, Loader } from 'lucide-react';
import BackButton from '../components/BackButton';
import { useBlogPosts } from '../lib/hooks/useData';
import { useAuthStore } from '../lib/store';

export default function Blog() {
  const user = useAuthStore(state => state.user);
  const { posts, loading } = useBlogPosts(user?.uid);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <BackButton to="/" label="Back to Home" />
      </div>
      
      <h1 className="text-4xl font-bold mb-8 dark:text-white">Blog</h1>
      <div className="space-y-8">
        {posts.map((post) => (
          <article key={post.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
            <Link to={`/blog/${post.id}`}>
              <img 
                src={post.image} 
                alt={post.title}
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <div className="flex items-center gap-4 text-gray-500 dark:text-gray-400 text-sm mb-3">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {new Date(post.date).toLocaleDateString()}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {post.readTime}
                  </span>
                </div>
                <h2 className="text-2xl font-bold mb-3 dark:text-white">{post.title}</h2>
                <p className="text-gray-600 dark:text-gray-300 mb-4">{post.excerpt}</p>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map(tag => (
                    <span 
                      key={tag}
                      className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100 text-sm rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
}