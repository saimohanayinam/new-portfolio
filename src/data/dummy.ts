// Dummy data for the portfolio website
export const profile = {
  name: "Sarah Anderson",
  title: "Full Stack Developer & UI/UX Designer",
  bio: "Passionate full-stack developer with 6+ years of experience crafting beautiful, user-centric web applications. Specializing in React, Node.js, and modern web technologies with a keen eye for design and user experience.",
  email: "sarah@example.com",
  phone: "+1 (555) 123-4567",
  location: "San Francisco, CA",
  avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
  social: {
    github: "https://github.com",
    linkedin: "https://linkedin.com",
    twitter: "https://twitter.com",
    instagram: "https://instagram.com",
    youtube: "https://youtube.com"
  }
};

export const services = [
  {
    icon: "Code",
    title: "Full Stack Development",
    description: "End-to-end web application development using modern technologies like React, Node.js, and TypeScript."
  },
  {
    icon: "Palette",
    title: "UI/UX Design",
    description: "Creating intuitive and beautiful user interfaces with a focus on user experience and accessibility."
  },
  {
    icon: "Globe",
    title: "Web Performance",
    description: "Optimizing web applications for speed, SEO, and core web vitals to ensure the best user experience."
  },
  {
    icon: "Cloud",
    title: "Cloud Solutions",
    description: "Deploying and managing applications on AWS, Google Cloud, and Azure with modern DevOps practices."
  },
  {
    icon: "Shield",
    title: "Security & Authentication",
    description: "Implementing robust security measures and authentication systems to protect user data."
  },
  {
    icon: "Database",
    title: "Database Design",
    description: "Designing and optimizing database schemas for scalability and performance."
  }
];

export const projects = [
  {
    id: 1,
    title: "E-commerce Platform",
    description: "A modern e-commerce platform built with React, Node.js, and Stripe",
    longDescription: "A comprehensive e-commerce solution featuring real-time inventory management, secure payment processing with Stripe, and an intuitive admin dashboard. The platform includes features like user authentication, product search, shopping cart, and order tracking.",
    image: "https://images.unsplash.com/photo-1557821552-17105176677c",
    tags: ["React", "Node.js", "MongoDB", "Stripe"],
    features: [
      "User authentication and authorization",
      "Product catalog with search and filters",
      "Shopping cart and wishlist",
      "Secure payment processing",
      "Order tracking and history",
      "Admin dashboard"
    ],
    technologies: [
      "React",
      "Node.js",
      "Express",
      "MongoDB",
      "Stripe API",
      "Redux",
      "Tailwind CSS"
    ],
    links: {
      github: "https://github.com",
      live: "https://demo.com"
    },
    screenshots: [
      "https://images.unsplash.com/photo-1557821552-17105176677c",
      "https://images.unsplash.com/photo-1557821556-1498673e9cd3",
      "https://images.unsplash.com/photo-1557821558-b6f7fc837898"
    ]
  },
  {
    id: 2,
    title: "AI-Powered Task Manager",
    description: "Smart task management app with AI-driven prioritization",
    longDescription: "An intelligent task management application that uses machine learning to help users prioritize tasks, set realistic deadlines, and improve productivity. Features include natural language processing for task creation and smart task categorization.",
    image: "https://images.unsplash.com/photo-1554415707-6e8cfc93fe23",
    tags: ["React", "Python", "TensorFlow", "FastAPI"],
    features: [
      "AI-powered task prioritization",
      "Natural language task creation",
      "Smart categorization",
      "Progress analytics",
      "Team collaboration",
      "Calendar integration"
    ],
    technologies: [
      "React",
      "Python",
      "FastAPI",
      "TensorFlow",
      "PostgreSQL",
      "Docker"
    ],
    links: {
      github: "https://github.com",
      live: "https://demo.com"
    },
    screenshots: [
      "https://images.unsplash.com/photo-1554415707-6e8cfc93fe23",
      "https://images.unsplash.com/photo-1554415708-28f8ead43ea9",
      "https://images.unsplash.com/photo-1554415709-45f8db4f8b3d"
    ]
  },
  {
    id: 3,
    title: "Real-time Collaboration Platform",
    description: "A collaborative workspace with real-time document editing",
    longDescription: "A modern collaboration platform enabling teams to work together in real-time. Features include document editing, video conferencing, chat, and project management tools. Built with WebSocket technology for seamless real-time updates.",
    image: "https://images.unsplash.com/photo-1600267175161-cfaa711b4a81",
    tags: ["React", "WebSocket", "Redis", "Docker"],
    features: [
      "Real-time document editing",
      "Video conferencing",
      "Team chat",
      "File sharing",
      "Project boards",
      "Activity tracking"
    ],
    technologies: [
      "React",
      "Socket.io",
      "Node.js",
      "Redis",
      "PostgreSQL",
      "WebRTC"
    ],
    links: {
      github: "https://github.com",
      live: "https://demo.com"
    },
    screenshots: [
      "https://images.unsplash.com/photo-1600267175161-cfaa711b4a81",
      "https://images.unsplash.com/photo-1600267165440-0d5f3c10e41e",
      "https://images.unsplash.com/photo-1600267170755-7e4fb2d29e63"
    ]
  }
];

