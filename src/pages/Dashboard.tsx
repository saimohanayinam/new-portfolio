import { useState, useEffect } from 'react';
import { useAuthStore } from '../lib/store';
import { toast } from 'sonner';
import ServiceManager from '../components/dashboard/ServiceManager';
import BlogManager from '../components/dashboard/BlogManager';
import ProjectManager from '../components/dashboard/ProjectManager';
import ThemeManager from '../components/dashboard/ThemeManager';
import ProfileForm from '../components/ProfileForm';
import { getProfile, createProfile, updateProfile, getUserTheme } from '../lib/services/profile';
import { Loader, Layout, User, FileText, Palette, Settings } from 'lucide-react';

type TabType = 'profile' | 'posts' | 'projects' | 'services' | 'theme';

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState<TabType>('profile');
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState(null);
  const [currentTheme, setCurrentTheme] = useState<string | null>(null);
  const user = useAuthStore(state => state.user);

  useEffect(() => {
    loadData();
  }, [user]);

  const loadData = async () => {
    if (!user) return;

    try {
      setLoading(true);
      // Load profile data
      const { data, error } = await getProfile(user.uid);
      if (error) throw new Error(error);
      setProfile(data);

      // Load theme data
      const theme = await getUserTheme(user.uid);
      setCurrentTheme(theme);
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
      await loadData();
      toast.success('Profile updated successfully!');
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

  const tabs = [
    { id: 'profile', label: 'Profile Info', icon: User },
    { id: 'theme', label: 'Theme', icon: Palette },
    { id: 'services', label: 'Services', icon: Settings },
    { id: 'posts', label: 'Blog Posts', icon: FileText },
    { id: 'projects', label: 'Projects', icon: Layout },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8 dark:text-white">Dashboard</h1>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar Navigation */}
        <div className="w-full md:w-64 space-y-2">
          {tabs.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id as TabType)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                activeTab === id
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}
            >
              <Icon className="w-5 h-5" />
              {label}
            </button>
          ))}
        </div>

        {/* Main Content */}
        <div className="flex-1">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
            {activeTab === 'profile' && (
              <ProfileForm
                initialData={profile}
                onSubmit={handleProfileSubmit}
              />
            )}

            {activeTab === 'theme' && (
              <ThemeManager 
                userId={user!.uid}
                currentTheme={currentTheme}
                onThemeChange={loadData}
              />
            )}

            {activeTab === 'services' && (
              <ServiceManager userId={user!.uid} />
            )}

            {activeTab === 'posts' && (
              <BlogManager userId={user!.uid} />
            )}

            {activeTab === 'projects' && (
              <ProjectManager userId={user!.uid} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}