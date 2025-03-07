# Todo App

This is a Todo application built with Nuxt 3, Tailwind CSS, and Supabase. The application allows users to manage their tasks efficiently with a modern and responsive UI.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)

## Features

- User authentication with Supabase
- Task management (create, update, delete tasks)
- Responsive design with Tailwind CSS
- State management with Pinia
- Persistent state with `pinia-plugin-persistedstate`
- Server-side rendering and static site generation with Nuxt 3

## Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/yourusername/todo-app.git
   cd todo-app
   ```

2. Install dependencies:

   ```sh
   npm install
   ```

3. Create a `.env` file in the root directory and add your environment variables:

   ```env
   BASE_URL=http://localhost:3000
   SUPABASE_URL=https://your-supabase-url.supabase.co
   SUPABASE_KEY=your-supabase-key
   ```

## Configuration

The configuration for the project is defined in the `nuxt.config.ts` file. Here you can customize various settings such as modules, runtime configuration, and more.

## Usage

To start the development server, run:

```sh
npm run dev
```

To build the project for production, run:

```sh
npm run build
```

To preview the production build, run:

```sh
npm run preview
```

## Project Structure

```markdown
.env
.gitignore
[nuxt.config.ts](http://_vscodecontentref_/1)
[package.json](http://_vscodecontentref_/2)
[README.md](http://_vscodecontentref_/3)
[tsconfig.json](http://_vscodecontentref_/4)
.nuxt/
  [app.config.mjs](http://_vscodecontentref_/5)
  components.d.ts
  [imports.d.ts](http://_vscodecontentref_/6)
  [nitro.json](http://_vscodecontentref_/7)
  nuxt-icon-client-bundle.mjs
  nuxt-icon-server-bundle.mjs
  [nuxt.d.ts](http://_vscodecontentref_/8)
  [nuxt.json](http://_vscodecontentref_/9)
  [nuxtui-tailwind.config.mjs](http://_vscodecontentref_/10)
  [tsconfig.json](http://_vscodecontentref_/11)
  tsconfig.server.json
  ui.colors.d.ts
  ui.colors.mjs
  cache/
  dev/
  manifest/
  schema/
  tailwind/
  types/
.output/
public/
assets/
  css/
  img/
components/
  ...
composables/
  ...
layouts/
  ...
middleware/
pages/
public/
server/
store/
types/
```
