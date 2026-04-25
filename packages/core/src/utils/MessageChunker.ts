export interface ChunkerOptions {
  enabled?: boolean;
  maxLength?: number;
  separator?: string;
  preserveCodeBlocks?: boolean;
  prefix?: string;
  suffix?: string;
}

export class MessageChunker {
  private options: Required<ChunkerOptions>;

  constructor(options: ChunkerOptions = {}) {
    this.options = {
      enabled: options.enabled ?? true,
      maxLength: options.maxLength ?? 2000,
      separator: options.separator ?? '\n',
      preserveCodeBlocks: options.preserveCodeBlocks ?? true,
      prefix: options.prefix ?? '',
      suffix: options.suffix ?? '',
    };
  }

  chunk(content: string): string[] {
    if (!this.options.enabled) {
      return [content];
    }

    if (content.length <= this.options.maxLength) {
      return [content];
    }

    if (this.options.preserveCodeBlocks) {
      return this.chunkWithCodeBlocks(content);
    }

    return this.chunkSimple(content);
  }

  private chunkSimple(content: string): string[] {
    const chunks: string[] = [];
    const effectiveMaxLength = this.options.maxLength - this.options.prefix.length - this.options.suffix.length;

    let remaining = content;

    while (remaining.length > 0) {
      if (remaining.length <= effectiveMaxLength) {
        chunks.push(this.wrapChunk(remaining));
        break;
      }

      let splitIndex = effectiveMaxLength;
      const separatorIndex = remaining.lastIndexOf(this.options.separator, effectiveMaxLength);

      if (separatorIndex > effectiveMaxLength * 0.5) {
        splitIndex = separatorIndex + this.options.separator.length;
      }

      const chunk = remaining.substring(0, splitIndex);
      chunks.push(this.wrapChunk(chunk));
      remaining = remaining.substring(splitIndex);
    }

    return chunks;
  }

  private chunkWithCodeBlocks(content: string): string[] {
    const chunks: string[] = [];
    const effectiveMaxLength = this.options.maxLength - this.options.prefix.length - this.options.suffix.length;

    const codeBlockRegex = /```[\s\S]*?```|`[^`]+`/g;
    const parts: Array<{ content: string; isCode: boolean }> = [];
    
    let lastIndex = 0;
    let match;

    while ((match = codeBlockRegex.exec(content)) !== null) {
      if (match.index > lastIndex) {
        parts.push({
          content: content.substring(lastIndex, match.index),
          isCode: false,
        });
      }

      parts.push({
        content: match[0],
        isCode: true,
      });

      lastIndex = match.index + match[0].length;
    }

    if (lastIndex < content.length) {
      parts.push({
        content: content.substring(lastIndex),
        isCode: false,
      });
    }

    let currentChunk = '';
    let inCodeBlock = false;
    let codeBlockLang = '';

    for (const part of parts) {
      if (part.isCode && part.content.startsWith('```')) {
        const isClosing: boolean = inCodeBlock;
        
        if (!isClosing) {
          const langMatch = part.content.match(/```(\w+)?/);
          codeBlockLang = langMatch ? langMatch[1] || '' : '';
        }

        if (currentChunk.length + part.content.length > effectiveMaxLength) {
          if (inCodeBlock) {
            currentChunk += '\n```';
            chunks.push(this.wrapChunk(currentChunk));
            currentChunk = '```' + codeBlockLang + '\n' + part.content.substring(3);
          } else {
            if (currentChunk) {
              chunks.push(this.wrapChunk(currentChunk));
            }
            currentChunk = part.content;
          }
        } else {
          currentChunk += part.content;
        }

        inCodeBlock = !isClosing;
      } else {
        if (currentChunk.length + part.content.length > effectiveMaxLength) {
          if (inCodeBlock) {
            currentChunk += '\n```';
            chunks.push(this.wrapChunk(currentChunk));
            currentChunk = '```' + codeBlockLang + '\n';
            inCodeBlock = true;
          } else {
            if (currentChunk) {
              chunks.push(this.wrapChunk(currentChunk));
            }
            currentChunk = '';
          }

          const subChunks = this.chunkSimple(part.content);
          for (let i = 0; i < subChunks.length; i++) {
            if (i === subChunks.length - 1 && inCodeBlock) {
              currentChunk += subChunks[i].substring(
                this.options.prefix.length,
                subChunks[i].length - this.options.suffix.length
              );
            } else {
              chunks.push(subChunks[i]);
            }
          }
        } else {
          currentChunk += part.content;
        }
      }
    }

    if (currentChunk) {
      if (inCodeBlock && !currentChunk.endsWith('```')) {
        currentChunk += '\n```';
      }
      chunks.push(this.wrapChunk(currentChunk));
    }

    return chunks;
  }

  private wrapChunk(chunk: string): string {
    return this.options.prefix + chunk + this.options.suffix;
  }

  setOptions(options: Partial<ChunkerOptions>): void {
    this.options = {
      ...this.options,
      ...options,
    };
  }

  getOptions(): Required<ChunkerOptions> {
    return { ...this.options };
  }
}

export function chunkMessage(content: string, options?: ChunkerOptions): string[] {
  const chunker = new MessageChunker(options);
  return chunker.chunk(content);
}
