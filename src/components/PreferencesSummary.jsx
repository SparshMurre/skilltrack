import React from 'react';
import {
  GOAL_OPTIONS,
  EXPERIENCE_LEVELS,
  LEARNING_STYLES,
  LEARNING_PACES,
  REMINDER_FREQUENCIES,
} from '../utils/preferences';

export default function PreferencesSummary({ preferences, onOpenSettings }) {
  if (!preferences) return null;

  const currentGoal = GOAL_OPTIONS.find((g) => g.value === preferences.primaryGoal) || {
    label: preferences.primaryGoal,
    description: '',
  };

  const currentLevel = EXPERIENCE_LEVELS.find((l) => l.value === preferences.experienceLevel) || {
    label: preferences.experienceLevel,
  };

  const currentPace = LEARNING_PACES.find((p) => p.value === preferences.learningPace) || {
    label: preferences.learningPace,
  };

  const currentReminder = REMINDER_FREQUENCIES.find(
    (r) => r.value === preferences.reminderFrequency
  ) || { label: preferences.reminderFrequency };

  const activeStyles = LEARNING_STYLES.filter((s) =>
    preferences.learningStyles?.includes(s.id)
  );

  return (
    <section className="preferences-summary-card" aria-label="Active learning preferences">
      <div className="preferences-header">
        <div className="preferences-title-group">
          <span className="preferences-badge">Active Preferences</span>
          <h2 className="preferences-title">Your Current Learning Plan</h2>
          <p className="preferences-subtitle">
            SkillTrack tailors recommendations and roadmap milestones based on these settings.
          </p>
        </div>
        <button
          type="button"
          className="btn btn-primary btn-sm"
          onClick={onOpenSettings}
        >
          ⚙️ Edit Preferences
        </button>
      </div>

      <div className="preferences-grid">
        <div className="pref-item">
          <span className="pref-label">Track & Level</span>
          <div className="pref-value-group">
            <span className="pref-value-primary">{currentGoal.label}</span>
            <span className="pref-value-badge">{currentLevel.label}</span>
          </div>
          <span className="pref-detail">{currentGoal.description}</span>
        </div>

        <div className="pref-item">
          <span className="pref-label">Weekly Target</span>
          <div className="pref-value-group">
            <span className="pref-value-primary">{preferences.weeklyHours} hrs / week</span>
            <span className="pref-value-badge">{currentPace.label}</span>
          </div>
          <span className="pref-detail">
            ~{Math.round((preferences.weeklyHours * 60) / 7)} mins per day
          </span>
        </div>

        <div className="pref-item">
          <span className="pref-label">Reminders</span>
          <div className="pref-value-group">
            <span className="pref-value-primary">{currentReminder.label}</span>
          </div>
          <span className="pref-detail">
            Preferred window: {preferences.preferredTime || 'Evening'}
          </span>
        </div>

        <div className="pref-item">
          <span className="pref-label">Preferred Formats</span>
          <div className="pref-styles-list">
            {activeStyles.map((s) => (
              <span key={s.id} className="style-pill">
                {s.label}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="pref-topics-section">
        <span className="pref-label">Prioritized Tech Stack & Topics ({preferences.focusTopics?.length || 0}):</span>
        <div className="topic-tags">
          {preferences.focusTopics?.map((topic) => (
            <span key={topic} className="topic-tag">
              #{topic}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
