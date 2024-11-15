import { useState } from 'react';
import { Search, X, Loader } from 'lucide-react';
import { searchUnsplashImages, UnsplashImage } from '../lib/unsplash';
import { toast } from 'sonner';

interface UnsplashModalProps {
  onClose: () => void;
  onSelect: (imageUrl: string) => void;
}

export default function UnsplashModal({ onClose, onSelect }: UnsplashModalProps) {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState<UnsplashImage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    try {
      setIsLoading(true);
      setHasSearched(true);
      const results = await searchUnsplashImages(query);
      setImages(results);
      if (results.length === 0) {
        toast.info('No images found. Try a different search term.');
      }
    } catch (error) {
      toast.error('Failed to search images');
      setImages([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelect = (image: UnsplashImage) => {
    onSelect(image.urls.regular);
    toast.success('Image selected successfully!');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg w-full max-w-3xl max-h-[80vh] overflow-hidden">
        <div className="p-4 border-b dark:border-gray-700 flex justify-between items-center">
          <h3 className="text-lg font-semibold dark:text-white">Search Unsplash Images</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4">
          <form onSubmit={handleSearch} className="flex gap-2 mb-4">
            <div className="relative flex-1">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search for images..."
                className="w-full pl-10 pr-4 py-2 border dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            </div>
            <button
              type="submit"
              disabled={isLoading || !query.trim()}
              className="btn-primary min-w-[100px]"
            >
              {isLoading ? (
                <Loader className="w-5 h-5 animate-spin mx-auto" />
              ) : (
                'Search'
              )}
            </button>
          </form>

          <div className="overflow-y-auto max-h-[60vh]">
            {isLoading ? (
              <div className="flex justify-center items-center h-64">
                <Loader className="w-8 h-8 animate-spin text-blue-600" />
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {images.map((image) => (
                  <div
                    key={image.id}
                    className="relative group cursor-pointer rounded-lg overflow-hidden"
                    onClick={() => handleSelect(image)}
                  >
                    <img
                      src={image.urls.small}
                      alt={image.alt_description || 'Unsplash image'}
                      className="w-full h-48 object-cover transition-transform duration-200 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                      <span className="text-white text-sm font-medium px-3 py-1 bg-black/50 rounded-full">
                        Select Image
                      </span>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-2 bg-black/50">
                      <p className="text-white text-xs truncate">
                        Photo by {image.user.name}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {!isLoading && hasSearched && images.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500 dark:text-gray-400">
                  No images found. Try a different search term.
                </p>
              </div>
            )}

            {!hasSearched && !isLoading && (
              <div className="text-center py-12">
                <p className="text-gray-500 dark:text-gray-400">
                  Search for images to get started
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}