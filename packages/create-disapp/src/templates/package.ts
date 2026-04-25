import fs from 'fs-extra';
import path from 'path';
import { TemplateOptions } from '../types.js';

export async function generatePackageJson(options: TemplateOptions) {
  const { projectPath, config } = options;
  const { projectName, useDatabase } = config;

  const pkg = {
    name: projectName,
    version: '1.0.0',
    type: 'module',
    scripts: {
      dev: 'tsx watch src/index.ts',
      build: 'tsc',
      start: 'node dist/index.js',
      ...(useDatabase && {
        'db:push': 'drizzle-kit push',
        'db:studio': 'drizzle-kit studio',
      }),
    },
    dependencies: {
      '@disapp/core': 'latest',
      'discord.js': '^14.26.3',
      'dotenv': '^16.4.5',
      ...(useDatabase && {
        'drizzle-orm': '^0.36.4',
        '@neondatabase/serverless': '^0.10.4',
      }),
    },
    devDependencies: {
      typescript: '^5.7.2',
      tsx: '^4.19.2',
      '@types/node': '^22.10.2',
      ...(useDatabase && {
        'drizzle-kit': '^0.28.1',
      }),
    },
  };

  await fs.writeJson(path.join(projectPath, 'package.json'), pkg, { spaces: 2 });
}
