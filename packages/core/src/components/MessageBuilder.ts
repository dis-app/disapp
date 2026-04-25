import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  StringSelectMenuBuilder,
  UserSelectMenuBuilder,
  RoleSelectMenuBuilder,
  ChannelSelectMenuBuilder,
  EmbedBuilder as DiscordEmbedBuilder,
} from 'discord.js';
import { MessageChunker, ChunkerOptions } from '../utils/MessageChunker';

export class MessageBuilder {
  private components: any[] = [];
  private content?: string;
  private embeds: any[] = [];
  private ephemeral: boolean = false;
  private chunker?: MessageChunker;

  setContent(content: string): this {
    this.content = content;
    return this;
  }

  enableChunking(options?: ChunkerOptions): this {
    this.chunker = new MessageChunker(options);
    return this;
  }

  disableChunking(): this {
    this.chunker = undefined;
    return this;
  }

  addEmbed(embed: DiscordEmbedBuilder): this {
    this.embeds.push(embed);
    return this;
  }

  button(label: string, customId: string, style: ButtonStyle = ButtonStyle.Primary): this {
    const button = new ButtonBuilder()
      .setCustomId(customId)
      .setLabel(label)
      .setStyle(style);

    const row = new ActionRowBuilder<ButtonBuilder>().addComponents(button);
    this.components.push(row);
    return this;
  }

  buttons(...buttons: Array<{ label: string; id: string; style?: ButtonStyle; url?: string; emoji?: string }>): this {
    const row = new ActionRowBuilder<ButtonBuilder>();
    
    buttons.forEach(btn => {
      const button = new ButtonBuilder().setLabel(btn.label);
      
      if (btn.url) {
        button.setStyle(ButtonStyle.Link).setURL(btn.url);
      } else {
        button.setCustomId(btn.id).setStyle(btn.style || ButtonStyle.Primary);
      }
      
      if (btn.emoji) {
        button.setEmoji(btn.emoji);
      }
      
      row.addComponents(button);
    });

    this.components.push(row);
    return this;
  }

  linkButton(label: string, url: string, emoji?: string): this {
    const button = new ButtonBuilder()
      .setLabel(label)
      .setURL(url)
      .setStyle(ButtonStyle.Link);

    if (emoji) button.setEmoji(emoji);

    const row = new ActionRowBuilder<ButtonBuilder>().addComponents(button);
    this.components.push(row);
    return this;
  }

  userSelect(customId: string, placeholder?: string, minMax?: [number, number]): this {
    const select = new UserSelectMenuBuilder().setCustomId(customId);
    
    if (placeholder) select.setPlaceholder(placeholder);
    if (minMax) {
      select.setMinValues(minMax[0]);
      select.setMaxValues(minMax[1]);
    }

    const row = new ActionRowBuilder<UserSelectMenuBuilder>().addComponents(select);
    this.components.push(row);
    return this;
  }

  roleSelect(customId: string, placeholder?: string, minMax?: [number, number]): this {
    const select = new RoleSelectMenuBuilder().setCustomId(customId);
    
    if (placeholder) select.setPlaceholder(placeholder);
    if (minMax) {
      select.setMinValues(minMax[0]);
      select.setMaxValues(minMax[1]);
    }

    const row = new ActionRowBuilder<RoleSelectMenuBuilder>().addComponents(select);
    this.components.push(row);
    return this;
  }

  channelSelect(
    customId: string,
    channelTypes?: any[],
    placeholder?: string,
    minMax?: [number, number]
  ): this {
    const select = new ChannelSelectMenuBuilder().setCustomId(customId);
    
    if (channelTypes) select.setChannelTypes(channelTypes);
    if (placeholder) select.setPlaceholder(placeholder);
    if (minMax) {
      select.setMinValues(minMax[0]);
      select.setMaxValues(minMax[1]);
    }

    const row = new ActionRowBuilder<ChannelSelectMenuBuilder>().addComponents(select);
    this.components.push(row);
    return this;
  }

  stringSelect(
    customId: string,
    options: Array<{ label: string; value: string; description?: string; emoji?: string; default?: boolean }>,
    placeholder?: string,
    minMax?: [number, number]
  ): this {
    const select = new StringSelectMenuBuilder().setCustomId(customId);
    
    select.addOptions(
      options.map(opt => ({
        label: opt.label,
        value: opt.value,
        description: opt.description,
        emoji: opt.emoji,
        default: opt.default,
      }))
    );

    if (placeholder) select.setPlaceholder(placeholder);
    if (minMax) {
      select.setMinValues(minMax[0]);
      select.setMaxValues(minMax[1]);
    }

    const row = new ActionRowBuilder<StringSelectMenuBuilder>().addComponents(select);
    this.components.push(row);
    return this;
  }

  setEphemeral(ephemeral: boolean = true): this {
    this.ephemeral = ephemeral;
    return this;
  }

