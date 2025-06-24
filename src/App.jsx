import React, { useState, useEffect, useRef, useMemo } from 'react';
import './App.css';
import emailjs from 'emailjs-com';
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

// EmailJS details
const EMAILJS_SERVICE_ID = 'gmail';
const EMAILJS_TEMPLATE_ID = 'template_tpjs13f';
const EMAILJS_USER_ID = 'V25OKCvHcTET5iX5K';

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
    title: "Payslip Generator",
    description: "An app to generate professional payslips instantly from employee data. Export as PDF or email directly.",
    github: "https://github.com/akomborero/payslip-generator",
    demo: "https://payslip-generator-akomborero.vercel.app/",
    tech: ["React", "Node.js", "Express", "PDFKit"],
    image: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?fit=crop&w=400&q=80"
  },
  {
    title: "WebScraper",
    description: "Fetch, parse, and analyze website data automatically for reporting and research purposes.",
    github: "https://github.com/akomborero/webscraper",
    demo: "",
    tech: ["Python", "BeautifulSoup", "Requests"],
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?fit=crop&w=400&q=80"
  },
];

const skills = [
  {
     name: "Python",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
   description:
  "Python is the first language I studied. Learning Python was love at first sight, and led to my first ever project – a Rock, Paper, Scissors game.",
    },
  {
    name: "CSS3",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
    description:
      "Playing Flexbox Froggy helped me better understand the importance of semantic and well laid out HTML",
  },
  {
    name: "JavaScript",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
    description:
      "JavaScript enables me to make web pages interactive, handle dynamic content, and build powerful client-side applications.",
  },
  {
    name: "React",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
    description:
      "I use React to build fast, reusable, and scalable user interfaces by leveraging components, hooks, and state management.",
  },
  {
    name: "HTML5",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
    description:
      "I use HTML5 to structure web pages and create semantic, accessible layouts as the foundation for all my frontend projects.",
    },
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

function App() {
  const [activeLink, setActiveLink] = useState('about');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [statusMessage, setStatusMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

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
    AOS.init({ duration: 1000, once: true });

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
    if (statusMessage) {
      const timeout = setTimeout(() => {
        setStatusMessage('');
      }, 5000);
      return () => clearTimeout(timeout);
    }
  }, [statusMessage]);

  useEffect(() => {
    document.body.className = 'dark-mode';
  }, []);

  const handleLinkClick = (linkId) => {
    setActiveLink(linkId);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      setStatusMessage('All fields are required.');
      setIsSubmitted(false);
      return;
    }

    try {
      await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, formData, EMAILJS_USER_ID);
      setStatusMessage('Your message has been sent successfully!');
      setIsSubmitted(true);
      setFormData({
        name: '',
        email: '',
        message: '',
      });
    } catch (error) {
      console.error('EmailJS Error:', error);
      setStatusMessage('Oops! Something went wrong. Please try again.');
      setIsSubmitted(false);
    }
  };

  // Animation variants for Framer Motion
  const sectionVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 }
  };

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
      <div className="left-intro-nav" id="sidebar">
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
              />
            </a>
          ))}
        </div>
      </div>

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
  variants={sectionVariants}
  transition={{ duration: 0.7, delay: 0.1 }}
>
  <h2 className="section-heading">ABOUT</h2>
  <div className="section-container">
    <div className="about-content">
      <div className="about-text" data-aos="fade-left" data-aos-delay="400">
        <p>
          Hello! I'm Makomborero, a passionate software developer based in Harare, Zimbabwe. I love building elegant, efficient applications that solve real-world problems—whether it's robust backends or intuitive user interfaces.
        </p>
        <p>
          I'm currently sharpening my skills at{" "}
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
    </div>

 <div className="about-cards-row">
  <div className="about-card">
    <h4>Web Developer</h4>
    <p>
      Building robust, modern, and responsive web applications with the latest technologies.
    </p>
  </div>
  <div className="about-card">
    <h4>Problem Solver</h4>
    <p>
      Enjoy tackling complex challenges and finding efficient, creative solutions in code.
    </p>
  </div>
  <div className="about-card">
    <h4>Mobile Development</h4>
    <p>
      Creating seamless mobile experiences for Android and cross-platform environments.
    </p>
  </div>
  <a
    href="/Makomborero_Chidziva_Resume.pdf"
    download="Makomborero_Chidziva_Resume.pdf"
    className="about-card"
    style={{ textDecoration: 'none' }}
  >
    <h4>Download Resume</h4>
    <p>
      View my detailed resume and learn more about my experience and skills.
    </p>
    <span className="resume-arrow" aria-label="Go to download">
      <svg width="30" height="30" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="12" fill="#64ffda"/>
        <path d="M8 12h8m0 0l-3-3m3 3l-3 3" stroke="#0a192f" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </span>
  </a>
</div>
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
          transition={{ duration: 0.7, delay: 0.1 }}
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
          transition={{ duration: 0.7, delay: 0.1 }}
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
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          <h2 className="section-heading">CONTACT</h2>
          <div className="section-container">
            <div className="section-text">
              <p className="contact-description">
                I'm always excited to connect with like-minded individuals,
                collaborate on projects, or answer any questions you may have.
                Whether you're looking to discuss opportunities, share ideas, or
                simply say hello, feel free to reach out!
              </p>
            </div>
            <form className="contact-form" onSubmit={handleSubmit} data-aos="fade-up" data-aos-delay="200">
              <h3>Send Me a Message</h3>
              <p className="contact-form-description">
                Use the form below to send me a direct message. I'll get back to
                you as soon as possible!
              </p>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Your Name"
                required
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Your Email"
                required
              />
              <textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                placeholder="Your Message"
                required
              />
              <button type="submit">Send Message</button>
            </form>
            {statusMessage && (
              <p
                className={`status-message ${
                  isSubmitted ? 'success' : 'error'
                }`}
              >
                {statusMessage}
              </p>
            )}

            {/* --- MAP SECTION --- */}
            <div className="map-section">
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
            </div>
            {/* --- END MAP SECTION --- */}

          </div>
        </motion.section>
      </main>
    </div>
  );
}

export default App;