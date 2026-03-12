/**
 * 🕵️ Stealth Mode Tools for MCP Browser Server
 *
 * Tools พิเศษสำหรับทำให้ browser automation ทำงานเหมือนมนุษย์
 * ลดความเสี่ยงในการถูก detect โดย bot detection systems
 */

import { Tool } from '@modelcontextprotocol/sdk/types.js';

// ============================================
// Stealth Mode Configuration
// ============================================

export interface StealthConfig {
  timing: {
    minDelay: number;
    maxDelay: number;
    typingDelay: number;
    clickDelay: number;
    hoverDelay: number;
    scrollDelay: number;
  };
  typing: {
    charDelay: number;
    enableMistakes: boolean;
    mistakeRate: number;
  };
  scroll: {
    steps: number;
    smooth: boolean;
    readingSpeed: number;
    scrollThreshold: number;
  };
  evasion: {
    injectScripts: boolean;
    spoofWebdriver: boolean;
    spoofPlugins: boolean;
    spoofLanguages: boolean;
    spoofChrome: boolean;
    spoofPermissions: boolean;
    canvasNoise: boolean;
  };
  persona: {
    locale: string;
    timezone: string;
    language: string;
    platform: string;
    hardwareConcurrency: number;
    deviceMemory: number;
  };
}

const DEFAULT_STEALTH_CONFIG: StealthConfig = {
  timing: {
    minDelay: 500,
    maxDelay: 3000,
    typingDelay: 100,
    clickDelay: 200,
    hoverDelay: 500,
    scrollDelay: 300
  },
  typing: {
    charDelay: 100,
    enableMistakes: false,
    mistakeRate: 0.05
  },
  scroll: {
    steps: 5,
    smooth: true,
    readingSpeed: 200,
    scrollThreshold: 0.3
  },
  evasion: {
    injectScripts: true,
    spoofWebdriver: true,
    spoofPlugins: true,
    spoofLanguages: true,
    spoofChrome: true,
    spoofPermissions: false,
    canvasNoise: true
  },
  persona: {
    locale: 'th-TH',
    timezone: 'Asia/Bangkok',
    language: 'th-TH',
    platform: 'Win32',
    hardwareConcurrency: 8,
    deviceMemory: 8
  }
};

// ============================================
// Website Presets
// ============================================

const WEBSITE_PRESETS: Record<string, Partial<StealthConfig>> = {
  facebook: {
    timing: { minDelay: 1000, maxDelay: 5000, typingDelay: 100, clickDelay: 200, hoverDelay: 500, scrollDelay: 300 },
    typing: { charDelay: 150, enableMistakes: true, mistakeRate: 0.05 },
    scroll: { steps: 7, smooth: true, readingSpeed: 180, scrollThreshold: 0.3 }
  },
  shopee: {
    timing: { minDelay: 800, maxDelay: 4000, typingDelay: 100, clickDelay: 200, hoverDelay: 500, scrollDelay: 300 },
    typing: { charDelay: 120, enableMistakes: false, mistakeRate: 0.05 },
    scroll: { steps: 5, smooth: true, readingSpeed: 200, scrollThreshold: 0.3 }
  },
  google: {
    timing: { minDelay: 1500, maxDelay: 6000, typingDelay: 100, clickDelay: 200, hoverDelay: 500, scrollDelay: 300 },
    typing: { charDelay: 150, enableMistakes: true, mistakeRate: 0.08 },
    evasion: { injectScripts: true, spoofWebdriver: true, spoofPlugins: true, spoofLanguages: true, spoofChrome: true, spoofPermissions: false, canvasNoise: true }
  },
  news: {
    timing: { minDelay: 500, maxDelay: 2000, typingDelay: 100, clickDelay: 200, hoverDelay: 500, scrollDelay: 300 },
    typing: { charDelay: 80, enableMistakes: false, mistakeRate: 0.05 },
    scroll: { steps: 3, smooth: true, readingSpeed: 250, scrollThreshold: 0.3 }
  }
};

// ============================================
// Stealth Tools Definition
// ============================================

