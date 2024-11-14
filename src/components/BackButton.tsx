import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

interface BackButtonProps {
  label?: string;
  to: string;
}

export default function BackButton({ label = 'Back', to }: BackButtonProps) {
  return (
    <Link 
      to={to}
      className="group inline-flex items-center text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
    >
      <ArrowLeft className="w-4 h-4 mr-2 transition-transform duration-200 group-hover:-translate-x-1" />
      {label}
    </Link>
  );
}