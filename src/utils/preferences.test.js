import { test, describe, beforeEach } from 'node:test';
import assert from 'node:assert/strict';
import {
  DEFAULT_PREFERENCES,
  GOAL_OPTIONS,
  EXPERIENCE_LEVELS,
  LEARNING_STYLES,
  POPULAR_TOPICS,
  REMINDER_FREQUENCIES,
  PREFERRED_TIMES,
  LEARNING_PACES,
  getSavedPreferences,
  savePreferences,
  clearPreferences,
} from './preferences.js';

describe('preferences utility', () => {
  // Mock localStorage for node environment
  const mockStorage = {};
  global.window = {};
  global.localStorage = {
    getItem: (key) => mockStorage[key] || null,
    setItem: (key, val) => {
      mockStorage[key] = String(val);
    },
    removeItem: (key) => {
      delete mockStorage[key];
    },
    clear: () => {
      Object.keys(mockStorage).forEach((k) => delete mockStorage[k]);
    },
  };

  beforeEach(() => {
    localStorage.clear();
  });

  test('returns DEFAULT_PREFERENCES when nothing is stored', () => {
    const prefs = getSavedPreferences();
    assert.deepEqual(prefs, DEFAULT_PREFERENCES);
    assert.equal(prefs.primaryGoal, 'fullstack');
    assert.equal(prefs.experienceLevel, 'intermediate');
    assert.equal(prefs.weeklyHours, 8);
  });

  test('saves and retrieves updated preferences', () => {
    const updated = {
      ...DEFAULT_PREFERENCES,
      primaryGoal: 'frontend',
      experienceLevel: 'advanced',
      weeklyHours: 15,
      focusTopics: ['React', 'TypeScript', 'Tailwind CSS'],
    };

    savePreferences(updated);
    const retrieved = getSavedPreferences();

    assert.equal(retrieved.primaryGoal, 'frontend');
    assert.equal(retrieved.experienceLevel, 'advanced');
    assert.equal(retrieved.weeklyHours, 15);
    assert.deepEqual(retrieved.focusTopics, ['React', 'TypeScript', 'Tailwind CSS']);
  });

  test('clears saved preferences', () => {
    savePreferences({ ...DEFAULT_PREFERENCES, weeklyHours: 20 });
    clearPreferences();
    const retrieved = getSavedPreferences();
    assert.deepEqual(retrieved, DEFAULT_PREFERENCES);
  });

  test('exports valid option lists with expected structures', () => {
    assert.ok(GOAL_OPTIONS.length > 0);
    assert.ok(EXPERIENCE_LEVELS.length > 0);
    assert.ok(LEARNING_STYLES.length > 0);
    assert.ok(POPULAR_TOPICS.length > 0);
    assert.ok(REMINDER_FREQUENCIES.length > 0);
    assert.ok(PREFERRED_TIMES.length > 0);
    assert.ok(LEARNING_PACES.length > 0);

    for (const opt of GOAL_OPTIONS) {
      assert.ok(opt.value && opt.label);
    }
  });
});
