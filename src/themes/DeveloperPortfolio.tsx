import { motion } from 'framer-motion';
import { profile, projects, experience, skills } from '../data/dummy';
import { Github, Mail, Linkedin, Code, Terminal, Database } from 'lucide-react';

export default function DeveloperPortfolio() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Hero Section */}
      <section className="min-h-screen relative overflow-hidden flex items-center">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-purple-600 opacity-10" />
        <div className="relative max-w-6xl mx-auto px-4 py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex flex-col md:flex-row items-center gap-12">
              <div className="flex-1">
                <h1 className="text-5xl md:text-6xl font-bold mb-6">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                    {profile.name}
                  </span>
                </h1>
                <p className="text-xl text-gray-300 mb-8">{profile.title}</p>
                <div className="flex gap-4">
                  <a
                    href={profile.social.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary"
                  >
                    <Github className="w-5 h-5 mr-2" />
                    GitHub
                  </a>
                  <a href={`mailto:${profile.email}`} className="btn-secondary">
                    <Mail className="w-5 h-5 mr-2" />
                    Contact
                  </a>
                </div>
              </div>
              <div className="flex-1">
                <div className="bg-gray-800 rounded-lg p-6 font-mono text-sm">
                  <div className="flex items-center gap-2 mb-4 text-gray-400">
                    <Terminal className="w-4 h-4" />
                    <span>portfolio.js</span>
                  </div>
                  <pre className="text-blue-400">
                    {`const developer = {
  name: "${profile.name}",
  title: "${profile.title}",
  location: "${profile.location}",
  skills: [${skills[0].items.slice(0, 3).map(s => `"${s}"`).join(', ')}],
  contact: "${profile.email}"
};`}
                  </pre>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-20 bg-gray-800">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold mb-12 flex items-center gap-3">
              <Code className="w-8 h-8 text-blue-400" />
              Technical Skills
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {skills.map((category) => (
                <div key={category.category} className="bg-gray-900 rounded-lg p-6">
                  <h3 className="text-xl font-semibold mb-4 text-blue-400">
                    {category.category}
                  </h3>
                  <div className="space-y-2">
                    {category.items.map((skill) => (
                      <div
                        key={skill}
                        className="px-3 py-2 bg-gray-800 rounded text-gray-300"
                      >
                        {skill}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold mb-12 flex items-center gap-3">
              <Database className="w-8 h-8 text-purple-400" />
              Featured Projects
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project) => (
                <div
                  key={project.id}
                  className="bg-gray-800 rounded-lg overflow-hidden group"
                >
                  <div className="relative">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent" />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                    <p className="text-gray-400 mb-4">{project.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 bg-gray-700 text-gray-300 rounded text-sm"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Experience Section */}
      <section className="py-20 bg-gray-800">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold mb-12">Work Experience</h2>
            <div className="space-y-12">
              {experience.map((job) => (
                <div
                  key={job.company}
                  className="bg-gray-900 rounded-lg p-6 relative"
                >
                  <div className="flex flex-col md:flex-row md:items-center gap-4 mb-4">
                    <h3 className="text-xl font-semibold">{job.position}</h3>
                    <div className="text-blue-400">@ {job.company}</div>
                    <div className="text-gray-400">{job.period}</div>
                  </div>
                  <p className="text-gray-300 mb-4">{job.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {job.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-1 bg-gray-800 text-gray-300 rounded text-sm"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold mb-8">Get in Touch</h2>
            <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
              I'm always open to new opportunities and interesting projects.
              Feel free to reach out!
            </p>
            <div className="flex justify-center gap-6">
              <a
                href={profile.social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Github className="w-8 h-8" />
              </a>
              <a
                href={`mailto:${profile.email}`}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Mail className="w-8 h-8" />
              </a>
              <a
                href={profile.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Linkedin className="w-8 h-8" />
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}