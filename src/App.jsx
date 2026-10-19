import React, { useState, useEffect } from 'react';
import SettingsModal from './components/SettingsModal';
import PreferencesSummary from './components/PreferencesSummary';
import { getSavedPreferences } from './utils/preferences';

export default function App() {
  const [preferences, setPreferences] = useState(() => getSavedPreferences());
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  useEffect(() => {
    // Open settings if URL contains #settings hash
    const checkHash = () => {
      if (window.location.hash === '#settings') {
        setIsSettingsOpen(true);
      }
    };
    checkHash();
    window.addEventListener('hashchange', checkHash);
    return () => window.removeEventListener('hashchange', checkHash);
  }, []);

  const handleOpenSettings = () => {
    setIsSettingsOpen(true);
  };

  const handleCloseSettings = () => {
    setIsSettingsOpen(false);
    if (window.location.hash === '#settings') {
      history.replaceState(null, '', window.location.pathname + window.location.search);
    }
  };

  const handleSavePreferences = (updated) => {
    setPreferences(updated);
  };

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
          <a href="#learning-plan">My Plan</a>
          <a href="#features">Features</a>
          <a href="#about">About</a>
          <button
            type="button"
            className="btn btn-secondary nav-settings-btn"
            onClick={handleOpenSettings}
            aria-label="Open learning preferences settings"
          >
            ⚙️ Settings
          </button>
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
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleOpenSettings}
            >
              Configure Learning Preferences
            </button>
            <a href="#learning-plan" className="btn btn-outline">
              View Active Plan
            </a>
          </div>
        </section>

        <section id="learning-plan" className="plan-section">
          <PreferencesSummary
            preferences={preferences}
            onOpenSettings={handleOpenSettings}
          />
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

        <section id="about" className="cta-section">
          <h2>Ready to accelerate your learning?</h2>
          <p>Join developers taking control of their career trajectories today.</p>
          <button
            type="button"
            className="btn btn-primary"
            onClick={handleOpenSettings}
          >
            Update Learning Preferences
          </button>
        </section>
      </main>

      <footer className="footer">
        <p>&copy; {new Date().getFullYear()} SkillTrack. All rights reserved.</p>
      </footer>

      {/* Learning Preferences Settings Modal */}
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={handleCloseSettings}
        initialPreferences={preferences}
        onSave={handleSavePreferences}
      />
    </div>
  );
}
