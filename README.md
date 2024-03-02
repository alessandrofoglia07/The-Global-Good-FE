<div align="center">

<br>

# **Modern** Vite React PWA Template

This modern template is the perfect starting point for any modern React project. It includes the latest and greatest tools and technologies to help you build your next project.

</div>

<br>

## Table of contents

-   [Installation](#installation)
-   [Features](#features)
-   [Next steps](#next-steps)
-   [Commands](#commands)
    -   [Default commands](#default-commands)
    -   [Docker commands](#docker-commands)
-   [License](#license)

<br>

## Installation

```bash
npx create-modern-react-pwa my-app
```

or

```
pnpx create-modern-react-pwa my-app
```

<br>

## Features

This template includes the following features:

<div style="width: 100%">

-   <div style="display: flex; align-items: center; transform: translateY(30%)"><img style="width: 10%; border: none!important; margin-right: 10px; margin-bottom: 20px" src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/512px-React-icon.svg.png?20220125121207">

    **[React](https://react.dev/)** - A JavaScript library for building user interfaces.
    </div>

-   <div style="display: flex; align-items: center; transform: translateY(30%)"><img style="width: 10%; border: none!important; margin-right: 10px; margin-bottom: 20px" src="https://raw.githubusercontent.com/alessandrofoglia07/modern-vite-react-app/main/public/logos/vite-logo.png">

    **[Vite](https://vitejs.dev/)** - A build tool that aims to provide a faster development experience for modern web projects.
    </div>

-   <div style="display: flex; align-items: center; transform: translateY(30%)"><img style="width: 10%; border: none!important; margin-right: 10px; margin-bottom: 20px" src="https://raw.githubusercontent.com/alessandrofoglia07/modern-vite-react-app/main/public/logos/ts-logo.png">

    **[Typescript](https://www.typescriptlang.org/)** - A strongly typed programming language that builds on JavaScript, giving you better tooling at any scale.
    </div>

-   <div style="display: flex; align-items: center; transform: translateY(10%); margin-top: 2%"><img style="width: 10%; border: none!important; margin-right: 10px; margin-bottom: 10px" src="https://raw.githubusercontent.com/alessandrofoglia07/modern-vite-react-app/main/public/logos/pwa-logo.png">

    **[PWA](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps)** - An app that's built using web platform technologies, but that provides a user experience like that of a platform-specific app.
    </div>

-   <div style="display: flex; align-items: center; transform: translateY(30%); margin-top: -20px"><img style="width: 10%; border: none!important; margin-right: 10px; margin-bottom: 20px" src="https://raw.githubusercontent.com/alessandrofoglia07/modern-vite-react-app/main/public/logos/pnpm-logo.png">

    **[pnpm](https://pnpm.io/)** - Fast, disk space efficient package manager.
    </div>

-   <div style="display: flex; align-items: center; transform: translateY(15%)"><img style="width: 10%; border: none!important; margin-right: 10px; margin-bottom: 20px" src="https://raw.githubusercontent.com/alessandrofoglia07/modern-vite-react-app/main/public/logos/docker-logo.png">

    **[Docker](https://www.docker.com/)** - A set of platform as a service products that use OS-level virtualization to deliver software in packages called containers.
    </div>

-   <div style="display: flex; align-items: center; transform: translateY(25%)"><img style="width: 10%; border: none!important; margin-right: 10px; margin-bottom: 20px" src="https://raw.githubusercontent.com/alessandrofoglia07/modern-vite-react-app/main/public/logos/eslint-logo.svg">

    **[ESLint](https://eslint.org/)** - A pluggable and configurable linter tool for identifying and reporting on patterns in JavaScript.
    </div>

-   <div style="display: flex; align-items: center; transform: translateY(25%)"><img style="width: 10%; border: none!important; margin-right: 10px; margin-bottom: 20px" src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fbrandslogos.com%2Fwp-content%2Fuploads%2Fimages%2Flarge%2Fprettier-logo.png&f=1&nofb=1&ipt=1c224c986059edaabb2b01cdb02367258fff0b442aa645a1a65d69fe36dfd35b&ipo=images">

    **[Prettier](https://prettier.io/)** - An opinionated code formatter that enforces a consistent code style across your entire codebase.
    </div>

</div>

-   <div style="display: flex; align-items: center; transform: translateY(25%)"><img style="width: 10%; border: none!important; margin-right: 10px; margin-bottom: 20px" src="https://raw.githubusercontent.com/alessandrofoglia07/modern-vite-react-app/main/public/logos/tailwindcss-logo.png">

    **[Tailwind CSS](https://tailwindcss.com/)** - A utility-first CSS framework for rapidly building custom user interfaces.
    </div>

-   <div style="display: flex; align-items: center; transform: translateY(25%)"><img style="width: 10%; border: none!important; margin-right: 10px; margin-bottom: 20px" src="https://raw.githubusercontent.com/alessandrofoglia07/modern-vite-react-app/main/public/logos/headlessui-logo.png">

    **[HeadlessUI](https://headlessui.com/)** - Completely unstyled, fully accessible UI components, designed to integrate beautifully with Tailwind CSS.
    </div>

</div>

<br>
<br>

## Next steps

Once you have downloaded or cloned the template, you need to install the dependencies. To do so, run the following command:

```bash
cd my-app
```

```bash
pnpm install
```

Note: If you don't have pnpm installed, you can install it by running the following command:

```bash
npm install -g pnpm
```

Once the dependencies are installed, you can delete the default `public/logos` folder and the `README.md` file and start customizing your app!

<br>

## Commands

This template includes the following commands:

### Default commands

### `pnpm dev`

Runs the app in the development mode. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `pnpm build`

Builds the app for production to the `dist` folder.

### `pnpm preview`

Serves the production build from the `dist` folder.

### `pnpm lint`

Runs ESLint on the `src` folder.

### `pnpm format`

Runs Prettier on the `src` folder and fixes the errors.

### `pnpm format:check`

Runs Prettier on the `src` folder and checks for errors.

### Docker commands

### `pnpm docker-build:dev`

Builds the app for development using Docker.

### `pnpm docker-build:prod`

Builds the app for production using Docker.

### `pnpm docker-run:dev-win`

Runs the app in development mode using Docker on Windows. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `pnpm docker-run:dev-linux`

Runs the app in development mode using Docker on Linux. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `pnpm docker-run:prod`

Runs the app in production mode using Docker. Open [http://localhost:8080](http://localhost:8080) to view it in the browser.

#### You can customize these commmands in the `package.json` file.

<br>

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

<br>

<div align="center">
    Made with 💜 by <a href="https://github.com/alessandrofoglia07" style="color: white; text-decoration: underline;">Alexxino</a>
</div>
