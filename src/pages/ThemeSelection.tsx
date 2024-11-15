import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, Check, ArrowRight, Layout, Palette, Code } from 'lucide-react';
import { toast } from 'sonner';
import { useAuthStore } from '../lib/store';
import { db } from '../lib/firebase';
import { doc, setDoc } from 'firebase/firestore';

const themes = [
  {
    id: 'modern-portfolio',
    name: 'Modern Portfolio',
    description: 'A sleek and modern portfolio design with smooth animations',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=60',
    features: ['Blog System', 'Project Showcase', 'Contact Form', 'Dark Mode'],
    icon: Layout
  },
  {
    id: 'minimal-portfolio',
    name: 'Minimal Portfolio',
    description: 'Clean and minimalistic design focusing on content',
    image: 'https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?w=800&auto=format&fit=crop&q=60',
    features: ['Project Grid', 'About Section', 'Skills Display', 'Light/Dark Mode'],
    icon: Palette
  },
  {
    id: 'developer-portfolio',
    name: 'Developer Portfolio',
    description: 'Perfect for showcasing coding projects and technical skills',
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&auto=format&fit=crop&q=60',
    features: ['GitHub Integration', 'Code Snippets', 'Tech Stack', 'Project Stats'],
    icon: Code
  }
];

export default function ThemeSelection() {
  const [selectedTheme, setSelectedTheme] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const user = useAuthStore(state => state.user);

  const handlePreview = (themeId: string) => {
    const theme = themes.find(t => t.id === themeId);
    if (theme) {
      window.open(`/preview/${themeId}`, '_blank');
    }
  };

  const handleThemeSelect = async () => {
    if (!selectedTheme || !user) return;

    try {
      setIsLoading(true);
      // Save theme selection to user's profile
      await setDoc(doc(db, `users/${user.uid}/settings/theme`), {
        themeId: selectedTheme,
        updatedAt: new Date()
      }, { merge: true });

      toast.success('Theme selected successfully!');
      navigate('/dashboard');
    } catch (error) {
      toast.error('Failed to select theme');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 dark:text-white">
            Choose Your Portfolio Theme
          </h1>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Select a theme that best represents your style. You can customize it further from your dashboard.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {themes.map((theme) => {
            const Icon = theme.icon;
            return (
              <div
                key={theme.id}
                className={`bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden transition-all duration-200 ${
                  selectedTheme === theme.id
                    ? 'ring-2 ring-blue-500 transform scale-[1.02]'
                    : 'hover:shadow-md'
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
                      onClick={() => setSelectedTheme(theme.id)}
                      className={`btn-primary ${
                        selectedTheme === theme.id ? 'bg-green-600' : ''
                      }`}
                    >
                      {selectedTheme === theme.id ? (
                        <>
                          <Check className="w-4 h-4 mr-2" />
                          Selected
                        </>
                      ) : (
                        'Select Theme'
                      )}
                    </button>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                      <Icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <h3 className="text-xl font-semibold dark:text-white">
                      {theme.name}
                    </h3>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    {theme.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {theme.features.map((feature, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100 text-sm rounded-full"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {selectedTheme && (
          <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 shadow-lg p-4">
            <div className="max-w-6xl mx-auto flex items-center justify-between">
              <p className="text-gray-600 dark:text-gray-300">
                Theme selected: <span className="font-semibold">{themes.find(t => t.id === selectedTheme)?.name}</span>
              </p>
              <button
                onClick={handleThemeSelect}
                disabled={isLoading}
                className="btn-primary"
              >
                {isLoading ? 'Applying Theme...' : (
                  <>
                    Continue to Dashboard
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </>
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}