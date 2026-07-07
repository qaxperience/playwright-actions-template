# Playwright E2E Automation with GitHub Actions

> CI-ready Playwright test automation framework with Page Object Model, custom fixtures, TypeScript strict mode, multi-browser execution, traces, screenshots, videos, HTML reports, JUnit output, and GitHub Actions artifacts.

## What this project demonstrates

- **E2E testing with Playwright + TypeScript** — login validation with positive and negative flows
- **Page Object Model** — `LoginPage` encapsulates locators, actions, and assertions, keeping specs clean
- **Custom fixtures** — `loginPage` and `loginData` injected via `test.extend()`, no boilerplate in specs
- **Typed test data** — credentials and expected messages isolated in `tests/data/loginData.ts`
- **Reusable action helpers** — `clearAndFill(locator, value)` and `submitForm` in `tests/utils/actions.ts`
- **TypeScript strict mode** — `tsconfig.json` with `strict: true`; `npm run typecheck` runs before tests in CI
- **Multi-browser execution** — Chromium, Firefox, and WebKit in the same pipeline run
- **GitHub Actions CI/CD** — automated pipeline triggered on push and PR to `main`
- **Failure evidence** — screenshots, videos, and traces on retry, automatically uploaded as artifacts

## Stack

| Tool | Purpose |
| --- | --- |
| [Playwright](https://playwright.dev/) | E2E browser automation |
| TypeScript | Type-safe test code |
| GitHub Actions | CI/CD pipeline |

## Project structure

```text
tests/
├── data/
│   └── loginData.ts      # Typed test data — credentials and expected messages
├── fixtures/
│   └── index.ts          # Custom test with loginPage + loginData fixtures
├── pages/
│   └── LoginPage.ts      # Page Object — locators, actions, assertions
├── utils/
│   └── actions.ts        # Reusable action helpers (clearAndFill, submitForm)
└── login.spec.ts         # Test specs

tsconfig.json             # TypeScript configuration (strict mode)
playwright.config.ts      # Playwright configuration
.github/workflows/
└── playwright.yml        # CI pipeline
```

## Test coverage

All scenarios target [loginxp.vercel.app](https://loginxp.vercel.app) — a single-page login form.

| # | Scenario | Expected result |
| --- | --- | --- |
| 1 | Username empty | Toast: "Informe o seu nome de usuário!" |
| 2 | Password empty | Toast: "Informe a sua senha secreta!" |
| 3 | Both fields empty | Toast: username error takes priority |
| 4 | User does not exist | Toast: "Oops! Credenciais inválidas :(" |
| 5 | Wrong password | Toast: "Oops! Credenciais inválidas :(" |
| 6 | Valid credentials | Modal: "Suas credenciais são válidas :)" |

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

# Run in headed mode (visible browser)
npm run test:headed

# Open interactive UI mode
npm run test:ui

# View HTML report after a run
npm run report

# Type-check without running tests
npm run typecheck
```

> Override the target URL without touching config:

```bash
BASE_URL=https://staging.example.com npm test
```

## CI pipeline

The GitHub Actions workflow runs on every push and pull request to `main`:

1. Checkout → Setup Node (with npm cache) → `npm ci`
2. Install Playwright browsers with system dependencies
3. Run TypeScript type check (`npm run typecheck`)
4. Run the full suite across Chromium, Firefox, and WebKit
5. Upload `playwright-report/` (HTML) and `test-results/` (JUnit + traces) as artifacts — retained 30 days

## License

[MIT](LICENSE)
