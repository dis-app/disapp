# Discord Components V2

Discord's Components V2 system (released March 2025) provides a modern way to build rich, interactive messages with complete control over layout and styling.

## Disapp v2() Builder

Disapp provides a fluent API for building Components V2 messages easily:

```typescript
import { v2 } from "@disapp/core";
import { ButtonStyle } from "discord.js";

const message = v2()
  .text("# Welcome")
  .separator()
  .buttons({
    id: "btn1",
    label: "Click me",
    style: ButtonStyle.Primary,
    onClick: async (i) => {
      await i.reply("You clicked!");
    },
  })
  .accentColor(0x5865f2)
  .build();

await interaction.reply(message);
```

### v2() Builder Methods

| Method                                        | Description                           | Returns  |
| --------------------------------------------- | ------------------------------------- | -------- |
| `text(content)`                               | Add text display component            | `this`   |
| `separator(divider?, spacing?)`               | Add separator component               | `this`   |
| `buttons(...buttons)`                         | Add button row with onClick handlers  | `this`   |
| `select(id, placeholder, options, onChange?)` | Add select menu with onChange handler | `this`   |
| `accentColor(color)`                          | Set container accent color            | `this`   |
| `enableAutoChunking(options?)`                | Enable auto-chunking for long text    | `this`   |
| `build()`                                     | Build final message payload           | `object` |

### Button Configuration

```typescript
interface ButtonConfig {
  id?: string; // Custom ID (required for non-link buttons)
  label?: string; // Button label
  style: number; // ButtonStyle enum value
  emoji?: string; // Emoji to display
  url?: string; // URL for link buttons
  disabled?: boolean; // Disable button
  onClick?: (i: any) => Promise<void> | void; // Click handler
}
```

### Example with onClick

```typescript
import { v2 } from "@disapp/core";
import { ButtonStyle } from "discord.js";

const message = v2()
  .text("# Welcome")
  .buttons(
    {
      id: "btn1",
      label: "Click me",
      style: ButtonStyle.Primary,
      onClick: async (i) => {
        await i.reply("You clicked button 1!");
      },
    },
    {
      id: "btn2",
      label: "Another button",
      style: ButtonStyle.Secondary,
      onClick: async (i) => {
        await i.reply("You clicked button 2!");
      },
    },
  )
  .build();

await interaction.reply(message);
```

### Select Configuration

```typescript
interface SelectOption {
  label: string; // Display label
  value: string; // Option value
  emoji?: string; // Emoji to display
  description?: string; // Option description
  default?: boolean; // Mark as default
}

// Usage
v2().select(
  "my_select", // Custom ID
  "Choose an option", // Placeholder
  [
    { label: "Option 1", value: "opt1" },
    { label: "Option 2", value: "opt2" },
  ],
  async (i) => {
    // onChange callback
    const selected = i.values[0];
    await i.reply(`You selected: ${selected}`);
  },
);
```

### Example with onChange

```typescript
import { v2 } from "@disapp/core";

const message = v2()
  .text("# Choose your language")
  .select(
    "language_select",
    "Select a language",
    [
      { label: "English", value: "en", emoji: "🇺🇸" },
      { label: "Turkish", value: "tr", emoji: "🇹🇷" },
      { label: "German", value: "de", emoji: "🇩🇪" },
    ],
    async (i) => {
      const language = i.values[0];
      await i.reply(`You selected: ${language}`);
    },
  )
  .build();

await interaction.reply(message);
```

### Accent Color

Set the container's accent color (left border):

```typescript
const message = v2()
  .text("# Success")
  .accentColor(0x57f287) // Green
  .build();

// Common colors
v2().accentColor(0x5865f2); // Discord Blurple
v2().accentColor(0x57f287); // Green
v2().accentColor(0xfee75c); // Yellow
v2().accentColor(0xed4245); // Red
v2().accentColor(0x99aab5); // Gray
```

## What's New in Components V2?

Components V2 completely reimagines how Discord messages are structured:

- **Everything is a component**: Text, images, buttons, and more are all components
- **Flexible layouts**: Use Containers, Sections, and Separators for precise control
- **No more embeds**: Text Display components replace traditional embeds
- **Visual grouping**: Containers with accent colors for better organization
- **Up to 40 components**: Increased from the previous limit

## Key Differences from V1

