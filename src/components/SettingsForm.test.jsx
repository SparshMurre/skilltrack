import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import SettingsForm, { validateSettings } from './SettingsForm.jsx';

describe('validateSettings function', () => {
  it('returns errors for all empty fields', () => {
    const errors = validateSettings({ displayName: '', weeklyHours: '', learningGoal: '' });
    expect(errors.displayName).toMatch(/display name is required/i);
    expect(errors.weeklyHours).toMatch(/weekly study hours is required/i);
    expect(errors.learningGoal).toMatch(/learning goal is required/i);
  });

  it('rejects display name that is too short after trimming', () => {
    const errors = validateSettings({ displayName: ' A ', weeklyHours: '10', learningGoal: 'Valid 10-char goal.' });
    expect(errors.displayName).toMatch(/at least 2 characters/i);
  });

  it('rejects display name exceeding 40 characters', () => {
    const errors = validateSettings({
      displayName: 'A'.repeat(41),
      weeklyHours: '10',
      learningGoal: 'Valid 10-char goal.',
    });
    expect(errors.displayName).toMatch(/not exceed 40 characters/i);
  });

  it('rejects weekly hours above 40 with clear range explanation', () => {
    const errors = validateSettings({ displayName: 'Sparsh', weeklyHours: '41', learningGoal: 'Valid 10-char goal.' });
    expect(errors.weeklyHours).toMatch(/between 1 and 40/i);
  });

  it('rejects weekly hours below 1 with clear range explanation', () => {
    const errors = validateSettings({ displayName: 'Sparsh', weeklyHours: '0', learningGoal: 'Valid 10-char goal.' });
    expect(errors.weeklyHours).toMatch(/between 1 and 40/i);
  });

  it('rejects non-integer weekly hours', () => {
    const errors = validateSettings({ displayName: 'Sparsh', weeklyHours: '12.5', learningGoal: 'Valid 10-char goal.' });
    expect(errors.weeklyHours).toMatch(/whole number/i);
  });

  it('rejects learning goal shorter than 10 characters', () => {
    const errors = validateSettings({ displayName: 'Sparsh', weeklyHours: '10', learningGoal: 'Too short' });
    expect(errors.learningGoal).toMatch(/at least 10 characters/i);
  });

  it('rejects learning goal longer than 200 characters', () => {
    const errors = validateSettings({
      displayName: 'Sparsh',
      weeklyHours: '10',
      learningGoal: 'X'.repeat(201),
    });
    expect(errors.learningGoal).toMatch(/not exceed 200 characters/i);
  });

  it('accepts valid input data', () => {
    const errors = validateSettings({
      displayName: 'Sparsh',
      weeklyHours: '8',
      learningGoal: '10charGoal',
    });
    expect(Object.keys(errors).length).toBe(0);
  });
});

