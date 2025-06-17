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

function App() {
    // Initial activeLink set to 'about' since 'home' is removed
    const [activeLink, setActiveLink] = useState('about');
    const [menuOpen, setMenuOpen] = useState(false); // For mobile hamburger menu
    const [theme, setTheme] = useState('dark');
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
    });
    const [statusMessage, setStatusMessage] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);

    // Refs for each section to observe their visibility
    const aboutRef = useRef(null);
    const skillsRef = useRef(null);

    const projectsRef = useRef(null);
    const contactRef = useRef(null);

    // Use useMemo to ensure the sections array is only created once
    const sections = useMemo(() => [
        { id: 'ABOUT', ref: aboutRef }, // Changed to lowercase to match common practice and potential href values
        { id: 'SKILS', ref: skillsRef }, // Changed to lowercase

        { id: 'PROJECTS', ref: projectsRef }, // Changed to lowercase
        { id: 'CONTACT', ref: contactRef }, // Changed to lowercase
    ], [aboutRef, skillsRef, projectsRef, contactRef]);

    // Initialize AOS and IntersectionObserver for active link highlighting
    useEffect(() => {
        AOS.init({ duration: 1000, once: true }); // Added `once: true` to make animations trigger only once

        const observerOptions = { root: null, threshold: 0.5 }; // Observe when 50% of section is visible

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

        // Cleanup function for IntersectionObserver
        return () => {
            sections.forEach(section => {
                if (section.ref.current) {
                    observer.unobserve(section.ref.current);
                }
            });
        };
    }, [sections]); // Dependency on sections ensures observer is set up correctly

    // Effect for status message timeout
    useEffect(() => {
        if (statusMessage) {
            const timeout = setTimeout(() => {
                setStatusMessage('');
            }, 5000);
            return () => clearTimeout(timeout);
        }
    }, [statusMessage]);

    // Effect for theme class on body
    useEffect(() => {
        // Load theme from localStorage on initial mount
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            setTheme(savedTheme);
        } else {
            // Default to dark if no theme saved
            setTheme('dark');
        }
        document.body.className = theme === 'dark' ? 'dark-mode' : 'light-mode';
    }, [theme]); // Only runs when theme state changes

    const handleLinkClick = (linkId) => {
        setActiveLink(linkId);
        // This is handled by the scrollIntoView in the onClick handler directly,
        // but keeping it here for consistency if you modify nav logic.
        setMenuOpen(false); // Close menu on link click for mobile
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

    // Social links data (moved here for direct use in JSX)
    const socialLinksData = [
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

            {/* Theme Toggle Button (Top Right, always visible) */}
            <button
                className="toggle-btn"
                onClick={toggleTheme}
                title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            >
                {theme === 'dark' ? '☀️' : '🌙'}
            </button>

            {/* Mobile Menu Toggle Button (Hamburger icon) */}
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
                {/* Overlay for mobile sidebar */}
                {menuOpen && <div className="sidebar-overlay" onClick={toggleMenu}></div>}

                <div className="profile-badge">
                    <h3>Makomborero Chidziva</h3>
                    <p className="short-bio">
                        I'm a full-stack developer who builds robust and scalable web applications.
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
                    {sections.map((section) => (
                        <a
                            key={section.id}
                            href={`#${section.id}`}
                            className={activeLink === section.id ? 'active' : ''}
                            onClick={(e) => {
                                e.preventDefault();
                                document.getElementById(section.id).scrollIntoView({ behavior: 'smooth' });
                                handleLinkClick(section.id);
                            }}
                        >
                            <span className="link-text">{section.id.charAt(0).toUpperCase() + section.id.slice(1)}</span>
                            <span className="link-arrow">→</span> {/* Arrow icon */}
                        </a>
                    ))}
                </nav>

                {/* Social Links and Copyright are now directly within the left-intro-nav and will align via its flex properties */}
                <div className="social-links-main">
                    {socialLinksData.map((link) => (
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
                <p className="copyright">&copy; {new Date().getFullYear()} Makomborero Chidziva</p>
            </div>


            {/* Main Content Area */}
            <main className="main-content">
                <section id="about" ref={aboutRef} className="about section" data-aos="fade-up">
                    <div className="section-container">
                        <div className="about-content">
                            <div className="profile-image-wrapper" data-aos="fade-right" data-aos-delay="200"> {/* Added AOS to image */}
                               
                            </div>

                            <div className="about-text" data-aos="fade-left" data-aos-delay="400"> {/* Added AOS to text */}
<p>
    Hello! I'm Makomborero, a passionate and driven software developer based in Harare, Zimbabwe. My journey into programming began with a fascination for how digital solutions simplify complex problems and create impactful experiences. I thrive on building elegant, efficient, and scalable applications that solve real-world challenges, whether crafting robust backend systems, designing intuitive user interfaces, or optimizing performance. My commitment extends beyond just writing code; I strive to understand underlying needs and deliver solutions that truly make a difference. Currently, I'm enhancing my skills as an enrolled student in the **uncommon.org bootcamp**, where I'm gaining advanced knowledge and practical experience. I'm also proud to have been a **hackathon winner**, a testament to my problem-solving abilities and rapid prototyping skills under pressure. When I'm not coding, you can find me exploring the latest tech trends or contributing to open-source projects. I'm always looking for opportunities to collaborate on exciting projects and connect with fellow innovators.
</p>
                                <div className="buttons-about-section">
                                    <a
                                        href="/Makomborero_Chidziva_Resume.pdf"
                                        download="Makomborero_Chidziva_Resume.pdf"
                                        className="resume-btn"
                                        data-aos="fade-up" // AOS for resume button
                                        data-aos-delay="600" // Staggered animation
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
                                        data-aos="fade-up" // AOS for hire button
                                        data-aos-delay="700" // Staggered animation
                                    >
                                        HIRE ME
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

              <section id="skills" ref={skillsRef} className="skills section" data-aos="fade-up">
                    <div className="section-container">
                      
                        <div className="section-text">
                            <p>
                                I have gained experience in various programming languages and technologies,
                                which allow me to build dynamic and responsive web applications.
                                I am proficient in HTML, CSS, and JavaScript for front-end development,
                                as well as Node.js and Express.js for back-end development. I also have
                                experience in Python and Java for general-purpose programming and software development.
                            </p>
                            <div className="skills-list" data-aos="fade-up" data-aos-delay="200"> {/* Added AOS */}
                                {[
                                    "HTML", "CSS", "JavaScript", "Node.js", "Express.js",
                                    "Python", "Java", "MySQL", "MongoDB", "PHP",
                                    "TypeScript", "Git & GitHub", "RESTful APIs", "Postman", "React",
                                ].map((skill) => (
                                    <button className="skill-btn" key={skill}>
                                        {skill}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>


                <section id="projects" ref={projectsRef} className="projects section" data-aos="fade-up">
                    <div className="section-container">
                      {/* Added AOS */}
                        <div className="projects-list">
                            <div className="project-card" data-aos="fade-up" data-aos-delay="200"> {/* Added AOS */}
                                <div className="project-image-container">
                                    <img src="/placeholder-project-1.jpg" alt="Payslip Generator Thumbnail" className="project-thumbnail" />
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
                            <div className="project-card" data-aos="fade-up" data-aos-delay="300"> {/* Added AOS */}
                                <div className="project-image-container">
                                    <img src="/placeholder-project-2.jpg" alt="Web Scraper Thumbnail" className="project-thumbnail" />
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

                <section id="contact" ref={contactRef} className="contact section" data-aos="fade-up">
                    <div className="section-container">
                     {/* Added AOS */}
                        <div className="section-text">
                            <p className="contact-description">
                                I'm always excited to connect with like-minded individuals,
                                collaborate on projects, or answer any questions you may have.
                                Whether you're looking to discuss opportunities, share ideas, or
                                simply say hello, feel free to reach out!
                            </p>
                        </div>
                        <form className="contact-form" onSubmit={handleSubmit} data-aos="fade-up" data-aos-delay="200"> {/* Added AOS */}
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