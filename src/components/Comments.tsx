import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { formatDistanceToNow } from 'date-fns';
import { MessageSquare, Send } from 'lucide-react';
import { toast } from 'sonner';

interface Comment {
  id: string;
  content: string;
  author: {
    name: string;
    avatar: string;
  };
  createdAt: string;
}

interface CommentsProps {
  comments: Comment[];
  onAddComment: (content: string) => Promise<void>;
}

export default function Comments({ comments, onAddComment }: CommentsProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { register, handleSubmit, reset, formState: { errors } } = useForm<{ content: string }>();

  const onSubmit = async ({ content }: { content: string }) => {
    setIsSubmitting(true);
    try {
      await onAddComment(content);
      reset();
      toast.success('Comment added successfully!');
    } catch (error) {
      toast.error('Failed to add comment');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-2 text-xl font-semibold dark:text-white">
        <MessageSquare className="w-6 h-6" />
        <h3>Comments ({comments.length})</h3>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <textarea
          {...register('content', { required: 'Comment is required' })}
          placeholder="Add a comment..."
          className="w-full p-4 border dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
          rows={3}
        />
        {errors.content && (
          <p className="text-red-500 text-sm">{errors.content.message}</p>
        )}
        <button
          type="submit"
          disabled={isSubmitting}
          className="btn-primary"
        >
          <Send className="w-5 h-5 mr-2" />
          {isSubmitting ? 'Posting...' : 'Post Comment'}
        </button>
      </form>

      <div className="space-y-6">
        {comments.map((comment) => (
          <div key={comment.id} className="flex gap-4">
            <img
              src={comment.author.avatar}
              alt={comment.author.name}
              className="w-10 h-10 rounded-full"
            />
            <div className="flex-1">
              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                <div className="flex justify-between items-start mb-2">
                  <span className="font-medium dark:text-white">{comment.author.name}</span>
                  <span className="text-sm text-gray-500">
                    {formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}
                  </span>
                </div>
                <p className="text-gray-600 dark:text-gray-300">{comment.content}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}