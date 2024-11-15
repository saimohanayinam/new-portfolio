import { useState } from 'react';
import { Eye, Check, Loader } from 'lucide-react';
import { toast } from 'sonner';
import { db } from '../../lib/firebase';
import { doc, setDoc } from 'firebase/firestore';

interface Theme {
  id: string;
  name: string;
  description: string;
  image: string;
  features: string[];
}

const themes: Theme[] = [
  {
    id: 'modern-portfolio',
    name: 'Modern Portfolio',
    description: 'A sleek and modern portfolio design with smooth animations',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=60',
    features: ['Blog System', 'Project Showcase', 'Contact Form', 'Dark Mode']
  },
  {
    id: 'minimal-portfolio',
    name: 'Minimal Portfolio',
    description: 'Clean and minimalistic design focusing on content',
    image: 'https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?w=800&auto=format&fit=crop&q=60',
    features: ['Project Grid', 'About Section', 'Skills Display', 'Light/Dark Mode']
  },
  {
    id: 'developer-portfolio',
    name: 'Developer Portfolio',
    description: 'Perfect for showcasing coding projects and technical skills',
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&auto=format&fit=crop&q=60',
    features: ['GitHub Integration', 'Code Snippets', 'Tech Stack', 'Project Stats']
  }
];

interface ThemeManagerProps {
  userId: string;
  currentTheme: string | null;
  onThemeChange: () => void;
}

export default function ThemeManager({ userId, currentTheme, onThemeChange }: ThemeManagerProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handlePreview = (themeId: string) => {
    window.open(`/preview/${themeId}`, '_blank');
  };

  const handleThemeSelect = async (themeId: string) => {
    try {
      setIsLoading(true);
      await setDoc(doc(db, `users/${userId}/settings/theme`), {
        themeId,
        updatedAt: new Date()
      }, { merge: true });

      toast.success('Theme updated successfully!');
      onThemeChange();
    } catch (error) {
      toast.error('Failed to update theme');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-4 dark:text-white">Theme Settings</h2>
        <p className="text-gray-600 dark:text-gray-300">
          Choose a theme for your portfolio. You can preview each theme before selecting.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {themes.map((theme) => (
          <div
            key={theme.id}
            className={`bg-gray-50 dark:bg-gray-700 rounded-xl overflow-hidden transition-all duration-200 ${
              currentTheme === theme.id ? 'ring-2 ring-blue-500' : ''
            }`}
          >
            <div className="aspect-video relative group">
              <img
                src={theme.image}
                alt={theme.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                <button
                  onClick={() => handlePreview(theme.id)}
                  className="btn-secondary"
                >
                  <Eye className="w-4 h-4 mr-2" />
                  Preview
                </button>
                <button
                  onClick={() => handleThemeSelect(theme.id)}
                  className={`btn-primary ${
                    currentTheme === theme.id ? 'bg-green-600' : ''
                  }`}
                  disabled={currentTheme === theme.id}
                >
                  {currentTheme === theme.id ? (
                    <>
                      <Check className="w-4 h-4 mr-2" />
                      Active Theme
                    </>
                  ) : (
                    'Select Theme'
                  )}
                </button>
              </div>
            </div>

            <div className="p-4">
              <h3 className="text-lg font-semibold mb-2 dark:text-white">{theme.name}</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">{theme.description}</p>
              <div className="flex flex-wrap gap-2">
                {theme.features.map((feature, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100 text-xs rounded-full"
                  >
                    {feature}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}