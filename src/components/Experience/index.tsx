import styles from './Experience.module.css';

export default function Experience() {
  return (
    <section id="experience" className={styles.experience} data-aos="fade-up">
      <div className={styles.sectionContainer}>
        <h2 className={styles.sectionTitle}>Experience</h2>
        <div className={styles.sectionText}>
          <p>
            I began my software development journey in 2023, driven by a
            passion for technology and innovation.
          </p>
          <div className={styles.experienceItem}>
            <h3>Build with AI Hackathon - <span className={styles.hackathonWinner}>Winner</span></h3>
            <p className={styles.experienceDate}>May 2025</p>
            <p>
              First Hackathon - We Won! That powerful line, "AI won't replace you. A person using AI will," 
              truly played out for me at the 'Build with AI' Workshop by GDG Harare.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}