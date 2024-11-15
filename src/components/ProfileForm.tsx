import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Save } from 'lucide-react';
import { UserProfile } from '../types';
import { toast } from 'sonner';

interface ProfileFormProps {
  initialData?: Partial<UserProfile>;
  onSubmit: (data: Partial<UserProfile>) => Promise<void>;
  isLoading?: boolean;
}

export default function ProfileForm({ initialData, onSubmit, isLoading = false }: ProfileFormProps) {
  const [isSaving, setIsSaving] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm<UserProfile>({
    defaultValues: initialData
  });

  const handleFormSubmit = async (data: UserProfile) => {
    setIsSaving(true);
    try {
      await onSubmit(data);
      toast.success('Profile updated successfully!');
    } catch (error: any) {
      toast.error(error.message || 'Failed to update profile');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Full Name
          </label>
          <input
            type="text"
            {...register('name', { required: 'Name is required' })}
            className="input dark:bg-gray-700 dark:text-white"
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Professional Title
          </label>
          <input
            type="text"
            {...register('title')}
            className="input dark:bg-gray-700 dark:text-white"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Email
          </label>
          <input
            type="email"
            {...register('email', { required: 'Email is required' })}
            className="input dark:bg-gray-700 dark:text-white"
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Phone
          </label>
          <input
            type="tel"
            {...register('phone')}
            className="input dark:bg-gray-700 dark:text-white"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Company
          </label>
          <input
            type="text"
            {...register('company')}
            className="input dark:bg-gray-700 dark:text-white"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Location
          </label>
          <input
            type="text"
            {...register('location')}
            className="input dark:bg-gray-700 dark:text-white"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Website
          </label>
          <input
            type="url"
            {...register('website')}
            className="input dark:bg-gray-700 dark:text-white"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Availability
          </label>
          <select
            {...register('availability')}
            className="input dark:bg-gray-700 dark:text-white"
          >
            <option value="full-time">Full Time</option>
            <option value="part-time">Part Time</option>
            <option value="freelance">Freelance</option>
            <option value="not-available">Not Available</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Bio
        </label>
        <textarea
          {...register('bio')}
          rows={4}
          className="input dark:bg-gray-700 dark:text-white"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Skills (comma-separated)
        </label>
        <input
          type="text"
          {...register('skills')}
          className="input dark:bg-gray-700 dark:text-white"
          placeholder="React, TypeScript, Node.js"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Languages (comma-separated)
        </label>
        <input
          type="text"
          {...register('languages')}
          className="input dark:bg-gray-700 dark:text-white"
          placeholder="English, Spanish"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Interests (comma-separated)
        </label>
        <input
          type="text"
          {...register('interests')}
          className="input dark:bg-gray-700 dark:text-white"
          placeholder="Web Development, AI, Machine Learning"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            GitHub URL
          </label>
          <input
            type="url"
            {...register('social.github')}
            className="input dark:bg-gray-700 dark:text-white"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            LinkedIn URL
          </label>
          <input
            type="url"
            {...register('social.linkedin')}
            className="input dark:bg-gray-700 dark:text-white"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Twitter URL
          </label>
          <input
            type="url"
            {...register('social.twitter')}
            className="input dark:bg-gray-700 dark:text-white"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Instagram URL
          </label>
          <input
            type="url"
            {...register('social.instagram')}
            className="input dark:bg-gray-700 dark:text-white"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            YouTube URL
          </label>
          <input
            type="url"
            {...register('social.youtube')}
            className="input dark:bg-gray-700 dark:text-white"
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={isLoading || isSaving}
        className="btn-primary w-full"
      >
        <Save className="w-5 h-5 mr-2" />
        {isSaving ? 'Saving...' : 'Save Profile'}
      </button>
    </form>
  );
}