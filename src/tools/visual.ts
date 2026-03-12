import { Tool } from '@modelcontextprotocol/sdk/types.js';

export const visualTools: Tool[] = [
  {
    name: 'browser_screenshot',
    description: 'Take a screenshot of the page or a specific element. Returns base64 data if no path is provided.',
    inputSchema: {
      type: 'object',
      properties: {
        pageId: {
          type: 'string',
          description: 'The ID of the page to screenshot'
        },
        selector: {
          type: 'string',
          description: 'Optional CSS selector to screenshot only a specific element'
        },
        path: {
          type: 'string',
          description: 'Optional file path to save the screenshot. If not provided, returns base64 data'
        },
        format: {
          type: 'string',
          enum: ['png', 'jpeg'],
          description: 'Image format. Default: "png"',
          default: 'png'
        },
        quality: {
          type: 'number',
          description: 'Quality for JPEG (0-100). Default: 80',
          default: 80,
          minimum: 0,
          maximum: 100
        },
        fullPage: {
          type: 'boolean',
          description: 'Capture the full scrollable page. Default: false',
          default: false
        },
        clip: {
          type: 'object',
          description: 'Optional clip region to capture',
          properties: {
            x: { type: 'number', description: 'X coordinate' },
            y: { type: 'number', description: 'Y coordinate' },
            width: { type: 'number', description: 'Width of the region' },
            height: { type: 'number', description: 'Height of the region' }
          },
          required: ['x', 'y', 'width', 'height']
        }
      },
      required: ['pageId']
    }
  },
  {
    name: 'browser_pdf',
    description: 'Generate a PDF of the current page',
    inputSchema: {
      type: 'object',
      properties: {
        pageId: {
          type: 'string',
          description: 'The ID of the page'
        },
        path: {
          type: 'string',
          description: 'Optional file path to save the PDF. If not provided, returns base64 data'
        },
        format: {
          type: 'string',
          enum: ['Letter', 'Legal', 'Tabloid', 'Ledger', 'A0', 'A1', 'A2', 'A3', 'A4', 'A5', 'A6'],
          description: 'Paper format. Default: "A4"',
          default: 'A4'
        },
        printBackground: {
          type: 'boolean',
          description: 'Print background graphics. Default: true',
          default: true
        },
        landscape: {
          type: 'boolean',
          description: 'Landscape orientation. Default: false',
          default: false
        },
        margin: {
          type: 'object',
          description: 'Paper margins',
          properties: {
            top: { type: 'string', description: 'Top margin (e.g., "1cm", "0.5in")' },
            right: { type: 'string', description: 'Right margin' },
            bottom: { type: 'string', description: 'Bottom margin' },
            left: { type: 'string', description: 'Left margin' }
          }
        },
        pageRanges: {
          type: 'string',
          description: 'Page ranges to print (e.g., "1-5, 8, 11-13")'
        }
      },
      required: ['pageId']
    }
  },
  {
    name: 'browser_get_viewport_size',
    description: 'Get the current viewport size',
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
    name: 'browser_set_viewport_size',
    description: 'Set the viewport size',
    inputSchema: {
      type: 'object',
      properties: {
        pageId: {
          type: 'string',
          description: 'The ID of the page'
        },
        width: {
          type: 'number',
          description: 'Viewport width in pixels'
        },
        height: {
          type: 'number',
          description: 'Viewport height in pixels'
        }
      },
      required: ['pageId', 'width', 'height']
    }
  },
  {
    name: 'browser_emulate_device',
    description: 'Emulate a specific device (e.g., mobile phone, tablet)',
    inputSchema: {
      type: 'object',
      properties: {
        pageId: {
          type: 'string',
          description: 'The ID of the page'
        },
        device: {
          type: 'string',
          enum: [
            'iPhone 13',
            'iPhone 13 Pro',
            'iPhone 13 Pro Max',
            'iPhone 12',
            'iPhone 12 Pro',
            'iPhone 12 Pro Max',
            'iPhone 11',
            'iPhone 11 Pro',
            'iPhone 11 Pro Max',
            'iPhone SE',
            'iPad Pro',
            'iPad',
            'iPad Mini',
            'Galaxy S21',
            'Galaxy S20',
            'Pixel 5',
            'Desktop Chrome',
            'Desktop Firefox',
            'Desktop Safari'
          ],
          description: 'Device to emulate'
        }
      },
      required: ['pageId', 'device']
    }
  },
  {
    name: 'browser_get_element_bounds',
    description: 'Get the bounding box (position and size) of an element',
    inputSchema: {
      type: 'object',
      properties: {
        pageId: {
          type: 'string',
          description: 'The ID of the page'
        },
        selector: {
          type: 'string',
          description: 'CSS selector for the element'
        },
        waitForSelector: {
          type: 'boolean',
          description: 'Whether to wait for the element. Default: true',
          default: true
        },
        timeout: {
          type: 'number',
          description: 'Maximum time to wait in milliseconds. Default: 10000',
          default: 10000
        }
      },
      required: ['pageId', 'selector']
    }
  },
  {
    name: 'browser_scroll_to',
    description: 'Scroll the page to a specific position or element',
    inputSchema: {
      type: 'object',
      properties: {
        pageId: {
          type: 'string',
          description: 'The ID of the page'
        },
        selector: {
          type: 'string',
          description: 'Optional CSS selector to scroll element into view'
        },
        x: {
          type: 'number',
          description: 'X coordinate to scroll to (if not using selector)'
        },
        y: {
          type: 'number',
          description: 'Y coordinate to scroll to (if not using selector)'
        }
      },
      required: ['pageId']
    }
  }
];
