# Disapp Örnekler

## Basit Bot

```typescript
import { DisappClient } from '@disapp/discord-core';
import { GatewayIntentBits } from 'discord.js';

const client = new DisappClient({
  intents: [GatewayIntentBits.Guilds],
  config: {
    token: process.env.DISCORD_TOKEN!,
    clientId: process.env.CLIENT_ID!,
    database: {
      url: process.env.DATABASE_URL!,
    },
  },
});

await client.start();
```

## Slash Command

```typescript
import { Command } from '@disapp/discord-core';
import { SlashCommandBuilder, ChatInputCommandInteraction } from 'discord.js';

export default class AvatarCommand extends Command {
  constructor() {
    super({
      name: 'avatar',
      description: 'Kullanıcının avatarını gösterir',
      data: new SlashCommandBuilder()
        .setName('avatar')
        .setDescription('Kullanıcının avatarını gösterir')
        .addUserOption(option =>
          option
            .setName('kullanici')
            .setDescription('Avatar gösterilecek kullanıcı')
            .setRequired(false)
        ),
      execute: async () => {},
    });
  }

  async execute(interaction: ChatInputCommandInteraction): Promise<void> {
    const user = interaction.options.getUser('kullanici') || interaction.user;
    
    const embed = {
      color: 0x5865f2,
      title: `${user.username} Avatar`,
      image: {
        url: user.displayAvatarURL({ size: 1024 }),
      },
    };

    await interaction.reply({ embeds: [embed] });
  }
}
```

## Database Kullanımı

```typescript
import { Command } from '@disapp/discord-core';
import { SlashCommandBuilder, ChatInputCommandInteraction } from 'discord.js';
import { UserRepository } from '@disapp/discord-core';

export default class ProfileCommand extends Command {
  private userRepo: UserRepository;

  constructor() {
    super({
      name: 'profil',
      description: 'Kullanıcı profilini gösterir',
      data: new SlashCommandBuilder()
        .setName('profil')
        .setDescription('Kullanıcı profilini gösterir'),
      execute: async () => {},
    });

    this.userRepo = new UserRepository();
  }

  async execute(interaction: ChatInputCommandInteraction): Promise<void> {
    const dbUser = await this.userRepo.getOrCreate(
      BigInt(interaction.user.id),
      interaction.user.username,
      interaction.user.avatar || undefined
    );

    const embed = {
      color: 0x5865f2,
      title: 'Profil',
      fields: [
        {
          name: 'Kullanıcı',
          value: interaction.user.username,
          inline: true,
        },
        {
          name: 'Kayıt Tarihi',
          value: `<t:${Math.floor(dbUser.createdAt!.getTime() / 1000)}:R>`,
          inline: true,
        },
      ],
    };

    await interaction.reply({ embeds: [embed] });
  }
}
```

## Event Handling

```typescript
import { Event } from '@disapp/discord-core';
import { Events, Message } from 'discord.js';

export default class MessageCreateEvent extends Event {
  constructor() {
    super({
      name: Events.MessageCreate,
      once: false,
      execute: async () => {},
    });
  }

  async execute(message: Message): Promise<void> {
    if (message.author.bot) return;

    if (message.content.toLowerCase() === 'merhaba') {
      await message.reply('Merhaba! 👋');
    }
  }
}
```

## Cooldown Sistemi

```typescript
import { Command } from '@disapp/discord-core';
import { SlashCommandBuilder, ChatInputCommandInteraction } from 'discord.js';

export default class DailyCommand extends Command {
  constructor() {
    super({
      name: 'gunluk',
      description: 'Günlük ödülünü al',
      data: new SlashCommandBuilder()
        .setName('gunluk')
        .setDescription('Günlük ödülünü al'),
      execute: async () => {},
      cooldown: 86400,
    });
  }

  async execute(interaction: ChatInputCommandInteraction): Promise<void> {
    await interaction.reply('🎁 Günlük ödülünü aldın! +100 coin');
  }
}
```

## Embed Mesajları

```typescript
import { Command } from '@disapp/discord-core';
import { SlashCommandBuilder, ChatInputCommandInteraction, EmbedBuilder } from 'discord.js';

export default class InfoCommand extends Command {
  constructor() {
    super({
      name: 'bilgi',
      description: 'Bot hakkında bilgi',
      data: new SlashCommandBuilder()
        .setName('bilgi')
        .setDescription('Bot hakkında bilgi'),
      execute: async () => {},
    });
  }

  async execute(interaction: ChatInputCommandInteraction): Promise<void> {
    const embed = new EmbedBuilder()
      .setColor(0x5865f2)
      .setTitle('Bot Bilgileri')
      .setDescription('Disapp framework ile geliştirildi')
      .addFields(
        { name: 'Sunucu Sayısı', value: `${interaction.client.guilds.cache.size}`, inline: true },
        { name: 'Kullanıcı Sayısı', value: `${interaction.client.users.cache.size}`, inline: true },
        { name: 'Ping', value: `${interaction.client.ws.ping}ms`, inline: true }
      )
      .setTimestamp()
      .setFooter({ text: 'Disapp Framework' });

    await interaction.reply({ embeds: [embed] });
  }
}
```
