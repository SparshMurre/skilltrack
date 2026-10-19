# FE-03: AI-Assisted Workflow Comparison

## Objective

This experiment compares two AI-assisted development workflows for adding a settings feature to SkillTrack. The goal is to understand how prompt quality affects implementation scope, code quality, accessibility, testing, and review effort.

## Round 1: Vague Prompt

**Branch:** `fe03-vague`

**Prompt:** “Add a settings form to SkillTrack where users can update their learning preferences.”

The prompt described the feature generally without specifying validation rules, accessibility requirements, test cases, or implementation boundaries. The AI created a preferences utility, local storage functionality, a settings modal, a preferences summary, and additional UI changes. Four utility tests passed, and the production build succeeded.

**Time spent:** [**Time spent:** 1.5 hours, including implementation, review, and fixes.]

## Round 2: Precise Prompt

**Branch:** `fe03-precise`

The second prompt specified three form fields, exact validation rules, accessible labels, ARIA attributes, example behaviors, automated tests, and build verification. It also required inspecting the existing project files and planning before implementation.

The implementation included field-level validation, accessible error messages, and session-state success feedback without claiming backend persistence. The reported verification results were 18 passing tests across two test files, and the production build succeeded.

**Time spent:** [Enter your actual time.]

## Comparison and Human Review

Round 1 gave the AI more freedom to choose the architecture and feature scope. It produced additional components and local-storage functionality that were not explicitly requested. Round 2 used clear requirements and acceptance criteria, making the expected behavior easier to verify.

The branch comparison highlights differences in component structure, validation, accessibility, dependencies, persistence, and testing. Human review remains necessary to confirm that the implementation meets requirements and does not introduce unnecessary complexity.

**AI weakness identified:** In Round 1, the AI expanded the feature beyond the original request by adding a modal, a preferences summary, and local-storage functionality. This increased the amount of code requiring review. This scope expansion was identified by comparing the files and implementation across the two branches.

## Lessons Learned

Precise prompts improve predictability by defining requirements, constraints, examples, and verification steps. Automated tests and production builds help detect problems, but passing checks do not guarantee that a feature is accessible, maintainable, or appropriately scoped. Reviewing the code and comparing the results are essential parts of an effective AI-assisted development workflow.