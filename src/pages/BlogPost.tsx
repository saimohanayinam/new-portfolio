import { useParams } from 'react-router-dom';
import { Calendar, Clock } from 'lucide-react';
import BackButton from '../components/BackButton';

const posts = {
  '1': {
    title: 'Getting Started with React and TypeScript',
    content: `TypeScript has become an essential tool in modern web development, especially when working with React. In this comprehensive guide, we'll explore how to set up a new React project with TypeScript and implement best practices for type safety.

    First, we'll cover the basics of TypeScript and why it's beneficial for React development. Then, we'll walk through the setup process step by step, including configuration of tsconfig.json and essential development tools.

    We'll also discuss common patterns for typing props, state, and event handlers in React components. You'll learn how to leverage TypeScript's type system to catch errors early and improve code maintainability.

    By the end of this guide, you'll have a solid foundation for building type-safe React applications.`,
    date: '2024-01-15',
    readTime: '5 min read',
    image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee',
    author: {
      name: 'John Doe',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e'
    },
    tags: ['React', 'TypeScript', 'Web Development']
  },
  '2': {
    title: 'Building Modern UIs with Tailwind CSS',
    content: `Tailwind CSS has revolutionized the way we style web applications. This utility-first CSS framework provides a different approach to styling that can significantly speed up your development process.

    In this article, we'll explore the core concepts of Tailwind CSS and how to effectively use it in your projects. We'll cover everything from basic utility classes to advanced customization techniques.

    You'll learn about responsive design, dark mode implementation, and component extraction. We'll also discuss best practices for maintaining clean and maintainable CSS code with Tailwind.

    By the end, you'll have a strong understanding of how to leverage Tailwind CSS to create beautiful, responsive user interfaces.`,
    date: '2024-01-10',
    readTime: '8 min read',
    image: 'https://images.unsplash.com/photo-1587620962725-abab7fe55159',
    author: {
      name: 'Jane Smith',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80'
    },
    tags: ['CSS', 'Tailwind', 'Design']
  }
};

export default function BlogPost() {
  const { id } = useParams();
  const post = id ? posts[id as keyof typeof posts] : null;

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