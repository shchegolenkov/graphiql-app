# GraphiQL

**GraphiQL** is an open-source online playground/IDE for graphQL requests.

## Key Features:

- Authorization and authentication capabilities, ensuring access to the tool is restricted to authorized users.
- Work with a user-specified open GraphQL endpoint.

## Application structure:

1. Welcome page
2. User auth
3. GraphiQL page with:

- request editor (query editor / JSON viewer)
- variables editor
- headers editor
- documentation explorer (should be lazy-loaded)
- response section (query editor / JSON viewer)
- possibility to change to a different user-specified API endpoint

## Authors:

- [Denis Shchegolenkov](https://github.com/shchegolenkov)
- [Pavel Mihailov](https://github.com/svygzhryr)
- [Egor Berezhnov](https://github.com/ygrcore)

## React + TypeScript + Vite

This project was initialized using Vite with the [react-ts template](https://stackblitz.com/edit/vitejs-vite-sr7j1i?file=index.html&terminal=dev).

Development Productivity Tools: **TypeScript**, **ESLint**, **Prettier**, **Husky**

## Technology Stack:

**React** : A JavaScript library for building user interfaces

**React Router DOM** : A routing library for React applications that enables navigation and URL handling.

**Redux Toolkit** : The official, opinionated toolkit for Redux state management.

**Vitest** : A testing library for JavaScript and TypeScript applications.

**SCSS (Sass)** : SCSS, or Sassy CSS, is a popular extension of CSS

## Available Scripts

`npm run dev` : Start the project in development mode using Vite.

`npm run build` : Build the project using TypeScript (TSC) and Vite.

`npm run test` : Run tests using Vitest and generate a code coverage report (c8).

`npm run lint` : Perform linting on the project using ESLint.

`npm run lint-fix` : Automatically fix detected linting issues.

`npm run preview` : Launch a preview of the project using Vite.

`npm run prettier-fix` : Apply Prettier to format code in the project.

`npm run prepare` : Install Git hooks using Husky to automatically run linting before commit.
