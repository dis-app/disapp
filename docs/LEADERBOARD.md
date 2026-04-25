# LeaderboardBuilder

The `LeaderboardBuilder` provides a powerful and fully customizable system for creating leaderboards and user statistics embeds for any type of data - messages, reactions, voice activity, commands, or custom metrics.

## Features

- Universal leaderboard system for any metric
- Fully customizable titles, colors, and messages
- Custom medal emojis and rank display
- Flexible field configuration
- Custom formatters for users and values
- Support for thumbnails, images, and footers
- Specialized builders for voice activity

## Basic Usage

### Generic Leaderboard

```typescript
import { LeaderboardBuilder, LeaderboardData } from '@disapp/core';

const leaderboard = new LeaderboardBuilder();

const data: LeaderboardData[] = [
  { userId: 123n, value: 1000 },
  { userId: 456n, value: 800 },
  { userId: 789n, value: 600 },
];

const embed = await leaderboard.buildLeaderboard(data, {
  title: '🏆 Top Users',
  color: 0x5865f2,
});

await interaction.reply({ embeds: [embed] });
```

### Message Leaderboard

```typescript
import { LeaderboardBuilder, UserStatsRepository, LeaderboardData } from '@disapp/core';

const repository = new UserStatsRepository();
const leaderboard = new LeaderboardBuilder();

const stats = await repository.getLeaderboard(guildId, 'messages', 10);

const data: LeaderboardData[] = stats.map(stat => ({
  userId: stat.userId,
  value: stat.messageCount,
}));

const embed = await leaderboard.buildLeaderboard(data, {
  title: '💬 Message Leaderboard',
  formatValue: (count) => `${count} messages`,
});
```

### Voice Leaderboard

```typescript
import { VoiceLeaderboardBuilder, VoiceTracker } from '@disapp/core';

const tracker = new VoiceTracker(client.logger);
const leaderboard = new VoiceLeaderboardBuilder(tracker);

const embed = await leaderboard.buildVoiceLeaderboard(guildId, 10);
await interaction.reply({ embeds: [embed] });
```

## Customization

### Custom Title and Color

```typescript
const embed = await leaderboard.buildLeaderboard(data, {
  title: '🎮 Gaming Champions',
  color: 0xff6b6b,
});
```

### Custom Medals

```typescript
const embed = await leaderboard.buildLeaderboard(data, {
  medals: ['👑', '⭐', '💎'],
});
```

### Custom User Formatter

```typescript
const embed = await leaderboard.buildLeaderboard(data, {
  formatUser: (userId, index) => {
    if (index === 0) return `👑 **<@${userId}>**`;
    return `${index + 1}. <@${userId}>`;
  },
});
```

### Custom Value Formatter

```typescript
const embed = await leaderboard.buildLeaderboard(data, {
  formatValue: (value) => {
    const hours = Math.floor(value / 3600);
    const minutes = Math.floor((value % 3600) / 60);
    return `${hours}h ${minutes}m`;
  },
});
```

### Custom Fields

```typescript
const embed = await leaderboard.buildLeaderboard(data, {
  fields: [
    {
      name: '📈 Average',
      value: (data) => {
        const total = data.reduce((sum, item) => sum + item.value, 0);
        const avg = Math.floor(total / data.length);
        return avg.toString();
      },
      inline: true,
    },
  ],
});
```

### Thumbnails and Images

```typescript
const embed = await leaderboard.buildLeaderboard(data, {
  thumbnail: guild.iconURL(),
  image: 'https://example.com/banner.png',
  footer: 'Server Leaderboard',
});
```

## User Statistics

### Generic User Stats

```typescript
const stats = await repository.getUserStats(userId, guildId);
const rank = await repository.getUserRank(userId, guildId, 'messages');

const embed = await leaderboard.buildUserStats(stats, rank, {
  title: '📊 Your Statistics',
  fields: [
    { name: '💬 Messages', value: (stats) => stats.messageCount.toString(), inline: true },
    { name: '⭐ Reactions', value: (stats) => stats.reactionCount.toString(), inline: true },
  ],
});
```

### Voice User Stats

```typescript
const embed = await leaderboard.buildVoiceUserStats(userId, guildId, {
  title: '📊 Voice Statistics',
  color: 0x5865f2,
  thumbnail: user.displayAvatarURL(),
});
```

## Complete Examples

### Message Leaderboard Command

```typescript
import { Command, LeaderboardBuilder, UserStatsRepository, LeaderboardData } from '@disapp/core';
import { SlashCommandBuilder } from 'discord.js';

export default class MessageLeaderboardCommand extends Command {
  private repository: UserStatsRepository;
  private leaderboard: LeaderboardBuilder;

  constructor() {
    super({
      name: 'messageleaderboard',
      description: 'Show message leaderboard',
      data: new SlashCommandBuilder()
        .setName('messageleaderboard')
        .setDescription('Show message leaderboard'),
      execute: async () => {},
    });

    this.repository = new UserStatsRepository();
    this.leaderboard = new LeaderboardBuilder();
  }

  async execute(interaction: any) {
    const guildId = BigInt(interaction.guildId);
    const stats = await this.repository.getLeaderboard(guildId, 'messages', 10);
    
    const data: LeaderboardData[] = stats.map(stat => ({
      userId: stat.userId,
      value: stat.messageCount,
    }));

    const embed = await this.leaderboard.buildLeaderboard(data, {
      title: '💬 Message Leaderboard',
      color: 0x5865f2,
      formatValue: (count) => `${count} messages`,
      thumbnail: interaction.guild.iconURL() || undefined,
    });

    await interaction.reply({ embeds: [embed] });
  }
}
```

