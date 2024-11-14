import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Plus, Image as ImageIcon, Save } from 'lucide-react';
import { toast } from 'sonner';
import RichTextEditor from '../components/RichTextEditor';
import { profile, services, blogPosts, projects } from '../data/dummy';

interface BlogPostForm {
  title: string;
  content: string;
  image: FileList;
}

interface ProjectForm {
  title: string;
  description: string;
  content: string;
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
  const [blogContent, setBlogContent] = useState('');
  const [projectContent, setProjectContent] = useState('');
  
  const { register: registerBlog, handleSubmit: handleBlogSubmit, reset: resetBlog } = useForm<BlogPostForm>({
    defaultValues: {
      title: '',
      content: ''
    }
  });
  
  const { register: registerProject, handleSubmit: handleProjectSubmit, reset: resetProject } = useForm<ProjectForm>({
    defaultValues: {
      title: '',
      description: '',
      content: '',
      tags: ''
    }
  });
  
  const { register: registerProfile, handleSubmit: handleProfileSubmit } = useForm<ProfileForm>({
    defaultValues: {
      name: profile.name,
      title: profile.title,
      bio: profile.bio,
      email: profile.email,
      phone: profile.phone,
      location: profile.location,
      github: profile.social.github,
      linkedin: profile.social.linkedin,
      twitter: profile.social.twitter
    }
  });
  
  const { register: registerServices, handleSubmit: handleServicesSubmit } = useForm<ServicesForm>({
    defaultValues: {
      services: services
    }
  });

  const onBlogSubmit = async (data: BlogPostForm) => {
    try {
      const newPost = {
        ...data,
        content: blogContent,
        date: new Date().toISOString(),
        author: {
          name: profile.name,
          avatar: profile.avatar
        }
      };
      console.log('New blog post:', newPost);
      toast.success('Blog post created successfully!');
      resetBlog();
      setBlogContent('');
    } catch (error) {
      toast.error('Failed to create blog post');
    }
  };

  const onProjectSubmit = async (data: ProjectForm) => {
    try {
      const newProject = {
        ...data,
        content: projectContent,
        tags: data.tags.split(',').map(tag => tag.trim())
      };
      console.log('New project:', newProject);
      toast.success('Project created successfully!');
      resetProject();
      setProjectContent('');
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

            <button type="submit" className="btn-primary w-full">
              <Save className="w-5 h-5 mr-2" />
              Save Profile
            </button>
          </form>
        )}

        {activeTab === 'services' && (
          <form onSubmit={handleServicesSubmit(onServicesSubmit)} className="space-y-6">
            <h2 className="text-2xl font-bold mb-6 dark:text-white">Services</h2>
            
            {services.map((service, index) => (
              <div key={index} className="grid grid-cols-1 gap-4 p-4 border dark:border-gray-700 rounded-lg">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Service {index + 1} Title
                  </label>
                  <input
                    type="text"
                    {...registerServices(`services.${index}.title` as any)}
                    defaultValue={service.title}
                    className="input dark:bg-gray-700 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Service {index + 1} Description
                  </label>
                  <textarea
                    {...registerServices(`services.${index}.description` as any)}
                    defaultValue={service.description}
                    rows={2}
                    className="input dark:bg-gray-700 dark:text-white"
                  />
                </div>
              </div>
            ))}

            <button type="submit" className="btn-primary w-full">
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
              <RichTextEditor content={blogContent} onChange={setBlogContent} />
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

            <button type="submit" className="btn-primary w-full">
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
                Short Description
              </label>
              <input
                type="text"
                {...registerProject('description', { required: true })}
                className="input dark:bg-gray-700 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Detailed Description
              </label>
              <RichTextEditor content={projectContent} onChange={setProjectContent} />
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

            <button type="submit" className="btn-primary w-full">
              <Plus className="w-5 h-5 mr-2" />
              Create Project
            </button>
          </form>
        )}
      </div>
    </div>
  );
}