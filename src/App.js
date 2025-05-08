import React, { useState, useEffect } from 'react';
import './App.css';
import emailjs from 'emailjs-com';
import { Helmet } from 'react-helmet';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useTypewriter } from './hooks/useTypewriter';

// Reusable constants for EmailJS service details
const EMAILJS_SERVICE_ID = 'gmail';
const EMAILJS_TEMPLATE_ID = 'template_tpjs13f';
const EMAILJS_USER_ID = 'V25OKCvHcTET5iX5K';

function App() {
  const [activeLink, setActiveLink] = useState('home');
  const [menuOpen, setMenuOpen] = useState(false);
  const [theme, setTheme] = useState('dark'); // Manage theme state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [statusMessage, setStatusMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const { text } = useTypewriter(
    ['Web Developer', 'Software Engineer', 'Tech Enthusiast'],
    150, // typing speed
    100, // deleting speed
    1000, // pause duration
    true // loop
  );

  useEffect(() => {
    AOS.init({ duration: 1000 });

    const sections = document.querySelectorAll('section');
    const options = { root: null, threshold: 0.5 };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveLink(entry.target.id);
        }
      });
    }, options);

    sections.forEach((section) => observer.observe(section));

    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, []);

  useEffect(() => {
    if (statusMessage) {
      const timeout = setTimeout(() => {
        setStatusMessage('');
      }, 5000);
      return () => clearTimeout(timeout); // Clean up timeout
    }
  }, [statusMessage]);

  useEffect(() => {
    // Apply the chosen theme to the body class
    document.body.className = theme === 'dark' ? 'dark-mode' : 'light-mode';
  }, [theme]);

  const handleLinkClick = (link) => {
    setActiveLink(link);
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

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      setStatusMessage('All fields are required.');
      setIsSubmitted(false);
      return;
    }

    emailjs
      .send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, formData, EMAILJS_USER_ID)
      .then(
        (result) => {
          console.log(result.text);
          setStatusMessage('Your message has been sent successfully!');
          setIsSubmitted(true);
        },
        (error) => {
          console.error('EmailJS Error:', error);
          setStatusMessage('Oops! Something went wrong. Please try again.');
          setIsSubmitted(false);
        }
      );

    setFormData({
      name: '',
      email: '',
      message: '',
    });
  };

  return (
    <div className="App">
  <Helmet>
        {/* SEO Metadata */}
        <title>Makomborero Chidziva - Software Developer Portfolio</title>
        <meta name="description" content="Portfolio of Makomborero Chidziva, a software developer specializing in web development and software engineering." />
        <meta name="keywords" content="Portfolio, Software Developer, Web Developer, React, Makomborero Chidziva" />
        <meta name="author" content="Makomborero Chidziva" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        {/* Google Analytics Script */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
        <script>
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag() { dataLayer.push(arguments); }
            gtag('js', new Date());
            gtag('config', 'G-XXXXXXXXXX');
          `}
        </script>

        {/* Open Graph Metadata */}
        <meta property="og:title" content="Makomborero Chidziva - Software Developer Portfolio" />
        <meta property="og:description" content="Portfolio of Makomborero Chidziva, showcasing projects, skills, and experience." />
        <meta property="og:image" content="/profile.jpg" />
        <meta property="og:url" content="https://your-portfolio-link.com" />
        <meta property="og:type" content="website" />

        {/* Twitter Card Metadata */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Makomborero Chidziva - Software Developer Portfolio" />
        <meta name="twitter:description" content="Portfolio of Makomborero Chidziva, showcasing projects, skills, and experience." />
        <meta name="twitter:image" content="/profile.jpg" />
      </Helmet>


      {/* Theme Toggle Button */}
      <button
        className="toggle-btn"
        onClick={toggleTheme}
        title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      >
        {theme === 'dark' ? '☀️' : '🌙'}
      </button>

      {/* Menu Toggle Button */}
      <button
        className="menu-toggle"
        onClick={toggleMenu}
        aria-label="Toggle navigation menu"
      >
        {menuOpen ? '✖' : '☰'}
      </button>

      {/* Sidebar */}
      <div className={`sidebar ${menuOpen ? 'open' : ''}`}>
        <ul>
          {['home', 'about', 'skills', 'experience', 'projects', 'contact'].map(
            (section) => (
              <li key={section}>
                <a
                  href={`#${section}`}
                  className={activeLink === section ? 'active' : ''}
                  onClick={() => handleLinkClick(section)}
                >
                  {section.charAt(0).toUpperCase() + section.slice(1)}
                </a>
              </li>
            )
          )}
        </ul>
      </div>

      <div className="main-content">
      ...
        {/* Hero Section */}
        <section id="home" className="home section" data-aos="fade-up">
          <div className="hero-content">
            <h2>Hello, I'm</h2>
            <h1>Makomborero Chidziva</h1>
            <h4 className="intro-text">
              I'm a Passionate{' '}
              <span
                className="typewriter"
                style={{ color: 'var(--primary-color)' }}
              >
                {text}
              </span>
            </h4>
            <div className="profile-image-container">
              <img src="/profile.jpg" alt="Profile" className="profile-image" />
            </div>

            <div className="resume-download">
  <a
    href="/Makomborero_Chidziva_Resume.pdf"
    download="Makomborero_Chidziva_Resume.pdf"
    className="resume-btn"
  >
    Download Resume
  </a>
