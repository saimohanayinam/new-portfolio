import { useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import ModernPortfolio from '../themes/ModernPortfolio';
import MinimalPortfolio from '../themes/MinimalPortfolio';
import DeveloperPortfolio from '../themes/DeveloperPortfolio';

export default function ThemePreview() {
  const { themeId } = useParams();

  const renderTheme = () => {
    switch (themeId) {
      case 'modern-portfolio':
        return <ModernPortfolio />;
      case 'minimal-portfolio':
        return <MinimalPortfolio />;
      case 'developer-portfolio':
        return <DeveloperPortfolio />;
      default:
        return (
          <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
            <div className="text-center">
              <h1 className="text-2xl font-bold mb-4 dark:text-white">Theme Not Found</h1>
              <p className="text-gray-600 dark:text-gray-300">The requested theme does not exist.</p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="relative">
      {/* Preview Bar */}
      <div className="fixed top-0 left-0 right-0 bg-gray-900 text-white z-50 px-4 py-2">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                window.close();
              }}
              className="flex items-center gap-2 hover:text-gray-300 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Close Preview
            </a>
            <span className="text-gray-400">|</span>
            <span className="font-medium">
              Previewing: {themeId?.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
            </span>
          </div>
          <div className="text-sm text-gray-400">
            Preview Mode - Changes won't be saved
          </div>
        </div>
      </div>

      {/* Theme Content */}
      <div className="mt-12">
        {renderTheme()}
      </div>
    </div>
  );
}