import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { Mail, ArrowRight, Sparkles } from 'lucide-react';

interface NewsletterFormData {
  email: string;
}

export default function NewsletterForm() {
  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit, reset, formState: { errors } } = useForm<NewsletterFormData>();

  const onSubmit = async (data: NewsletterFormData) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Newsletter subscription:', data);
      toast.success('Successfully subscribed to the newsletter!');
      reset();
    } catch (error) {
      toast.error('Failed to subscribe. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 -z-10" />
      
      <div className="relative backdrop-blur-sm bg-white/80 dark:bg-gray-900/80 rounded-2xl p-8 shadow-xl">
        <div className="max-w-2xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 mb-6">
            <Mail className="w-8 h-8 text-white" />
          </div>

          <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Stay Updated
          </h2>
          
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            Subscribe to my newsletter for the latest updates on web development, design trends, and tech insights.
          </p>

          <div className="relative max-w-md mx-auto">
            {/* Decorative Elements */}
            <div className="absolute -top-6 -left-6">
              <Sparkles className="w-5 h-5 text-blue-500 animate-pulse" />
            </div>
            <div className="absolute -bottom-4 -right-4">
              <Sparkles className="w-4 h-4 text-indigo-500 animate-pulse" />
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="relative">
              <input
                type="email"
                placeholder="Enter your email"
                className={`w-full pl-12 pr-36 py-4 rounded-full border ${
                  errors.email ? 'border-red-500' : 'border-gray-200 dark:border-gray-700'
                } bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 dark:text-white transition-colors`}
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Invalid email address'
                  }
                })}
              />
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              
              <button
                type="submit"
                disabled={isLoading}
                className="absolute right-2 top-1/2 -translate-y-1/2 px-6 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full hover:from-blue-700 hover:to-indigo-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
              >
                {isLoading ? (
                  'Subscribing...'
                ) : (
                  <>
                    Subscribe
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </form>

            {errors.email && (
              <p className="mt-2 text-sm text-red-500 text-center">{errors.email.message}</p>
            )}
          </div>

          <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
            No spam, unsubscribe at any time.
          </p>
        </div>
      </div>
    </div>
  );
}