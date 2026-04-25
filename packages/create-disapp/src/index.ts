#!/usr/bin/env node

import chalk from 'chalk';
import ora from 'ora';
import fs from 'fs-extra';
import path from 'path';
import { execSync } from 'child_process';
import { getProjectConfig } from './prompts.js';
import { generatePackageJson } from './templates/package.js';
import { generateTsConfig, generateEnvFiles, generateGitignore, generateDrizzleConfig } from './templates/config.js';
import { generateIndexFile } from './templates/index.js';
import { generatePingCommand, generateHelpCommand, generateLanguageCommand } from './templates/commands.js';
import { generateInteractionEvent, generateReadyEvent } from './templates/events.js';
import { generateReadme } from './templates/readme.js';
import { generateLocales } from './templates/locales.js';
import { TemplateOptions } from './types.js';

async function main() {
  const config = await getProjectConfig();
  const projectPath = path.resolve(process.cwd(), config.projectName);

  const spinner = ora('Creating project structure...').start();

  try {
    await fs.ensureDir(projectPath);
    await fs.ensureDir(path.join(projectPath, 'src'));
    await fs.ensureDir(path.join(projectPath, 'src/commands'));
    await fs.ensureDir(path.join(projectPath, 'src/events'));

    if (config.useDatabase) {
      await fs.ensureDir(path.join(projectPath, 'src/database'));
    }

    spinner.text = 'Generating files...';

    const options: TemplateOptions = { projectPath, config };

    await generatePackageJson(options);
    await generateTsConfig(options);
    await generateEnvFiles(options);
    await generateGitignore(options);
    await generateIndexFile(options);
    await generatePingCommand(options);
    await generateHelpCommand(options);
    await generateInteractionEvent(options);
    await generateReadyEvent(options);
    await generateReadme(options);

    if (config.useI18n) {
      await generateLocales(options);
      await generateLanguageCommand(options);
    }

    if (config.useDatabase) {
      await generateDrizzleConfig(options);
    }

    spinner.succeed(chalk.green('Project created successfully!'));

    console.log(chalk.bold.cyan('\n📦 Installing dependencies...\n'));
    
    const installSpinner = ora('Installing packages...').start();
    
    try {
      execSync(`cd ${config.projectName} && ${config.packageManager} install`, { 
        stdio: 'inherit'
      });
      installSpinner.succeed(chalk.green('Dependencies installed!'));
    } catch (error) {
      installSpinner.fail(chalk.yellow('Failed to install dependencies automatically'));
      console.log(chalk.yellow(`\nPlease run: cd ${config.projectName} && ${config.packageManager} install\n`));
    }

    console.log(chalk.bold.green('\n✨ Done! Your bot is ready.\n'));
    console.log(chalk.cyan('Next steps:\n'));
    console.log(chalk.white(`  1. ${chalk.bold(`cd ${config.projectName}`)}`));
    console.log(chalk.white(`  2. ${chalk.bold('Configure .env file with your bot token')}`));
    if (config.useDatabase) {
      console.log(chalk.white(`  3. ${chalk.bold('Configure DATABASE_URL in .env')}`));
      console.log(chalk.white(`  4. ${chalk.bold(`${config.packageManager} run db:push`)}`));
      console.log(chalk.white(`  5. ${chalk.bold(`${config.packageManager} run dev`)}`));
    } else {
      console.log(chalk.white(`  3. ${chalk.bold(`${config.packageManager} run dev`)}`));
    }
    console.log(chalk.gray('\n  Get your bot token: https://discord.com/developers/applications\n'));

  } catch (error: any) {
    spinner.fail(chalk.red('Failed to create project'));
    console.error(chalk.red(error.message));
    process.exit(1);
  }
}

main().catch(console.error);
