import styles from './About.module.css';

export default function About() {
  return (
    <section id="about" className={styles.about} data-aos="fade-up">
      <div className={styles.sectionContainer}>
       
        <div className={styles.aboutContent}>
      
          <div className={styles.aboutText}>
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
  );
}