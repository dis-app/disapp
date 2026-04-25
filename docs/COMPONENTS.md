# Advanced Discord Components

Disapp supports Discord's new Components V2 system with advanced layout and interactive components.

## Component Types

### Text Display

Display markdown-formatted text with mentions and emojis.

```typescript
import { TextDisplay } from '@disapp/core';

const text = new TextDisplay('# Hello\nThis is **bold** text');
```

### Media Gallery

Display 1-10 images in an organized gallery.

```typescript
import { MediaGallery } from '@disapp/core';

const gallery = new MediaGallery()
  .addItem('https://example.com/image1.png', 'First image')
  .addItem('https://example.com/image2.png', 'Second image', true); // spoiler
```

### Container

Visually group components with optional accent color.

```typescript
import { Container, TextDisplay } from '@disapp/core';

const container = new Container()
  .setAccentColor(0xFF0000)
  .setSpoiler(false)
  .addComponent(new TextDisplay('# Important'));
```

### Buttons

Interactive buttons with different styles.

```typescript
import { Button, ButtonStyle, ActionRow } from '@disapp/core';

const row = new ActionRow()
  .addComponent(new Button(ButtonStyle.PRIMARY, 'Click me', 'btn_click'))
  .addComponent(new Button(ButtonStyle.SUCCESS, 'Confirm', 'btn_confirm'))
  .addComponent(new Button(ButtonStyle.DANGER, 'Delete', 'btn_delete'));
```

### Select Menus

#### User Select

```typescript
import { UserSelect } from '@disapp/core';

const select = new UserSelect('select_user')
  .setPlaceholder('Choose users')
  .setMinMax(1, 5);
```

#### Role Select

```typescript
import { RoleSelect } from '@disapp/core';

const select = new RoleSelect('select_role')
  .setPlaceholder('Choose roles')
  .setMinMax(1, 3);
```

#### Channel Select

```typescript
import { ChannelSelect } from '@disapp/core';

const select = new ChannelSelect('select_channel')
  .setChannelTypes([0]) // Text channels
  .setPlaceholder('Choose channels')
  .setMinMax(1, 2);
```

#### String Select

```typescript
import { StringSelect } from '@disapp/core';

const select = new StringSelect('select_option')
  .addOption('Option 1', 'opt_1', 'Description')
  .addOption('Option 2', 'opt_2', 'Description')
  .setPlaceholder('Choose an option')
  .setMinMax(1, 1);
```

### Separator

Add visual spacing between components.

```typescript
import { Separator } from '@disapp/core';

const sep = new Separator(true, 1); // divider, small spacing
```

## Complete Example

```typescript
import { Command } from '@disapp/core';
import {
  TextDisplay,
  Button,
  ButtonStyle,
  ActionRow,
  Container,
  MediaGallery,
  UserSelect,
} from '@disapp/core';

export default class AdvancedCommand extends Command {
  constructor() {
    super({
      name: 'advanced',
      description: 'Advanced components example',
      data: new SlashCommandBuilder()
        .setName('advanced')
        .setDescription('Advanced components example'),
      execute: async () => {},
    });
  }

  async execute(interaction) {
    const text = new TextDisplay('# Welcome\nChoose an action below');
    
    const buttons = new ActionRow()
      .addComponent(new Button(ButtonStyle.PRIMARY, 'Action 1', 'act_1'))
      .addComponent(new Button(ButtonStyle.SUCCESS, 'Action 2', 'act_2'));

    const gallery = new MediaGallery()
      .addItem('https://example.com/img1.png')
      .addItem('https://example.com/img2.png');

    const container = new Container()
      .setAccentColor(0x5865F2)
      .addComponent(new TextDisplay('## Gallery'))
      .addComponent(gallery);

    const userSelect = new UserSelect('select_user')
      .setPlaceholder('Choose users');

    await interaction.reply({
      components: [
        { type: 1, components: [text] },
        buttons,
        container,
        { type: 1, components: [userSelect] },
      ] as any,
      flags: 1 << 15, // IS_COMPONENTS_V2
    });
  }
}
```

## Button Styles

- `PRIMARY` (1) - Most important action
- `SECONDARY` (2) - Alternative action
- `SUCCESS` (3) - Positive action
- `DANGER` (4) - Destructive action
- `LINK` (5) - Navigate to URL
- `PREMIUM` (6) - Purchase action

## Component Limits

- Action Row: max 5 buttons or 1 select
- Media Gallery: 1-10 items
- Container: up to 40 total components per message
- String Select: max 25 options
- Select Menus: min 0, max 25 selections

## Flags

Use `flags: 1 << 15` (IS_COMPONENTS_V2) to enable new components system.