| Feature         | V1 (Legacy)     | V2 (Modern)                      |
| --------------- | --------------- | -------------------------------- |
| Message flag    | None            | `32768` (IS_COMPONENTS_V2)       |
| Text content    | `content` field | Text Display component (type 10) |
| Embeds          | `embeds` field  | Container + Text Display         |
| Max components  | 25              | 40                               |
| Layout control  | Limited         | Full control with Containers     |
| Visual grouping | Embeds only     | Containers with accent colors    |

## Using Components V2

### Required Flag

To use Components V2, you must set the message flag to `32768`:

```typescript
await interaction.reply({
  flags: 32768,
  components: [
    // Your components here
  ],
});
```

### Important Rules

1. **Cannot use `content` or `embeds` fields** - Use Text Display instead
2. **Cannot use `stickers` or `polls`** - Not supported with Components V2
3. **Attachments must be exposed through components** - Use File or Media Gallery
4. **Once set, the flag cannot be removed** - The message will always use Components V2

## Component Types

### Layout Components

#### Container (type 17)

Visually groups components with an optional accent color bar:

```typescript
{
  type: 17,
  accent_color: 0x5865f2,
  components: [
    // Child components
  ],
}
```

#### Separator (type 14)

Adds vertical spacing and optional divider:

```typescript
{
  type: 14,
  divider: true,
  spacing: 1,
}
```

#### Section (type 9)

Associates content with an accessory (like a thumbnail):

```typescript
{
  type: 9,
  components: [
    // Text Display components
  ],
  accessory: {
    type: 11,
    media: { url: 'https://example.com/image.png' },
  },
}
```

### Content Components

#### Text Display (type 10)

Displays markdown-formatted text:

```typescript
{
  type: 10,
  content: '# Heading\nMarkdown **text** with `code` and [links](https://example.com)',
}
```

#### Media Gallery (type 12)

Displays 1-10 images in a gallery:

```typescript
{
  type: 12,
  items: [
    {
      media: { url: 'https://example.com/image1.png' },
      description: 'Alt text for accessibility',
    },
  ],
}
```

#### Thumbnail (type 11)

Small image used as an accessory:

```typescript
{
  type: 11,
  media: { url: 'https://example.com/thumb.png' },
  description: 'Alt text',
}
```

#### File (type 13)

Displays an attached file:

```typescript
{
  type: 13,
  file: { url: 'attachment://filename.pdf' },
}
```

### Interactive Components

Interactive components (buttons, selects) work the same as V1 but must be inside Action Rows:

```typescript
{
  type: 1,
  components: [
    {
      type: 2,
      custom_id: 'my_button',
      label: 'Click Me',
      style: 1,
    },
  ],
}
```

## Example: Help Menu with Components V2

Here's a complete example from our help command:

```typescript
await interaction.reply({
  flags: 32768,
  components: [
    {
      type: 17,
      accent_color: 0x5865f2,
      components: [
        {
          type: 10,
          content: "# 📚 Help Menu\nWelcome! Select a category below.",
        },
        {
          type: 14,
          divider: true,
          spacing: 1,
        },
        {
          type: 10,
          content: "**🏠 General**\nBasic bot commands",
        },
        {
          type: 10,
          content: "**📊 Tracking**\nActivity tracking and statistics",
        },
        {
          type: 14,
          divider: false,
          spacing: 1,
        },
        {
          type: 10,
          content: "-# Use the buttons below to navigate",
        },
      ],
    },
    {
      type: 1,
      components: [
        {
          type: 2,
          custom_id: "help_general",
          label: "General",
          style: 1,
          emoji: "🏠",
        },
        {
          type: 2,
          custom_id: "help_tracking",
          label: "Tracking",
          style: 3,
          emoji: "📊",
        },
      ],
    },
  ],
});
```

## Markdown Support

Text Display components support full Discord markdown:

- **Headings**: `# H1`, `## H2`, `### H3`
- **Bold**: `**text**`
- **Italic**: `*text*`
- **Code**: `` `code` `` or ` ```language\ncode\n``` `
- **Links**: `[text](url)`
- **Lists**: `- item` or `1. item`
- **Quotes**: `> quote`
- **Spoilers**: `||spoiler||`
- **Subtext**: `-# small text`
- **Emojis**: `:emoji_name:` or custom emojis

## Color Values

Accent colors use RGB hex values (0x000000 to 0xFFFFFF):

