import React, { useState } from 'react';
import {
  DEFAULT_PREFERENCES,
  GOAL_OPTIONS,
  EXPERIENCE_LEVELS,
  LEARNING_STYLES,
  POPULAR_TOPICS,
  REMINDER_FREQUENCIES,
  PREFERRED_TIMES,
  LEARNING_PACES,
  savePreferences,
} from '../utils/preferences';

export default function SettingsForm({
  initialPreferences,
  onSave,
  onCancel,
}) {
  const [formData, setFormData] = useState(() => ({
    ...DEFAULT_PREFERENCES,
    ...(initialPreferences || {}),
  }));

  const [customTopicInput, setCustomTopicInput] = useState('');
  const [saveStatus, setSaveStatus] = useState(null); // 'success' | null
  const [errorMessage, setErrorMessage] = useState(null);

  const handleFieldChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setSaveStatus(null);
    setErrorMessage(null);
  };

  const handleStyleToggle = (styleId) => {
    setFormData((prev) => {
      const exists = prev.learningStyles.includes(styleId);
      const updated = exists
        ? prev.learningStyles.filter((id) => id !== styleId)
        : [...prev.learningStyles, styleId];
      return { ...prev, learningStyles: updated };
    });
    setSaveStatus(null);
    setErrorMessage(null);
  };

  const handleTopicToggle = (topic) => {
    setFormData((prev) => {
      const exists = prev.focusTopics.includes(topic);
      const updated = exists
        ? prev.focusTopics.filter((t) => t !== topic)
        : [...prev.focusTopics, topic];
      return { ...prev, focusTopics: updated };
    });
    setSaveStatus(null);
    setErrorMessage(null);
  };

  const handleAddCustomTopic = (e) => {
    e.preventDefault();
    const trimmed = customTopicInput.trim();
    if (!trimmed) return;

    if (formData.focusTopics.some((t) => t.toLowerCase() === trimmed.toLowerCase())) {
      setErrorMessage(`"${trimmed}" is already in your focus topics.`);
      return;
    }

    setFormData((prev) => ({
      ...prev,
      focusTopics: [...prev.focusTopics, trimmed],
    }));
    setCustomTopicInput('');
    setErrorMessage(null);
    setSaveStatus(null);
  };

  const handleRemoveTopic = (topicToRemove) => {
    setFormData((prev) => ({
      ...prev,
      focusTopics: prev.focusTopics.filter((t) => t !== topicToRemove),
    }));
    setSaveStatus(null);
    setErrorMessage(null);
  };

  const handleResetToDefaults = () => {
    setFormData(DEFAULT_PREFERENCES);
    setCustomTopicInput('');
    setErrorMessage(null);
    setSaveStatus(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation
    if (formData.weeklyHours < 1 || formData.weeklyHours > 60) {
      setErrorMessage('Weekly commitment must be between 1 and 60 hours.');
      return;
    }
    if (formData.learningStyles.length === 0) {
      setErrorMessage('Please select at least one preferred learning style.');
      return;
    }
    if (formData.focusTopics.length === 0) {
      setErrorMessage('Please select at least one focus technology or topic.');
      return;
    }

    savePreferences(formData);
    setSaveStatus('success');
    setErrorMessage(null);

    if (onSave) {
      onSave(formData);
    }
  };

  // Helper calculation for daily study commitment
  const dailyMinutes = Math.round((formData.weeklyHours * 60) / 7);
  const dailyHoursFormatted =
    dailyMinutes >= 60
      ? `${Math.floor(dailyMinutes / 60)}h ${dailyMinutes % 60 > 0 ? `${dailyMinutes % 60}m` : ''}`
      : `${dailyMinutes} mins`;

  return (
    <form className="settings-form" onSubmit={handleSubmit} noValidate>
      {saveStatus === 'success' && (
        <div className="alert alert-success" role="status" aria-live="polite">
          <span className="alert-icon">✓</span>
          <div>
            <strong>Preferences Saved!</strong>
            <p>Your learning settings and target schedule have been updated.</p>
          </div>
        </div>
      )}

      {errorMessage && (
        <div className="alert alert-error" role="alert" aria-live="assertive">
          <span className="alert-icon">⚠️</span>
          <div>
            <strong>Notice</strong>
            <p>{errorMessage}</p>
          </div>
        </div>
      )}

      {/* Section 1: Goal & Experience */}
      <fieldset className="form-section">
        <legend className="section-title">
          <span className="section-badge">1</span>
          Target Role & Experience
        </legend>
        <p className="section-desc">
          Define your primary technical focus and current proficiency baseline.
        </p>

        <div className="form-group">
          <label htmlFor="primaryGoal" className="form-label">
            Primary Career Track / Focus
          </label>
          <select
            id="primaryGoal"
            className="form-select"
            value={formData.primaryGoal}
            onChange={(e) => handleFieldChange('primaryGoal', e.target.value)}
          >
            {GOAL_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label} — {opt.description}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label className="form-label">Current Experience Level</label>
          <div className="radio-tile-grid">
            {EXPERIENCE_LEVELS.map((level) => {
              const isChecked = formData.experienceLevel === level.value;
              return (
                <label
                  key={level.value}
                  className={`radio-tile ${isChecked ? 'active' : ''}`}
                >
                  <input
                    type="radio"
                    name="experienceLevel"
                    value={level.value}
                    checked={isChecked}
                    onChange={(e) => handleFieldChange('experienceLevel', e.target.value)}
                    className="visually-hidden"
                  />
                  <div className="tile-content">
                    <span className="tile-title">{level.label}</span>
                    <span className="tile-desc">{level.description}</span>
                  </div>
                </label>
              );
            })}
          </div>
        </div>
      </fieldset>

      {/* Section 2: Time Commitment & Pace */}
      <fieldset className="form-section">
        <legend className="section-title">
          <span className="section-badge">2</span>
          Weekly Commitment & Pace
        </legend>
        <p className="section-desc">
          Set realistic time milestones to keep your learning consistent and burnout-free.
        </p>

        <div className="form-group">
          <div className="slider-header">
            <label htmlFor="weeklyHours" className="form-label">
              Weekly Learning Goal
            </label>
            <span className="hours-badge">
              <strong>{formData.weeklyHours} hrs / week</strong> (~{dailyHoursFormatted} / day)
            </span>
          </div>

          <div className="slider-container">
            <input
              type="range"
              id="weeklyHours"
              min="1"
              max="35"
              step="1"
              value={formData.weeklyHours}
              onChange={(e) => handleFieldChange('weeklyHours', Number(e.target.value))}
              className="form-slider"
            />
            <div className="slider-ticks">
              <span>1 hr</span>
              <span>10 hrs</span>
              <span>20 hrs</span>
              <span>35 hrs</span>
            </div>
          </div>

          <div className="preset-buttons">
            <span className="preset-label">Quick presets:</span>
            {[3, 5, 8, 12, 20].map((hours) => (
              <button
                type="button"
                key={hours}
                className={`preset-btn ${formData.weeklyHours === hours ? 'active' : ''}`}
                onClick={() => handleFieldChange('weeklyHours', hours)}
              >
                {hours}h
              </button>
            ))}
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">Learning Pace</label>
          <div className="pace-options">
            {LEARNING_PACES.map((pace) => {
              const isChecked = formData.learningPace === pace.value;
              return (
                <label
                  key={pace.value}
                  className={`pace-card ${isChecked ? 'active' : ''}`}
                >
                  <input
                    type="radio"
                    name="learningPace"
                    value={pace.value}
                    checked={isChecked}
                    onChange={(e) => handleFieldChange('learningPace', e.target.value)}
                    className="visually-hidden"
                  />
                  <div className="pace-card-header">
                    <span className="radio-circle" aria-hidden="true" />
                    <strong>{pace.label}</strong>
                  </div>
                  <p className="pace-card-desc">{pace.description}</p>
                </label>
              );
            })}
          </div>
        </div>
      </fieldset>

      {/* Section 3: Learning Styles */}
      <fieldset className="form-section">
        <legend className="section-title">
          <span className="section-badge">3</span>
          Preferred Learning Formats
        </legend>
        <p className="section-desc">
          Select the learning modalities that match how you absorb technical knowledge best.
        </p>

        <div className="checkbox-grid">
          {LEARNING_STYLES.map((style) => {
            const isChecked = formData.learningStyles.includes(style.id);
            return (
              <label
                key={style.id}
                className={`checkbox-card ${isChecked ? 'active' : ''}`}
              >
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => handleStyleToggle(style.id)}
                  className="visually-hidden"
                />
                <div className="checkbox-indicator" aria-hidden="true">
                  {isChecked && '✓'}
                </div>
                <div className="checkbox-content">
                  <span className="checkbox-title">{style.label}</span>
                  <span className="checkbox-desc">{style.description}</span>
                </div>
              </label>
            );
          })}
        </div>
      </fieldset>

      {/* Section 4: Focus Topics & Tech Stack */}
      <fieldset className="form-section">
        <legend className="section-title">
          <span className="section-badge">4</span>
          Focus Technologies & Topics
        </legend>
        <p className="section-desc">
          Pick core technologies to prioritize in your roadmap, or add custom topics.
        </p>

        <div className="topics-container">
          <div className="chips-wrapper">
            {POPULAR_TOPICS.map((topic) => {
              const isSelected = formData.focusTopics.includes(topic);
              return (
                <button
                  type="button"
                  key={topic}
                  className={`chip ${isSelected ? 'chip-active' : ''}`}
                  onClick={() => handleTopicToggle(topic)}
                  aria-pressed={isSelected}
                >
                  <span className="chip-indicator">{isSelected ? '✓' : '+'}</span>
                  {topic}
                </button>
              );
            })}
          </div>

          <div className="custom-topic-row">
            <input
              type="text"
              className="form-input"
              placeholder="Add custom topic (e.g. Next.js, Rust, Kafka)..."
              value={customTopicInput}
              onChange={(e) => setCustomTopicInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleAddCustomTopic(e);
                }
              }}
              aria-label="Add custom topic"
            />
            <button
              type="button"
              className="btn btn-secondary"
              onClick={handleAddCustomTopic}
              disabled={!customTopicInput.trim()}
            >
              Add Topic
            </button>
          </div>

          {formData.focusTopics.length > 0 && (
            <div className="active-topics-summary">
              <span className="summary-label">Currently selected ({formData.focusTopics.length}):</span>
              <div className="selected-chips">
                {formData.focusTopics.map((topic) => (
                  <span key={topic} className="selected-chip">
                    {topic}
                    <button
                      type="button"
                      className="chip-remove"
                      onClick={() => handleRemoveTopic(topic)}
                      aria-label={`Remove ${topic}`}
                    >
                      &times;
                    </button>
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </fieldset>

      {/* Section 5: Schedule & Reminders */}
      <fieldset className="form-section">
        <legend className="section-title">
          <span className="section-badge">5</span>
          Reminders & Study Routine
        </legend>
        <p className="section-desc">
          Tailor notifications to your daily routine for optimal retention.
        </p>

        <div className="form-row-2">
          <div className="form-group">
            <label htmlFor="reminderFrequency" className="form-label">
              Reminder Schedule
            </label>
            <select
              id="reminderFrequency"
              className="form-select"
              value={formData.reminderFrequency}
              onChange={(e) => handleFieldChange('reminderFrequency', e.target.value)}
            >
              {REMINDER_FREQUENCIES.map((freq) => (
                <option key={freq.value} value={freq.value}>
                  {freq.label} ({freq.description})
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="preferredTime" className="form-label">
              Preferred Study Window
            </label>
            <select
              id="preferredTime"
              className="form-select"
              value={formData.preferredTime}
              onChange={(e) => handleFieldChange('preferredTime', e.target.value)}
            >
              {PREFERRED_TIMES.map((time) => (
                <option key={time.value} value={time.value}>
                  {time.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="toggle-group">
          <label className="toggle-label" htmlFor="publicProfile">
            <div className="toggle-switch-wrapper">
              <input
                type="checkbox"
                id="publicProfile"
                checked={formData.publicProfile}
                onChange={(e) => handleFieldChange('publicProfile', e.target.checked)}
                className="toggle-checkbox"
              />
              <span className="toggle-slider" aria-hidden="true" />
            </div>
            <div className="toggle-text">
              <span className="toggle-title">Show streak & progress on public profile</span>
              <span className="toggle-desc">
                Enables public accountability milestones and weekly goal badges.
              </span>
            </div>
          </label>
        </div>
      </fieldset>

      {/* Form Action Buttons */}
      <div className="form-actions">
        <button
          type="button"
          className="btn btn-outline"
          onClick={handleResetToDefaults}
        >
          Reset to Defaults
        </button>

        <div className="actions-right">
          {onCancel && (
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onCancel}
            >
              Close
            </button>
          )}
          <button type="submit" className="btn btn-primary">
            Save Learning Preferences
          </button>
        </div>
      </div>
    </form>
  );
}
