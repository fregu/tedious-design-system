# Tedious Design System
takes the tedious of of web development, leaving the fun to you.

Zero config full stack solution for your web project including:

* HTTP/HTTPS server
* GraphQL API
* Redux state
* Server Side Rendering
* Service worker
* Web app manifest
* Webpack build
* Lint rules
* Jest testing library
* Language support
* CMS
* Git integration
  - With GitHub PullRequest and Issue reporting
* Command Line Interface
* Authentication
* Statistics and tracking
* Styleguide with patterns, components, views and guidelines
* Predifined ready to use components
* WebSockets real update
* Hot module reloading
* Component playground
* Online Live editor
* Documenation tool
* Supports
  - Flow types
  - Typescript
  - React

$ yarn add @tds/core
$ tds init



core [parser, server, provider, app, api, styleguide, sandbox]
cli  [build, git]


## Rapid prototying
Use prebuilt components and just write markup to quickly create bulding blocks, where you can create and modify the content to get proptypes up and running in minutes.

Automatically creating routes for each view component

## Styleguide
Automatic documenation and sandboc playground for each component displaying every component/view in the system

## Online CMS
Content managment based on View props and graphQL queries to easy create and modify content for each view.
By refering to the lang module, every instance using lang.translate() will be available for translation into any language.

## GraphQL
Define the graphql schema and they are autmatically available to use. Where no resolvers are available we will fill the empty blanks using faker data, but you can also create suitable resonses directly in the online CMS.

## API
TDS sets up an API for handling external and internal request, managing permissions, proxy for graphql resolvers and making CMS content available for external application, like native applications or deployed web applications.

## Server Side Rendering
Do the heavy lifting managing server side rendered routes, making the application load faster with content already fetched and state.

## Service Worker
Creating a service worker which for production mode will intercept any request and manage fallback from cache when no connection is available.

## Development
For development TDS automatically sets up a development environment with webpack dev server, hot module reloading, browsersync (allowing you to sync multiple browsers/devices wile interacting with one). And also sets up a default setup for working with Unit tests, flow types or typescript, redux developer tools, eslint, prettier and webpack loaders to make your development process quicker and easier.

## Component architecture
Working with components should be fun, and refering to them needs to be easy to identify. A child could do it, and so can you.

### Instructions
Patterns and guidelines

### Bricks
Reusable components

### Kits
Collectables

### Creations
Complete creations

### Tools
Screw drivers and superglue

### Plates
Layout templates for foundation

## Getting started

$ tds init
  Name of application:
  Framework: [React, Vue, Angular, Polymer]
  GraphQL: [yes/no]
  Redux: [yes/no]
  EnableSSL: [yes/no]
  Authentication: [Google, Facebook, Azure, password, none]

  setting up your design system ........ done
  creating remote repository .... done
  deploy application running `git push production master` or `tds deploy`


$ tds start
  Building assets .... done
  Building styles .... done
  Buildning application .... done
  Generating icons .... done
  Creating manifest .... done
  Adding service worker .... done
  ----------------
  Server running on http://localhost:1234 or https://localhost:1234
  GraphQl server running on http://localhost:1234/graphql or https://localhost:1234/graphql
  Styleguide running on http://localhost:1234/styleguide or https://localhost:1234/styleguide

---


$ tds build
  Building assets .... done
  Building styles .... done
  Buildning application .... done
  Generating icons .... done
  Creating manifest .... done
  Adding service worker .... done


$ tds deploy
  git push production <currentBranch>:master


$ tds eject
  Creating webpack configuration .... done
  Creating babel configuration .... done
  Creating postCSS configuration .... done
  Updating lds.config.js

  Build will use webpack.config.js for future bundles


$ tds inject
  Updating lds.config.js

  Build will use predefined config for future bundles








@tds/core
CLI, parser, config

- Parse structure and build extend config object
- Listen for tds commands and import appropriate modules

@tds/build
app, webpack, postcss, providers

- Build application creating a app root with routes based on config and views
- Build server side rendered version of app with same routes
- Optimize build based on mode and config
- Generate favicons
- Generate web app manifest and service worker.

@tds/server
koa, @tds/build, graphql, api, ssl, ws, static

- Create HTTP/HTTPS server hosting application
- Setup GraphQl endpoint
- setup REST api enpoints
- serve static assets

@tds/styleguide
server, mdx, sandbox, editor, git

- Create a new server (or extend endpoint on existing) serving a documenation of application
- Identify proptypes, setup playground display documentation
- Trigger GIT (current branch) Pull Request for changes
