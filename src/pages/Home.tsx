import { motion } from 'framer-motion';
import { Github, Mail, Linkedin, ArrowRight } from 'lucide-react';
import ProjectCard from '../components/ProjectCard';
import NewsletterForm from '../components/NewsletterForm';
import ContactForm from '../components/ContactForm';
import Footer from '../components/Footer';
import { profile, services, projects } from '../data/dummy';

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

export default function Home() {
  return (
    <div className="space-y-24">
      {/* Hero Section */}
      <section className="-mt-8 py-20 px-4">
        <motion.div 
          className="max-w-4xl mx-auto text-center"
          initial="initial"
          animate="animate"
          variants={fadeIn}
        >
          <motion.h1 
            className="text-5xl md:text-6xl font-bold mb-6 text-gray-900 dark:text-white"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Hi, I'm {profile.name}
          </motion.h1>
          <motion.p 
            className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            {profile.bio}
          </motion.p>
          <motion.div 
            className="flex flex-wrap justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <a href="#contact" className="btn-primary">
              <Mail className="w-5 h-5 mr-2" /> Get in Touch
            </a>
            <a href="#projects" className="btn-secondary">
              View Projects <ArrowRight className="w-5 h-5 ml-2" />
            </a>
          </motion.div>
        </motion.div>
      </section>

      {/* About Section */}
      <section className="max-w-4xl mx-auto px-4">
        <motion.div 
          className="grid md:grid-cols-2 gap-12 items-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div>
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3 dark:text-white">About Me</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">{profile.bio}</p>
            <div className="flex gap-4">
              <a href={profile.social.github} target="_blank" rel="noopener noreferrer" className="btn-secondary">
                <Github className="w-5 h-5 mr-2" /> GitHub
              </a>
              <a href={profile.social.linkedin} target="_blank" rel="noopener noreferrer" className="btn-secondary">
                <Linkedin className="w-5 h-5 mr-2" /> LinkedIn
              </a>
            </div>
          </div>
          <div className="relative">
            <img 
              src={profile.avatar}
              alt={profile.name}
              className="rounded-lg shadow-lg"
            />
          </div>
        </motion.div>
      </section>

      {/* Services Section */}
      <section className="max-w-4xl mx-auto px-4" id="services">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold mb-12 flex items-center gap-3 dark:text-white">
            Services I Provide
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={service.title}
                  className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105 duration-200"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <h3 className="text-xl font-semibold mb-2 dark:text-white">{service.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300">{service.description}</p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="max-w-4xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold mb-8 dark:text-white">Featured Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <ProjectCard project={project} />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="max-w-4xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold mb-8 flex items-center gap-3 dark:text-white">
            Get in Touch
          </h2>
          <ContactForm />
        </motion.div>
      </section>

      {/* Newsletter Section */}
      <section className="max-w-4xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <NewsletterForm />
        </motion.div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}