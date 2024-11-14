// Dummy data for the portfolio website
export const profile = {
  name: "John Doe",
  title: "Full Stack Developer",
  bio: "With over 5 years of experience in web development, I specialize in creating modern web applications that combine beautiful design with efficient functionality.",
  email: "john@example.com",
  phone: "+1 (555) 123-4567",
  location: "San Francisco, CA",
  avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e",
  social: {
    github: "https://github.com",
    linkedin: "https://linkedin.com",
    twitter: "https://twitter.com"
  }
};

export const services = [
  {
    icon: "Layout",
    title: "Web Design",
    description: "Creating beautiful, responsive websites that provide an exceptional user experience."
  },
  {
    icon: "Code",
    title: "Frontend Development",
    description: "Building interactive web applications using modern frameworks like React and Vue."
  },
  {
    icon: "Database",
    title: "Backend Development",
    description: "Developing robust server-side solutions and APIs using Node.js and Python."
  },
  {
    icon: "Globe",
    title: "SEO Optimization",
    description: "Improving website visibility and search engine rankings through proven SEO strategies."
  },
  {
    icon: "Server",
    title: "DevOps",
    description: "Setting up CI/CD pipelines and managing cloud infrastructure on AWS and GCP."
  },
  {
    icon: "Palette",
    title: "UI/UX Design",
    description: "Creating intuitive user interfaces and engaging user experiences."
  }
];

export const projects = [
  {
    id: 1,
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
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71"
    ]
  },
  {
    id: 2,
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
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71"
    ]
  }
];

export const blogPosts = [
  {
    id: "1",
    title: "Getting Started with React and TypeScript",
    content: `TypeScript has become an essential tool in modern web development, especially when working with React. In this comprehensive guide, we'll explore how to set up a new React project with TypeScript and implement best practices for type safety.

    First, we'll cover the basics of TypeScript and why it's beneficial for React development. Then, we'll walk through the setup process step by step, including configuration of tsconfig.json and essential development tools.

    We'll also discuss common patterns for typing props, state, and event handlers in React components. You'll learn how to leverage TypeScript's type system to catch errors early and improve code maintainability.

    By the end of this guide, you'll have a solid foundation for building type-safe React applications.`,
    excerpt: "Learn how to set up a new React project with TypeScript and best practices for type safety.",
    date: "2024-01-15",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee",
    author: {
      name: "John Doe",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e"
    },
    tags: ["React", "TypeScript", "Web Development"]
  },
  {
    id: "2",
    title: "Building Modern UIs with Tailwind CSS",
    content: `Tailwind CSS has revolutionized the way we style web applications. This utility-first CSS framework provides a different approach to styling that can significantly speed up your development process.

    In this article, we'll explore the core concepts of Tailwind CSS and how to effectively use it in your projects. We'll cover everything from basic utility classes to advanced customization techniques.

    You'll learn about responsive design, dark mode implementation, and component extraction. We'll also discuss best practices for maintaining clean and maintainable CSS code with Tailwind.

    By the end, you'll have a strong understanding of how to leverage Tailwind CSS to create beautiful, responsive user interfaces.`,
    excerpt: "Explore the power of utility-first CSS and how to create beautiful interfaces quickly.",
    date: "2024-01-10",
    readTime: "8 min read",
    image: "https://images.unsplash.com/photo-1587620962725-abab7fe55159",
    author: {
      name: "Jane Smith",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80"
    },
    tags: ["CSS", "Tailwind", "Design"]
  }
];

export const comments = [
  {
    id: "1",
    content: "Great article! Very helpful for beginners.",
    author: {
      name: "Alice Johnson",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330"
    },
    createdAt: "2024-01-16T10:00:00Z"
  },
  {
    id: "2",
    content: "Would love to see more content like this!",
    author: {
      name: "Bob Wilson",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e"
    },
    createdAt: "2024-01-16T11:30:00Z"
  }
];