import { useParams } from 'react-router-dom';
import { Calendar, Clock } from 'lucide-react';
import BackButton from '../components/BackButton';
import { blogPosts } from '../data/dummy';

export default function BlogPost() {
  const { id } = useParams();
  const post = blogPosts.find(post => post.id === id);

  if (!post) {
    return (
      <div className="max-w-4xl mx-auto text-center py-12">
        <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-6">
          <h2 className="text-xl font-semibold text-yellow-800 dark:text-yellow-200 mb-2">Post Not Found</h2>
          <p className="text-yellow-600 dark:text-yellow-300">The requested blog post could not be found.</p>
          <BackButton to="/blog" label="Back to Blog" />
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-8">
        <BackButton to="/blog" label="Back to Blog" />
      </div>

      <article className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm overflow-hidden">
        <div className="aspect-video relative">
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-10" />
          <img 
            src={post.image} 
            alt={post.title}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="p-8">
          <div className="flex items-center gap-4 text-gray-500 dark:text-gray-400 text-sm mb-4">
            <span className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              {new Date(post.date).toLocaleDateString()}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {post.readTime}
            </span>
          </div>

          <h1 className="text-4xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            {post.title}
          </h1>

          <div className="flex items-center gap-3 mb-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <img 
              src={post.author.avatar} 
              alt={post.author.name}
              className="w-12 h-12 rounded-full ring-2 ring-white dark:ring-gray-800"
            />
            <div>
              <div className="font-medium dark:text-white">{post.author.name}</div>
              <div className="text-gray-500 dark:text-gray-400 text-sm">Author</div>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mb-8">
            {post.tags.map(tag => (
              <span 
                key={tag}
                className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100 text-sm rounded-full font-medium"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="prose dark:prose-invert prose-lg max-w-none">
            {post.content.split('\n\n').map((paragraph, index) => (
              <p key={index} className="mb-4 text-gray-600 dark:text-gray-300">{paragraph}</p>
            ))}
          </div>
        </div>
      </article>
    </div>
  );
}