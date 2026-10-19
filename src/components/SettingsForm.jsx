import React, { useState } from 'react';

/**
 * Validates settings form values according to SkillTrack rules.
 * @param {{ displayName: string, weeklyHours: string|number, learningGoal: string }} data
 * @returns {Record<string, string>} Object containing validation errors by field
 */
export function validateSettings(data) {
  const errors = {};

  // Display name: required, trimmed, 2–40 characters
  const trimmedName = data.displayName !== undefined && data.displayName !== null
    ? String(data.displayName).trim()
    : '';

  if (!trimmedName) {
    errors.displayName = 'Display name is required.';
  } else if (trimmedName.length < 2) {
    errors.displayName = 'Display name must be at least 2 characters.';
  } else if (trimmedName.length > 40) {
    errors.displayName = 'Display name must not exceed 40 characters.';
  }

  // Weekly study hours: required integer from 1 to 40
  const rawHours = data.weeklyHours !== undefined && data.weeklyHours !== null
    ? String(data.weeklyHours).trim()
    : '';

  if (!rawHours) {
    errors.weeklyHours = 'Weekly study hours is required.';
  } else if (!/^-?\d+$/.test(rawHours)) {
    errors.weeklyHours = 'Weekly study hours must be a whole number (integer) between 1 and 40.';
  } else {
    const hoursNum = parseInt(rawHours, 10);
    if (hoursNum < 1 || hoursNum > 40) {
      errors.weeklyHours = 'Weekly study hours must be between 1 and 40.';
    }
  }

  // Learning goal: required, 10–200 characters
  const trimmedGoal = data.learningGoal !== undefined && data.learningGoal !== null
    ? String(data.learningGoal).trim()
    : '';

  if (!trimmedGoal) {
    errors.learningGoal = 'Learning goal is required.';
  } else if (trimmedGoal.length < 10) {
    errors.learningGoal = 'Learning goal must be at least 10 characters.';
  } else if (trimmedGoal.length > 200) {
    errors.learningGoal = 'Learning goal must not exceed 200 characters.';
  }

  return errors;
}

export default function SettingsForm({ initialSettings = {}, onSave }) {
  const [formData, setFormData] = useState({
    displayName: initialSettings.displayName ?? '',
    weeklyHours: initialSettings.weeklyHours ?? '',
    learningGoal: initialSettings.learningGoal ?? '',
  });

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear field-specific error as user makes changes
    if (errors[name]) {
      setErrors((prev) => {
        const updated = { ...prev };
        delete updated[name];
        return updated;
      });
    }

    if (successMessage) {
      setSuccessMessage('');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validateSettings(formData);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setSuccessMessage('');
      return;
    }

    // Valid submission: update state, clear errors, and show success feedback
    setErrors({});
    const sanitizedData = {
      displayName: formData.displayName.trim(),
      weeklyHours: parseInt(String(formData.weeklyHours).trim(), 10),
      learningGoal: formData.learningGoal.trim(),
    };

    setSuccessMessage('Settings updated successfully for this session.');

    if (typeof onSave === 'function') {
      onSave(sanitizedData);
    }
  };

  return (
    <div className="settings-card">
      {successMessage && (
        <div className="settings-success" role="status" aria-live="polite">
          <span className="success-icon" aria-hidden="true">✓</span>
          <span>{successMessage}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate className="settings-form" aria-label="SkillTrack Settings">
        <div className="form-group">
          <label htmlFor="displayName" className="form-label">
            Display Name <span className="required-indicator" aria-hidden="true">*</span>
          </label>
          <input
            id="displayName"
            name="displayName"
            type="text"
            className={`form-input ${errors.displayName ? 'input-error' : ''}`}
            value={formData.displayName}
            onChange={handleChange}
            aria-required="true"
            aria-invalid={errors.displayName ? 'true' : 'false'}
            aria-describedby={errors.displayName ? 'displayName-error' : undefined}
            placeholder="e.g. Alex Chen"
          />
          {errors.displayName && (
            <p id="displayName-error" className="form-error" role="alert">
              <span className="error-icon" aria-hidden="true">⚠️</span>
              <span>{errors.displayName}</span>
            </p>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="weeklyHours" className="form-label">
            Weekly Study Hours <span className="required-indicator" aria-hidden="true">*</span>
          </label>
          <input
            id="weeklyHours"
            name="weeklyHours"
            type="number"
            min="1"
            max="40"
            step="1"
            className={`form-input ${errors.weeklyHours ? 'input-error' : ''}`}
            value={formData.weeklyHours}
            onChange={handleChange}
            aria-required="true"
            aria-invalid={errors.weeklyHours ? 'true' : 'false'}
            aria-describedby={errors.weeklyHours ? 'weeklyHours-error' : undefined}
            placeholder="1–40"
          />
          {errors.weeklyHours && (
            <p id="weeklyHours-error" className="form-error" role="alert">
              <span className="error-icon" aria-hidden="true">⚠️</span>
              <span>{errors.weeklyHours}</span>
            </p>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="learningGoal" className="form-label">
            Learning Goal <span className="required-indicator" aria-hidden="true">*</span>
          </label>
          <textarea
            id="learningGoal"
            name="learningGoal"
            rows={4}
            className={`form-textarea ${errors.learningGoal ? 'input-error' : ''}`}
            value={formData.learningGoal}
            onChange={handleChange}
            aria-required="true"
            aria-invalid={errors.learningGoal ? 'true' : 'false'}
            aria-describedby={errors.learningGoal ? 'learningGoal-error' : undefined}
            placeholder="Describe your learning focus and milestones (10 to 200 characters)..."
          />
          {errors.learningGoal && (
            <p id="learningGoal-error" className="form-error" role="alert">
              <span className="error-icon" aria-hidden="true">⚠️</span>
              <span>{errors.learningGoal}</span>
            </p>
          )}
        </div>

        <div className="form-actions">
          <button type="submit" className="btn btn-primary">
            Save Settings
          </button>
        </div>
      </form>
    </div>
  );
}
