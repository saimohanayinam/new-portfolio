import { LucideIcon } from 'lucide-react';

interface SectionHeadingProps {
  icon?: LucideIcon;
  title: string;
  subtitle?: string;
  className?: string;
}

export default function SectionHeading({ icon: Icon, title, subtitle, className = '' }: SectionHeadingProps) {
  return (
    <div className={`mb-8 ${className}`}>
      <div className="flex items-center gap-3 mb-2">
        {Icon && <Icon className="w-8 h-8 text-blue-600" />}
        <h2 className="text-3xl font-bold">{title}</h2>
      </div>
      {subtitle && (
        <p className="text-gray-600 text-lg">{subtitle}</p>
      )}
    </div>
  );
}