import { useState, useEffect } from 'react';
import { useAuthStore } from '../lib/store';
import { toast } from 'sonner';
import ServiceManager from '../components/dashboard/ServiceManager';
import BlogManager from '../components/dashboard/BlogManager';
import ProjectManager from '../components/dashboard/ProjectManager';
import ProfileForm from '../components/ProfileForm';
import { getProfile, createProfile, updateProfile } from '../lib/services/profile';
import { Loader } from 'lucide-react';

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState<'profile' | 'posts' | 'projects' | 'services'>('profile');
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState(null);
  const user = useAuthStore(state => state.user);

  useEffect(() => {
    loadProfile();
  }, [user]);

  const loadProfile = async () => {
    if (!user) return;

    try {
      setLoading(true);
      const { data, error } = await getProfile(user.uid);
      if (error) throw new Error(error);
      setProfile(data);
    } catch (error: any) {
      toast.error(error.message || 'Failed to load profile');
    } finally {
      setLoading(false);
    }
  };

  const handleProfileSubmit = async (data: any) => {
    if (!user) return;

    try {
      if (profile) {
        await updateProfile(user.uid, data);
      } else {
        await createProfile(user.uid, data);
      }
      await loadProfile();
    } catch (error: any) {
      throw new Error(error.message || 'Failed to update profile');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader className="w-12 h-12 animate-spin text-blue-500" />
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
            onSubmit={handleProfileSubmit}
          />
        )}

        {activeTab === 'services' && (
          <ServiceManager userId={user!.uid} />
        )}

        {activeTab === 'posts' && (
          <BlogManager
            posts={[]}
            setPosts={() => {}}
            userId={user!.uid}
          />
        )}

        {activeTab === 'projects' && (
          <ProjectManager userId={user!.uid} />
        )}
      </div>
    </div>
  );
}