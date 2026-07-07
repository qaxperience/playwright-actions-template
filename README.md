# Playwright E2E Automation with GitHub Actions

> CI-ready Playwright test automation framework with Page Object Model, custom fixtures, TypeScript strict mode, multi-browser execution, traces, screenshots, videos, HTML reports, JUnit output, and GitHub Actions artifacts.

[![Playwright Tests](https://github.com/MarcelinoSoares/playwright-actions/actions/workflows/playwright.yml/badge.svg)](https://github.com/MarcelinoSoares/playwright-actions/actions/workflows/playwright.yml)
[![TypeScript](https://img.shields.io/badge/TypeScript-strict-3178C6?logo=typescript&logoColor=white)](tsconfig.json)
[![Playwright](https://img.shields.io/badge/Playwright-E2E-45ba4b?logo=playwright&logoColor=white)](https://playwright.dev/)

## What this project demonstrates

- **E2E testing with Playwright + TypeScript** — login validation with positive and negative flows
- **Page Object Model** — `LoginPage` encapsulates locators, actions, and assertions, keeping specs clean
- **Custom fixtures** — `loginPage` and `loginData` injected via `test.extend()`, no boilerplate in specs
- **Typed test data** — credentials and expected messages isolated in `tests/data/loginData.ts`
- **TypeScript strict mode** — `tsconfig.json` with `strict: true`; `npm run typecheck` runs before tests in CI
- **Multi-browser execution** — Chromium, Firefox, and WebKit in parallel CI jobs
- **GitHub Actions CI/CD** — quality gate (typecheck + lint + format) followed by browser matrix
- **Failure evidence** — screenshots, videos, and traces on retry, automatically uploaded as artifacts

## Stack

| Tool                                  | Purpose                        |
| ------------------------------------- | ------------------------------ |
| [Playwright](https://playwright.dev/) | E2E browser automation         |
| TypeScript                            | Type-safe test code            |
| ESLint + Prettier                     | Static analysis and code style |
| GitHub Actions                        | CI/CD pipeline                 |

## Project structure

```text
tests/
├── data/
│   └── loginData.ts      # Typed test data — credentials and expected messages
├── fixtures/
│   └── index.ts          # Custom test with loginPage + loginData fixtures
├── pages/
│   └── LoginPage.ts      # Page Object — locators, actions, assertions
└── login.spec.ts         # Test specs

tsconfig.json             # TypeScript configuration (strict mode)
playwright.config.ts      # Playwright configuration
eslint.config.mjs         # ESLint configuration (flat config)
.prettierrc               # Prettier configuration
.github/workflows/
└── playwright.yml        # CI pipeline
```

## Test coverage

All scenarios target [loginxp.vercel.app](https://loginxp.vercel.app) — a single-page login form.
Assertion strings are in Portuguese because they reflect the app's actual UI copy.

| #   | Scenario            | Expected result                                                   |
| --- | ------------------- | ----------------------------------------------------------------- |
| 1   | Username empty      | Toast: "Informe o seu nome de usuário!" _(Fill in your username)_ |
| 2   | Password empty      | Toast: "Informe a sua senha secreta!" _(Fill in your password)_   |
| 3   | Both fields empty   | Toast: username error takes priority                              |
| 4   | User does not exist | Toast: "Oops! Credenciais inválidas :(" _(Invalid credentials)_   |
| 5   | Wrong password      | Toast: "Oops! Credenciais inválidas :(" _(Invalid credentials)_   |
| 6   | Valid credentials   | Modal: "Suas credenciais são válidas :)" _(Valid credentials)_    |

## Design decisions

- **Page Object Model** keeps selectors and user actions isolated from test specs — specs read like scenarios, not implementation.
- **Custom fixtures** make dependencies explicit and eliminate boilerplate; `loginPage` and `loginData` are injected via `test.extend()`.
- **Typed test data** centralises credentials and expected messages, so a UI copy change requires a one-line edit.
- **Test tags** (`@smoke`, `@negative`, `@positive`) allow targeted runs without maintaining separate spec files.
- **CI pipeline order** — quality gate → smoke → full browser matrix — fails fast: static errors are caught before browser time is spent, and smoke catches regressions before the full suite runs.
- **Multi-browser matrix** (`chromium`, `firefox`, `webkit`) provides cross-engine confidence in parallel CI jobs.
- **Failure evidence** — screenshots, videos, and traces on retry, uploaded as artifacts — gives actionable debugging context without re-running locally.

## Running locally

```bash
# Install dependencies and browsers
npm ci
npx playwright install --with-deps

# Run all tests (headless, all browsers)
npm test

# Run in a specific browser
npm run test:chromium
npm run test:firefox
npm run test:webkit

# Run by tag
npm run test:smoke
npm run test:negative

# Run in headed mode (visible browser)
npm run test:headed

# Open interactive UI mode
npm run test:ui

# View HTML report after a run
npm run report

# Type-check without running tests
npm run typecheck

# Lint
npm run lint

# Format
npm run format
```

> Override the target URL without touching config:

```bash
BASE_URL=https://staging.example.com npm test
```

## CI pipeline

The GitHub Actions workflow runs on every push and pull request to `main`:

1. **Quality job** — typecheck → lint → format check
2. **Smoke job** (runs after quality) — `@smoke` tests on Chromium only; fast gate before full regression
3. **E2E matrix** (runs after smoke, in parallel) — full suite across Chromium, Firefox, and WebKit
4. Each browser uploads its own `playwright-report-{browser}` and `test-results-{browser}` artifacts — retained 30 days
5. Each job appends a summary to the GitHub Step Summary for at-a-glance results

## License

[MIT](LICENSE)
