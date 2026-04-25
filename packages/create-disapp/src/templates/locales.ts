import fs from 'fs-extra';
import path from 'path';
import { TemplateOptions } from '../types.js';

export async function generateLocales(options: TemplateOptions) {
  const { projectPath } = options;

  const enLocale = {
    commands: {
      ping: {
        description: 'Check bot latency',
        response: '🏓 Pong! {latency}ms'
      },
      help: {
        description: 'Show help menu',
        title: '📚 Help Menu',
        commands: 'Available commands:'
      },
      language: {
        description: 'Change bot language',
        title: 'Select Language',
        current: 'Current language',
        success: '✅ Language set to {language}'
      }
    }
  };

  const trLocale = {
    commands: {
      ping: {
        description: 'Bot gecikmesi',
        response: '🏓 Pong! {latency}ms'
      },
      help: {
        description: 'Yardım menüsünü göster',
        title: '📚 Yardım Menüsü',
        commands: 'Mevcut komutlar:'
      },
      language: {
        description: 'Bot dilini değiştir',
        title: 'Dil Seçin',
        current: 'Mevcut dil',
        success: '✅ Dil {language} olarak ayarlandı'
      }
    }
  };

  await fs.ensureDir(path.join(projectPath, 'locales'));
  await fs.writeJson(path.join(projectPath, 'locales/en.json'), enLocale, { spaces: 2 });
  await fs.writeJson(path.join(projectPath, 'locales/tr.json'), trLocale, { spaces: 2 });
}
