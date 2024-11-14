import { useParams } from 'react-router-dom';
import { ExternalLink, Github } from 'lucide-react';
import BackButton from '../components/BackButton';
import SectionHeading from '../components/SectionHeading';

const projects = {
  '1': {
    title: "E-commerce Platform",
    description: "A full-featured online store with real-time inventory management",
    longDescription: "A comprehensive e-commerce solution built with modern technologies. This platform provides real-time inventory tracking, secure payment processing, and an intuitive admin dashboard.",
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97",
    tags: ["React", "Node.js", "MongoDB"],
    features: [
      "Real-time inventory management",
      "Secure payment processing",
      "Admin dashboard",
      "Order tracking",
      "Customer reviews",
      "Product recommendations"
    ],
    technologies: [
      "React",
      "Node.js",
      "MongoDB",
      "Express",
      "Stripe",
      "Redis"
    ],
    links: {
      github: "https://github.com",
      live: "https://demo.com"
    },
    screenshots: [
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f",
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71",
      "https://images.unsplash.com/photo-1627398242454-45a1465c2479"
    ]
  },
  '2': {
    title: "Social Media Dashboard",
    description: "Analytics dashboard for social media management",
    longDescription: "A powerful analytics dashboard that helps businesses track and analyze their social media performance across multiple platforms.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f",
    tags: ["Vue.js", "Firebase", "Tailwind"],
    features: [
      "Multi-platform analytics",
      "Real-time data updates",
      "Custom report generation",
      "Automated scheduling",
      "Engagement tracking",
      "Performance insights"
    ],
    technologies: [
      "Vue.js",
      "Firebase",
      "Tailwind CSS",
      "Chart.js",
      "Node.js",
      "WebSocket"
    ],
    links: {
      github: "https://github.com",
      live: "https://demo.com"
    },
    screenshots: [
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f",
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97",
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71",
      "https://images.unsplash.com/photo-1627398242454-45a1465c2479"
    ]
  }
};

export default function ProjectDetails() {
  const { id } = useParams();
  const project = id ? projects[id as keyof typeof projects] : null;

  if (!project) {
    return (
      <div className="max-w-4xl mx-auto text-center py-12 mt-20">
        <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-6">
          <h2 className="text-xl font-semibold text-yellow-800 dark:text-yellow-200 mb-2">Project Not Found</h2>
          <p className="text-yellow-600 dark:text-yellow-300">The requested project could not be found.</p>
          <BackButton to="/" label="Back to Projects" />
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto mt-20">
      <div className="mb-8">
        <BackButton to="/" label="Back to Projects" />
      </div>

      <div className="space-y-12">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm overflow-hidden">
          <div className="aspect-video relative">
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-10" />
            <img 
              src={project.image} 
              alt={project.title}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="p-8">
            <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {project.title}
            </h1>

            <div className="flex flex-wrap gap-2 mb-6">
              {project.tags.map(tag => (
                <span 
                  key={tag}
                  className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100 text-sm rounded-full font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>

            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">{project.longDescription}</p>

            <div className="flex gap-4">
              <a
                href={project.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary"
              >
                <Github className="w-5 h-5 mr-2" />
                View Source
              </a>
              <a
                href={project.links.live}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                <ExternalLink className="w-5 h-5 mr-2" />
                Live Demo
              </a>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
            <SectionHeading title="Key Features" className="mb-6" />
            <ul className="space-y-3">
              {project.features.map((feature, index) => (
                <li key={index} className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-blue-600" />
                  <span className="text-gray-600 dark:text-gray-300">{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
            <SectionHeading title="Technologies" className="mb-6" />
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech, index) => (
                <span 
                  key={index}
                  className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-full"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div>
          <SectionHeading title="Screenshots" className="mb-6" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {project.screenshots.map((screenshot, index) => (
              <div key={index} className="rounded-xl overflow-hidden shadow-sm">
                <img
                  src={screenshot}
                  alt={`Screenshot ${index + 1}`}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}