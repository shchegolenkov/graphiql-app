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

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
  },
}
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list
