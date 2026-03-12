import { Tool } from '@modelcontextprotocol/sdk/types.js';

export const contentTools: Tool[] = [
  {
    name: 'browser_get_text',
    description: 'Extract text content from elements or the entire page',
    inputSchema: {
      type: 'object',
      properties: {
        pageId: {
          type: 'string',
          description: 'The ID of the page'
        },
        selector: {
          type: 'string',
          description: 'Optional CSS selector. If not provided, extracts text from the entire body'
        },
        trim: {
          type: 'boolean',
          description: 'Whether to trim whitespace from the result. Default: true',
          default: true
        }
      },
      required: ['pageId']
    }
  },
  {
    name: 'browser_get_html',
    description: 'Extract HTML content from elements or the entire page',
    inputSchema: {
      type: 'object',
      properties: {
        pageId: {
          type: 'string',
          description: 'The ID of the page'
        },
        selector: {
          type: 'string',
          description: 'Optional CSS selector. If not provided, extracts HTML from the entire body'
        },
        outer: {
          type: 'boolean',
          description: 'Include outer HTML (element itself). Default: true',
          default: true
        }
      },
      required: ['pageId']
    }
  },
  {
    name: 'browser_get_markdown',
    description: 'Convert page content to markdown format for easy reading',
    inputSchema: {
      type: 'object',
      properties: {
        pageId: {
          type: 'string',
          description: 'The ID of the page'
        },
        selector: {
          type: 'string',
          description: 'Optional CSS selector. If not provided, converts entire page to markdown'
        }
      },
      required: ['pageId']
    }
  },
  {
    name: 'browser_get_attribute',
    description: 'Get an attribute value from an element',
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
        attribute: {
          type: 'string',
          description: 'Attribute name (e.g., href, src, class, id, data-*)'
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
      required: ['pageId', 'selector', 'attribute']
    }
  },
  {
    name: 'browser_evaluate',
    description: 'Execute JavaScript code in the page context and return the result',
    inputSchema: {
      type: 'object',
      properties: {
        pageId: {
          type: 'string',
          description: 'The ID of the page'
        },
        script: {
          type: 'string',
          description: 'JavaScript code to execute. Can be a function body or an expression'
        },
        args: {
          type: 'array',
          description: 'Optional arguments to pass to the function',
          items: {
            type: 'string'
          }
        }
      },
      required: ['pageId', 'script']
    }
  },
  {
    name: 'browser_get_inner_text',
    description: 'Get the inner text of an element (includes text from hidden elements)',
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
    name: 'browser_get_all_links',
    description: 'Extract all links (anchors with href) from the page',
    inputSchema: {
      type: 'object',
      properties: {
        pageId: {
          type: 'string',
          description: 'The ID of the page'
        },
        selector: {
          type: 'string',
          description: 'Optional CSS selector to scope the search (e.g., ".content a" for links within content area)',
          default: 'a'
        },
        includeText: {
          type: 'boolean',
          description: 'Include link text in the result. Default: true',
          default: true
        }
      },
      required: ['pageId']
    }
  },
  {
    name: 'browser_get_all_images',
    description: 'Extract all images from the page',
    inputSchema: {
      type: 'object',
      properties: {
        pageId: {
          type: 'string',
          description: 'The ID of the page'
        },
        selector: {
          type: 'string',
          description: 'Optional CSS selector to scope the search',
          default: 'img'
        },
        includeAlt: {
          type: 'boolean',
          description: 'Include alt text in the result. Default: true',
          default: true
        }
      },
      required: ['pageId']
    }
  },
  {
    name: 'browser_get_element_count',
    description: 'Count the number of elements matching a selector',
    inputSchema: {
      type: 'object',
      properties: {
        pageId: {
          type: 'string',
          description: 'The ID of the page'
        },
        selector: {
          type: 'string',
          description: 'CSS selector to count elements for'
        }
      },
      required: ['pageId', 'selector']
    }
  },
  {
    name: 'browser_get_multiple_attributes',
    description: 'Get multiple attributes from multiple elements',
    inputSchema: {
      type: 'object',
      properties: {
        pageId: {
          type: 'string',
          description: 'The ID of the page'
        },
        selector: {
          type: 'string',
          description: 'CSS selector for the elements'
        },
        attributes: {
          type: 'array',
          description: 'List of attribute names to extract',
          items: {
            type: 'string'
          }
        },
        waitForSelector: {
          type: 'boolean',
          description: 'Whether to wait for elements. Default: true',
          default: true
        },
        timeout: {
          type: 'number',
          description: 'Maximum time to wait in milliseconds. Default: 10000',
          default: 10000
        }
      },
      required: ['pageId', 'selector', 'attributes']
    }
  },
  {
    name: 'browser_get_table_data',
    description: 'Extract data from an HTML table as a 2D array',
    inputSchema: {
      type: 'object',
      properties: {
        pageId: {
          type: 'string',
          description: 'The ID of the page'
        },
        selector: {
          type: 'string',
          description: 'CSS selector for the table element. Default: "table"',
          default: 'table'
        },
        includeHeaders: {
          type: 'boolean',
          description: 'Include table headers as first row. Default: true',
          default: true
        },
        waitForSelector: {
          type: 'boolean',
          description: 'Whether to wait for the table. Default: true',
          default: true
        },
        timeout: {
          type: 'number',
          description: 'Maximum time to wait in milliseconds. Default: 10000',
          default: 10000
        }
      },
      required: ['pageId']
    }
  }
];
