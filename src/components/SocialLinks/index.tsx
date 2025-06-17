import styles from './SocialLinks.module.css';

export default function SocialLinks() {
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
    <div className={styles.socialLinks}>
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
}