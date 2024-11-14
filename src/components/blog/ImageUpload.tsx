import { useState, useRef } from 'react';
import { Image as ImageIcon, Upload, Link as LinkIcon, X } from 'lucide-react';
import { storage } from '../../lib/firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { toast } from 'sonner';

interface ImageUploadProps {
  value: string;
  onChange: (url: string) => void;
}

export default function ImageUpload({ value, onChange }: ImageUploadProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [showUrlInput, setShowUrlInput] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      setIsLoading(true);
      const storageRef = ref(storage, `blog-images/${Date.now()}-${file.name}`);
      await uploadBytes(storageRef, file);
      const url = await getDownloadURL(storageRef);
      onChange(url);
      toast.success('Image uploaded successfully!');
    } catch (error) {
      toast.error('Failed to upload image');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      {value ? (
        <div className="relative">
          <img 
            src={value} 
            alt="Post cover" 
            className="w-full h-48 object-cover rounded-lg"
          />
          <button
            onClick={() => onChange('')}
            className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <div className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-4">
          <div className="flex flex-col items-center gap-2">
            <ImageIcon className="w-8 h-8 text-gray-400" />
            <div className="flex gap-2">
              <button
                onClick={() => fileInputRef.current?.click()}
                className="btn-secondary"
                disabled={isLoading}
              >
                <Upload className="w-4 h-4 mr-2" />
                {isLoading ? 'Uploading...' : 'Upload Image'}
              </button>
              <button
                onClick={() => setShowUrlInput(!showUrlInput)}
                className="btn-secondary"
              >
                <LinkIcon className="w-4 h-4 mr-2" />
                Image URL
              </button>
            </div>
          </div>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileUpload}
            accept="image/*"
            className="hidden"
          />
        </div>
      )}

      {showUrlInput && !value && (
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Enter image URL"
            className="input flex-1"
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                onChange(e.currentTarget.value);
                setShowUrlInput(false);
              }
            }}
          />
          <button
            onClick={() => setShowUrlInput(false)}
            className="btn-secondary"
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  );
}