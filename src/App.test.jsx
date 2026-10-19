import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import React from 'react';
import App from './App.jsx';

describe('App component', () => {
  it('renders navbar with Settings link', () => {
    render(<App />);
    const settingsLink = screen.getByRole('link', { name: /settings/i });
    expect(settingsLink).toBeDefined();
    expect(settingsLink.getAttribute('href')).toBe('#settings');
  });

  it('renders the Settings section with heading and form', () => {
    render(<App />);
    const settingsHeading = screen.getByRole('heading', { name: /profile & study settings/i });
    expect(settingsHeading).toBeDefined();

    const saveBtn = screen.getByRole('button', { name: /save settings/i });
    expect(saveBtn).toBeDefined();
  });
});
