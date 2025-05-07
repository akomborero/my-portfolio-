import React from 'react';

const Skills = () => {
  return (
    <section id="skills">
      <h2>Skills</h2>
      <div className="skills-list">
        <div className="skill">
          <span>🌐</span>
          <h3>HTML</h3>
          <div className="skill-progress">
            <div className="progress-bar" style={{ width: '90%' }}></div>
          </div>
        </div>
        <div className="skill">
          <span>🎨</span>
          <h3>CSS</h3>
          <div className="skill-progress">
            <div className="progress-bar" style={{ width: '85%' }}></div>
          </div>
        </div>
        <div className="skill">
          <span>📜</span>
          <h3>JavaScript</h3>
          <div className="skill-progress">
            <div className="progress-bar" style={{ width: '80%' }}></div>
          </div>
        </div>
        <div className="skill">
          <span>⚛️</span>
          <h3>React</h3>
          <div className="skill-progress">
            <div className="progress-bar" style={{ width: '75%' }}></div>
          </div>
        </div>
        <div className="skill">
          <span>🐍</span>
          <h3>Python</h3>
          <div className="skill-progress">
            <div className="progress-bar" style={{ width: '70%' }}></div>
          </div>
        </div>
        <div className="skill">
          <span>🗃️</span>
          <h3>SQL</h3>
          <div className="skill-progress">
            <div className="progress-bar" style={{ width: '60%' }}></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
