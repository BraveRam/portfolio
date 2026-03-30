# Repository Guidelines

## Project Structure & Module Organization
This repository is a Next.js 16 portfolio app using the App Router. Route entry points live in `app/`, including API handlers under `app/api/*/route.ts` and the blog index at `app/blogs/page.tsx`. Reusable UI lives in `components/`, with lower-level primitives in `components/ui/`. Shared helpers and content data live in `lib/` and `lib/info/`. Static files such as icons, project screenshots, and the CV belong in `public/`.

## Build, Test, and Development Commands
- `npm run dev`: start the local Next.js dev server at `http://localhost:3000`.
- `npm run build`: create a production build and catch route/type issues.
- `npm run start`: serve the production build locally after `npm run build`.
- `npm run lint`: run ESLint with the Next.js core-web-vitals and TypeScript rules.

Use `npm install` to sync dependencies from `package-lock.json`.

## Coding Style & Naming Conventions
Write TypeScript with `strict` mode in mind and prefer the `@/*` import alias for project-root imports. Use 2-space indentation and match the surrounding quote style in the file; the codebase currently contains both single- and double-quoted files, so keep edits locally consistent. Name React components in PascalCase (`Projects.tsx`), helpers in camelCase (`utils.ts`), and route files with Next.js defaults such as `page.tsx`, `layout.tsx`, and `route.ts`.

## Testing Guidelines
There is no dedicated automated test suite yet. Until one is added, treat `npm run lint` and `npm run build` as required validation for every change. For UI work, verify the affected page in the browser. For API changes, manually exercise endpoints such as `POST /api/contact` and confirm required environment variables are present.

## Commit & Pull Request Guidelines
Recent history uses short, imperative commit messages, sometimes with Conventional Commit prefixes like `feat:` or `style:`. Follow that pattern, for example: `feat: refresh project cards` or `fix: validate empty contact messages`. Pull requests should include a concise summary, note any config or environment changes, link related issues when applicable, and attach screenshots or short recordings for visible UI updates.

## Security & Configuration Tips
Keep secrets such as `TELEGRAM_BOT_TOKEN`, `TELEGRAM_CHAT_ID`, and any AI provider keys in local environment files, not in source control. When editing `app/api/*`, fail safely on missing configuration and avoid logging sensitive values.