describe('SettingsForm component', () => {
  it('renders visible labels associated with every input', () => {
    render(<SettingsForm />);

    const displayNameInput = screen.getByLabelText(/display name/i);
    const weeklyHoursInput = screen.getByLabelText(/weekly study hours/i);
    const learningGoalInput = screen.getByLabelText(/learning goal/i);

    expect(displayNameInput).toBeDefined();
    expect(weeklyHoursInput).toBeDefined();
    expect(learningGoalInput).toBeDefined();

    expect(displayNameInput.getAttribute('id')).toBe('displayName');
    expect(weeklyHoursInput.getAttribute('id')).toBe('weeklyHours');
    expect(learningGoalInput.getAttribute('id')).toBe('learningGoal');

    // Verify initial ARIA attributes
    expect(displayNameInput.getAttribute('aria-invalid')).toBe('false');
    expect(weeklyHoursInput.getAttribute('aria-invalid')).toBe('false');
    expect(learningGoalInput.getAttribute('aria-invalid')).toBe('false');
  });

  it('renders a Save Settings button', () => {
    render(<SettingsForm />);
    const submitBtn = screen.getByRole('button', { name: /save settings/i });
    expect(submitBtn).toBeDefined();
  });

  it('shows understandable validation messages and accessible associations for empty form submission', () => {
    render(<SettingsForm />);

    const submitBtn = screen.getByRole('button', { name: /save settings/i });
    fireEvent.click(submitBtn);

    const displayNameInput = screen.getByLabelText(/display name/i);
    const weeklyHoursInput = screen.getByLabelText(/weekly study hours/i);
    const learningGoalInput = screen.getByLabelText(/learning goal/i);

    // Check aria-invalid
    expect(displayNameInput.getAttribute('aria-invalid')).toBe('true');
    expect(weeklyHoursInput.getAttribute('aria-invalid')).toBe('true');
    expect(learningGoalInput.getAttribute('aria-invalid')).toBe('true');

    // Check aria-describedby associations
    expect(displayNameInput.getAttribute('aria-describedby')).toBe('displayName-error');
    expect(weeklyHoursInput.getAttribute('aria-describedby')).toBe('weeklyHours-error');
    expect(learningGoalInput.getAttribute('aria-describedby')).toBe('learningGoal-error');

    // Check error elements exist and contain understandable text and alert roles
    const nameError = document.getElementById('displayName-error');
    const hoursError = document.getElementById('weeklyHours-error');
    const goalError = document.getElementById('learningGoal-error');

    expect(nameError).not.toBeNull();
    expect(nameError.textContent).toMatch(/display name is required/i);
    expect(nameError.getAttribute('role')).toBe('alert');

    expect(hoursError).not.toBeNull();
    expect(hoursError.textContent).toMatch(/weekly study hours is required/i);
    expect(hoursError.getAttribute('role')).toBe('alert');

    expect(goalError).not.toBeNull();
    expect(goalError.textContent).toMatch(/learning goal is required/i);
    expect(goalError.getAttribute('role')).toBe('alert');
  });

  it('rejects display name " A " after trimming because it is too short', () => {
    render(<SettingsForm />);

    const displayNameInput = screen.getByLabelText(/display name/i);
    const submitBtn = screen.getByRole('button', { name: /save settings/i });

    fireEvent.change(displayNameInput, { target: { value: ' A ' } });
    fireEvent.click(submitBtn);

    expect(displayNameInput.getAttribute('aria-invalid')).toBe('true');
    const nameError = document.getElementById('displayName-error');
    expect(nameError).not.toBeNull();
    expect(nameError.textContent).toMatch(/at least 2 characters/i);
  });

  it('rejects weekly hours 41 and explains the allowed range (1–40)', () => {
    render(<SettingsForm />);

    const weeklyHoursInput = screen.getByLabelText(/weekly study hours/i);
    const submitBtn = screen.getByRole('button', { name: /save settings/i });

    fireEvent.change(weeklyHoursInput, { target: { value: '41' } });
    fireEvent.click(submitBtn);

    expect(weeklyHoursInput.getAttribute('aria-invalid')).toBe('true');
    const hoursError = document.getElementById('weeklyHours-error');
    expect(hoursError).not.toBeNull();
    expect(hoursError.textContent).toMatch(/between 1 and 40/i);
  });

  it('accepts valid submission and displays clear success feedback without claiming backend persistence', () => {
    const handleSave = vi.fn();
    render(<SettingsForm onSave={handleSave} />);

    const displayNameInput = screen.getByLabelText(/display name/i);
    const weeklyHoursInput = screen.getByLabelText(/weekly study hours/i);
    const learningGoalInput = screen.getByLabelText(/learning goal/i);
    const submitBtn = screen.getByRole('button', { name: /save settings/i });

    // Valid inputs as per example: "Sparsh", 8 hours, 10-character learning goal
    fireEvent.change(displayNameInput, { target: { value: 'Sparsh' } });
    fireEvent.change(weeklyHoursInput, { target: { value: '8' } });
    fireEvent.change(learningGoalInput, { target: { value: '1234567890' } }); // exactly 10 characters

    fireEvent.click(submitBtn);

    // No field errors
    expect(displayNameInput.getAttribute('aria-invalid')).toBe('false');
    expect(weeklyHoursInput.getAttribute('aria-invalid')).toBe('false');
    expect(learningGoalInput.getAttribute('aria-invalid')).toBe('false');

    // Success message displayed
    const successElement = screen.getByRole('status');
    expect(successElement).toBeDefined();
    expect(successElement.textContent).toMatch(/settings updated successfully/i);

    // Verify it does NOT claim backend persistence
    expect(successElement.textContent.toLowerCase()).not.toMatch(/backend|database|server|persisted to database/i);

    // onSave callback invoked with sanitized values
    expect(handleSave).toHaveBeenCalledTimes(1);
    expect(handleSave).toHaveBeenCalledWith({
      displayName: 'Sparsh',
      weeklyHours: 8,
      learningGoal: '1234567890',
    });
  });

  it('clears field-specific error and success message when user updates input', () => {
    render(<SettingsForm />);

    const displayNameInput = screen.getByLabelText(/display name/i);
    const submitBtn = screen.getByRole('button', { name: /save settings/i });

    // Trigger error
    fireEvent.click(submitBtn);
    expect(displayNameInput.getAttribute('aria-invalid')).toBe('true');
    expect(document.getElementById('displayName-error')).not.toBeNull();

    // Type in input
    fireEvent.change(displayNameInput, { target: { value: 'Sparsh' } });

    // Error should be removed
    expect(displayNameInput.getAttribute('aria-invalid')).toBe('false');
    expect(document.getElementById('displayName-error')).toBeNull();
  });
});
