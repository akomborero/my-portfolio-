import { useEffect } from 'react';
import SocialLinks from '../SocialLinks';
import styles from './Navbar.module.css';

export default function Navbar({ 
  activeLink, 
  menuOpen, 
  theme, 
  setActiveLink, 
  setMenuOpen, 
  toggleTheme 
}) {
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [menuOpen]);

  return (
    <>
      <nav className={`${styles.navbar} ${menuOpen ? styles.open : ''}`}>
        <div className={styles.container}>
          <a href="/" className={styles.logo}>Makomborero</a>
          
          <div className={styles.links}>
            {['home', 'about', 'skills', 'experience', 'projects', 'contact'].map((link) => (
              <a
                key={link}
                href={`#${link}`}
                className={`${styles.link} ${activeLink === link ? styles.active : ''}`}
                onClick={() => {
                  setActiveLink(link);
                  setMenuOpen(false);
                }}
              >
                {link.charAt(0).toUpperCase() + link.slice(1)}
              </a>
            ))}
          </div>

          <div className={styles.themeToggle} onClick={toggleTheme}>
            {theme === 'dark' ? '☀️' : '🌙'}
          </div>

          <div 
            className={`${styles.menuButton} ${menuOpen ? styles.open : ''}`} 
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </nav>

      {menuOpen && (
        <div className={styles.mobileMenu}>
          <div className={styles.mobileLinks}>
            {['home', 'about', 'skills', 'experience', 'projects', 'contact'].map((link) => (
              <a
                key={link}
                href={`#${link}`}
                className={`${styles.mobileLink} ${activeLink === link ? styles.active : ''}`}
                onClick={() => {
                  setActiveLink(link);
                  setMenuOpen(false);
                }}
              >
                {link.charAt(0).toUpperCase() + link.slice(1)}
              </a>
            ))}
            <SocialLinks />
          </div>
        </div>
      )}
    </>
  );
}