- **Discord Blurple**: `0x5865f2`
- **Green**: `0x57f287`
- **Yellow**: `0xfee75c`
- **Red**: `0xed4245`
- **Gray**: `0x99aab5`

## Best Practices

1. **Use Containers for visual grouping** - Group related content together
2. **Add Separators for spacing** - Improve readability with proper spacing
3. **Use accent colors meaningfully** - Match colors to message intent
4. **Keep Text Display content focused** - Break long text into multiple components
5. **Provide alt text for images** - Use `description` field for accessibility
6. **Combine with interactive components** - Add buttons and selects for interactivity

## Migration from V1

If you're migrating from traditional embeds:

### Before (V1 with Embeds)

```typescript
await interaction.reply({
  embeds: [
    new EmbedBuilder()
      .setTitle("Title")
      .setDescription("Description")
      .setColor(0x5865f2)
      .addFields({ name: "Field", value: "Value" }),
  ],
});
```

### After (V2 with Components)

```typescript
await interaction.reply({
  flags: 32768,
  components: [
    {
      type: 17,
      accent_color: 0x5865f2,
      components: [
        {
          type: 10,
          content: "# Title\nDescription",
        },
        {
          type: 14,
          divider: true,
          spacing: 1,
        },
        {
          type: 10,
          content: "**Field**\nValue",
        },
      ],
    },
  ],
});
```

## Resources

- [Official Discord Components V2 Documentation](https://docs.discord.com/developers/components/reference)
- [Discord Developer Portal](https://discord.com/developers/docs)
- [Disapp Help Command Example](../examples/basic-bot/src/commands/help.ts)

## Components V1 vs V2 Comparison

### When to Use V1 (Legacy)

Use traditional Discord.js components when:

- You need maximum compatibility with older Discord.js versions
- You're maintaining existing code that uses V1
- You don't need advanced layout features

### When to Use V2 (Modern)

Use Components V2 with Disapp's v2() builder when:

- You want modern, flexible layouts
- You need better visual organization with containers
- You want automatic interaction handling with onClick/onChange
- You're building new features and can require Discord.js v14.26.3+
- You want cleaner, more maintainable code

### Feature Comparison

| Feature              | V1             | V2                                 |
| -------------------- | -------------- | ---------------------------------- |
| **Text Display**     | Embeds only    | Text Display components            |
| **Layout Control**   | Limited        | Full control with Containers       |
| **Max Components**   | 25             | 40                                 |
| **Visual Grouping**  | Embeds         | Containers with accent colors      |
| **Separators**       | Not available  | Built-in Separator components      |
| **Markdown Support** | Limited        | Full Discord markdown              |
| **Fluent API**       | MessageBuilder | v2() builder                       |
| **Auto Handlers**    | Manual setup   | Automatic with onClick/onChange    |
| **Auto-Chunking**    | Manual         | Built-in with enableAutoChunking() |

### Code Comparison

#### V1 (Traditional Embeds)

```typescript
import { msg, ButtonStyle } from "@disapp/core";

const message = msg()
  .setContent("Welcome!")
  .addEmbed(
    new EmbedBuilder()
      .setTitle("Title")
      .setDescription("Description")
      .setColor(0x5865f2),
  )
  .buttons({ label: "Click", id: "btn1", style: ButtonStyle.Primary })
  .build();

await interaction.reply(message);
```

#### V2 (Modern Components)

```typescript
import { v2 } from "@disapp/core";
import { ButtonStyle } from "discord.js";

const message = v2()
  .text("# Title\nDescription")
  .separator()
  .buttons({
    id: "btn1",
    label: "Click",
    style: ButtonStyle.Primary,
    onClick: async (i) => {
      await i.reply("Clicked!");
    },
  })
  .accentColor(0x5865f2)
  .build();

await interaction.reply(message);
```

### Migration Path

1. **Start with v2()** for new features
2. **Keep V1 for existing code** - no need to migrate immediately
3. **Gradually migrate** old commands to v2() as you update them
4. **Mix both** in the same bot - they work together

## Notes

- Components V2 is fully supported in Discord.js v14.26.3+
- The flag `32768` is equivalent to `1 << 15` (IS_COMPONENTS_V2)
- Legacy components (V1) will continue to work without the flag
- You can mix V1 and V2 messages in the same bot
- Once a message uses V2, it cannot be edited back to V1
