import React, { useState, useEffect, useRef, useMemo } from 'react';
import './App.css';
import emailjs from 'emailjs-com';
import { Helmet } from 'react-helmet';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Typewriter from 'typewriter-effect';

// Reusable constants for EmailJS service details
const EMAILJS_SERVICE_ID = 'gmail';
const EMAILJS_TEMPLATE_ID = 'template_tpjs13f';
const EMAILJS_USER_ID = 'V25OKCvHcTET5iX5K';

// Minimal emoji icons for each section
const navIcons = {
  about: '👤',
  skills: '🛠️',
  projects: '📁',
  contact: '✉️',
};

// Social links defined directly in this file
const socialLinks = [
  {
    name: "GitHub",
    url: "https://github.com/akomborero",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg",
  },
  {
    name: "LinkedIn",
    url: "https://linkedin.com/in/makomborero",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linkedin/linkedin-original.svg",
  },
  {
    name: "Instagram",
    url: "https://instagram.com/your_instagram_username", // change to your handle!
    icon: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/instagram.svg",
  },
  {
    name: "Email",
    url: "mailto:youraddress@gmail.com", // change to your email!
    icon: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/gmail.svg",
  },
];

function App() {
    const [activeLink, setActiveLink] = useState('about');
    const [menuOpen, setMenuOpen] = useState(false);
    const [theme, setTheme] = useState('dark');
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

    const sections = useMemo(() => [
        { id: 'about', ref: aboutRef },
        { id: 'skills', ref: skillsRef },
        { id: 'projects', ref: projectsRef },
        { id: 'contact', ref: contactRef },
    ], [aboutRef, skillsRef, projectsRef, contactRef]);

    // Scrollspy-like effect for highlighting nav
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
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            setTheme(savedTheme);
        } else {
            setTheme('dark');
        }
        document.body.className = theme === 'dark' ? 'dark-mode' : 'light-mode';
    }, [theme]);

    const handleLinkClick = (linkId) => {
        setActiveLink(linkId);
        setMenuOpen(false);
    };

    const toggleMenu = () => {
        setMenuOpen((prevMenuOpen) => !prevMenuOpen);
    };

    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === 'dark' ? 'light' : 'dark'));
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
    demo: "", // No live demo, arrow will link to GitHub
    tech: ["Python", "BeautifulSoup", "Requests"],
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?fit=crop&w=400&q=80"
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


const skills = [
  {
    name: "HTML5",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
    description:
      "I use HTML5 to structure web pages and create semantic, accessible layouts as the foundation for all my frontend projects.",
  },
  {
    name: "CSS3",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
    description:
      "CSS3 helps me style websites, implement responsive designs, and add modern visual effects using Flexbox, Grid, and animations.",
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
    name: "Python",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
    description:
      "Python is my go-to for backend development, data analysis, and scripting thanks to its readability and rich ecosystem.",
  },
];

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

            {/* Mobile Menu Toggle */}
            <button
                className={`menu-toggle ${menuOpen ? 'open' : ''}`}
                onClick={toggleMenu}
                aria-label="Toggle navigation menu"
            >
                <div className="hamburger">
                    <span className={menuOpen ? 'open' : ''}></span>
                    <span className={menuOpen ? 'open' : ''}></span>
                    <span className={menuOpen ? 'open' : ''}></span>
                </div>
            </button>

            {/* Sidebar / Left-aligned Intro & Navigation Block */}
            <div className={`left-intro-nav ${menuOpen ? 'open' : ''}`} id="sidebar">
                {menuOpen && <div className="sidebar-overlay" onClick={toggleMenu}></div>}

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

                {/* MAIN NAVIGATION WITH ICONS */}
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
                      <span className="link-text">
                        {section.id.charAt(0).toUpperCase() + section.id.slice(1)}
                      </span>
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

            {/* Main Content Area */}
            <main className="main-content">
                <section id="about" ref={aboutRef} className="about section" data-aos="fade-up">
                    <div className="section-container">
                        <div className="about-content">
                            <div className="profile-image-wrapper" data-aos="fade-right" data-aos-delay="200"></div>
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
                                <div className="buttons-about-section">
                                    <a
                                        href="/Makomborero_Chidziva_Resume.pdf"
                                        download="Makomborero_Chidziva_Resume.pdf"
                                        className="resume-btn"
                                        data-aos="fade-up"
                                        data-aos-delay="600"
                                    >
                                        Download Resume
                                    </a>
                                    <a
                                        href="#contact"
                                        className="hire-btn"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
                                            handleLinkClick('contact');
                                        }}
                                        data-aos="fade-up"
                                        data-aos-delay="700"
                                    >
                                        HIRE ME
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

 <section id="skills" className="skills-section">
    
      <div className="skill-cards-column">
        {skills.map((skill) => (
          <div className="skill-card-vertical" key={skill.name}>
            <img src={skill.icon} alt={skill.name} className="skill-card-icon" />
            <h3>{skill.name}</h3>
            <p>{skill.description}</p>
          </div>
        ))}
      </div>
    </section>
  
   
  <section id="projects" className="projects">
     
      <div className="projects-list">
        {projects.map((project) => (
          <div className="project-row" key={project.title}>
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
          </div>
        ))}
      </div>
    </section>
  

                <section id="contact" ref={contactRef} className="contact section" data-aos="fade-up">
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
                    </div>
                </section>
            </main>
        </div>
    );
}

export default App;