export const stealthTools: Tool[] = [
  // ============================================
  // 1. Stealth Navigate
  // ============================================
  {
    name: 'browser_stealth_navigate',
    description: '🕵️ Navigate to a URL with human-like behavior and inject anti-detection scripts',
    inputSchema: {
      type: 'object',
      properties: {
        contextId: {
          type: 'string',
          description: 'The ID of the browser context'
        },
        url: {
          type: 'string',
          description: 'URL to navigate to'
        },
        preset: {
          type: 'string',
          enum: ['facebook', 'shopee', 'google', 'news', 'custom'],
          description: 'Website preset for stealth behavior',
          default: 'news'
        },
        waitForLoad: {
          type: 'boolean',
          description: 'Whether to wait for page load. Default: true',
          default: true
        },
        readPage: {
          type: 'boolean',
          description: 'Whether to simulate reading the page (scroll progressively). Default: false',
          default: false
        },
        config: {
          type: 'object',
          description: 'Custom stealth configuration (overrides preset)'
        }
      },
      required: ['contextId', 'url']
    }
  },

  // ============================================
  // 2. Stealth Click
  // ============================================
  {
    name: 'browser_stealth_click',
    description: '🖱️ Click an element with human-like behavior (hover → delay → click)',
    inputSchema: {
      type: 'object',
      properties: {
        pageId: {
          type: 'string',
          description: 'The ID of the page'
        },
        selector: {
          type: 'string',
          description: 'CSS selector or XPath for the element'
        },
        hoverFirst: {
          type: 'boolean',
          description: 'Whether to hover before clicking. Default: true',
          default: true
        },
        hoverDelay: {
          type: 'number',
          description: 'Delay after hover in milliseconds. Default: 500',
          default: 500
        },
        clickDelay: {
          type: 'number',
          description: 'Delay after click in milliseconds. Default: 200',
          default: 200
        },
        randomDelay: {
          type: 'boolean',
          description: 'Add random delay before action. Default: true',
          default: true
        }
      },
      required: ['pageId', 'selector']
    }
  },

  // ============================================
  // 3. Stealth Type
  // ============================================
  {
    name: 'browser_stealth_type',
    description: '⌨️ Type text character by character like a human (with optional typos)',
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
        charDelay: {
          type: 'number',
          description: 'Delay between characters in milliseconds. Default: 100',
          default: 100
        },
        enableMistakes: {
          type: 'boolean',
          description: 'Simulate typing mistakes (backspace and correct). Default: false',
          default: false
        },
        mistakeRate: {
          type: 'number',
          description: 'Probability of making a typo (0.0-1.0). Default: 0.05',
          default: 0.05
        },
        randomDelay: {
          type: 'boolean',
          description: 'Add random delay between characters. Default: true',
          default: true
        }
      },
      required: ['pageId', 'selector', 'text']
    }
  },

  // ============================================
  // 4. Stealth Scroll
  // ============================================
  {
    name: 'browser_stealth_scroll',
    description: '📜 Scroll the page progressively like a human reading',
    inputSchema: {
      type: 'object',
      properties: {
        pageId: {
          type: 'string',
          description: 'The ID of the page'
        },
        targetY: {
          type: 'number',
          description: 'Target Y position to scroll to'
        },
        selector: {
          type: 'string',
          description: 'CSS selector for element to scroll to (alternative to targetY)'
        },
        steps: {
          type: 'number',
          description: 'Number of scroll steps. Default: 5',
          default: 5
        },
        smooth: {
          type: 'boolean',
          description: 'Use smooth scrolling. Default: true',
          default: true
        },
        stepDelay: {
          type: 'number',
          description: 'Delay between scroll steps in milliseconds. Default: 300',
          default: 300
        },
        randomDelay: {
          type: 'boolean',
          description: 'Add random delay to each step. Default: true',
          default: true
        }
      },
      required: ['pageId']
    }
  },

  // ============================================
  // 5. Stealth Fill Form
  // ============================================
  {
    name: 'browser_stealth_fill_form',
    description: '📝 Fill a form with human-like behavior (type each field progressively)',
    inputSchema: {
      type: 'object',
      properties: {
        pageId: {
          type: 'string',
          description: 'The ID of the page'
        },
        fields: {
          type: 'object',
          description: 'Form fields to fill (selector → value or object with type)',
          additionalProperties: true
        },
        fillDelay: {
          type: 'number',
          description: 'Delay between filling fields in milliseconds. Default: 1000',
          default: 1000
        },
        shuffleFields: {
          type: 'boolean',
          description: 'Randomize field order. Default: false',
          default: false
        },
        useType: {
          type: 'boolean',
          description: 'Use browser_stealth_type instead of browser_fill. Default: true',
          default: true
        }
      },
      required: ['pageId', 'fields']
    }
  },

  // ============================================
  // 6. Stealth Read Page
  // ============================================
  {
    name: 'browser_stealth_read_page',
    description: '📖 Simulate reading a page (scroll progressively with reading time)',
    inputSchema: {
      type: 'object',
      properties: {
        pageId: {
          type: 'string',
          description: 'The ID of the page'
        },
        readingSpeed: {
          type: 'number',
          description: 'Reading speed in words per minute. Default: 200',
          default: 200
        },
        scrollThreshold: {
          type: 'number',
          description: 'Scroll when this percentage of viewport has been "read" (0.0-1.0). Default: 0.3',
          default: 0.3
        },
        maxScrolls: {
          type: 'number',
          description: 'Maximum number of scrolls. Default: 50',
          default: 50
        },
        randomDelay: {
          type: 'boolean',
          description: 'Add random delay to reading time. Default: true',
          default: true
        }
      },
      required: ['pageId']
    }
  },

  // ============================================
  // 7. Inject Stealth Scripts
  // ============================================
  {
    name: 'browser_stealth_inject',
    description: '💉 Inject anti-detection scripts to hide automation indicators',
    inputSchema: {
      type: 'object',
      properties: {
        pageId: {
          type: 'string',
          description: 'The ID of the page'
        },
        config: {
          type: 'object',
          description: 'Which evasion features to enable',
          properties: {
            spoofWebdriver: {
              type: 'boolean',
              description: 'Hide navigator.webdriver'
            },
            spoofPlugins: {
              type: 'boolean',
              description: 'Add fake plugins'
            },
            spoofLanguages: {
              type: 'boolean',
              description: 'Set realistic languages'
            },
            spoofChrome: {
              type: 'boolean',
              description: 'Add window.chrome object'
            },
            spoofPermissions: {
              type: 'boolean',
              description: 'Spoof Permissions API'
            },
            canvasNoise: {
              type: 'boolean',
              description: 'Add noise to canvas fingerprints'
            }
          }
        }
      },
      required: ['pageId']
    }
  },

  // ============================================
  // 8. Stealth Wait
  // ============================================
  {
    name: 'browser_stealth_wait',
    description: '⏱️ Wait for a random amount of time (human-like pause)',
    inputSchema: {
      type: 'object',
      properties: {
        pageId: {
          type: 'string',
          description: 'The ID of the page (optional, for session tracking)',
          default: ''
        },
        minDelay: {
          type: 'number',
          description: 'Minimum delay in milliseconds. Default: 500',
          default: 500
        },
        maxDelay: {
          type: 'number',
          description: 'Maximum delay in milliseconds. Default: 3000',
          default: 3000
        }
      }
    }
  },

  // ============================================
  // 9. Stealth Extract Links
  // ============================================
  {
    name: 'browser_stealth_extract_links',
    description: '🔗 Extract links from a page visiting each link with human-like behavior',
    inputSchema: {
      type: 'object',
      properties: {
        pageId: {
          type: 'string',
          description: 'The ID of the page'
        },
        maxLinks: {
          type: 'number',
          description: 'Maximum number of links to extract. Default: 30',
          default: 30
        },
        linkSelector: {
          type: 'string',
          description: 'CSS selector for links. Default: "a[href]"',
          default: 'a[href]'
        },
        visitDelay: {
          type: 'number',
          description: 'Delay between visiting links in milliseconds. Default: 2000',
          default: 2000
        },
        extractData: {
          type: 'boolean',
          description: 'Whether to extract data from visited pages. Default: true',
          default: true
        },
        dataSelector: {
          type: 'string',
          description: 'CSS selector for data extraction. Default: "article"',
          default: 'article'
        },
        returnToSource: {
          type: 'boolean',
          description: 'Whether to return to source page after each visit. Default: true',
          default: true
        }
      },
      required: ['pageId']
    }
  },

  // ============================================
  // 10. Configure Stealth Mode
  // ============================================
  {
    name: 'browser_stealth_config',
    description: '⚙️ Configure stealth mode settings for a session',
    inputSchema: {
      type: 'object',
      properties: {
        config: {
          type: 'object',
          description: 'Stealth configuration object (will be merged with defaults)'
        },
        preset: {
          type: 'string',
          enum: ['facebook', 'shopee', 'google', 'news', 'custom'],
          description: 'Website preset to use'
        },
        contextId: {
          type: 'string',
          description: 'Context ID to apply config to (optional)'
        }
      }
    }
  }
];

