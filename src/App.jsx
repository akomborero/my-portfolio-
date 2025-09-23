import React, { useState, useEffect, useRef, useMemo } from 'react';
import './App.css';
import { Helmet } from 'react-helmet';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Typewriter from 'typewriter-effect';
import { motion } from 'framer-motion';

// --- LEAFLET MAP IMPORTS ---
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

// Fix Leaflet's default icon issue in React
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

// --- MOBILE PROFILE HEADER (shows only once at the top for mobile) ---
const MobileHeader = ({ socialLinks }) => (
  <div className="mobile-section-header">
    <div className="mobile-profile">
      <h2>Makomborero Chidziva</h2>
      <div className="mobile-role">Full Stack Developer</div>
      <div className="mobile-bio">
        I'm a passionate developer building robust and scalable web applications, always eager to learn and collaborate.
      </div>
      <div className="mobile-typewriter">
        <Typewriter
          options={{
            strings: ['Web Developer', 'Software Engineer', 'Tech Enthusiast'],
            autoStart: true,
            loop: true,
            delay: 75,
            deleteSpeed: 50,
          }}
        />
      </div>
      <div className="mobile-social-links">
        {socialLinks.map((link) => (
          <a key={link.name} href={link.url} target="_blank" rel="noopener noreferrer">
            <img src={link.icon} alt={link.name} width="22" height="22" />
          </a>
        ))}
      </div>
    </div>
  </div>
);

// Social links
const socialLinks = [
  {
    name: "GitHub",
    url: "https://github.com/akomborero",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg",
  },
  {
    name: "LinkedIn",
    url: "https://linkedin.com/in/makomborero",
    icon: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/linkedin.svg",
  },
  {
    name: "Instagram",
    url: "https://instagram.com/makomborero844",
    icon: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/instagram.svg",
  },
  {
    name: "Email",
    url: "mailto:makomborerichidzviva@gmail.com",
    icon: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/gmail.svg",
  },
];

const projects = [
  {
    title: "Educational App (In Progress)",
    description: "An ongoing project to build an educational mobile app using React Native. The current phase focuses on the user authentication system, featuring a polished login and sign-up flow. This work highlights my skills in front-end development, responsive design, and navigation with expo-router.",
    github: "",
    demo: "",
    tech: ["ReactNative", "Typescript", "Fullstack"],
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?fit=crop&w=400&q=80"
  },
  
  {
  title: "Wedding Planner",
  description: "An all-in-one platform designed to simplify wedding planning, from guest list management and budget tracking to vendor coordination.",
  github: "https://github.com/your-username/your-wedding-planner-repo",
  demo: "https://wedding-planner-iota-ebon.vercel.app/", // or a link to a video preview
  tech: ["React", "Next.js", "Firebase", "Tailwind CSS"],
  image: "https://i.pinimg.com/736x/6c/ae/f9/6caef9dd8fae6216ff47e4cdfab7f254.jpg" // A placeholder image link
},
  {
    title: "SnapEvent",
    description: "A dynamic event management platform for seamless planning, promotion, and execution of events.",
    github: "https://github.com/akomborero/snapevent",
    demo: "https://snap-event-henna.vercel.app/event-gallery/3c020fe2-37c3-4463-98a5-be1e35e319bd",
    tech: ["React", "Node.js", "CSS", " PostgreSQL"],
    image: "https://i.pinimg.com/736x/d7/9e/65/d79e65ae30f714c147e9e8a0e5ad26ce.jpg"
  },
  {
    
    title: "Payslip Generator",
    description: "An app to generate professional payslips instantly from employee data. Export as PDF or email directly.",
    github: "https://github.com/akomborero/payslip-generator",
    demo: "https://payslip-generator-akomborero.vercel.app/",
    tech: ["Python", "Pandas", "PDFKit"],
    image: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?fit=crop&w=400&q=80"
  },
  {
    title: "WebScraper",
    description: "Fetch, parse, and analyze website data automatically for reporting and research purposes.",
    github: "https://github.com/akomborero/webscraper",
    demo: "",
    tech: ["Python", "BeautifulSoup", "Requests"],
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?fit=crop&w=400&q=80"
  }
];

