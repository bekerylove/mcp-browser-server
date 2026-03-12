import { Tool } from '@modelcontextprotocol/sdk/types.js';

export const advancedTools: Tool[] = [
  {
    name: 'browser_wait_for_selector',
    description: 'Wait for an element to appear in the DOM',
    inputSchema: {
      type: 'object',
      properties: {
        pageId: {
          type: 'string',
          description: 'The ID of the page'
        },
        selector: {
          type: 'string',
          description: 'CSS selector or XPath to wait for'
        },
        state: {
          type: 'string',
          enum: ['attached', 'detached', 'visible', 'hidden'],
          description: 'Element state to wait for. Default: "visible"',
          default: 'visible'
        },
        timeout: {
          type: 'number',
          description: 'Maximum time to wait in milliseconds. Default: 30000',
          default: 30000
        }
      },
      required: ['pageId', 'selector']
    }
  },
  {
    name: 'browser_wait_for_navigation',
    description: 'Wait for page navigation to complete',
    inputSchema: {
      type: 'object',
      properties: {
        pageId: {
          type: 'string',
          description: 'The ID of the page'
        },
        timeout: {
          type: 'number',
          description: 'Maximum time to wait in milliseconds. Default: 30000',
          default: 30000
        },
        waitUntil: {
          type: 'string',
          enum: ['load', 'domcontentloaded', 'networkidle', 'commit'],
          description: 'When to consider navigation succeeded. Default: "load"',
          default: 'load'
        }
      },
      required: ['pageId']
    }
  },
  {
    name: 'browser_wait_for_timeout',
    description: 'Wait for a specified amount of time (useful for animations or delays)',
    inputSchema: {
      type: 'object',
      properties: {
        pageId: {
          type: 'string',
          description: 'The ID of the page'
        },
        timeout: {
          type: 'number',
          description: 'Time to wait in milliseconds',
          required: true
        }
      },
      required: ['pageId', 'timeout']
    }
  },
  {
    name: 'browser_handle_dialog',
    description: 'Handle alert, confirm, or prompt dialogs. Must be called before the action that triggers the dialog.',
    inputSchema: {
      type: 'object',
      properties: {
        pageId: {
          type: 'string',
          description: 'The ID of the page'
        },
        action: {
          type: 'string',
          enum: ['accept', 'dismiss'],
          description: 'Action to perform on the dialog'
        },
        promptText: {
          type: 'string',
          description: 'Optional text to enter for prompt dialogs'
        }
      },
      required: ['pageId', 'action']
    }
  },
  {
    name: 'browser_set_content',
    description: 'Set the HTML content of the page directly (bypasses navigation)',
    inputSchema: {
      type: 'object',
      properties: {
        pageId: {
          type: 'string',
          description: 'The ID of the page'
        },
        html: {
          type: 'string',
          description: 'HTML content to set'
        },
        url: {
          type: 'string',
          description: 'Optional URL to set as the document location (useful for relative URLs)',
          default: 'about:blank'
        },
        waitUntil: {
          type: 'string',
          enum: ['load', 'domcontentloaded', 'networkidle', 'commit'],
          description: 'When to consider navigation succeeded. Default: "load"',
          default: 'load'
        }
      },
      required: ['pageId', 'html']
    }
  },
  {
    name: 'browser_add_script_tag',
    description: 'Add a script tag to the page',
    inputSchema: {
      type: 'object',
      properties: {
        pageId: {
          type: 'string',
          description: 'The ID of the page'
        },
        url: {
          type: 'string',
          description: 'URL of the script file to add'
        },
        content: {
          type: 'string',
          description: 'JavaScript content to add (alternative to url)'
        },
        type: {
          type: 'string',
          description: 'Script type (e.g., "module")'
        }
      },
      required: ['pageId']
    }
  },
  {
    name: 'browser_add_style_tag',
    description: 'Add a style tag to the page',
    inputSchema: {
      type: 'object',
      properties: {
        pageId: {
          type: 'string',
          description: 'The ID of the page'
        },
        url: {
          type: 'string',
          description: 'URL of the stylesheet to add'
        },
        content: {
          type: 'string',
          description: 'CSS content to add (alternative to url)'
        }
      },
      required: ['pageId']
    }
  },
  {
    name: 'browser_get_cookies',
    description: 'Get all cookies from the browser context',
    inputSchema: {
      type: 'object',
      properties: {
        contextId: {
          type: 'string',
          description: 'The ID of the browser context'
        },
        urls: {
          type: 'array',
          description: 'Optional list of URLs to filter cookies',
          items: {
            type: 'string'
          }
        }
      },
      required: ['contextId']
    }
  },
  {
    name: 'browser_set_cookies',
    description: 'Set cookies in the browser context',
    inputSchema: {
      type: 'object',
      properties: {
        contextId: {
          type: 'string',
          description: 'The ID of the browser context'
        },
        cookies: {
          type: 'array',
          description: 'Cookies to set',
          items: {
            type: 'object',
            properties: {
              name: { type: 'string', description: 'Cookie name' },
              value: { type: 'string', description: 'Cookie value' },
              domain: { type: 'string', description: 'Cookie domain' },
              path: { type: 'string', description: 'Cookie path', default: '/' },
              url: { type: 'string', description: 'Cookie URL (alternative to domain)' },
              expires: { type: 'number', description: 'Expiration timestamp (seconds since epoch)' },
              httpOnly: { type: 'boolean', description: 'HTTP-only flag' },
              secure: { type: 'boolean', description: 'Secure flag' },
              sameSite: {
                type: 'string',
                enum: ['Strict', 'Lax', 'None'],
                description: 'SameSite attribute'
              }
            },
            required: ['name', 'value']
          }
        }
      },
      required: ['contextId', 'cookies']
    }
  },
  {
    name: 'browser_get_page_url',
    description: 'Get the current page URL',
    inputSchema: {
      type: 'object',
      properties: {
        pageId: {
          type: 'string',
          description: 'The ID of the page'
        }
      },
      required: ['pageId']
    }
  },
  {
    name: 'browser_get_page_title',
    description: 'Get the current page title',
    inputSchema: {
      type: 'object',
      properties: {
        pageId: {
          type: 'string',
          description: 'The ID of the page'
        }
      },
      required: ['pageId']
    }
  },
  {
    name: 'browser_close_page',
    description: 'Close a specific page/tab',
    inputSchema: {
      type: 'object',
      properties: {
        pageId: {
          type: 'string',
          description: 'The ID of the page to close'
        }
      },
      required: ['pageId']
    }
  },
  {
    name: 'browser_close_context',
    description: 'Close a browser context (including all its pages)',
    inputSchema: {
      type: 'object',
      properties: {
        contextId: {
          type: 'string',
          description: 'The ID of the context to close'
        }
      },
      required: ['contextId']
    }
  },
  {
    name: 'browser_list_pages',
    description: 'List all active pages with their URLs and titles',
    inputSchema: {
      type: 'object',
      properties: {},
      required: []
    }
  },
  {
    name: 'browser_list_contexts',
    description: 'List all active browser contexts',
    inputSchema: {
      type: 'object',
      properties: {},
      required: []
    }
  },
  {
    name: 'browser_create_new_page',
    description: 'Create a new page in the specified context',
    inputSchema: {
      type: 'object',
      properties: {
        contextId: {
          type: 'string',
          description: 'The ID of the browser context'
        }
      },
      required: ['contextId']
    }
  },
  {
    name: 'browser_switch_to_page',
    description: 'Bring a specific page to the foreground (activate it)',
    inputSchema: {
      type: 'object',
      properties: {
        pageId: {
          type: 'string',
          description: 'The ID of the page to activate'
        }
      },
      required: ['pageId']
    }
  },
  {
    name: 'browser_wait_for_function',
    description: 'Wait for a JavaScript function to return a truthy value',
    inputSchema: {
      type: 'object',
      properties: {
        pageId: {
          type: 'string',
          description: 'The ID of the page'
        },
        script: {
          type: 'string',
          description: 'JavaScript function or expression to wait for'
        },
        args: {
          type: 'array',
          description: 'Optional arguments to pass to the function',
          items: {
            type: 'string'
          }
        },
        timeout: {
          type: 'number',
          description: 'Maximum time to wait in milliseconds. Default: 30000',
          default: 30000
        }
      },
      required: ['pageId', 'script']
    }
  },
  {
    name: 'browser_intercept_request',
    description: 'Intercept and modify HTTP requests (advanced feature)',
    inputSchema: {
      type: 'object',
      properties: {
        pageId: {
          type: 'string',
          description: 'The ID of the page'
        },
        urlPattern: {
          type: 'string',
          description: 'URL pattern to match (e.g., "**/api/**")'
        },
        action: {
          type: 'string',
          enum: ['abort', 'continue', 'mock'],
          description: 'Action to take on matched requests'
        },
        mockResponse: {
          type: 'object',
          description: 'Mock response data (when action is "mock")',
          properties: {
            status: { type: 'number', description: 'HTTP status code' },
            headers: { type: 'object', description: 'Response headers' },
            body: { type: 'string', description: 'Response body' },
            contentType: { type: 'string', description: 'Content-Type header' }
          }
        }
      },
      required: ['pageId', 'urlPattern', 'action']
    }
  },
  {
    name: 'browser_get_performance_metrics',
    description: 'Get page performance metrics (timing, resource counts, etc.)',
    inputSchema: {
      type: 'object',
      properties: {
        pageId: {
          type: 'string',
          description: 'The ID of the page'
        }
      },
      required: ['pageId']
    }
  },
  {
    name: 'browser_set_geolocation',
    description: 'Set the geolocation for the browser context',
    inputSchema: {
      type: 'object',
      properties: {
        contextId: {
          type: 'string',
          description: 'The ID of the browser context'
        },
        latitude: {
          type: 'number',
          description: 'Latitude (e.g., 37.7749 for San Francisco)'
        },
        longitude: {
          type: 'number',
          description: 'Longitude (e.g., -122.4194 for San Francisco)'
        },
        accuracy: {
          type: 'number',
          description: 'Accuracy in meters. Default: 0',
          default: 0
        }
      },
      required: ['contextId', 'latitude', 'longitude']
    }
  },
  {
    name: 'browser_set_offline',
    description: 'Set the browser context to offline mode',
    inputSchema: {
      type: 'object',
      properties: {
        contextId: {
          type: 'string',
          description: 'The ID of the browser context'
        },
        offline: {
          type: 'boolean',
          description: 'Whether to enable offline mode'
        }
      },
      required: ['contextId', 'offline']
    }
  },
  {
    name: 'browser_play_audio',
    description: 'Play audio in the page (useful for testing audio features)',
    inputSchema: {
      type: 'object',
      properties: {
        pageId: {
          type: 'string',
          description: 'The ID of the page'
        },
        url: {
          type: 'string',
          description: 'URL of the audio file to play'
        }
      },
      required: ['pageId', 'url']
    }
  }
];
