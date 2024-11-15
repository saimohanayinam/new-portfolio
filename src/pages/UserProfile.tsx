import { useEffect, useState } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { Loader } from 'lucide-react';
import { getUserByUsername } from '../lib/firebase';
import { useProfile, useProjects, useServices, useBlogPosts } from '../lib/hooks/useData';

export default function UserProfile() {
  const { username } = useParams();
  const [userId, setUserId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const { profile, loading: profileLoading } = useProfile(userId);
  const { projects, loading: projectsLoading } = useProjects(userId);
  const { services, loading: servicesLoading } = useServices(userId);
  const { posts, loading: postsLoading } = useBlogPosts(userId);

  useEffect(() => {
    async function fetchUser() {
      if (!username) return;

      try {
        const { data, error } = await getUserByUsername(username);
        if (error) {
          setError(error);
          return;
        }
        if (data) {
          setUserId(data.id);
        }
      } catch (err) {
        setError('Failed to load profile');
      } finally {
        setLoading(false);
      }
    }

    fetchUser();
  }, [username]);

  if (loading || profileLoading || projectsLoading || servicesLoading || postsLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-red-50 dark:bg-red-900/20 p-6 rounded-lg text-center">
          <h2 className="text-xl font-semibold text-red-800 dark:text-red-200 mb-2">
            {error}
          </h2>
          <p className="text-red-600 dark:text-red-300">
            {error === 'This profile is private' 
              ? 'The user has set their profile to private.'
              : 'The requested profile could not be found.'}
          </p>
        </div>
      </div>
    );
  }

  if (!username || !profile) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Profile Header */}
      <div className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex items-center gap-6">
            <img
              src={profile.avatar}
              alt={profile.name}
              className="w-24 h-24 rounded-full object-cover border-4 border-white dark:border-gray-700"
            />
            <div>
              <h1 className="text-3xl font-bold dark:text-white">{profile.name}</h1>
              <p className="text-gray-600 dark:text-gray-300">{profile.title}</p>
              <p className="text-gray-500 dark:text-gray-400">@{username}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 py-8 space-y-12">
        {/* Bio Section */}
        <section>
          <h2 className="text-2xl font-bold mb-4 dark:text-white">About</h2>
          <p className="text-gray-600 dark:text-gray-300">{profile.bio}</p>
        </section>

        {/* Projects Section */}
        <section>
          <h2 className="text-2xl font-bold mb-6 dark:text-white">Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <div key={project.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
                <h3 className="text-xl font-semibold mb-2 dark:text-white">{project.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100 text-sm rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Blog Posts Section */}
        <section>
          <h2 className="text-2xl font-bold mb-6 dark:text-white">Blog Posts</h2>
          <div className="grid gap-6">
            {posts.map((post) => (
              <div key={post.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
                <h3 className="text-xl font-semibold mb-2 dark:text-white">{post.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">{post.excerpt}</p>
                <div className="flex flex-wrap gap-2">
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
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}