const skills = [
  {
    name: 'Python',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg',
    description: 'Python is the first language I studied. Learning Python was love at first sight, and led to my first ever project – a Rock, Paper, Scissors game.'
  },
  {
    name: 'CSS3',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg',
    description: 'Playing Flexbox Froggy helped me better understand the importance of semantic and well laid out HTML'
  },
   {
    name: 'Java',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg',
    description: 'Developed robust and scalable backend services and APIs using modern Java frameworks like Spring Boot.'
  },
   {
    name: 'AWS',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg',
    description: 'Deployed full-stack applications to AWS using services like EC2 and Elastic Beanstalk, and managed data with RDS and S3.'
  },
  {
    name: 'JavaScript',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg',
    description: 'JavaScript enables me to make web pages interactive, handle dynamic content, and build powerful client-side applications.'
  },
  {
    name: 'React',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg',
    description: 'I use React to build fast, reusable, and scalable user interfaces by leveraging components, hooks, and state management.'
  },
  {
    name: 'React Native',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg',
    description: 'Developed and maintained cross-platform mobile applications using a single codebase for both iOS and Android.'
  },
  {
    name: 'HTML5',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg',
    description: 'I use HTML5 to structure web pages and create semantic, accessible layouts as the foundation for all my frontend projects.'
  },
  {
    name: 'TypeScript',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg',
    description: 'I use TypeScript to write safer, more robust code with powerful static typing and modern JavaScript features.'
  },
  {
    name: 'Tailwind CSS',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg',
    description: 'Tailwind CSS lets me rapidly build modern interfaces with utility-first classes and responsive design.'
  },
  {
    name: 'Node.js',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg',
    description: 'I create scalable backend services and APIs using Node.js runtime.'
  },
  {
    name: 'Express',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/express/express-original.svg',
    description: 'Building RESTful APIs with middleware, routing, and error handling.'
  },
  {
    name: 'MongoDB',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg',
    description: 'NoSQL database design with Mongoose ODM for data modeling.'
  },
  {
    name: 'SQL',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg', // Using PostgreSQL icon as a general SQL icon
    description: 'Managing and querying relational databases using SQL for data manipulation and retrieval.'
  },
  {
    name: 'PostgreSQL',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg',
    description: 'Working with PostgreSQL for robust and scalable relational database solutions.'
  },
  {
    name: 'Angular',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/angular/angular-original.svg',
    description: 'I use Angular to build dynamic, single-page web applications, leveraging its component-based architecture and TypeScript support for scalable and maintainable solutions.'
  },
  {
    name: 'PHP',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/php/php-original.svg',
    description: 'I use PHP for server-side scripting, powering dynamic websites and web applications, often with frameworks like Laravel or Symfony.'
  }
];


const GithubIcon = () => (
  <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 .5C5.73.5.5 5.74.5 12.02c0 5.1 3.29 9.41 7.84 10.94.57.11.78-.25.78-.56 0-.27-.01-1.17-.01-2.12-3.19.69-3.87-1.37-3.87-1.37-.52-1.33-1.27-1.68-1.27-1.68-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.02 1.75 2.68 1.25 3.34.96.1-.74.4-1.25.72-1.54-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.29 1.18-3.09-.12-.29-.51-1.46.11-3.04 0 0 .96-.31 3.15 1.18a10.88 10.88 0 012.87-.39c.97.01 1.94.13 2.87.39 2.18-1.49 3.14-1.18 3.14-1.18.62 1.58.23 2.75.11 3.04.73.8 1.18 1.83 1.18 3.09 0 4.42-2.69 5.39-5.24 5.68.41.36.77 1.07.77 2.16 0 1.56-.01 2.82-.01 3.2 0 .31.21.67.79.56C20.71 21.42 24 17.12 24 12.02 24 5.74 18.27.5 12 .5z" />
  </svg>
);

