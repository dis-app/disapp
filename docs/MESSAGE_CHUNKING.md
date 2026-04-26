# Message Chunking

The Message Chunking system automatically splits long messages into multiple chunks to comply with Discord's 2000 character limit. It intelligently handles code blocks, preserves formatting, and provides extensive customization options.

## Features

- Automatic message splitting at 2000 characters (or custom limit)
- Code block preservation (never breaks code blocks)
- Smart splitting at line breaks
- Customizable separators, prefixes, and suffixes
- Optional enable/disable
- Works with MessageBuilder and InteractionBuilder
- Standalone utility function
- **Auto-Chunking with v2() builder** - Automatic chunking in Components V2 messages

## Auto-Chunking with v2() Builder

The modern way to handle long text in Components V2 messages:

```typescript
import { v2 } from "@disapp/core";

const longText = "Very long text that exceeds 2000 characters...";

const message = v2().enableAutoChunking().text(longText).build();

await interaction.reply(message);
```

### Auto-Chunking Options

```typescript
interface AutoChunkerOptions {
  maxLength?: number; // Default: 2000
  preserveCodeBlocks?: boolean; // Default: true
  preserveMarkdown?: boolean; // Default: true
  separator?: string; // Default: '\n'
}
```

### Auto-Chunking Examples

#### Basic Usage

```typescript
const message = v2().enableAutoChunking().text(veryLongText).build();
```

#### Custom Max Length

```typescript
const message = v2()
  .enableAutoChunking({
    maxLength: 1500,
  })
  .text(veryLongText)
  .build();
```

#### With Code Block Preservation

```typescript
const message = v2()
  .enableAutoChunking({
    maxLength: 2000,
    preserveCodeBlocks: true,
    preserveMarkdown: true,
  })
  .text(
    `
# Documentation

\`\`\`typescript
// This code block will stay intact
function example() {
  return 'hello';
}
\`\`\`

More content here...
  `,
  )
  .build();
```

#### Complete Example with Buttons

```typescript
import { v2 } from "@disapp/core";
import { ButtonStyle } from "discord.js";

const message = v2()
  .enableAutoChunking({
    maxLength: 2000,
    preserveCodeBlocks: true,
  })
  .text(longDocumentation)
  .separator()
  .buttons(
    {
      id: "prev",
      label: "Previous",
      style: ButtonStyle.Secondary,
      onClick: async (i) => {
        await i.reply("Previous page");
      },
    },
    {
      id: "next",
      label: "Next",
      style: ButtonStyle.Secondary,
      onClick: async (i) => {
        await i.reply("Next page");
      },
    },
  )
  .build();

await interaction.reply(message);
```

### AutoChunker Standalone Class

For manual chunking outside of v2() builder:

```typescript
import { AutoChunker } from "@disapp/core";

const longText = "..."; // 5000 characters
const chunks = AutoChunker.autoChunk(longText, {
  maxLength: 2000,
  preserveCodeBlocks: true,
});

for (const chunk of chunks) {
  await channel.send(chunk);
}
```

## Basic Usage

### With MessageBuilder

```typescript
import { MessageBuilder } from "@disapp/core";

const message = new MessageBuilder()
  .setContent(longText)
  .enableChunking()
  .build();

if (Array.isArray(message)) {
  await interaction.reply(message[0]);
  for (let i = 1; i < message.length; i++) {
    await interaction.followUp(message[i]);
  }
} else {
  await interaction.reply(message);
}
```

### Standalone Function

```typescript
import { chunkMessage } from "@disapp/core";

const chunks = chunkMessage(longText, {
  maxLength: 600,
  separator: "\n",
});

for (const chunk of chunks) {
  await channel.send(chunk);
}
```

### MessageChunker Class

```typescript
import { MessageChunker } from "@disapp/core";

const chunker = new MessageChunker({
  maxLength: 600,
  preserveCodeBlocks: true,
});

const chunks = chunker.chunk(longText);
```

## Configuration Options

### ChunkerOptions

| Option               | Type      | Default | Description                  |
| -------------------- | --------- | ------- | ---------------------------- |
| `enabled`            | `boolean` | `true`  | Enable/disable chunking      |
| `maxLength`          | `number`  | `2000`  | Maximum characters per chunk |
| `separator`          | `string`  | `'\n'`  | Preferred split separator    |
| `preserveCodeBlocks` | `boolean` | `true`  | Never break code blocks      |
| `prefix`             | `string`  | `''`    | Add prefix to each chunk     |
| `suffix`             | `string`  | `''`    | Add suffix to each chunk     |

## Examples

### Custom Max Length

```typescript
const message = new MessageBuilder()
  .setContent(longText)
  .enableChunking({ maxLength: 600 })
  .build();
