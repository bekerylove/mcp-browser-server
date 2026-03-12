import { Tool } from '@modelcontextprotocol/sdk/types.js';

export const interactionTools: Tool[] = [
  {
    name: 'browser_click',
    description: 'Click an element on the page using CSS selector or XPath',
    inputSchema: {
      type: 'object',
      properties: {
        pageId: {
          type: 'string',
          description: 'The ID of the page containing the element'
        },
        selector: {
          type: 'string',
          description: 'CSS selector or XPath for the element to click (e.g., "button.submit", "#submit-btn", "//button[@type="submit"]")'
        },
        waitForSelector: {
          type: 'boolean',
          description: 'Whether to wait for the element to be available before clicking. Default: true',
          default: true
        },
        timeout: {
          type: 'number',
          description: 'Maximum time to wait for the selector in milliseconds. Default: 10000',
          default: 10000
        },
        clickCount: {
          type: 'number',
          description: 'Number of times to click. Default: 1',
          default: 1
        },
        button: {
          type: 'string',
          enum: ['left', 'middle', 'right'],
          description: 'Mouse button to use. Default: "left"',
          default: 'left'
        }
      },
      required: ['pageId', 'selector']
    }
  },
  {
    name: 'browser_fill',
    description: 'Fill text into an input field (clears existing text first)',
    inputSchema: {
      type: 'object',
      properties: {
        pageId: {
          type: 'string',
          description: 'The ID of the page'
        },
        selector: {
          type: 'string',
          description: 'CSS selector for the input element'
        },
        text: {
          type: 'string',
          description: 'Text to fill into the input field'
        },
        waitForSelector: {
          type: 'boolean',
          description: 'Whether to wait for the element to be available. Default: true',
          default: true
        },
        timeout: {
          type: 'number',
          description: 'Maximum time to wait for the selector in milliseconds. Default: 10000',
          default: 10000
        }
      },
      required: ['pageId', 'selector', 'text']
    }
  },
  {
    name: 'browser_type',
    description: 'Type text character by character (simulates real typing with keystrokes)',
    inputSchema: {
      type: 'object',
      properties: {
        pageId: {
          type: 'string',
          description: 'The ID of the page'
        },
        selector: {
          type: 'string',
          description: 'CSS selector for the input element'
        },
        text: {
          type: 'string',
          description: 'Text to type'
        },
        delay: {
          type: 'number',
          description: 'Delay between keystrokes in milliseconds. Default: 50',
          default: 50
        },
        waitForSelector: {
          type: 'boolean',
          description: 'Whether to wait for the element to be available. Default: true',
          default: true
        },
        timeout: {
          type: 'number',
          description: 'Maximum time to wait for the selector in milliseconds. Default: 10000',
          default: 10000
        }
      },
      required: ['pageId', 'selector', 'text']
    }
  },
  {
    name: 'browser_hover',
    description: 'Hover over an element (move mouse cursor over it)',
    inputSchema: {
      type: 'object',
      properties: {
        pageId: {
          type: 'string',
          description: 'The ID of the page'
        },
        selector: {
          type: 'string',
          description: 'CSS selector for the element to hover over'
        },
        waitForSelector: {
          type: 'boolean',
          description: 'Whether to wait for the element to be available. Default: true',
          default: true
        },
        timeout: {
          type: 'number',
          description: 'Maximum time to wait for the selector in milliseconds. Default: 10000',
          default: 10000
        }
      },
      required: ['pageId', 'selector']
    }
  },
  {
    name: 'browser_select_option',
    description: 'Select an option from a dropdown (select element)',
    inputSchema: {
      type: 'object',
      properties: {
        pageId: {
          type: 'string',
          description: 'The ID of the page'
        },
        selector: {
          type: 'string',
          description: 'CSS selector for the select element'
        },
        value: {
          type: 'string',
          description: 'Option value to select'
        },
        label: {
          type: 'string',
          description: 'Option label to select (alternative to value)'
        },
        index: {
          type: 'number',
          description: 'Option index to select (alternative to value/label)'
        },
        waitForSelector: {
          type: 'boolean',
          description: 'Whether to wait for the element to be available. Default: true',
          default: true
        },
        timeout: {
          type: 'number',
          description: 'Maximum time to wait for the selector in milliseconds. Default: 10000',
          default: 10000
        }
      },
      required: ['pageId', 'selector']
    }
  },
  {
    name: 'browser_upload_file',
    description: 'Upload a file through a file input element',
    inputSchema: {
      type: 'object',
      properties: {
        pageId: {
          type: 'string',
          description: 'The ID of the page'
        },
        selector: {
          type: 'string',
          description: 'CSS selector for the file input element'
        },
        filePath: {
          type: 'string',
          description: 'Path to the file to upload'
        },
        waitForSelector: {
          type: 'boolean',
          description: 'Whether to wait for the element to be available. Default: true',
          default: true
        },
        timeout: {
          type: 'number',
          description: 'Maximum time to wait for the selector in milliseconds. Default: 10000',
          default: 10000
        }
      },
      required: ['pageId', 'selector', 'filePath']
    }
  },
  {
    name: 'browser_check',
    description: 'Check a checkbox element',
    inputSchema: {
      type: 'object',
      properties: {
        pageId: {
          type: 'string',
          description: 'The ID of the page'
        },
        selector: {
          type: 'string',
          description: 'CSS selector for the checkbox element'
        },
        waitForSelector: {
          type: 'boolean',
          description: 'Whether to wait for the element to be available. Default: true',
          default: true
        },
        timeout: {
          type: 'number',
          description: 'Maximum time to wait for the selector in milliseconds. Default: 10000',
          default: 10000
        }
      },
      required: ['pageId', 'selector']
    }
  },
  {
    name: 'browser_uncheck',
    description: 'Uncheck a checkbox element',
    inputSchema: {
      type: 'object',
      properties: {
        pageId: {
          type: 'string',
          description: 'The ID of the page'
        },
        selector: {
          type: 'string',
          description: 'CSS selector for the checkbox element'
        },
        waitForSelector: {
          type: 'boolean',
          description: 'Whether to wait for the element to be available. Default: true',
          default: true
        },
        timeout: {
          type: 'number',
          description: 'Maximum time to wait for the selector in milliseconds. Default: 10000',
          default: 10000
        }
      },
      required: ['pageId', 'selector']
    }
  },
  {
    name: 'browser_focus',
    description: 'Focus on an element',
    inputSchema: {
      type: 'object',
      properties: {
        pageId: {
          type: 'string',
          description: 'The ID of the page'
        },
        selector: {
          type: 'string',
          description: 'CSS selector for the element to focus'
        },
        waitForSelector: {
          type: 'boolean',
          description: 'Whether to wait for the element to be available. Default: true',
          default: true
        },
        timeout: {
          type: 'number',
          description: 'Maximum time to wait for the selector in milliseconds. Default: 10000',
          default: 10000
        }
      },
      required: ['pageId', 'selector']
    }
  },
  {
    name: 'browser_blur',
    description: 'Remove focus from the currently focused element',
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
    name: 'browser_press_key',
    description: 'Press a keyboard key',
    inputSchema: {
      type: 'object',
      properties: {
        pageId: {
          type: 'string',
          description: 'The ID of the page'
        },
        key: {
          type: 'string',
          description: 'Key to press (e.g., "Enter", "Escape", "F1", "a", "+", "Shift+a")'
        },
        delay: {
          type: 'number',
          description: 'Delay between keydown and keyup in milliseconds. Default: 0',
          default: 0
        }
      },
      required: ['pageId', 'key']
    }
  }
];
