import React from 'react';
import SettingsForm from './components/SettingsForm.jsx';

export default function App() {
  const features = [
    {
      title: 'Targeted Skill Mapping',
      description: 'Define competencies and organize skills across domains and proficiency levels.',
      icon: '🎯',
    },
    {
      title: 'Progress Tracking',
      description: 'Log milestones, set learning goals, and visualize continuous improvement over time.',
      icon: '📈',
    },
    {
      title: 'Actionable Insights',
      description: 'Gain clarity on skill gaps and receive data-driven recommendations for next steps.',
      icon: '⚡',
    },
  ];

  return (
    <div className="page-container">
      <header className="navbar">
        <div className="nav-brand">
          <span className="logo-icon">🚀</span>
          <span className="brand-name">SkillTrack</span>
        </div>
        <nav className="nav-links">
          <a href="#features">Features</a>
          <a href="#settings">Settings</a>
          <a href="#about">About</a>
          <button className="btn btn-secondary">Sign In</button>
        </nav>
      </header>

      <main>
        <section className="hero">
          <span className="badge">Now in Preview</span>
          <h1 className="hero-title">Track, measure, and master your technical growth</h1>
          <p className="hero-subtitle">
            SkillTrack provides developers and teams with a centralized platform to map out
            skills, track learning milestones, and achieve career goals.
          </p>
          <div className="hero-actions">
            <button className="btn btn-primary">Get Started</button>
            <button className="btn btn-outline">Explore Demo</button>
          </div>
        </section>

        <section id="features" className="features-section">
          <div className="section-header">
            <h2>Built for Continuous Learning</h2>
            <p>Everything you need to stay on top of your professional development.</p>
          </div>
          <div className="feature-grid">
            {features.map((feature, idx) => (
              <div key={idx} className="feature-card">
                <div className="feature-icon">{feature.icon}</div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="settings" className="settings-section">
          <div className="section-header">
            <h2>Profile & Study Settings</h2>
            <p>Customize your learning preferences and study commitments.</p>
          </div>
          <SettingsForm />
        </section>

        <section id="about" className="cta-section">
          <h2>Ready to accelerate your learning?</h2>
          <p>Join developers taking control of their career trajectories today.</p>
          <button className="btn btn-primary">Start Tracking Free</button>
        </section>
      </main>

      <footer className="footer">
        <p>&copy; {new Date().getFullYear()} SkillTrack. All rights reserved.</p>
      </footer>
    </div>
  );
}
