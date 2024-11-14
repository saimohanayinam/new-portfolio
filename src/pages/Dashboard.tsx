import { useState, useEffect } from 'react';
import { useAuthStore } from '../lib/store';
import { getUserProfile } from '../lib/firebase';
import { toast } from 'sonner';
import ServiceManager from '../components/dashboard/ServiceManager';
import BlogManager from '../components/dashboard/BlogManager';
import ProjectManager from '../components/dashboard/ProjectManager';
import ProfileForm from '../components/ProfileForm';

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState<'profile' | 'posts' | 'projects' | 'services'>('profile');
  const [loading, setLoading] = useState(true);
  const [services, setServices] = useState([]);
  const [posts, setPosts] = useState([]);
  const [projects, setProjects] = useState([]);
  const [profile, setProfile] = useState(null);
  const user = useAuthStore(state => state.user);

  useEffect(() => {
    async function loadUserData() {
      if (!user) return;

      try {
        setLoading(true);
        const { data, error } = await getUserProfile(user.uid);
        if (error) throw new Error(error);
        if (data) {
          setServices(data.services || []);
          setPosts(data.blogPosts || []);
          setProjects(data.projects || []);
          setProfile(data);
        }
      } catch (error: any) {
        toast.error(error.message || 'Failed to load user data');
      } finally {
        setLoading(false);
      }
    }

    loadUserData();
  }, [user]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto mt-20">
      <h1 className="text-4xl font-bold mb-8 dark:text-white">Dashboard</h1>

      <div className="flex gap-4 mb-8 overflow-x-auto">
        <button
          onClick={() => setActiveTab('profile')}
          className={`px-4 py-2 rounded-lg whitespace-nowrap ${
            activeTab === 'profile'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300'
          }`}
        >
          Profile Info
        </button>
        <button
          onClick={() => setActiveTab('services')}
          className={`px-4 py-2 rounded-lg whitespace-nowrap ${
            activeTab === 'services'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300'
          }`}
        >
          Services
        </button>
        <button
          onClick={() => setActiveTab('posts')}
          className={`px-4 py-2 rounded-lg whitespace-nowrap ${
            activeTab === 'posts'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300'
          }`}
        >
          Blog Posts
        </button>
        <button
          onClick={() => setActiveTab('projects')}
          className={`px-4 py-2 rounded-lg whitespace-nowrap ${
            activeTab === 'projects'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300'
          }`}
        >
          Projects
        </button>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
        {activeTab === 'profile' && (
          <ProfileForm
            initialData={profile}
            onSubmit={async (data) => {
              try {
                await updateUserProfile(user!.uid, data);
                toast.success('Profile updated successfully!');
              } catch (error: any) {
                toast.error(error.message || 'Failed to update profile');
              }
            }}
          />
        )}

        {activeTab === 'services' && (
          <ServiceManager
            services={services}
            setServices={setServices}
            userId={user!.uid}
          />
        )}

        {activeTab === 'posts' && (
          <BlogManager
            posts={posts}
            setPosts={setPosts}
            userId={user!.uid}
          />
        )}

        {activeTab === 'projects' && (
          <ProjectManager
            projects={projects}
            setProjects={setProjects}
            userId={user!.uid}
          />
        )}
      </div>
    </div>
  );
}