// ============================================
// Helper Functions
// ============================================

/**
 * Merge stealth config with preset
 */
export function mergeStealthConfig(
  config: Partial<StealthConfig> = {},
  preset: string = 'news'
): StealthConfig {
  let merged = { ...DEFAULT_STEALTH_CONFIG };

  // Apply preset if specified
  if (preset && WEBSITE_PRESETS[preset]) {
    merged = deepMerge(merged, WEBSITE_PRESETS[preset]);
  }

  // Apply custom config
  merged = deepMerge(merged, config);

  return merged;
}

/**
 * Deep merge objects
 */
function deepMerge(target: any, source: any): any {
  const result = { ...target };

  for (const key in source) {
    if (source[key] instanceof Object && key in target && !(source[key] instanceof Array)) {
      result[key] = deepMerge(target[key], source[key]);
    } else {
      result[key] = source[key];
    }
  }

  return result;
}

/**
 * Get random delay
 */
export function getRandomDelay(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Get stealth scripts to inject
 */
export function getStealthScripts(config: StealthConfig): string {
  const scripts: string[] = [];

  if (config.evasion.spoofWebdriver) {
    scripts.push(`
      Object.defineProperty(navigator, 'webdriver', {
        get: () => undefined,
        configurable: true
      });
      delete navigator.__proto__.webdriver;
    `);
  }

  if (config.evasion.spoofPlugins) {
    scripts.push(`
      Object.defineProperty(navigator, 'plugins', {
        get: () => [
          {
            0: {type: "application/x-google-chrome-pdf", suffixes: "pdf", description: "Portable Document Format"},
            description: "Portable Document Format",
            filename: "internal-pdf-viewer",
            length: 1,
            name: "Chrome PDF Plugin"
          },
          {
            0: {type: "application/pdf", suffixes: "pdf", description: ""},
            description: "",
            filename: "mhjfbmdgcfjbbpaeojofohoefgiehjai",
            length: 1,
            name: "Chrome PDF Viewer"
          },
          {
            0: {type: "application/x-nacl", suffixes: "", description: "Native Client Executable"},
            1: {type: "application/x-pnacl", suffixes: "", description: "Portable Native Client Executable"},
            description: "",
            filename: "internal-nacl-plugin",
            length: 2,
            name: "Native Client"
          }
        ],
        configurable: true
      });
    `);
  }

  if (config.evasion.spoofLanguages) {
    scripts.push(`
      Object.defineProperty(navigator, 'languages', {
        get: () => ['${config.persona.language}', '${config.persona.language.split('-')[0]}', 'en-US', 'en'],
        configurable: true
      });
    `);
  }

  if (config.evasion.spoofChrome) {
    scripts.push(`
      if (!window.chrome) {
        window.chrome = {};
      }
      window.chrome.runtime = {
        id: "chrome-runtime-id",
        onMessage: {},
        sendMessage: () => {}
      };
      window.chrome.loadTimes = () => {};
      window.chrome.csi = () => {};
      window.chrome.app = {};
    `);
  }

  if (config.evasion.spoofPermissions) {
    scripts.push(`
      const originalQuery = window.navigator.permissions.query;
      window.navigator.permissions.query = (parameters) => (
        parameters.name === 'notifications' ?
          Promise.resolve({ state: 'granted' }) :
          originalQuery(parameters)
      );
    `);
  }

  if (config.evasion.canvasNoise) {
    scripts.push(`
      const originalToDataURL = HTMLCanvasElement.prototype.toDataURL;
      HTMLCanvasElement.prototype.toDataURL = function(type) {
        if (type === 'image/png') {
          const context = this.getContext('2d');
          if (context) {
            const imageData = context.getImageData(0, 0, this.width, this.height);
            for (let i = 0; i < imageData.data.length; i += 4) {
              imageData.data[i] = imageData.data[i] + (Math.random() * 0.1 - 0.05);
            }
            context.putImageData(imageData, 0, 0);
          }
        }
        return originalToDataURL.apply(this, arguments);
      };
    `);
  }

  // Add persona spoofing
  scripts.push(`
    Object.defineProperty(navigator, 'platform', {
      get: () => '${config.persona.platform}',
      configurable: true
    });
    Object.defineProperty(navigator, 'hardwareConcurrency', {
      get: () => ${config.persona.hardwareConcurrency},
      configurable: true
    });
    Object.defineProperty(navigator, 'deviceMemory', {
      get: () => ${config.persona.deviceMemory},
      configurable: true
    });
  `);

  return scripts.join('\n');
}

// Export presets and config
export { DEFAULT_STEALTH_CONFIG, WEBSITE_PRESETS };
