import { MessageBuilder, EmbedBuilder, InteractionBuilder } from './MessageBuilder';
import { ButtonBuilder, ButtonStyle, ActionRowBuilder } from 'discord.js';

export const msg = () => new MessageBuilder();
export const embed = () => new EmbedBuilder();
export const interaction = () => new InteractionBuilder();

export const btn = (label: string, id: string, style: ButtonStyle = ButtonStyle.Primary) =>
  new ButtonBuilder()
    .setCustomId(id)
    .setLabel(label)
    .setStyle(style);

export const linkBtn = (label: string, url: string, emoji?: string) => {
  const button = new ButtonBuilder()
    .setLabel(label)
    .setURL(url)
    .setStyle(ButtonStyle.Link);
  
  if (emoji) button.setEmoji(emoji);
  return button;
};

export const row = <T extends any>(...components: T[]) =>
  new ActionRowBuilder<any>().addComponents(...components);

export const success = (label: string, id: string) => btn(label, id, ButtonStyle.Success);
export const danger = (label: string, id: string) => btn(label, id, ButtonStyle.Danger);
export const primary = (label: string, id: string) => btn(label, id, ButtonStyle.Primary);
export const secondary = (label: string, id: string) => btn(label, id, ButtonStyle.Secondary);

export const confirm = (yesId: string, noId: string) =>
  row(
    success('Confirm', yesId),
    danger('Cancel', noId)
  );

export const yesno = (yesId: string, noId: string) =>
  row(
    primary('Yes', yesId),
    secondary('No', noId)
  );

export const successEmbed = (title: string, description: string) =>
  new EmbedBuilder().success(title, description);

export const errorEmbed = (title: string, description: string) =>
  new EmbedBuilder().error(title, description);

export const warningEmbed = (title: string, description: string) =>
  new EmbedBuilder().warning(title, description);

export const infoEmbed = (title: string, description: string) =>
  new EmbedBuilder().info(title, description);
