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

// Social Links Component
const SocialLinks = () => {
  const socialLinks = [
    {
      name: 'GitHub',
      url: 'https://github.com/akomborero',
      icon: '/github-logo.png'
    },
    {
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/in/makomborero-chidziva-755659350',
      icon: '/linkedin-logo.png'
    },
    {
      name: 'Email',
      url: 'mailto:makomborerichidzviva@gmail.com',
      icon: '/email-logo.png'
    }
  ];

  return (
    <div className="social-links">
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
            width="30" 
            height="30" 
          />
        </a>
      ))}
    </div>
  );
};

function App() {
  const [activeLink, setActiveLink] = useState('home');
  const [menuOpen, setMenuOpen] = useState(false);
  const [theme, setTheme] = useState('dark');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [statusMessage, setStatusMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const { text } = useTypewriter(
    ['Web Developer', 'Software Engineer', 'Tech Enthusiast'],
    150,
    100,
    1000,
    true
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
      return () => clearTimeout(timeout);
    }
  }, [statusMessage]);

  useEffect(() => {
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

      <button
        className="toggle-btn"
        onClick={toggleTheme}
        title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      >
        {theme === 'dark' ? '☀️' : '🌙'}
      </button>

      <button
        className="menu-toggle"
        onClick={toggleMenu}
        aria-label="Toggle navigation menu"
      >
        {menuOpen ? '✖' : '☰'}
      </button>

      <div className={`sidebar ${menuOpen ? 'open' : ''}`} id="sidebar">
      <div className="text-sidebar">
  <div className="sidebar-header">
    
  </div>
  <div className="sidebar-links">
    {['Home', 'About', 'Skills', 'Experience', 'Projects', 'Contact'].map((item) => (
      <div 
        key={item.toLowerCase()}
        className={`sidebar-link ${activeLink === item.toLowerCase() ? 'active' : ''}`}
        onClick={() => handleLinkClick(item.toLowerCase())}
      >
        {item}
      </div>
    ))}
  </div>
  <div className="sidebar-footer">
    <SocialLinks />
    
  </div>
</div>
    
      </div>

      {menuOpen && (
        <div 
          className="sidebar-overlay" 
          onClick={toggleMenu}
          role="button"
          aria-label="Close menu"
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && toggleMenu()}
        />
      )}

      <button
        className="menu-toggle"
        onClick={toggleMenu}
        aria-expanded={menuOpen}
        aria-label="Toggle navigation menu"
        aria-controls="sidebar"
      >
        {menuOpen ? '✕' : '☰'}
      </button>

      <div className="main-content">
        <section id="home" className="home section" data-aos="fade-up">
          <div className="hero-content">
            <h3>Hello, I'm</h3>
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
            <div className="hero-profile-container">
              <img 
                src="/profile.jpg" 
                alt="Makomborero Chidziva" 
                className="hero-profile-image" 
                loading="lazy"
                width="120"
                height="120"
              />
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

        <section id="about" className="about section" data-aos="fade-up">
          <div className="section-container">
            <h2>About Me</h2>
            <div className="about-content">
              <div className="profile-image-wrapper">
                <div className="profile-image-container">
                  <img
                    src="/profile.jpg"
                    alt="Makomborero Chidziva"
                    className="profile-image"
                    loading="lazy"
                    width="300"
                    height="300"
                  />
                  <div className="profile-image-border"></div>
                </div>
              </div>
              
              <div className="about-text">
                <p>
                  Hi, I'm Makomborero Chidziva, a passionate software engineer
                  who loves solving problems through code. Besides coding, I
                  love to watch football and play it in my free time. I'm also
                  interested in tech innovation, AI, and Data science.
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
              <br></br>
              <div className="experience-item">
                <h3>Build with AI Hackathon - <span className="hackathon-winner">Winner</span></h3>
                <p className="experience-date">May 2025</p>
                <p>
                  First Hackathon - We Won!
                  That powerful line, "AI won't replace you. A person using AI will," truly played out for me at the 'Build with AI' Workshop by GDG Harare. Teaming up with Tapiwa Gombarume and Brenda Chinokoro, it was our first hackathon, and we had just two hours to go from idea to prototype. No time to second-guess – just focus, fast thinking, and figuring it out as we went.
                  We didn't just attend; we jumped into the deep end. And we won! 🏆
                  What helped us stand out? We kept things simple and focused, built for a clear need (a database solution for hospitals focused on enhancing efficiency and data management), and used AI to speed up what mattered, not overcomplicate it.
                  This challenge truly pushed us forward, fast, highlighting the importance of showing up to local dev events, collaborating with others who think differently, and building within tight limits – deadlines sharpen decision-making.
                  It's tempting to wait until you feel "ready," but readiness often comes after you leap. This experience taught me invaluable lessons about teamwork, rapid iteration, and focused execution under pressure.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="projects" className="projects section" data-aos="fade-up">
          <div className="section-container">
            <h2>Projects</h2>
            <div className="projects-list">
              <div className="project-card">
                <div className="project-image-container">
                 
                </div>
                <div className="project-details">
                  <h3>Payslip Generator</h3>
                  <p className="project-description">
                    A Python tool that reads employee data from Excel, calculates net
                    salaries, generates PDFs, and emails payslips.
                  </p>
                  <div className="project-tech">
                    <span>Python</span>
                    <span>Pandas</span>
                    <span>PDF Generation</span>
                  </div>
                  <div className="project-links">
                    <a
                      href="https://github.com/akomborero/payslip-generator"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View Code
                    </a>
                  </div>
                </div>
              </div>
              <div className="project-card">
                <div className="project-image-container">
                
                </div>
                <div className="project-details">
                  <h3>Web Scraper & Data Aggregator</h3>
                  <p className="project-description">
                    Scrapes job data from VacancyMail, saves the latest jobs into CSV, and
                    automates the process using `schedule`.
                  </p>
                  <div className="project-tech">
                    <span>Python</span>
                    <span>Web Scraping</span>
                    <span>Automation</span>
                  </div>
                  <div className="project-links">
                    <a
                      href="https://github.com/akomborero/Scrap_job-project"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View Code
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

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
                <SocialLinks />
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