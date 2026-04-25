import fs from 'fs-extra';
import path from 'path';
import { TemplateOptions } from '../types.js';

export async function generateTsConfig(options: TemplateOptions) {
  const { projectPath } = options;

  const tsconfig = {
    compilerOptions: {
      target: 'ES2022',
      module: 'ESNext',
      moduleResolution: 'bundler',
      esModuleInterop: true,
      skipLibCheck: true,
      strict: true,
      outDir: './dist',
      rootDir: './src',
      resolveJsonModule: true,
      allowSyntheticDefaultImports: true,
    },
    include: ['src/**/*'],
    exclude: ['node_modules', 'dist'],
  };

  await fs.writeJson(path.join(projectPath, 'tsconfig.json'), tsconfig, { spaces: 2 });
}

export async function generateEnvFiles(options: TemplateOptions) {
  const { projectPath, config } = options;
  const { useDatabase } = config;

  const envExample = `DISCORD_TOKEN=your_bot_token_here
CLIENT_ID=your_client_id_here
GUILD_ID=your_guild_id_here
${useDatabase ? 'DATABASE_URL=your_neon_database_url_here' : ''}`;

  const env = `DISCORD_TOKEN=
CLIENT_ID=
GUILD_ID=
${useDatabase ? 'DATABASE_URL=' : ''}`;

  await fs.writeFile(path.join(projectPath, '.env.example'), envExample);
  await fs.writeFile(path.join(projectPath, '.env'), env);
}

export async function generateGitignore(options: TemplateOptions) {
  const { projectPath } = options;

  const content = `node_modules
dist
.env
*.log
.DS_Store
drizzle
`;

  await fs.writeFile(path.join(projectPath, '.gitignore'), content);
}

export async function generateDrizzleConfig(options: TemplateOptions) {
  const { projectPath } = options;

  const content = `import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  schema: './src/database/schema.ts',
  out: './drizzle',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});
`;

  await fs.writeFile(path.join(projectPath, 'drizzle.config.ts'), content);
}
