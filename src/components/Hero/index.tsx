import { motion } from 'framer-motion';
import { useTypewriter } from '../../hooks/useTypewriter';
import styles from './Hero.module.css';

export default function Hero() {
  const { text } = useTypewriter(['Software Engineer', 'Web Developer', 'Tech Enthusiast']);

  return (
    <section id="home" className={styles.hero}>
      <div className={styles.container}>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={styles.content}
        >
          <h3 className={styles.subtitle}>Hi, my name is</h3>
          <h1 className={styles.title}>Your Name.</h1>
          <h2 className={styles.heading}>I build {text}</h2>
          <p className={styles.description}>
            I specialize in building exceptional digital experiences.
          </p>
          <a href="#projects" className={styles.button}>View Projects</a>
        </motion.div>
      </div>
    </section>
  );
}