export const blogPosts = [
  {
    id: "1",
    title: "Building Scalable Web Applications with React and TypeScript",
    content: `React and TypeScript have become the go-to combination for building modern web applications. In this comprehensive guide, we'll explore best practices for creating scalable, maintainable React applications using TypeScript.

    First, we'll cover the essential TypeScript configurations and how to properly type your React components. We'll discuss the benefits of using interfaces over types, and when to use each. Then, we'll dive into advanced patterns like generic components and proper error handling.

    Key topics covered:
    - Setting up a React project with TypeScript
    - Component typing best practices
    - State management with TypeScript
    - Error boundaries and type safety
    - Performance optimization techniques
    - Testing typed components

    By following these practices, you'll be able to build more robust applications with fewer runtime errors and better developer experience.`,
    excerpt: "Learn how to leverage TypeScript with React to build scalable, maintainable web applications with better type safety and developer experience.",
    date: "2024-01-15",
    readTime: "8 min read",
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee",
    author: {
      name: "Sarah Anderson",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330"
    },
    tags: ["React", "TypeScript", "Web Development"]
  },
  {
    id: "2",
    title: "Mastering Modern CSS: From Flexbox to Grid",
    content: `CSS has evolved significantly over the years, and modern layout techniques like Flexbox and Grid have revolutionized how we build web layouts. In this in-depth guide, we'll explore these powerful tools and how to use them effectively.

    We'll start with Flexbox, understanding its core concepts and common use cases. Then, we'll dive into CSS Grid, exploring how it complements Flexbox and when to use each. We'll also cover responsive design techniques and how to combine these tools for complex layouts.

    Topics covered:
    - Flexbox fundamentals and advanced techniques
    - CSS Grid layout system
    - Responsive design patterns
    - Performance considerations
    - Browser support and fallbacks
    - Real-world examples and use cases

    By the end of this guide, you'll have a solid understanding of modern CSS layout techniques and how to implement them in your projects.`,
    excerpt: "Explore modern CSS layout techniques and learn when to use Flexbox vs Grid for optimal web layouts.",
    date: "2024-01-10",
    readTime: "10 min read",
    image: "https://images.unsplash.com/photo-1587620962725-abab7fe55159",
    author: {
      name: "Sarah Anderson",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330"
    },
    tags: ["CSS", "Web Design", "Frontend"]
  },
  {
    id: "3",
    title: "Optimizing Web Performance: A Developer's Guide",
    content: `Web performance is crucial for user experience and SEO. In this comprehensive guide, we'll explore various techniques to optimize your web applications for better performance.

    We'll start with the basics of web vitals and how they impact user experience. Then, we'll dive into practical optimization techniques, from code splitting to image optimization. We'll also explore modern performance APIs and tools for monitoring and improving performance.

    Key areas covered:
    - Understanding Core Web Vitals
    - Code splitting and lazy loading
    - Image and asset optimization
    - Caching strategies
    - Performance monitoring
    - SEO impact of performance

    By implementing these optimization techniques, you can significantly improve your application's performance and user experience.`,
    excerpt: "Learn essential techniques for optimizing web application performance and improving user experience.",
    date: "2024-01-05",
    readTime: "12 min read",
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6",
    author: {
      name: "Sarah Anderson",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330"
    },
    tags: ["Performance", "Optimization", "Web Development"]
  }
];

