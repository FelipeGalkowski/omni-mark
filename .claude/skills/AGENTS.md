# Skill Selection Guide

Decision reference for planning and building. Load skills only when triggers match — never auto-load.

## Quick-Reference Table

| Session intent | Primary skill | Also consider |
|---|---|---|
| Plan/build a feature end-to-end | `tlc-spec-driven` | `technical-design-doc-creator` |
| Quick fix / ≤3 file change | `coding-guidelines` | — |
| Architecture analysis / decompose | `component-identification-sizing` | — |
| Technical design doc / RFC | `technical-design-doc-creator` | — |
| Build or redesign UI | `frontend-blueprint` | `frontend-design` |
| React performance patterns | `react-best-practices` | — |
| React component architecture | `react-composition-patterns` | — |
| Security review | `security-best-practices` | `best-practices` |
| Accessibility audit | `accessibility` | — |
| Performance audit (non-Astro) | `perf-web-optimization` | `chrome-devtools` |
| Browser debugging / profiling | `chrome-devtools` | — |
| Browser automation / testing | `playwright-skill` | — |
| Write / review documentation | `docs-writer` | — |
| Code quality / best practices | `best-practices` | `coding-guidelines` |
| UI/UX design review | `web-design-guidelines` | `frontend-blueprint` |
| Learning / teach-me-after-work | `learning-opportunities` | — |
| Decompose monolith | `component-identification-sizing` | — |

## Trigger Phrases by Skill

### Planning & Orchestration

**tlc-spec-driven** — `tlc-spec-driven/SKILL.md`
- Triggers: "initialize project", "map codebase", "specify feature", "discuss feature", "design", "tasks", "implement", "validate", "verify work", "UAT", "quick fix", "quick task", "pause work", "resume work"
- Use when: Planning or building anything that spans ≥2 phases (specify → design → tasks → execute)
- Notes: Auto-sizes depth by complexity. Small = skip pipeline, Medium = spec only, Large = full pipeline

**technical-design-doc-creator** — `technical-design-doc-creator/SKILL.md`
- Triggers: "write a design doc", "create a TDD", "technical spec", "architecture document", "RFC", "design proposal"
- Use when: User explicitly wants a formal technical design document before implementation
- Notes: Interactive discovery. Use tlc-spec-driven's Design phase for lighter architecture work

**component-identification-sizing** — `component-identification-sizing/SKILL.md`
- Triggers: "how big is each module", "what components do I have", "which service is too large", "analyze codebase structure", "size my monolith", "planning where to start decomposing"
- Use when: User wants to understand codebase architecture before planning or refactoring
- Notes: Outputs component map with size metrics. Good precursor to tlc-spec-driven for large features

### Frontend / UI

**frontend-blueprint** — `frontend-blueprint/SKILL.md`
- Triggers: "build me a UI", "design a page", "create a component", "improve this layout", "make this look better", "frontend", "interface", "redesign", or user provides mockups/screenshots
- Use when: User wants to build or redesign any UI element and needs discovery (visual refs, design tokens, typography, layout preferences) before code
- Notes: Runs before frontend-design. Skippable for trivial inline components

**frontend-design** — `frontend-design/SKILL.md`
- Triggers: "build web components", "pages", "artifacts", "posters", "applications"
- Use when: User explicitly wants high-design-quality UI output, not just functional
- Notes: Complementary to frontend-blueprint. Not a replacement for it on redesigns

**web-design-guidelines** — `web-design-guidelines/SKILL.md`
- Triggers: "review my UI", "check accessibility", "audit design", "review UX", "check my site against best practices"
- Use when: Reviewing existing UI, not building new
- Notes: Different from accessibility skill — focuses on visual/interaction design, not WCAG technical audit

**react-best-practices** — `react-best-practices/SKILL.md`
- Triggers: "React components", "Next.js pages", "data fetching", "bundle optimization", "performance improvements"
- Use when: Writing or reviewing React/Next.js code for performance
- Notes: Vercel-authored. For architecture patterns use react-composition-patterns

**react-composition-patterns** — `react-composition-patterns/SKILL.md`
- Triggers: "refactoring components with boolean prop proliferation", "building flexible component libraries", "designing reusable APIs", "compound components", "render props", "context providers", "component architecture"
- Use when: Designing React component APIs or solving prop proliferation
- Notes: Includes React 19 API changes

