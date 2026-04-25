export class CooldownManager {
  private cooldowns: Map<string, Map<string, number>>;

  constructor() {
    this.cooldowns = new Map();
  }

  check(commandName: string, userId: string, cooldownSeconds: number): number | null {
    if (!this.cooldowns.has(commandName)) {
      this.cooldowns.set(commandName, new Map());
    }

    const timestamps = this.cooldowns.get(commandName)!;
    const now = Date.now();
    const cooldownAmount = cooldownSeconds * 1000;
    const userCooldown = timestamps.get(userId);

    if (userCooldown) {
      const expirationTime = userCooldown + cooldownAmount;
      if (now < expirationTime) {
        return (expirationTime - now) / 1000;
      }
    }

    timestamps.set(userId, now);
    setTimeout(() => timestamps.delete(userId), cooldownAmount);
    return null;
  }

  clear(commandName?: string): void {
    if (commandName) {
      this.cooldowns.delete(commandName);
    } else {
      this.cooldowns.clear();
    }
  }
}
