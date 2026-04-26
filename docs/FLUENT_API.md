# Fluent API & Shortcuts

Disapp provides a powerful fluent API fully compatible with Discord.js builders.

## Components V2 Builder (v2)

The modern way to build interactive messages with the v2() fluent API:

```typescript
import { v2 } from "@disapp/core";
import { ButtonStyle } from "discord.js";

const message = v2()
  .text("# Welcome to my bot")
  .separator()
  .buttons(
    {
      id: "btn_yes",
      label: "Yes",
      style: ButtonStyle.Success,
      onClick: async (i) => {
        await i.reply("You clicked Yes!");
      },
    },
    {
      id: "btn_no",
      label: "No",
      style: ButtonStyle.Danger,
      onClick: async (i) => {
        await i.reply("You clicked No!");
      },
    },
  )
  .accentColor(0x5865f2)
  .build();

await interaction.reply(message);
```

### v2() Builder Methods

```typescript
v2()
  .text(content: string)                                    // Add text display
  .separator(divider?: boolean, spacing?: SeparatorSpacingSize)  // Add separator
  .buttons(...buttons: ButtonConfig[])                      // Add buttons with onClick
  .select(id, placeholder, options, onChange?)              // Add select menu
  .accentColor(color: number)                               // Set accent color
  .enableAutoChunking(options?: AutoChunkerOptions)         // Enable auto-chunking
  .build()                                                  // Get final payload
```

### Button Example with onClick

```typescript
const message = v2()
  .text("Choose an action")
  .buttons(
    {
      id: "action_1",
      label: "Action 1",
      style: ButtonStyle.Primary,
      emoji: "1️⃣",
      onClick: async (interaction) => {
        await interaction.reply("You chose action 1!");
      },
    },
    {
      id: "action_2",
      label: "Action 2",
      style: ButtonStyle.Secondary,
      emoji: "2️⃣",
      onClick: async (interaction) => {
        await interaction.reply("You chose action 2!");
      },
    },
  )
  .build();

await interaction.reply(message);
```

### Select Menu Example with onChange

```typescript
const message = v2()
  .text("Select your preference")
  .select(
    "preference_select",
    "Choose one",
    [
      { label: "Option A", value: "a", emoji: "🅰️" },
      { label: "Option B", value: "b", emoji: "🅱️" },
      { label: "Option C", value: "c", emoji: "©️" },
    ],
    async (interaction) => {
      const selected = interaction.values[0];
      await interaction.reply(`You selected: ${selected}`);
    },
  )
  .build();

await interaction.reply(message);
```

### Auto-Chunking Example

```typescript
const longText = "Very long text that might exceed 2000 characters...";

const message = v2()
  .enableAutoChunking({
    maxLength: 2000,
    preserveCodeBlocks: true,
    preserveMarkdown: true,
  })
  .text(longText)
  .build();

await interaction.reply(message);
```

## Quick Shortcuts

### Button Shortcuts

```typescript
import {
  btn,
  success,
  danger,
  primary,
  secondary,
  linkBtn,
} from "@disapp/core";

const primaryBtn = primary("Click", "btn_click");
const successBtn = success("Confirm", "btn_confirm");
const dangerBtn = danger("Delete", "btn_delete");
const secondaryBtn = secondary("Cancel", "btn_cancel");
const link = linkBtn("Visit", "https://example.com", "🔗");
```

### Pre-built Patterns

```typescript
import { confirm, yesno, row } from "@disapp/core";

const confirmRow = confirm("yes_id", "no_id");
const yesnoRow = yesno("yes_id", "no_id");

const customRow = row(
  primary("Option 1", "opt_1"),
  secondary("Option 2", "opt_2"),
);
```

### Embed Shortcuts

```typescript
import {
  successEmbed,
  errorEmbed,
  warningEmbed,
  infoEmbed,
} from "@disapp/core";

const success = successEmbed("Success!", "Operation completed");
const error = errorEmbed("Error!", "Something went wrong");
const warning = warningEmbed("Warning!", "Be careful");
const info = infoEmbed("Info", "Useful information");
```

## MessageBuilder

Fluent API for building complete messages (Discord.js compatible).

```typescript
import { msg, ButtonStyle } from "@disapp/core";

const message = msg()
  .setContent("# Welcome")
  .buttons(
    { label: "Option 1", id: "opt_1", style: ButtonStyle.Primary, emoji: "1️⃣" },
    { label: "Option 2", id: "opt_2", style: ButtonStyle.Success, emoji: "✅" },
    { label: "Visit", url: "https://example.com", emoji: "🔗" },
  )
  .userSelect("select_user", "Choose users", [1, 5])
  .stringSelect(
    "select_option",
    [
      { label: "Option 1", value: "opt_1", description: "First", emoji: "1️⃣" },
      { label: "Option 2", value: "opt_2", description: "Second", emoji: "2️⃣" },
    ],
    "Choose an option",
  )
  .build();

await interaction.reply(message);
```

