import styles from './Projects.module.css';

export default function Projects() {
  const projects = [
    {
      id: 1,
      title: "Payslip Generator",
      description: "A Python tool that reads employee data from Excel, calculates net salaries, generates PDFs, and emails payslips.",
      technologies: ["Python", "Pandas", "PDF Generation"],
      githubUrl: "https://github.com/akomborero/payslip-generator",
      imageUrl: "/placeholder-project-1.jpg"
    },
    {
      id: 2,
      title: "Web Scraper & Data Aggregator",
      description: "Scrapes job data from VacancyMail, saves the latest jobs into CSV, and automates the process using `schedule`.",
      technologies: ["Python", "Web Scraping", "Automation"],
      githubUrl: "https://github.com/akomborero/Scrap_job-project",
      imageUrl: "/placeholder-project-2.jpg"
    }
  ];

  return (
    <section id="projects" className={styles.projects} data-aos="fade-up">
      <div className={styles.sectionContainer}>
        <h2 className={styles.sectionTitle}>Projects</h2>
        <div className={styles.projectsList}>
          {projects.map((project) => (
            <div key={project.id} className={styles.projectCard}>
              <div className={styles.projectImageContainer}>
                <img src={project.imageUrl} alt={project.title} className={styles.projectThumbnail} />
              </div>
              <div className={styles.projectDetails}>
                <h3>{project.title}</h3>
                <p className={styles.projectDescription}>{project.description}</p>
                <div className={styles.projectTech}>
                  {project.technologies.map((tech) => (
                    <span key={tech}>{tech}</span>
                  ))}
                </div>
                <div className={styles.projectLinks}>
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View Code
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}