```

### With Prefix and Suffix

```typescript
const message = new MessageBuilder()
  .setContent(longText)
  .enableChunking({
    maxLength: 1000,
    prefix: "📄 ",
    suffix: " ⏎",
  })
  .build();
```

### Disable Code Block Preservation

```typescript
const message = new MessageBuilder()
  .setContent(longText)
  .enableChunking({
    preserveCodeBlocks: false,
  })
  .build();
```

### Custom Separator

```typescript
const message = new MessageBuilder()
  .setContent(longText)
  .enableChunking({
    separator: ". ",
  })
  .build();
```

### Disable Chunking

```typescript
const message = new MessageBuilder()
  .setContent(longText)
  .disableChunking()
  .build();
```

## Complete Command Example

```typescript
import { Command, MessageBuilder } from '@disapp/core';
import { SlashCommandBuilder } from 'discord.js';

export default class LongMessageCommand extends Command {
  constructor() {
    super({
      name: 'longmessage',
      description: 'Send long message with chunking',
      data: new SlashCommandBuilder()
        .setName('longmessage')
        .setDescription('Send long message with chunking')
        .addIntegerOption(option =>
          option
            .setName('maxchunk')
            .setDescription('Maximum chunk length')
            .setRequired(false)
            .setMinValue(100)
            .setMaxValue(2000)
        ),
      execute: async () => {},
    });
  }

  async execute(interaction: any) {
    const maxChunk = interaction.options.getInteger('maxchunk') || 600;
    const longText = this.generateLongText(3000);

    const message = new MessageBuilder()
      .setContent(longText)
      .enableChunking({
        enabled: true,
        maxLength: maxChunk,
        separator: '\n',
        prefix: '📄 ',
        suffix: ' ⏎',
      })
      .build();

    if (Array.isArray(message)) {
      await interaction.reply(message[0]);

      for (let i = 1; i < message.length; i++) {
        await interaction.followUp(message[i]);
      }

      await interaction.followUp({
        content: \`✅ Message split into \${message.length} chunks!\`,
        ephemeral: true,
      });
    } else {
      await interaction.reply(message);
    }
  }

  private generateLongText(length: number): string {
    return 'Your long text here...';
  }
}
```

## Code Block Handling

The chunker intelligently handles code blocks:

```typescript
const text = \`
Some text before code.

\\\`\\\`\\\`typescript
function example() {
  console.log('This code block will never be broken');
  return true;
}
\\\`\\\`\\\`

Text after code block.
\`;

const chunks = chunkMessage(text, {
  maxLength: 100,
  preserveCodeBlocks: true,
});
```

When a code block needs to be split across chunks:

- The first chunk ends with \`\\\`\\\`\`
- The next chunk starts with \`\\\`\\\`language\`
- Code block language is preserved

## With InteractionBuilder

```typescript
import { InteractionBuilder } from "@disapp/core";

const response = new InteractionBuilder()
  .setContent(longText)
  .enableChunking({ maxLength: 800 })
  .addEmbed(embed)
  .build();

if (Array.isArray(response)) {
  await interaction.reply(response[0]);
  for (let i = 1; i < response.length; i++) {
    await interaction.followUp(response[i]);
  }
} else {
  await interaction.reply(response);
}
```

## Behavior

### Single Message

If content fits within maxLength, returns a single message object.

### Multiple Chunks

If content exceeds maxLength, returns an array of message objects:

- First chunk includes embeds (if any)
- Last chunk includes components (if any)
- Middle chunks only have content

### Smart Splitting

The chunker tries to split at the specified separator (default: newline) within the last 50% of the chunk to avoid breaking words or sentences.

## Dynamic Configuration

```typescript
const chunker = new MessageChunker({ maxLength: 1000 });

chunker.setOptions({ maxLength: 500 });

const options = chunker.getOptions();
console.log(options.maxLength);
```

## Best Practices

1. **Always check if result is array**: The build() method returns either a single object or an array
2. **Use appropriate maxLength**: Consider Discord's 2000 limit and your content
3. **Enable code block preservation**: Prevents breaking syntax highlighting
4. **Use meaningful separators**: '\n' for paragraphs, '. ' for sentences
5. **Add visual indicators**: Use prefix/suffix to show chunked messages

## Performance

The chunker is optimized for:

- Large messages (10,000+ characters)
- Multiple code blocks
- Mixed content (text + code)
- Minimal memory allocation

## Limitations

- Maximum Discord message length: 2000 characters
- Embeds only appear in first chunk
- Components only appear in last chunk
- Files only appear in first chunk (InteractionBuilder)