export const testimonials = [
  {
    id: 1,
    content: "Sarah is an exceptional developer who consistently delivers high-quality work. Her attention to detail and problem-solving skills are outstanding.",
    author: {
      name: "John Smith",
      title: "CTO at TechCorp",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e"
    }
  },
  {
    id: 2,
    content: "Working with Sarah was a pleasure. She not only delivered the project on time but also provided valuable insights that improved our initial concept.",
    author: {
      name: "Emily Chen",
      title: "Product Manager at InnovateLabs",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80"
    }
  },
  {
    id: 3,
    content: "Sarah's expertise in both frontend and backend development made our project implementation seamless. Her communication skills are excellent.",
    author: {
      name: "Michael Johnson",
      title: "Founder at StartupX",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e"
    }
  }
];

export const skills = [
  {
    category: "Frontend",
    items: ["React", "TypeScript", "Next.js", "Vue.js", "Tailwind CSS", "SASS"]
  },
  {
    category: "Backend",
    items: ["Node.js", "Python", "Java", "PostgreSQL", "MongoDB", "Redis"]
  },
  {
    category: "DevOps",
    items: ["Docker", "Kubernetes", "AWS", "CI/CD", "Linux", "Nginx"]
  },
  {
    category: "Tools",
    items: ["Git", "VS Code", "Figma", "Jira", "Postman", "Jest"]
  }
];

export const experience = [
  {
    company: "TechCorp",
    position: "Senior Full Stack Developer",
    period: "2021 - Present",
    description: "Leading development of enterprise-scale web applications, mentoring junior developers, and implementing best practices.",
    technologies: ["React", "Node.js", "TypeScript", "AWS"]
  },
  {
    company: "InnovateLabs",
    position: "Frontend Developer",
    period: "2019 - 2021",
    description: "Developed responsive web applications and implemented modern UI/UX designs using React and related technologies.",
    technologies: ["React", "Redux", "SASS", "Jest"]
  },
  {
    company: "StartupX",
    position: "Junior Developer",
    period: "2017 - 2019",
    description: "Worked on various web development projects, focusing on frontend development and UI implementation.",
    technologies: ["JavaScript", "HTML", "CSS", "jQuery"]
  }
];

export const education = [
  {
    school: "University of Technology",
    degree: "Master's in Computer Science",
    period: "2015 - 2017",
    description: "Focused on software engineering and web technologies."
  },
  {
    school: "Tech Institute",
    degree: "Bachelor's in Software Engineering",
    period: "2011 - 2015",
    description: "Studied programming fundamentals, algorithms, and software development."
  }
];

export const certifications = [
  {
    name: "AWS Certified Solutions Architect",
    issuer: "Amazon Web Services",
    date: "2023",
    link: "https://aws.amazon.com"
  },
  {
    name: "Google Cloud Professional Developer",
    issuer: "Google",
    date: "2022",
    link: "https://cloud.google.com"
  },
  {
    name: "React Advanced Certification",
    issuer: "Meta",
    date: "2021",
    link: "https://reactjs.org"
  }
];