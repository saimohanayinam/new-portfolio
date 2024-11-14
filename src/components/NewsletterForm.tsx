import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { Mail } from 'lucide-react';

interface NewsletterFormData {
  email: string;
}

export default function NewsletterForm() {
  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit, reset, formState: { errors } } = useForm<NewsletterFormData>();

  const onSubmit = async (data: NewsletterFormData) => {
    setIsLoading(true);
    try {
      // TODO: Implement newsletter subscription with Firebase
      toast.success('Successfully subscribed to the newsletter!');
      reset();
    } catch (error) {
      toast.error('Failed to subscribe. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-blue-50 p-8 rounded-lg text-center">
      <Mail className="w-12 h-12 mx-auto mb-4 text-blue-600" />
      <h2 className="text-2xl font-bold mb-2">Subscribe to My Newsletter</h2>
      <p className="text-gray-600 mb-6">
        Get notified when I publish new blog posts and project updates.
      </p>
      
      <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto">
        <div className="flex gap-2">
          <input
            type="email"
            placeholder="Enter your email"
            className={`flex-1 px-4 py-2 rounded-lg border ${
              errors.email ? 'border-red-500' : 'border-gray-300'
            } focus:outline-none focus:ring-2 focus:ring-blue-500`}
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Invalid email address'
              }
            })}
          />
          <button
            type="submit"
            disabled={isLoading}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
          >
            Subscribe
          </button>
        </div>
        {errors.email && (
          <p className="mt-2 text-red-500 text-sm">{errors.email.message}</p>
        )}
      </form>
    </div>
  );
}