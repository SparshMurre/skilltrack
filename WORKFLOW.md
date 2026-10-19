# FE-03: AI-Assisted Workflow Comparison

## Objective

This experiment compares two AI-assisted development workflows for adding a settings feature to SkillTrack. The goal was to understand how prompt quality affects implementation scope, testing, accessibility, and human review effort.

## Round 1: Vague Prompt

**Branch:** `fe03-vague`

**Prompt:** “Add a settings form to SkillTrack where users can update their learning preferences.”

The prompt described the general goal but did not specify validation rules, accessibility requirements, test cases, or implementation boundaries. The resulting implementation included a preferences utility, local storage, a settings modal, a preferences summary, and additional interface changes. Four utility tests passed, and the production build succeeded.

**Time spent:** [Enter actual time, including review and fixes.]

## Round 2: Precise Prompt

**Branch:** `fe03-precise`

The second prompt specified three fields, exact validation constraints, accessible labels and error associations, expected behavior examples, automated tests, and build verification. It also required inspecting project files and planning before implementation.

The reported verification results were 18 passing tests across two test files and a successful Vite production build. The implementation focused on field-level validation and session-state feedback without claiming backend persistence.

**Time spent:** [Enter actual time, including review and fixes.]

## Comparison and Human Review

The vague prompt allowed the AI to make broader architectural decisions, while the precise prompt constrained the feature and defined observable acceptance criteria. Compare the actual branch diffs to identify differences in files, dependencies, validation, persistence, accessibility, and tests.

**AI mistake or weakness caught during review:** [Describe a real issue you found, how you detected it, and what you changed or decided not to accept.]

## Lessons Learned

Specific requirements and examples make AI output easier to verify. Automated tests and production builds provide evidence that the feature works, but they do not replace code review. Human review remains necessary to check scope, existing functionality, accessibility, maintainability, and whether implementation claims match the actual behavior.