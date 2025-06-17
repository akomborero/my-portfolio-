import { useState } from 'react';
import SocialLinks from '../SocialLinks';
import styles from './Contact.module.css';

export default function Contact({ formData, setFormData, handleSubmit, statusMessage, isSubmitted }) {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <section id="contact" className={styles.contact} data-aos="fade-up">
      <div className={styles.sectionContainer}>
        <h2 className={styles.sectionTitle}>Contact</h2>
        <div className={styles.sectionText}>
          <p className={styles.contactDescription}>
            I'm always excited to connect with like-minded individuals,
            collaborate on projects, or answer any questions you may have.
          </p>
          <div className={styles.contactInfo}>
            <SocialLinks />
          </div>
        </div>
        <form onSubmit={handleSubmit} className={styles.contactForm}>
          <h3>Send Me a Message</h3>
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
          {statusMessage && (
            <p className={`${styles.statusMessage} ${isSubmitted ? styles.success : styles.error}`}>
              {statusMessage}
            </p>
          )}
        </form>
      </div>
    </section>
  );
}