# Discord Components V2

Discord's Components V2 system (released March 2025) provides a modern way to build rich, interactive messages with complete control over layout and styling.

## What's New in Components V2?

Components V2 completely reimagines how Discord messages are structured:

- **Everything is a component**: Text, images, buttons, and more are all components
- **Flexible layouts**: Use Containers, Sections, and Separators for precise control
- **No more embeds**: Text Display components replace traditional embeds
- **Visual grouping**: Containers with accent colors for better organization
- **Up to 40 components**: Increased from the previous limit

## Key Differences from V1

| Feature | V1 (Legacy) | V2 (Modern) |
|---------|-------------|-------------|
| Message flag | None | `32768` (IS_COMPONENTS_V2) |
| Text content | `content` field | Text Display component (type 10) |
| Embeds | `embeds` field | Container + Text Display |
| Max components | 25 | 40 |
| Layout control | Limited | Full control with Containers |
| Visual grouping | Embeds only | Containers with accent colors |

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
          content: '# 📚 Help Menu\nWelcome! Select a category below.',
        },
        {
          type: 14,
          divider: true,
          spacing: 1,
        },
        {
          type: 10,
          content: '**🏠 General**\nBasic bot commands',
        },
        {
          type: 10,
          content: '**📊 Tracking**\nActivity tracking and statistics',
        },
        {
          type: 14,
          divider: false,
          spacing: 1,
        },
        {
          type: 10,
          content: '-# Use the buttons below to navigate',
        },
      ],
    },
    {
      type: 1,
      components: [
        {
          type: 2,
          custom_id: 'help_general',
          label: 'General',
          style: 1,
          emoji: '🏠',
        },
        {
          type: 2,
          custom_id: 'help_tracking',
          label: 'Tracking',
          style: 3,
          emoji: '📊',
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
      .setTitle('Title')
      .setDescription('Description')
      .setColor(0x5865f2)
      .addFields({ name: 'Field', value: 'Value' }),
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
          content: '# Title\nDescription',
        },
        {
          type: 14,
          divider: true,
          spacing: 1,
        },
        {
          type: 10,
          content: '**Field**\nValue',
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

## Notes

- Components V2 is fully supported in Discord.js v14.26.3+
- The flag `32768` is equivalent to `1 << 15` (IS_COMPONENTS_V2)
- Legacy components (V1) will continue to work without the flag
- You can mix V1 and V2 messages in the same bot
- Once a message uses V2, it cannot be edited back to V1
