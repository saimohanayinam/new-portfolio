import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Plus, Image as ImageIcon, Save } from 'lucide-react';
import { toast } from 'sonner';

interface BlogPostForm {
  title: string;
  content: string;
  image: FileList;
}

interface ProjectForm {
  title: string;
  description: string;
  image: FileList;
  tags: string;
}

interface ProfileForm {
  name: string;
  title: string;
  bio: string;
  email: string;
  phone: string;
  location: string;
  avatar: FileList;
  github: string;
  linkedin: string;
  twitter: string;
}

interface ServicesForm {
  services: {
    title: string;
    description: string;
  }[];
}

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState<'profile' | 'posts' | 'projects' | 'services'>('profile');
  const { register: registerBlog, handleSubmit: handleBlogSubmit, reset: resetBlog } = useForm<BlogPostForm>();
  const { register: registerProject, handleSubmit: handleProjectSubmit, reset: resetProject } = useForm<ProjectForm>();
  const { register: registerProfile, handleSubmit: handleProfileSubmit } = useForm<ProfileForm>();
  const { register: registerServices, handleSubmit: handleServicesSubmit } = useForm<ServicesForm>();

  const onBlogSubmit = async (data: BlogPostForm) => {
    try {
      console.log('Blog post data:', data);
      toast.success('Blog post created successfully!');
      resetBlog();
    } catch (error) {
      toast.error('Failed to create blog post');
    }
  };

  const onProjectSubmit = async (data: ProjectForm) => {
    try {
      console.log('Project data:', data);
      toast.success('Project created successfully!');
      resetProject();
    } catch (error) {
      toast.error('Failed to create project');
    }
  };

  const onProfileSubmit = async (data: ProfileForm) => {
    try {
      console.log('Profile data:', data);
      toast.success('Profile updated successfully!');
    } catch (error) {
      toast.error('Failed to update profile');
    }
  };

  const onServicesSubmit = async (data: ServicesForm) => {
    try {
      console.log('Services data:', data);
      toast.success('Services updated successfully!');
    } catch (error) {
      toast.error('Failed to update services');
    }
  };

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
          <form onSubmit={handleProfileSubmit(onProfileSubmit)} className="space-y-6">
            <h2 className="text-2xl font-bold mb-6 dark:text-white">Profile Information</h2>
            
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  {...registerProfile('name')}
                  className="input dark:bg-gray-700 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Professional Title
                </label>
                <input
                  type="text"
                  {...registerProfile('title')}
                  className="input dark:bg-gray-700 dark:text-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Bio
              </label>
              <textarea
                {...registerProfile('bio')}
                rows={4}
                className="input dark:bg-gray-700 dark:text-white"
              />
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  {...registerProfile('email')}
                  className="input dark:bg-gray-700 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Phone
                </label>
                <input
                  type="tel"
                  {...registerProfile('phone')}
                  className="input dark:bg-gray-700 dark:text-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Location
              </label>
              <input
                type="text"
                {...registerProfile('location')}
                className="input dark:bg-gray-700 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Profile Picture
              </label>
              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-600">
                  <ImageIcon className="w-5 h-5" />
                  Choose Image
                  <input
                    type="file"
                    {...registerProfile('avatar')}
                    className="hidden"
                    accept="image/*"
                  />
                </label>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  GitHub URL
                </label>
                <input
                  type="url"
                  {...registerProfile('github')}
                  className="input dark:bg-gray-700 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  LinkedIn URL
                </label>
                <input
                  type="url"
                  {...registerProfile('linkedin')}
                  className="input dark:bg-gray-700 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Twitter URL
                </label>
                <input
                  type="url"
                  {...registerProfile('twitter')}
                  className="input dark:bg-gray-700 dark:text-white"
                />
              </div>
            </div>

            <button
              type="submit"
              className="btn-primary w-full"
            >
              <Save className="w-5 h-5 mr-2" />
              Save Profile
            </button>
          </form>
        )}

        {activeTab === 'services' && (
          <form onSubmit={handleServicesSubmit(onServicesSubmit)} className="space-y-6">
            <h2 className="text-2xl font-bold mb-6 dark:text-white">Services</h2>
            
            {[1, 2, 3, 4, 5, 6].map((index) => (
              <div key={index} className="grid grid-cols-1 gap-4 p-4 border dark:border-gray-700 rounded-lg">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Service {index} Title
                  </label>
                  <input
                    type="text"
                    {...registerServices(`services.${index - 1}.title` as any)}
                    className="input dark:bg-gray-700 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Service {index} Description
                  </label>
                  <textarea
                    {...registerServices(`services.${index - 1}.description` as any)}
                    rows={2}
                    className="input dark:bg-gray-700 dark:text-white"
                  />
                </div>
              </div>
            ))}

            <button
              type="submit"
              className="btn-primary w-full"
            >
              <Save className="w-5 h-5 mr-2" />
              Save Services
            </button>
          </form>
        )}

        {activeTab === 'posts' && (
          <form onSubmit={handleBlogSubmit(onBlogSubmit)} className="space-y-6">
            <h2 className="text-2xl font-bold mb-6 dark:text-white">Create New Blog Post</h2>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Title
              </label>
              <input
                type="text"
                {...registerBlog('title', { required: true })}
                className="input dark:bg-gray-700 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Content
              </label>
              <textarea
                {...registerBlog('content', { required: true })}
                rows={6}
                className="input dark:bg-gray-700 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Cover Image
              </label>
              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-600">
                  <ImageIcon className="w-5 h-5" />
                  Choose Image
                  <input
                    type="file"
                    {...registerBlog('image', { required: true })}
                    className="hidden"
                    accept="image/*"
                  />
                </label>
              </div>
            </div>

            <button
              type="submit"
              className="btn-primary w-full"
            >
              <Plus className="w-5 h-5 mr-2" />
              Create Post
            </button>
          </form>
        )}

        {activeTab === 'projects' && (
          <form onSubmit={handleProjectSubmit(onProjectSubmit)} className="space-y-6">
            <h2 className="text-2xl font-bold mb-6 dark:text-white">Create New Project</h2>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Title
              </label>
              <input
                type="text"
                {...registerProject('title', { required: true })}
                className="input dark:bg-gray-700 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Description
              </label>
              <textarea
                {...registerProject('description', { required: true })}
                rows={4}
                className="input dark:bg-gray-700 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Tags (comma-separated)
              </label>
              <input
                type="text"
                {...registerProject('tags', { required: true })}
                className="input dark:bg-gray-700 dark:text-white"
                placeholder="React, TypeScript, Tailwind"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Project Image
              </label>
              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-600">
                  <ImageIcon className="w-5 h-5" />
                  Choose Image
                  <input
                    type="file"
                    {...registerProject('image', { required: true })}
                    className="hidden"
                    accept="image/*"
                  />
                </label>
              </div>
            </div>

            <button
              type="submit"
              className="btn-primary w-full"
            >
              <Plus className="w-5 h-5 mr-2" />
              Create Project
            </button>
          </form>
        )}
      </div>
    </div>
  );
}