### Message Stats Command

```typescript
import { Command, LeaderboardBuilder, UserStatsRepository } from '@disapp/core';
import { SlashCommandBuilder } from 'discord.js';

export default class MessageStatsCommand extends Command {
  private repository: UserStatsRepository;
  private leaderboard: LeaderboardBuilder;

  constructor() {
    super({
      name: 'messagestats',
      description: 'Show message statistics',
      data: new SlashCommandBuilder()
        .setName('messagestats')
        .setDescription('Show message statistics'),
      execute: async () => {},
    });

    this.repository = new UserStatsRepository();
    this.leaderboard = new LeaderboardBuilder();
  }

  async execute(interaction: any) {
    const userId = BigInt(interaction.user.id);
    const guildId = BigInt(interaction.guildId);

    const stats = await this.repository.getUserStats(userId, guildId);
    const rank = await this.repository.getUserRank(userId, guildId, 'messages');

    const embed = await this.leaderboard.buildUserStats(stats, rank, {
      title: '💬 Message Statistics',
      color: 0x5865f2,
      thumbnail: interaction.user.displayAvatarURL(),
      fields: stats ? [
        { name: '💬 Messages', value: () => stats.messageCount.toString(), inline: true },
        { name: '⭐ Reactions', value: () => stats.reactionCount.toString(), inline: true },
        { name: '⚡ Commands', value: () => stats.commandCount.toString(), inline: true },
      ] : undefined,
    });

    await interaction.reply({ embeds: [embed] });
  }
}
```

## Tracking User Activity

### Message Tracking

```typescript
import { Event, UserStatsRepository } from '@disapp/core';
import { Events, Message } from 'discord.js';

export default class MessageCreateEvent extends Event {
  private repository: UserStatsRepository;

  constructor() {
    super({
      name: Events.MessageCreate,
      once: false,
      execute: async () => {},
    });

    this.repository = new UserStatsRepository();
  }

  async execute(message: Message) {
    if (message.author.bot) return;
    if (!message.guild) return;

    const userId = BigInt(message.author.id);
    const guildId = BigInt(message.guild.id);

    await this.repository.incrementMessages(userId, guildId, 1);
  }
}
```

### Reaction Tracking

```typescript
import { Event, UserStatsRepository } from '@disapp/core';
import { Events, MessageReaction, User } from 'discord.js';

export default class MessageReactionAddEvent extends Event {
  private repository: UserStatsRepository;

  constructor() {
    super({
      name: Events.MessageReactionAdd,
      once: false,
      execute: async () => {},
    });

    this.repository = new UserStatsRepository();
  }

  async execute(reaction: MessageReaction, user: User) {
    if (user.bot) return;
    if (!reaction.message.guild) return;

    const userId = BigInt(user.id);
    const guildId = BigInt(reaction.message.guild.id);

    await this.repository.incrementReactions(userId, guildId, 1);
  }
}
```

## LeaderboardOptions

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `title` | `string` | `'🏆 Leaderboard'` | Embed title |
| `color` | `ColorResolvable` | `0x5865f2` | Embed color |
| `emptyMessage` | `string` | `'No data available.'` | Message when no data |
| `medals` | `[string, string, string]` | `['🥇', '🥈', '🥉']` | Top 3 medals |
| `showRank` | `boolean` | `true` | Show rank numbers |
| `showTotalStats` | `boolean` | `true` | Show total statistics |
| `footer` | `string` | `undefined` | Embed footer text |
| `thumbnail` | `string` | `undefined` | Embed thumbnail URL |
| `image` | `string` | `undefined` | Embed image URL |
| `formatUser` | `(userId: bigint, index: number) => string` | Default formatter | Custom user formatter |
| `formatValue` | `(value: number) => string` | Default formatter | Custom value formatter |
| `fields` | `Array<Field>` | `undefined` | Additional custom fields |

## UserStatsOptions

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `title` | `string` | `'📊 Statistics'` | Embed title |
| `color` | `ColorResolvable` | `0x5865f2` | Embed color |
| `emptyMessage` | `string` | `'No data available.'` | Message when no data |
| `showRank` | `boolean` | `true` | Show user rank |
| `footer` | `string` | `undefined` | Embed footer text |
| `thumbnail` | `string` | `undefined` | Embed thumbnail URL |
| `image` | `string` | `undefined` | Embed image URL |
| `fields` | `Array<Field>` | `undefined` | Custom fields |

## LeaderboardData Interface

```typescript
interface LeaderboardData {
  userId: bigint;
  value: number;
  [key: string]: any;
}
```

The `LeaderboardData` interface allows you to include additional properties that can be used in custom formatters and fields.
