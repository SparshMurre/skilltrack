# SkillTrack Development Guidelines

## Stack

- **Framework**: React (Functional Components & Hooks)
- **Tooling**: Vite
- **Language**: JavaScript (ES6+ / ES Modules)
- **Styling**: Standard Vanilla CSS (modular and responsive)
- **Runtime**: Node.js >= 18

## Coding Conventions

- **Component Design**:
  - Prefer functional components and standard React hooks (`useState`, `useEffect`, `useMemo`, `useCallback`).
  - Keep components modular, focused, and organized under `src/components/` as the project scales.
  - Name component files in PascalCase (e.g., `SkillCard.jsx`).
  - Use camelCase for variables, functions, and standard utility files.
- **HTML & Accessibility**:
  - Use semantic HTML tags (`<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`).
  - Maintain accessible color contrast and readable typography.
- **Styling**:
  - Keep CSS clean, responsive, and mobile-friendly using CSS custom properties (variables) defined in `:root`.
  - Avoid inline styles; utilize CSS classes.

## AI Rules

- Make only targeted, necessary changes aligned with user instructions.
- Preserve existing project structure, comments, and working implementations.
- Do not add unrequested third-party dependencies or heavyweight libraries.
- Always verify builds (`npm run build`) before concluding any frontend task.
- Do not initialize Git, commit, or push unless specifically requested.

## Conventional Commits

All commit messages should follow the [Conventional Commits specification](https://www.conventionalcommits.org/):

```
<type>(<scope>): <short description>
```

### Commit Types
- `feat`: A new user-facing feature or enhancement.
- `fix`: A bug fix.
- `docs`: Documentation-only changes (e.g., README, comments).
- `style`: Changes that do not affect the meaning of the code (formatting, CSS spacing, missing semicolons).
- `refactor`: A code change that neither fixes a bug nor adds a feature.
- `test`: Adding or correcting tests.
- `chore`: Maintenance tasks, dependencies updates, tooling configurations.

### Examples
- `feat(landing): add responsive hero and feature sections`
- `fix(navbar): resolve mobile navigation alignment issue`
- `docs(readme): add setup and build commands`
- `chore(deps): update vite configuration`
