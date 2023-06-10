fetch-fe / [Exports](modules.md)

# Fetch Frontend Take-Home Assignment

This repository contains the frontend for the take-home assignment, the auto-generated documentation for the various files can be found in `/docs`.
The website is build using Vite and React, and relies on Vitest for the unit tests.

The website is deployed on Netlify [here](https://fetch-dog-shelter.netlify.app).

## Running instructions

- Install NodeJS. **The code has been tested with Node 16**
- Install the dependencies with `yarn`
- Run the vite development server with `yarn dev`

**NB: Since the website uses third party cookies for authentication, they need to be allowed in the browser for it to function. Otherwise, a generic error page is displayed.**

## Useful commands

- `dev` starts the development server
- `build` builds the production version of the website
- `preview` launches a local server to preview the production build
- `lint` uses eslint to perform linting
- `test` runs the unit tests using Vitest
- `coverage` runs the unit tests generating a code coverage report in `/coverage`
- `doc` generates the documentation in `/docs`
