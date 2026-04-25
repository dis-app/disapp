export interface AutoChunkerOptions {
  maxLength?: number;
  preserveCodeBlocks?: boolean;
  preserveMarkdown?: boolean;
  separator?: string;
}

export class AutoChunker {
  private maxLength: number;
  private preserveCodeBlocks: boolean;
  private preserveMarkdown: boolean;
  private separator: string;

  constructor(options: AutoChunkerOptions = {}) {
    this.maxLength = options.maxLength || 2000;
    this.preserveCodeBlocks = options.preserveCodeBlocks ?? true;
    this.preserveMarkdown = options.preserveMarkdown ?? true;
    this.separator = options.separator || '\n';
  }

  chunk(text: string): string[] {
    if (text.length <= this.maxLength) {
      return [text];
    }

    if (this.preserveCodeBlocks && text.includes('```')) {
      return this.chunkWithCodeBlocks(text);
    }

    return this.chunkSimple(text);
  }

  private chunkSimple(text: string): string[] {
    const chunks: string[] = [];
    const lines = text.split(this.separator);
    let currentChunk = '';

    for (const line of lines) {
      const testChunk = currentChunk 
        ? currentChunk + this.separator + line 
        : line;

      if (testChunk.length > this.maxLength) {
        if (currentChunk) {
          chunks.push(currentChunk);
          currentChunk = line;
        } else {
          chunks.push(line.substring(0, this.maxLength));
          currentChunk = line.substring(this.maxLength);
        }
      } else {
        currentChunk = testChunk;
      }
    }

    if (currentChunk) {
      chunks.push(currentChunk);
    }

    return chunks;
  }

  private chunkWithCodeBlocks(text: string): string[] {
    const chunks: string[] = [];
    const codeBlockRegex = /```[\s\S]*?```/g;
    const parts: Array<{ content: string; isCode: boolean }> = [];
    
    let lastIndex = 0;
    let match;

    while ((match = codeBlockRegex.exec(text)) !== null) {
      if (match.index > lastIndex) {
        parts.push({
          content: text.substring(lastIndex, match.index),
          isCode: false,
        });
      }
      
      parts.push({
        content: match[0],
        isCode: true,
      });
      
      lastIndex = match.index + match[0].length;
    }

    if (lastIndex < text.length) {
      parts.push({
        content: text.substring(lastIndex),
        isCode: false,
      });
    }

    let currentChunk = '';
    let inCodeBlock = false;

    for (const part of parts) {
      if (part.isCode) {
        if (currentChunk.length + part.content.length > this.maxLength) {
          if (currentChunk) {
            chunks.push(currentChunk);
          }
          
          if (part.content.length > this.maxLength) {
            const lines = part.content.split('\n');
            const lang = lines[0].replace('```', '');
            let codeChunk = '```' + lang + '\n';
            
            for (let i = 1; i < lines.length - 1; i++) {
              if (codeChunk.length + lines[i].length + 4 > this.maxLength) {
                chunks.push(codeChunk + '```');
                codeChunk = '```' + lang + '\n' + lines[i] + '\n';
              } else {
                codeChunk += lines[i] + '\n';
              }
            }
            
            chunks.push(codeChunk + '```');
            currentChunk = '';
          } else {
            currentChunk = part.content;
          }
        } else {
          currentChunk += part.content;
        }
      } else {
        const subChunks = this.chunkSimple(part.content);
        for (const subChunk of subChunks) {
          if (currentChunk.length + subChunk.length > this.maxLength) {
            if (currentChunk) {
              chunks.push(currentChunk);
            }
            currentChunk = subChunk;
          } else {
            currentChunk += subChunk;
          }
        }
      }
    }

    if (currentChunk) {
      chunks.push(currentChunk);
    }

    return chunks;
  }

  static autoChunk(text: string, options?: AutoChunkerOptions): string[] {
    const chunker = new AutoChunker(options);
    return chunker.chunk(text);
  }
}
