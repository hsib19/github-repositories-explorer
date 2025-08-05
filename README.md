# GitHub Repositories Explorer

A simple and responsive React + Vite application for exploring GitHub users and their public repositories. Built with TypeScript and styled using Tailwind CSS. Includes unit and end-to-end testing support.

---

## Live Demo

👉 [View the app](https://hsib19.github.io/github-repositories-explorer/)

---

## Features

- Search GitHub users by username
- View list of public repositories with title, stars, and description
- Responsive UI using Tailwind CSS
- Unit testing with Jest
- End-to-end testing with Playwright
- Deployable to GitHub Pages

---

## Tech Stack

- React 19
- Vite
- TypeScript
- Tailwind CSS
- React Router DOM v7
- Axios
- Jest (unit test)
- Playwright (e2e test)

---

## Installation

```bash
git clone https://github.com/hsib19/github-repositories-explorer.git
cd github-repositories-explorer
npm install
```

---

## Development

```bash
npm run dev
```

App will be available at `http://localhost:5173/`

---

## Testing

### Unit Test (Jest)

```bash
npm test
```

### Test Coverage

```bash
npm run test:coverage
```

### E2E Test (Playwright)

```bash
npm run test:e2e
```

### Playwright UI Mode

```bash
npm run test:ui
```

---

## Linting

```bash
npm run lint
```

---

## Deployment (GitHub Pages)

Make sure `vite.config.ts` includes the correct base path:

```ts
export default defineConfig({
  base: '/github-repositories-explorer/',
});
```

Manual deploy (optional):

```bash
npm run build
npm run deploy
```

GitHub Actions will handle deployment automatically if configured.

---

## Folder Structure

```
src/
├── components/
|
├── common/
│   ├── Spinner.tsx
│   ├── __tests__/
│   │   └── Spinner.test.tsx
|
├── features/
│   ├── SearchBar.tsx
│   ├── UserAccordion.tsx
│   ├── __tests__/
│   │   └── SearchBar.test.tsx
│   │   └── UserAccordion.test.tsx
│
├── pages/
│   ├── Homepage.tsx
│   ├── __tests__/
│   │   └── Homepage.test.tsx
│
├── services/
│   ├── githubService.ts
│   ├── __tests__/
│   │   └── githubService.test.ts
│
├── App.tsx
├── __tests__/
│   └── app.test.tsx
│   └── main.test.tsx

```
