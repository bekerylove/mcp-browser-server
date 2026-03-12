#!/usr/bin/env node
import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
  Tool,
} from '@modelcontextprotocol/sdk/types.js';
import { BrowserManager } from './browser/manager.js';
import { ToolExecutor } from './tools/executor.js';
import { navigationTools } from './tools/navigation.js';
import { interactionTools } from './tools/interaction.js';
import { contentTools } from './tools/content.js';
import { visualTools } from './tools/visual.js';
import { advancedTools } from './tools/advanced.js';

class BrowserMCPServer {
  private server: Server;
  private browserManager: BrowserManager;
  private toolExecutor: ToolExecutor;

  constructor() {
    // Check for HEADLESS environment variable
    const headless = process.env.HEADLESS !== 'false';

    this.server = new Server(
      {
        name: 'mcp-browser-server',
        version: '1.0.0'
      },
      {
        capabilities: {
          tools: {}
        }
      }
    );

    this.browserManager = new BrowserManager(headless);
    this.toolExecutor = new ToolExecutor(this.browserManager);

    this.setupHandlers();
    this.setupErrorHandling();
  }

  private setupErrorHandling(): void {
    // Handle process termination
    process.on('SIGINT', async () => {
      await this.cleanup();
      process.exit(0);
    });

    process.on('SIGTERM', async () => {
      await this.cleanup();
      process.exit(0);
    });

    process.on('uncaughtException', async (error) => {
      console.error('Uncaught exception:', error);
      await this.cleanup();
      process.exit(1);
    });

    process.on('unhandledRejection', async (reason, promise) => {
      console.error('Unhandled rejection at:', promise, 'reason:', reason);
      await this.cleanup();
      process.exit(1);
    });
  }

  private setupHandlers(): void {
    // List available tools
    this.server.setRequestHandler(
      ListToolsRequestSchema,
      async () => {
        return {
          tools: this.getAllToolDefinitions()
        };
      }
    );

    // Handle tool calls
    this.server.setRequestHandler(
      CallToolRequestSchema,
      async (request) => {
        const { name, arguments: args } = request.params;

        try {
          const result = await this.toolExecutor.execute(name, args || {});

          if (!result.success) {
            return {
              content: [
                {
                  type: 'text',
                  text: `Error: ${result.error || 'Unknown error'}`
                }
              ],
              isError: true
            };
          }

          // Format successful response
          return {
            content: [
              {
                type: 'text',
                text: this.formatResult(result)
              }
            ]
          };
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : String(error);
          return {
            content: [
              {
                type: 'text',
                text: `Error executing ${name}: ${errorMessage}`
              }
            ],
            isError: true
          };
        }
      }
    );
  }

  private getAllToolDefinitions(): Tool[] {
    return [
      ...navigationTools,
      ...interactionTools,
      ...contentTools,
      ...visualTools,
      ...advancedTools
    ];
  }

  private formatResult(result: any): string {
    // Remove the success flag from the output
    const { success, ...rest } = result;

    // Handle different result types
    if (rest.data && typeof rest.data === 'string' && rest.length > 10000) {
      // Truncate large data
      return JSON.stringify(
        {
          ...rest,
          data: `(Base64 data, ${rest.data.length} characters)`,
          size: rest.size
        },
        null,
        2
      );
    }

    if (rest.html && rest.html.length > 5000) {
      // Truncate large HTML
      return JSON.stringify(
        {
          ...rest,
          html: `(HTML content, ${rest.html.length} characters)`
        },
        null,
        2
      );
    }

    if (rest.text && rest.text.length > 5000) {
      // Truncate large text
      return JSON.stringify(
        {
          ...rest,
          text: rest.text.substring(0, 5000) + '...(truncated)'
        },
        null,
        2
      );
    }

    return JSON.stringify(rest, null, 2);
  }

  private async cleanup(): Promise<void> {
    try {
      await this.browserManager.close();
    } catch (error) {
      console.error('Error during cleanup:', error);
    }
  }

  async start(): Promise<void> {
    const transport = new StdioServerTransport();
    await this.server.connect(transport);

    // Log to stderr so it doesn't interfere with stdio communication
    console.error('MCP Browser Server started successfully');
    console.error(`Headless mode: ${process.env.HEADLESS !== 'false' ? 'enabled' : 'disabled'}`);
    console.error(`Available tools: ${this.getAllToolDefinitions().length}`);
  }
}

// Start the server
async function main(): Promise<void> {
  const server = new BrowserMCPServer();
  await server.start();
}

// Start the server - this module is designed to run as the main entry point
main().catch((error) => {
  console.error('Failed to start server:', error);
  process.exit(1);
});

export { BrowserMCPServer };
