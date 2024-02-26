import { defineConfig } from 'orval';

export default defineConfig({
  auth: {
    input: 'http://localhost:3002/api-json',
    output: {
      target: 'src/api/auth-proxies.ts',
      tsconfig: 'tsconfig.json',
      override: {
        mutator: {
          path: 'src/api/axios.ts',
          name: 'customInstance',
        },
      },
    },
    hooks: {
      afterAllFilesWrite: ['prettier --write', 'yarn auth:eslint'],
    },
  },
});
