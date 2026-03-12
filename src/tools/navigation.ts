import { Tool } from '@modelcontextprotocol/sdk/types.js';

export const navigationTools: Tool[] = [
  {
    name: 'browser_navigate',
    description: 'Navigate to a URL in the browser. Creates a new context and page if needed.',
    inputSchema: {
      type: 'object',
      properties: {
        url: {
          type: 'string',
          description: 'The URL to navigate to (e.g., https://example.com)'
        },
        contextId: {
          type: 'string',
          description: 'Optional browser context ID. If not provided, a new context will be created.'
        },
        waitUntil: {
          type: 'string',
          enum: ['load', 'domcontentloaded', 'networkidle', 'commit'],
          description: 'When to consider navigation succeeded. Default: "load"',
          default: 'load'
        },
        timeout: {
          type: 'number',
          description: 'Maximum navigation time in milliseconds. Default: 30000 (30 seconds)',
          default: 30000
        }
      },
      required: ['url']
    }
  },
  {
    name: 'browser_go_back',
    description: 'Navigate back in browser history',
    inputSchema: {
      type: 'object',
      properties: {
        pageId: {
          type: 'string',
          description: 'The ID of the page to navigate back'
        },
        waitUntil: {
          type: 'string',
          enum: ['load', 'domcontentloaded', 'networkidle', 'commit'],
          description: 'When to consider navigation succeeded',
          default: 'load'
        }
      },
      required: ['pageId']
    }
  },
  {
    name: 'browser_go_forward',
    description: 'Navigate forward in browser history',
    inputSchema: {
      type: 'object',
      properties: {
        pageId: {
          type: 'string',
          description: 'The ID of the page to navigate forward'
        },
        waitUntil: {
          type: 'string',
          enum: ['load', 'domcontentloaded', 'networkidle', 'commit'],
          description: 'When to consider navigation succeeded',
          default: 'load'
        }
      },
      required: ['pageId']
    }
  },
  {
    name: 'browser_reload',
    description: 'Reload the current page',
    inputSchema: {
      type: 'object',
      properties: {
        pageId: {
          type: 'string',
          description: 'The ID of the page to reload'
        },
        waitUntil: {
          type: 'string',
          enum: ['load', 'domcontentloaded', 'networkidle', 'commit'],
          description: 'When to consider navigation succeeded',
          default: 'load'
        }
      },
      required: ['pageId']
    }
  }
];
