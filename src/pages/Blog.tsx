import { Link } from 'react-router-dom';
import { Calendar, Clock } from 'lucide-react';
import BackButton from '../components/BackButton';

const posts = [
  {
    id: '1',
    title: 'Getting Started with React and TypeScript',
    excerpt: 'Learn how to set up a new React project with TypeScript and best practices for type safety.',
    date: '2024-01-15',
    readTime: '5 min read',
    image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee',
    tags: ['React', 'TypeScript', 'Web Development']
  },
  {
    id: '2',
    title: 'Building Modern UIs with Tailwind CSS',
    excerpt: 'Explore the power of utility-first CSS and how to create beautiful interfaces quickly.',
    date: '2024-01-10',
    readTime: '8 min read',
    image: 'https://images.unsplash.com/photo-1587620962725-abab7fe55159',
    tags: ['CSS', 'Tailwind', 'Design']
  },
  {
    id: '3',
    title: 'Advanced State Management with Redux Toolkit',
    excerpt: 'Master modern Redux patterns and best practices for scalable applications.',
    date: '2024-01-05',
    readTime: '10 min read',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c',
    tags: ['Redux', 'React', 'State Management']
  },
  {
    id: '4',
    title: 'Building RESTful APIs with Node.js',
    excerpt: 'Learn how to create robust and scalable APIs using Node.js and Express.',
    date: '2024-01-01',
    readTime: '12 min read',
    image: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479',
    tags: ['Node.js', 'API', 'Backend']
  }
];

export default function Blog() {
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