export interface ProjectConfig {
  projectName: string;
  botName: string;
  useDatabase: boolean;
  useI18n: boolean;
  packageManager: 'npm' | 'pnpm' | 'yarn';
}

export interface TemplateOptions {
  projectPath: string;
  config: ProjectConfig;
}
