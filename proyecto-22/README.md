# Stale library code in `ng serve` after rebuilding a linked library

## Environment

- Angular CLI : 22.2.7
- Angular : 22.2.6
- Node.js : 24.21.0
- Package Manager : npm 11.19.0
- Operating System : win32 x64

## Setup

Folder layout:

```
repro/
  libreria-22/   # Angular library (ng-packagr)
  proyecto-22/   # Angular application
```

The app consumes the library through a `file:` dependency (npm `install-links=false`, so `node_modules/libreria` is a Junction to `libreria-22/dist/libreria`):

```json
"libreria": "file:../libreria-22/dist/libreria"
```

`proyecto-22/angular.json` already contains `poll: 1000` and `prebundle.exclude: ["libreria"]` under `serve.options`.

Install and first build:

```bash
cd libreria-22
npm install
ng build libreria --configuration development

cd ../proyecto-22
npm install
```

## Steps to reproduce

1. Terminal A: `cd libreria-22 && ng build libreria --watch --configuration development`
2. Terminal B: `cd proyecto-22 && ng serve`
3. Open http://localhost:4200 and check the console: it prints `v1`.
4. In `libreria-22/projects/libreria/src/lib/libreria-servicio.ts`, change `console.log('v1')` to `console.log('v2')`.
5. Wait until ng-packagr finishes (terminal A).
6. Terminal B prints "Application bundle generation complete". Reload the page.

## Expected

The console prints `v2`.

## Actual

The console still prints `v1`. `main.js` contains the old library code while the embedded source map already has the new source. Opening `libreria-22/dist/libreria/fesm2022/libreria.mjs` shows `v2` on disk.

Stopping and restarting `ng serve` fixes it.