const ExternalLinkIcon = () => (
  <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
    <path d="M14 3v2h3.59L10 12.59l1.41 1.41L19 6.41V10h2V3h-7zm-4 3H5c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2v-5h-2v5H5V8h5V6z" />
  </svg>
);

const fadeInUp = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0 }
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 }
};

function App() {
  const [activeLink, setActiveLink] = useState('about');

  const aboutRef = useRef(null);
  const skillsRef = useRef(null);
  const projectsRef = useRef(null);
  const contactRef = useRef(null);

  // Define sections with label and id
  const sections = useMemo(() => [
    { id: 'about', label: 'About', ref: aboutRef },
    { id: 'skills', label: 'Skills', ref: skillsRef },
    { id: 'projects', label: 'Projects', ref: projectsRef },
    { id: 'contact', label: 'Contact', ref: contactRef },
  ], [aboutRef, skillsRef, projectsRef, contactRef]);

  useEffect(() => {
    AOS.init({ duration: 1200, once: true, mirror: true });

    const observerOptions = { root: null, threshold: 0.5 };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveLink(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    sections.forEach((section) => {
      if (section.ref.current) {
        observer.observe(section.ref.current);
      }
    });

    return () => {
      sections.forEach(section => {
        if (section.ref.current) {
          observer.unobserve(section.ref.current);
        }
      });
    };
  }, [sections]);

  useEffect(() => {
    document.body.className = 'dark-mode';
  }, []);

  const handleLinkClick = (linkId) => {
    setActiveLink(linkId);
  };

  // Animation variants for Framer Motion
  const sectionVariants = fadeInUp;

  const cardVariants = (idx) => ({
    hidden: { opacity: 0, x: idx % 2 === 0 ? -50 : 50 },
    visible: { opacity: 1, x: 0 }
  });

  return (
    <div className="App">
      <Helmet>
        <title>Makomborero Chidziva - Software Developer Portfolio</title>
        <meta name="description" content="Explore the portfolio of Makomborero Chidziva, a passionate software developer specializing in web development and software engineering." />
        <meta name="keywords" content="Makomborero Chidziva, Software Developer, Web Developer, React, Portfolio, Software Engineering, Web Development" />
        <meta name="author" content="Makomborero Chidziva" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        <meta property="og:title" content="Makomborero Chidziva - Software Developer Portfolio" />
        <meta property="og:description" content="Portfolio of Makomborero Chidziva, showcasing projects, skills, and experience." />
        <meta property="og:image" content="/profile.jpg" />
        <meta property="og:url" content="https://my-portfolio-1-pink.vercel.app/" />
        <meta property="og:type" content="website" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Makomborero Chidziva - Software Developer Portfolio" />
        <meta name="twitter:description" content="Portfolio of Makomborero Chidziva, showcasing projects, skills, and experience." />
        <meta name="twitter:image" content="/profile.jpg" />

        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "Person",
              "name": "Makomborero Chidziva",
              "url": "https://my-portfolio-1-pink.vercel.app/",
              "sameAs": [
                "https://github.com/akomborero",
                "https://www.linkedin.com/in/makomborero-chidziva-755659350"
              ],
              "jobTitle": "Software Developer",
              "worksFor": {
                "@type": "Organization",
                "name": "Uncommon.org"
              }
            }
          `}
        </script>
      </Helmet>

      {/* Sidebar / Left-aligned Intro & Navigation Block (desktop only) */}
      <motion.div className="left-intro-nav" id="sidebar"
        initial="hidden" animate="visible" variants={fadeIn} transition={{ duration: 1, delay: 0.1 }}>
        <div className="profile-badge">
          <h3>Makomborero Chidziva</h3>
          <h3>Full Stack Developer</h3>
          <p className="short-bio">
            I'm a passionate developer building robust and scalable web applications, always eager to learn and collaborate.
          </p>
          <div className="intro-typewriter">
            <Typewriter
              options={{
                strings: ['Web Developer', 'Software Engineer', 'Tech Enthusiast'],
                autoStart: true,
                loop: true,
                delay: 75,
                deleteSpeed: 50,
              }}
            />
          </div>
        </div>

        <nav className="main-nav-links">
          {sections.map(section => (
            <a
              key={section.id}
              href={`#${section.id}`}
              className={activeLink === section.id ? 'active' : ''}
              onClick={e => {
                e.preventDefault();
                document.getElementById(section.id).scrollIntoView({ behavior: 'smooth' });
                handleLinkClick(section.id);
              }}
            >
              <span className="nav-dash" aria-hidden="true"></span>
              <span className="link-text">{section.label}</span>
            </a>
          ))}
        </nav>

        <div className="social-links-main">
          {socialLinks.map((link) => (
            <a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={link.name}
            >
              <img
                src={link.icon}
                alt={link.name}
                width="28"
                height="28"
                className="dark-social-icon"
              />
            </a>
          ))}
        </div>
      </motion.div>

      <main className="main-content">
        {/* Mobile Header - only visible on mobile, once at top */}
        <MobileHeader socialLinks={socialLinks} />

        <motion.section
          id="about"
          ref={aboutRef}
          className="about section"
          data-aos="fade-up"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          <h2 className="section-heading">ABOUT</h2>
          <div className="section-container">
            <motion.div className="about-content"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              transition={{ duration: 1, delay: 0.2 }}
            >
              <div className="about-text" data-aos="fade-left" data-aos-delay="400">
                <p>
                  Hello! I'm Makomborero, a passionate software developer. I love building elegant, efficient applications that solve real-world problems—whether it's robust backends or intuitive user interfaces.
                </p>
                <p>
                  I sharpened my skills at{" "}
                  <a
                    href="https://uncommon.org/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="about-link"
                  >
                    Uncommon.org
                  </a>{" "}
                  bootcamp and have earned recognition as a{" "}
                  <a
                    href="https://gdg.community.dev/gdg-harare/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="about-link"
                  >
                    hackathon winner
                  </a>{" "}
                  for my problem-solving under pressure.
                </p>
                <p>
                  Beyond coding, I enjoy exploring new tech trends and contributing to open-source. I'm always eager to collaborate on exciting projects and connect with fellow innovators.
                </p>
              </div>
            </motion.div>

            <motion.div className="about-cards-row"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              transition={{ duration: 1, delay: 0.2 }}
            >
              <motion.div className="about-card"
                whileHover={{ scale: 1.07, boxShadow: "0 8px 24px #64ffda40" }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <h4>Web Developer</h4>
                <p>
                  Building robust, modern, and responsive web applications with the latest technologies.
                </p>
              </motion.div>
              <motion.div className="about-card"
                whileHover={{ scale: 1.07, boxShadow: "0 8px 24px #64ffda40" }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <h4>Problem Solver</h4>
                <p>
                  Enjoy tackling complex challenges and finding efficient, creative solutions in code.
                </p>
              </motion.div>
              <motion.div className="about-card"
                whileHover={{ scale: 1.07, boxShadow: "0 8px 24px #64ffda40" }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <h4>Mobile Development</h4>
                <p>
                  Creating seamless mobile experiences for Android and cross-platform environments.
                </p>
              </motion.div>
            </motion.div>
          </div>
        </motion.section>
        <motion.section
          id="skills"
          ref={skillsRef}
          className="skills-section"
          data-aos="fade-up"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={sectionVariants}
          transition={{ duration: 0.7, delay: 0.15 }}
        >
          <h2 className="section-heading">SKILLS</h2>
          <div className="skill-cards-column">
            {skills.map((skill, idx) => (
              <motion.div
                className="skill-card-vertical"
                key={skill.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                whileHover={{ scale: 1.05, boxShadow: "0 6px 24px #64ffda2c" }}
              >
                <img src={skill.icon} alt={skill.name} className="skill-card-icon" />
                <h3>{skill.name}</h3>
                <p>{skill.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        <motion.section
          id="projects"
          ref={projectsRef}
          className="projects section"
          data-aos="fade-up"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={sectionVariants}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <h2 className="section-heading">PROJECTS</h2>
          <div className="projects-list">
            {projects.map((project, idx) => (
              <motion.div
                className={`project-row${idx % 2 ? ' reverse' : ''}`}
                key={project.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={cardVariants(idx)}
                transition={{ duration: 0.6, delay: idx * 0.15 }}
                whileHover={{ scale: 1.03, boxShadow: "0 8px 32px #64ffda24" }}
              >
                <img src={project.image} alt={project.title} className="project-img" />
                <div className="project-details">
                  <div className="project-header">
                    <h3 className="project-title">
                      <a href={project.demo || project.github} target="_blank" rel="noopener noreferrer">
                        {project.title}
                      </a>
                    </h3>
                    <div className="project-links">
                      <a href={project.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                        <GithubIcon />
                      </a>
                      <a
                        href={project.demo || project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Demo"
                      >
                        <ExternalLinkIcon />
                      </a>
                    </div>
                  </div>
                  <p className="project-description">{project.description}</p>
                  <ul className="project-tech-list">
                    {project.tech.map((tech) => (
                      <li key={tech}>{tech}</li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="view-full-resume-container">
            <motion.a
              href="https://docs.google.com/document/d/1yCQr86OH8SGeOBiyvwKANNHO5cyDlXdQ9Od8kx3SDkk/edit?usp=sharing" // Replace with your actual Google Docs resume link
              target="_blank"
              rel="noopener noreferrer"
              className="view-full-resume-link"
              whileHover={{ scale: 1.05, boxShadow: "0 8px 24px #64ffda40" }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              View Full Resume
              <span className="resume-arrow" aria-label="Go to resume">
                <svg width="30" height="30" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="12" fill="#64ffda" />
                  <path d="M8 12h8m0 0l-3-3m3 3l-3 3" stroke="#0a192f" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </motion.a>
          </div>
        </motion.section>

        <motion.section
          id="contact"
          ref={contactRef}
          className="contact section"
          data-aos="fade-up"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={sectionVariants}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <h2 className="section-heading">CONTACT</h2>
          <div className="section-container">
            <motion.div className="section-text"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              transition={{ duration: 1, delay: 0.2 }}
            >
              <p className="contact-description">
                I'm always excited to connect with like-minded individuals,
                collaborate on projects, or answer any questions you may have.
                Whether you're looking to discuss opportunities, share ideas, or
                simply say hello, feel free to connect with me on these platforms!
              </p>
            </motion.div>
            <motion.div
              className="contact-social-links"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              transition={{ duration: 1, delay: 0.35 }}
            >
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.name}
                  className="contact-social-icon"
                >
                  <img
                    src={link.icon}
                    alt={link.name}
                    width="40"
                    height="40"
                    className="dark-social-icon"
                  />
                </a>
              ))}
            </motion.div>
            {/* --- MAP SECTION --- */}


            <motion.div
              className="map-section"
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: 0.45 }}
            >
              <MapContainer center={[-17.8252, 31.0335]} zoom={13} style={{ width: "100%", height: "100%" }}>
                <TileLayer
                  attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={[-17.8252, 31.0335]}>
                  <Popup>
                    Makomborero Chidziva<br />Harare, Zimbabwe
                  </Popup>
                </Marker>
              </MapContainer>
            </motion.div>
            {/* --- END MAP SECTION --- */}
          </div>
        </motion.section>
      </main>
    </div>
  );
}

export default App;