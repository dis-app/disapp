import { EventOptions } from '../types';

export abstract class Event {
  public name: string;
  public once: boolean;

  constructor(options: EventOptions) {
    this.name = options.name;
    this.once = options.once || false;
  }

  abstract execute(...args: any[]): Promise<void>;
}
