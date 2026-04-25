import {
  TextDisplayBuilder,
  ContainerBuilder,
  SeparatorBuilder,
  SeparatorSpacingSize,
  ActionRowBuilder,
  ButtonBuilder,
  StringSelectMenuBuilder,
  MessageFlags,
} from 'discord.js';
import { InteractionHandler, InteractionHandlers } from './InteractionHandler';
import { AutoChunker, AutoChunkerOptions } from '../utils/AutoChunker';

export class ComponentsV2Builder {
  private container: ContainerBuilder;
  private handlers: InteractionHandlers = {};
  private autoChunking: boolean = false;
  private chunkOptions?: AutoChunkerOptions;

  constructor() {
    this.container = new ContainerBuilder();
  }

  enableAutoChunking(options?: AutoChunkerOptions): this {
    this.autoChunking = true;
    this.chunkOptions = options;
    return this;
  }

  text(content: string): this {
    if (this.autoChunking && content.length > (this.chunkOptions?.maxLength || 2000)) {
      const chunks = AutoChunker.autoChunk(content, this.chunkOptions);
      chunks.forEach(chunk => {
        this.container.addTextDisplayComponents(
          new TextDisplayBuilder().setContent(chunk)
        );
      });
    } else {
      this.container.addTextDisplayComponents(
        new TextDisplayBuilder().setContent(content)
      );
    }
    return this;
  }

  separator(divider: boolean = true, spacing: SeparatorSpacingSize = SeparatorSpacingSize.Small): this {
    this.container.addSeparatorComponents(
      new SeparatorBuilder().setDivider(divider).setSpacing(spacing)
    );
    return this;
  }

  buttons(...buttons: Array<{ id?: string; label?: string; style: number; emoji?: string; url?: string; disabled?: boolean; onClick?: (i: any) => Promise<void> | void }>): this {
    const row = new ActionRowBuilder<ButtonBuilder>();
    
    buttons.forEach(btn => {
      const button = new ButtonBuilder();
      
      if (btn.label) button.setLabel(btn.label);
      if (btn.emoji) button.setEmoji(btn.emoji);
      if (btn.disabled) button.setDisabled(btn.disabled);
      
      button.setStyle(btn.style);
      
      if (btn.url) {
        button.setURL(btn.url);
      } else if (btn.id) {
        button.setCustomId(btn.id);
        
        if (btn.onClick) {
          if (!this.handlers.buttons) this.handlers.buttons = {};
          this.handlers.buttons[btn.id] = btn.onClick;
        }
      }
      
      row.addComponents(button);
    });

    this.container.addActionRowComponents(row);
    return this;
  }

  select(customId: string, placeholder: string, options: Array<{ label: string; value: string; emoji?: string; description?: string; default?: boolean }>, onChange?: (i: any) => Promise<void> | void): this {
    const select = new StringSelectMenuBuilder()
      .setCustomId(customId)
      .setPlaceholder(placeholder)
      .addOptions(options);

    const row = new ActionRowBuilder<StringSelectMenuBuilder>().addComponents(select);
    this.container.addActionRowComponents(row);

    if (onChange) {
      if (!this.handlers.selects) this.handlers.selects = {};
      this.handlers.selects[customId] = onChange;
    }

    return this;
  }

  accentColor(color: number): this {
    this.container.setAccentColor(color);
    return this;
  }

  build() {
    if (Object.keys(this.handlers.buttons || {}).length > 0 || Object.keys(this.handlers.selects || {}).length > 0) {
      InteractionHandler.registerHandlers(this.handlers);
    }

    return {
      components: [this.container],
      flags: MessageFlags.IsComponentsV2,
    };
  }
}

export function v2(): ComponentsV2Builder {
  return new ComponentsV2Builder();
}