</div>
          </div>
        </section>
...

        {/* About Section */}
        <section id="about" className="about section" data-aos="fade-up">
          <div className="section-container">
            <h2>About Me</h2>
            <div className="about-content">
              <div className="section-text">
                <p>
                  Hi, I'm Makomborero Chidziva, a passionate software engineer
                  who loves solving problems through code. Besides coding, I
                  love to watch football and play it in my free time. I'm also
                  interested in tech innovation, AI, and machine learning.
                  Always eager to learn and take on new challenges.
                </p>
              </div>
            </div>
          </div>
        </section>

    <section id="skills" className="skills section" data-aos="fade-up">
  <div className="section-container">
    <h2>Technical Skills</h2>
    <div className="section-text">
      <p>
        I have gained experience in various programming languages and technologies,
        which allow me to build dynamic and responsive web applications.
        I am proficient in HTML, CSS, and JavaScript for front-end development,
        as well as Node.js and Express.js for back-end development. I also have
        experience in Python and Java for general-purpose programming and software development.
      </p>
      {/* Skills List */}
      <div className="skills-list">
        {[
          "HTML",
          "CSS",
          "JavaScript",
          "Node.js",
          "Express.js",
          "Python",
          "Java",
          "MySQL",
          "MongoDB",
          "PHP",
          "TypeScript",
          "Git & GitHub",
          "RESTful APIs",
          "Postman",
          "React",
        ].map((skill) => (
          <button className="skill-btn" key={skill}>
            {skill}
          </button>
        ))}
      </div>
    </div>
  </div>
</section>

        {/* Experience Section */}
        <section id="experience" className="experience section" data-aos="fade-up">
          <div className="section-container">
            <h2>Experience</h2>
            <div className="section-text">
              <p>
                I began my software development journey in 2023, driven by a
                passion for technology and innovation.
              </p>
              <p>
                To strengthen my skills and gain real-world experience, I joined{' '}
                <strong>Uncommon.org</strong>, a leading tech bootcamp.
              </p>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="projects section" data-aos="fade-up">
          <div className="section-container">
            <h2>Projects</h2>
            <div className="projects-list">
              <div className="project-card">
                <h3>Payslip Generator</h3>
                <p>
                  A Python tool that reads employee data from Excel, calculates net
                  salaries, generates PDFs, and emails payslips.
                </p>
                <a
                  href="https://github.com/akomborero/payslip-generator"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View Project
                </a>
              </div>
              <div className="project-card">
                <h3>Web Scraper & Data Aggregator</h3>
                <p>
                  Scrapes job data from VacancyMail, saves the latest jobs into CSV, and
                  automates the process using `schedule`.
                </p>
                <a
                  href="https://github.com/akomborero/Scrap_job-project"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View Project
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="contact section" data-aos="fade-up">
          <div className="section-container">
            <h2>Contact</h2>
            <div className="section-text">
              <p className="contact-description">
                I'm always excited to connect with like-minded individuals,
                collaborate on projects, or answer any questions you may have.
                Whether you're looking to discuss opportunities, share ideas, or
                simply say hello, feel free to reach out!
              </p>
              <div className="contact-info">
                <ul>
                  <li>
                    <a
                      href="mailto:makomborerichidzviva@gmail.com"
                      title="Send me an email"
                    >
                      <img
                        src="/email-logo.png"
                        alt="Email"
                        style={{ width: '30px', height: '30px' }}
                      />
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://github.com/akomborero"
                      target="_blank"
                      rel="noopener noreferrer"
                      title="Visit my GitHub profile"
                    >
                      <img
                        src="/github-logo.png"
                        alt="GitHub"
                        style={{ width: '30px', height: '30px' }}
                      />
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.linkedin.com/in/makomborero-chidziva-755659350"
                      target="_blank"
                      rel="noopener noreferrer"
                      title="Connect with me on LinkedIn"
                    >
                      <img
                        src="/linkedin-logo.png"
                        alt="LinkedIn"
                        style={{ width: '30px', height: '30px' }}
                      />
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <form className="contact-form" onSubmit={handleSubmit}>
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
      </div>
    </div>
  );
}

export default App;