### MessageBuilder Methods

```typescript
msg()
  .setContent(content)                  // Set message content
  .addEmbed(embed)                      // Add embed
  .button(label, id, style)             // Add single button
  .buttons([...])                       // Add multiple buttons
  .linkButton(label, url, emoji)        // Add link button
  .userSelect(id, placeholder, minMax)
  .roleSelect(id, placeholder, minMax)
  .channelSelect(id, types, placeholder, minMax)
  .stringSelect(id, options, placeholder, minMax)
  .setEphemeral(true)                   // Make ephemeral
  .build()                              // Get final payload
```

## EmbedBuilder

Extended Discord.js EmbedBuilder with shortcuts.

```typescript
import { embed } from "@disapp/core";

const myEmbed = embed()
  .setTitle("User Profile")
  .setDescription("Profile information")
  .setColor(0x5865f2)
  .addFields(
    { name: "Username", value: "john_doe", inline: true },
    { name: "Level", value: "42", inline: true },
  )
  .setThumbnail("https://example.com/avatar.png")
  .setFooter({ text: "Profile" })
  .setTimestamp();

await interaction.reply({ embeds: [myEmbed] });
```

### Quick Embed Methods

```typescript
embed()
  .success(title, description) // Green embed
  .error(title, description) // Red embed
  .warning(title, description) // Yellow embed
  .info(title, description) // Blue embed
  .quick(title, description, color);
```

## Complete Example

```typescript
import { Command } from "@disapp/core";
import { SlashCommandBuilder } from "discord.js";
import { msg, embed, confirm, ButtonStyle } from "@disapp/core";

export default class AdvancedCommand extends Command {
  constructor() {
    super({
      name: "advanced",
      description: "Advanced fluent API example",
      data: new SlashCommandBuilder()
        .setName("advanced")
        .setDescription("Advanced fluent API example"),
      execute: async () => {},
    });
  }

  async execute(interaction) {
    const message = msg()
      .setContent("# User Management")
      .buttons(
        { label: "View", id: "view", style: ButtonStyle.Primary, emoji: "👁️" },
        {
          label: "Edit",
          id: "edit",
          style: ButtonStyle.Secondary,
          emoji: "✏️",
        },
        {
          label: "Delete",
          id: "delete",
          style: ButtonStyle.Danger,
          emoji: "🗑️",
        },
      )
      .userSelect("select_user", "Choose a user", [1, 5])
      .build();

    const profileEmbed = embed()
      .success("User Profile", "Profile loaded successfully")
      .addFields(
        { name: "Username", value: "john_doe", inline: true },
        { name: "Status", value: "Online", inline: true },
      )
      .setThumbnail("https://example.com/avatar.png")
      .setTimestamp();

    await interaction.reply({
      ...message,
      embeds: [profileEmbed],
    });
  }
}
```

## Discord.js Compatibility

All builders are fully compatible with Discord.js:

```typescript
import {
  ButtonBuilder,
  ButtonStyle,
  ActionRowBuilder,
  StringSelectMenuBuilder,
  UserSelectMenuBuilder,
  RoleSelectMenuBuilder,
  ChannelSelectMenuBuilder,
} from "@disapp/core";

const button = new ButtonBuilder()
  .setCustomId("my_button")
  .setLabel("Click me")
  .setStyle(ButtonStyle.Primary);

const row = new ActionRowBuilder().addComponents(button);
```

## Shortcuts Reference

### Buttons

- `btn(label, id, style)` - Create button
- `primary(label, id)` - Primary button
- `secondary(label, id)` - Secondary button
- `success(label, id)` - Success button
- `danger(label, id)` - Danger button
- `linkBtn(label, url, emoji?)` - Link button

### Patterns

- `confirm(yesId, noId)` - Confirm/Cancel row
- `yesno(yesId, noId)` - Yes/No row
- `row(...components)` - Action row

### Embeds

- `successEmbed(title, desc)` - Green embed
- `errorEmbed(title, desc)` - Red embed
- `warningEmbed(title, desc)` - Yellow embed
- `infoEmbed(title, desc)` - Blue embed

### Builders

- `msg()` - MessageBuilder
- `embed()` - EmbedBuilder
- `interaction()` - InteractionBuilder
