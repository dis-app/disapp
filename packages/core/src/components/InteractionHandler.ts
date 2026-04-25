export type InteractionCallback = (interaction: any) => Promise<void> | void;

export interface InteractionHandlers {
  buttons?: Record<string, InteractionCallback>;
  selects?: Record<string, InteractionCallback>;
  modals?: Record<string, InteractionCallback>;
}

export class InteractionHandler {
  private static buttonHandlers = new Map<string, InteractionCallback>();
  private static selectHandlers = new Map<string, InteractionCallback>();
  private static modalHandlers = new Map<string, InteractionCallback>();

  static registerHandlers(handlers: InteractionHandlers) {
    if (handlers.buttons) {
      Object.entries(handlers.buttons).forEach(([id, callback]) => {
        this.buttonHandlers.set(id, callback);
      });
    }

    if (handlers.selects) {
      Object.entries(handlers.selects).forEach(([id, callback]) => {
        this.selectHandlers.set(id, callback);
      });
    }

    if (handlers.modals) {
      Object.entries(handlers.modals).forEach(([id, callback]) => {
        this.modalHandlers.set(id, callback);
      });
    }
  }

  static async handle(interaction: any): Promise<boolean> {
    const customId = interaction.customId;

    try {
      if (interaction.isButton()) {
        const handler = this.buttonHandlers.get(customId);
        if (handler) {
          await handler(interaction);
          return true;
        }
      }

      if (interaction.isStringSelectMenu()) {
        const handler = this.selectHandlers.get(customId);
        if (handler) {
          await handler(interaction);
          return true;
        }
      }

      if (interaction.isModalSubmit()) {
        const handler = this.modalHandlers.get(customId);
        if (handler) {
          await handler(interaction);
          return true;
        }
      }
    } catch (error) {
      throw error;
    }

    return false;
  }

  static clear() {
    this.buttonHandlers.clear();
    this.selectHandlers.clear();
    this.modalHandlers.clear();
  }

  static getStats() {
    return {
      buttonHandlers: this.buttonHandlers.size,
      selectHandlers: this.selectHandlers.size,
      modalHandlers: this.modalHandlers.size,
    };
  }
}