### Code Quality

**coding-guidelines** — `coding-guidelines/SKILL.md`
- Triggers: "writing, modifying, or reviewing code", "implementation tasks", "code changes", "refactoring", "bug fixes", "feature development"
- Use when: Any code writing task. Implicit default for all implementation work
- Notes: Reduce LLM coding mistakes. Load alongside any build skill, not instead of

**best-practices** — `best-practices/SKILL.md`
- Triggers: "apply best practices", "security audit", "modernize code", "code quality review", "check for vulnerabilities"
- Use when: General code quality pass, modernization, compatibility review
- Notes: Broader than security. Security-specific = security-best-practices

**security-best-practices** — `security-best-practices/SKILL.md`
- Triggers: "security best practices guidance", "security review", "security report", "secure-by-default coding help"
- Use when: Explicit security focus requested
- Notes: Supports Python, JS/TS, Go. For general best-practices use best-practices instead

**accessibility** — `accessibility/SKILL.md`
- Triggers: "improve accessibility", "a11y audit", "WCAG compliance", "screen reader support", "keyboard navigation", "make accessible"
- Use when: WCAG audit, screen reader testing, keyboard nav improvements
- Notes: Different from web-design-guidelines — technical WCAG compliance, not visual review

### Performance

**perf-web-optimization** — `perf-web-optimization/SKILL.md`
- Triggers: "web performance", "bundle size", "page speed", "slow site", "lazy loading"
- Use when: Performance audit, bundle size reduction, Core Web Vitals improvement
- Notes: Non-Astro. For Astro = perf-astro (not relevant to this project)

**chrome-devtools** — `chrome-devtools/SKILL.md`
- Triggers: "debug this page", "take a screenshot", "check network requests", "profile performance", "inspect console errors", "analyze page load"
- Use when: Live browser debugging, network inspection, performance profiling
- Notes: MCP-based. For automated testing = playwright-skill

### Testing & Automation

**playwright-skill** — `playwright-skill/SKILL.md`
- Triggers: "test websites", "automate browser interactions", "validate web functionality", "perform any browser-based testing"
- Use when: E2E testing, form filling, screenshot comparison, responsive validation, login flow testing
- Notes: Auto-detects dev servers. For console debugging = chrome-devtools

### Documentation & Learning

**docs-writer** — `docs-writer/SKILL.md`
- Triggers: "write documentation", "review this doc", "improve this README", "create a guide", "edit markdown"
- Use when: Creating or editing README, guides, inline docs
- Notes: Not for API reference generation or code comments

**learning-opportunities** — `learning-opportunities/SKILL.md`
- Triggers: "learning exercise", "help me understand", "teach me", "why does this work", or after creating new files/modules
- Use when: After completing non-trivial features. NOT for urgent debugging or quick fixes
- Notes: Should be offered, not forced. Don't interrupt quick tasks

## Skill Priority Rules

1. **`coding-guidelines`** is always loaded alongside any build/implementation task — never alone, never instead of another skill
2. **`tlc-spec-driven`** owns end-to-end planning/orchestration — if it's loaded, it drives the workflow
3. **`frontend-blueprint`** runs before `frontend-design` for any redesign or new UI — skip blueprint only for trivial inline components
4. **`technical-design-doc-creator`** and **`tlc-spec-driven`**'s Design phase are alternatives — TDD-creator for formal RFCs, tlc Design phase for lighter architecture work
5. **`accessibility`** and **`web-design-guidelines`** are not substitutes —前者 for WCAG compliance, latter for visual/UX review
6. **`security-best-practices`** and **`best-practices`** —前者 for explicit security focus, latter for general code quality
7. **`perf-astro`** is never relevant to this project (not an Astro site)

## Do Not Load

- `perf-astro` — this project is Vite + React, not Astro
- Any skill without an explicit trigger match in the user's request
- Multiple skills simultaneously without clear reason (max 2 concurrent unless `tlc-spec-driven` orchestrates)

## Knowledge Verification Chain (always apply)

```
1. Codebase → check existing code, conventions, patterns
2. Project docs → README, docs/, inline comments, .specs/
3. Context7 MCP → resolve library ID, then query API/patterns
4. Web search → official docs, reputable sources
5. Flag as uncertain → "I don't know" over fabrication
```

When in doubt: load `coding-guidelines` + `best-practices` as minimum bar for any code task.