  build() {
    const baseMessage: any = {
      content: this.content,
      embeds: this.embeds.length > 0 ? this.embeds : undefined,
      components: this.components.length > 0 ? this.components : undefined,
    };

    if (this.ephemeral) {
      baseMessage.flags = 64;
    }

    if (!this.chunker || !this.content) {
      return baseMessage;
    }

    const chunks = this.chunker.chunk(this.content);
    
    if (chunks.length === 1) {
      return baseMessage;
    }

    return chunks.map((chunk, index) => {
      const msg: any = {
        content: chunk,
        embeds: index === 0 ? baseMessage.embeds : undefined,
        components: index === chunks.length - 1 ? baseMessage.components : undefined,
      };
      if (this.ephemeral) {
        msg.flags = 64;
      }
      return msg;
    });
  }

  async send(target: any, asReply: boolean = true): Promise<any[]> {
    const messages = this.build();
    const sent: any[] = [];

    if (Array.isArray(messages)) {
      for (let i = 0; i < messages.length; i++) {
        if (i === 0 && asReply && target.reply) {
          sent.push(await target.reply(messages[i]));
        } else if (target.channel?.send) {
          sent.push(await target.channel.send(messages[i]));
        } else if (target.send) {
          sent.push(await target.send(messages[i]));
        } else if (target.followUp) {
          sent.push(await target.followUp(messages[i]));
        }
      }
    } else {
      if (asReply && target.reply) {
        sent.push(await target.reply(messages));
      } else if (target.channel?.send) {
        sent.push(await target.channel.send(messages));
      } else if (target.send) {
        sent.push(await target.send(messages));
      }
    }

    return sent;
  }
}

export class EmbedBuilder extends DiscordEmbedBuilder {
  quick(title: string, description: string, color?: number): this {
    this.setTitle(title);
    this.setDescription(description);
    if (color) this.setColor(color);
    return this;
  }

  success(title: string, description: string): this {
    return this.quick(title, description, 0x57F287);
  }

  error(title: string, description: string): this {
    return this.quick(title, description, 0xED4245);
  }

  warning(title: string, description: string): this {
    return this.quick(title, description, 0xFEE75C);
  }

  info(title: string, description: string): this {
    return this.quick(title, description, 0x5865F2);
  }
}

export class InteractionBuilder {
  private content?: string;
  private embeds: any[] = [];
  private components: any[] = [];
  private ephemeral: boolean = false;
  private files: any[] = [];
  private chunker?: MessageChunker;

  setContent(content: string): this {
    this.content = content;
    return this;
  }

  enableChunking(options?: ChunkerOptions): this {
    this.chunker = new MessageChunker(options);
    return this;
  }

  disableChunking(): this {
    this.chunker = undefined;
    return this;
  }

  addEmbed(embed: DiscordEmbedBuilder): this {
    this.embeds.push(embed);
    return this;
  }

  addComponent(component: any): this {
    this.components.push(component);
    return this;
  }

  addFile(file: any): this {
    this.files.push(file);
    return this;
  }

  setEphemeral(ephemeral: boolean = true): this {
    this.ephemeral = ephemeral;
    return this;
  }

  build() {
    const baseMessage: any = {
      content: this.content,
      embeds: this.embeds.length > 0 ? this.embeds : undefined,
      components: this.components.length > 0 ? this.components : undefined,
      files: this.files.length > 0 ? this.files : undefined,
    };

    if (this.ephemeral) {
      baseMessage.flags = 64;
    }

    if (!this.chunker || !this.content) {
      return baseMessage;
    }

    const chunks = this.chunker.chunk(this.content);
    
    if (chunks.length === 1) {
      return baseMessage;
    }

    return chunks.map((chunk, index) => {
      const msg: any = {
        content: chunk,
        embeds: index === 0 ? baseMessage.embeds : undefined,
        components: index === chunks.length - 1 ? baseMessage.components : undefined,
        files: index === 0 ? baseMessage.files : undefined,
      };
      if (this.ephemeral) {
        msg.flags = 64;
      }
      return msg;
    });
  }

  async send(interaction: any, asReply: boolean = true): Promise<any[]> {
    const messages = this.build();
    const sent: any[] = [];

    if (Array.isArray(messages)) {
      for (let i = 0; i < messages.length; i++) {
        if (i === 0 && asReply) {
          if (interaction.replied || interaction.deferred) {
            sent.push(await interaction.followUp(messages[i]));
          } else {
            sent.push(await interaction.reply(messages[i]));
          }
        } else {
          sent.push(await interaction.followUp(messages[i]));
        }
      }
    } else {
      if (asReply) {
        if (interaction.replied || interaction.deferred) {
          sent.push(await interaction.followUp(messages));
        } else {
          sent.push(await interaction.reply(messages));
        }
      } else {
        sent.push(await interaction.followUp(messages));
      }
    }

    return sent;
  }
}
