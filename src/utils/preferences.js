export const DEFAULT_PREFERENCES = {
  primaryGoal: 'fullstack',
  experienceLevel: 'intermediate',
  weeklyHours: 8,
  learningPace: 'steady',
  learningStyles: ['projects', 'interactive'],
  focusTopics: ['JavaScript', 'React', 'TypeScript', 'Node.js'],
  reminderFrequency: 'daily',
  preferredTime: 'evening',
  publicProfile: true,
};

export const GOAL_OPTIONS = [
  { value: 'frontend', label: 'Frontend Development', description: 'Web UI, React, CSS & Client-side architecture' },
  { value: 'backend', label: 'Backend & API Engineering', description: 'Server-side logic, microservices & databases' },
  { value: 'fullstack', label: 'Full-Stack Engineering', description: 'End-to-end web application development' },
  { value: 'devops', label: 'Cloud & DevOps Engineering', description: 'CI/CD, containerization & infrastructure' },
  { value: 'ai-ml', label: 'AI & Machine Learning', description: 'LLMs, data engineering & machine learning models' },
  { value: 'mobile', label: 'Mobile App Development', description: 'Cross-platform & native mobile apps' },
  { value: 'systems', label: 'Systems & Architecture', description: 'Low-level programming, distributed systems & performance' },
];

export const EXPERIENCE_LEVELS = [
  { value: 'beginner', label: 'Beginner', description: 'Grasping foundational concepts' },
  { value: 'intermediate', label: 'Intermediate', description: 'Building real-world projects' },
  { value: 'advanced', label: 'Advanced', description: 'Designing complex systems' },
  { value: 'expert', label: 'Specialist / Lead', description: 'Guiding teams & architectural strategy' },
];

export const LEARNING_STYLES = [
  { id: 'projects', label: 'Project-Based Labs', description: 'Build practical applications from scratch' },
  { id: 'interactive', label: 'Interactive Challenges', description: 'Quizzes, code katas, and algorithm drills' },
  { id: 'reading', label: 'Docs & Technical Deep Dives', description: 'Read official documentation, specs, and books' },
  { id: 'video', label: 'Video Courses & Talks', description: 'Visual demonstrations and conference presentations' },
  { id: 'mentorship', label: 'Code Reviews & Peer Learning', description: 'Collaborative feedback and pair programming' },
];

export const POPULAR_TOPICS = [
  'JavaScript',
  'TypeScript',
  'React',
  'Node.js',
  'Python',
  'Docker',
  'Kubernetes',
  'AWS',
  'PostgreSQL',
  'GraphQL',
  'Next.js',
  'Rust',
  'Go',
  'Tailwind CSS',
  'System Design',
];

export const REMINDER_FREQUENCIES = [
  { value: 'daily', label: 'Daily Reminder', description: 'Short daily prompt at your preferred time' },
  { value: 'weekdays', label: 'Weekdays Only', description: 'Monday through Friday focus prompts' },
  { value: 'weekly', label: 'Weekly Planning', description: 'Sunday planning & progress digest' },
  { value: 'none', label: 'Disabled', description: 'No automated reminders' },
];

export const PREFERRED_TIMES = [
  { value: 'morning', label: 'Morning (06:00 - 12:00)' },
  { value: 'afternoon', label: 'Afternoon (12:00 - 17:00)' },
  { value: 'evening', label: 'Evening (17:00 - 22:00)' },
  { value: 'night', label: 'Late Night (22:00+)' },
];

export const LEARNING_PACES = [
  { value: 'relaxed', label: 'Relaxed', description: 'Casual, low-stress learning (~1-3 hours/week)' },
  { value: 'steady', label: 'Steady', description: 'Consistent, balanced milestone progression' },
  { value: 'intensive', label: 'Intensive Sprint', description: 'Accelerated career preparation or bootcamp pace' },
];

const STORAGE_KEY = 'skilltrack_learning_preferences';

export function getSavedPreferences() {
  if (typeof window === 'undefined') {
    return DEFAULT_PREFERENCES;
  }
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_PREFERENCES;
    const parsed = JSON.parse(raw);
    return { ...DEFAULT_PREFERENCES, ...parsed };
  } catch (err) {
    console.error('Error loading learning preferences from localStorage:', err);
    return DEFAULT_PREFERENCES;
  }
}

export function savePreferences(preferences) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(preferences));
  } catch (err) {
    console.error('Error saving learning preferences to localStorage:', err);
  }
}

export function clearPreferences() {
  if (typeof window === 'undefined') return;
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (err) {
    console.error('Error clearing learning preferences from localStorage:', err);
  }
}
