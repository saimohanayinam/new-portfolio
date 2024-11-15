import { useState, useRef } from 'react';
import { Upload, Camera, X } from 'lucide-react';
import { uploadProfileImage } from '../../lib/firebase';
import { useAuthStore } from '../../lib/store';
import { toast } from 'sonner';

interface ProfileImageUploadProps {
  value: string;
  onChange: (url: string) => void;
}

export default function ProfileImageUpload({ value, onChange }: ProfileImageUploadProps) {
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const user = useAuthStore(state => state.user);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast.error('Please upload an image file');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error('Image size should be less than 5MB');
      return;
    }

    if (!user) {
      toast.error('You must be logged in to upload images');
      return;
    }

    try {
      setIsLoading(true);
      const url = await uploadProfileImage(file, user.uid);
      onChange(url);
      toast.success('Profile image uploaded successfully!');
    } catch (error: any) {
      toast.error(error.message || 'Failed to upload image');
      console.error('Upload error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative">
      <div className="relative w-32 h-32 mx-auto">
        {value ? (
          <div className="relative group">
            <img 
              src={value} 
              alt="Profile" 
              className="w-32 h-32 rounded-full object-cover border-4 border-white dark:border-gray-800 shadow-lg"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
              <button
                onClick={() => fileInputRef.current?.click()}
                className="p-2 bg-white rounded-full text-gray-800 hover:bg-gray-100 transition-colors"
                disabled={isLoading}
              >
                <Camera className="w-5 h-5" />
              </button>
              <button
                onClick={() => onChange('')}
                className="p-2 bg-red-500 rounded-full text-white hover:bg-red-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
        ) : (
          <div 
            onClick={() => fileInputRef.current?.click()}
            className="w-32 h-32 rounded-full bg-gray-100 dark:bg-gray-800 border-4 border-white dark:border-gray-700 shadow-lg flex flex-col items-center justify-center cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          >
            <Upload className="w-8 h-8 text-gray-400 mb-2" />
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {isLoading ? 'Uploading...' : 'Upload Image'}
            </span>
          </div>
        )}
      </div>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileUpload}
        accept="image/*"
        className="hidden"
      />
    </div>
  );
}