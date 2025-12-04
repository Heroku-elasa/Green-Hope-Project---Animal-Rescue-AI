// This file is for vite `import.meta.env` types, but for this project we're
// polyfilling `process.env` via vite's `define` config to adhere to guidelines.

declare namespace NodeJS {
  interface ProcessEnv {
    API_KEY: string;
    GOOGLE_CLIENT_ID: string;
  }
}

// FIX: Augment the global Process interface directly to include cwd() and env
interface Process {
  cwd(): string;
  env: NodeJS.ProcessEnv;
}