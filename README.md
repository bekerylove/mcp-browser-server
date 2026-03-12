# 🌐 MCP Browser Automation Server

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-%3E=18.0.0-green)](https://nodejs.org/)
[![Playwright](https://img.shields.io/badge/Playwright-1.48-orange)](https://playwright.dev/)
[![MCP](https://img.shields.io/badge/MCP-1.0-purple)](https://modelcontextprotocol.io/)

> A powerful Model Context Protocol (MCP) server that enables AI agents to control web browsers through comprehensive automation capabilities. Built with Playwright and TypeScript.

## ✨ Features

### 🌐 Full Browser Control
- **Navigate** - Browse websites with full control over page navigation
- **Interact** - Click elements, fill forms, upload files, and more
- **Multi-tab** - Manage multiple browser contexts and pages simultaneously
- **Cross-platform** - Works on Windows, macOS, and Linux

### 📸 Visual Capture
- **Screenshots** - Capture full page or element-specific screenshots
- **PDF Generation** - Convert any webpage to PDF format
- **Element Bounds** - Get precise position and size of any element
- **Viewport Control** - Set custom viewport sizes and device emulation

### 🔍 Content Extraction
- **Text Extraction** - Pull text content from any element
- **HTML Parsing** - Extract raw HTML with precision
- **Markdown Conversion** - Automatically convert pages to Markdown
- **Link Discovery** - Extract all links from pages
- **Image Extraction** - Pull all images with metadata
- **Table Data** - Extract structured data from HTML tables

### ⚙️ Advanced Operations
- **JavaScript Execution** - Run custom scripts in browser context
- **Cookie Management** - Get, set, and manipulate cookies
- **Dialog Handling** - Manage alerts, confirms, and prompts
- **Geolocation Control** - Set precise地理位置 coordinates
- **Offline Mode** - Simulate offline network conditions
- **Device Emulation** - Mimic mobile devices, tablets, and desktops

### 🕵️ Stealth Mode (NEW!)
- **Human-like Behavior** - Mimic real user interaction patterns
- **Anti-detection** - Evade bot detection systems
- **Random Delays** - Natural timing between actions
- **Typing Patterns** - Character-by-character input with optional typos
- **Progressive Scrolling** - Natural scroll behavior
- **Website Presets** - Optimized settings for Facebook, Google, Shopee, and more

## 🚀 Quick Start

### Prerequisites

- **Node.js** >= 18.0.0
- **npm**, **yarn**, or **pnpm**

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/mcp-browser-server.git
cd mcp-browser-server

# Install dependencies
npm install

# Install Playwright browsers
npm run install-browsers

# Build the project
npm run build
```

## ⚙️ Configuration

### Claude Code Integration

Add to your Claude Code settings (`.claude/settings.json`):

```json
{
  "mcpServers": {
    "browser": {
      "command": "node",
      "args": ["C:/absolute/path/to/mcp-browser-server/dist/index.js"],
      "env": {
        "HEADLESS": "true"
      }
    }
  }
}
```

**Windows Example:**
```json
{
  "mcpServers": {
    "browser": {
      "command": "node",
      "args": ["C:\\Users\\YourName\\mcp-browser-server\\dist\\index.js"],
      "env": {
        "HEADLESS": "true"
      }
    }
  }
}
```

**Mac/Linux Example:**
```json
{
  "mcpServers": {
    "browser": {
      "command": "node",
      "args": ["/home/yourname/mcp-browser-server/dist/index.js"],
      "env": {
        "HEADLESS": "true"
      }
    }
  }
}
```

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `HEADLESS` | Set to `"false"` for visible browser, `"true"` for hidden | `"true"` |

## 📚 Available Tools

### Navigation Tools

| Tool | Description |
|------|-------------|
| `browser_navigate` | Navigate to a URL |
| `browser_go_back` | Navigate back in history |
| `browser_go_forward` | Navigate forward in history |
| `browser_reload` | Reload the current page |

### Interaction Tools

| Tool | Description |
|------|-------------|
| `browser_click` | Click an element |
| `browser_fill` | Fill text into input field |
| `browser_type` | Type character by character |
| `browser_hover` | Hover over element |
| `browser_select_option` | Select from dropdown |
| `browser_upload_file` | Upload a file |
| `browser_check` | Check a checkbox |
| `browser_uncheck` | Uncheck a checkbox |
| `browser_focus` | Focus on element |
| `browser_press_key` | Press keyboard key |

### Content Extraction Tools

| Tool | Description |
|------|-------------|
| `browser_get_text` | Extract text content |
| `browser_get_html` | Extract HTML content |
| `browser_get_markdown` | Convert page to Markdown |
| `browser_get_attribute` | Get element attribute |
| `browser_evaluate` | Execute JavaScript |
| `browser_get_all_links` | Extract all links |
| `browser_get_all_images` | Extract all images |
| `browser_get_table_data` | Extract table data |

### Visual Tools

| Tool | Description |
|------|-------------|
| `browser_screenshot` | Take screenshot |
| `browser_pdf` | Generate PDF |
| `browser_set_viewport_size` | Set viewport size |
| `browser_emulate_device` | Emulate mobile device |

### Advanced Tools

| Tool | Description |
|------|-------------|
| `browser_wait_for_selector` | Wait for element to appear |
| `browser_handle_dialog` | Handle alerts/dialogs |
| `browser_get_cookies` | Get cookies |
| `browser_set_cookies` | Set cookies |
| `browser_set_geolocation` | Set地理位置 |
| `browser_set_offline` | Set offline mode |

### 🕵️ Stealth Mode Tools

| Tool | Description |
|------|-------------|
| `browser_stealth_navigate` | Navigate with human-like behavior & anti-detection |
| `browser_stealth_click` | Click with hover→delay→click pattern |
| `browser_stealth_type` | Type character by character with optional typos |
| `browser_stealth_scroll` | Progressive scrolling like a human |
| `browser_stealth_fill_form` | Fill forms progressively |
| `browser_stealth_read_page` | Simulate reading with scroll |
| `browser_stealth_inject` | Inject anti-detection scripts |
| `browser_stealth_wait` | Random human-like delays |
| `browser_stealth_extract_links` | Extract links visiting each |
| `browser_stealth_config` | Configure stealth mode settings |

**Available Presets:**
- `facebook` - Slow + typing mistakes
- `shopee` - Medium speed
- `google` - Very slow + anti-detection
- `news` - Faster for news sites

## 💡 Usage Examples

### Basic Navigation

```javascript
// Navigate to a website
browser_navigate({
  url: "https://example.com"
})

// Take a screenshot
browser_screenshot({
  pageId: "page-abc123",
  path: "/path/to/screenshot.png"
})

// Get the page title
browser_get_page_title({
  pageId: "page-abc123"
})
```

### Form Filling

```javascript
// Navigate to login page
browser_navigate({
  url: "https://example.com/login"
})

// Fill username
browser_fill({
  pageId: "page-abc123",
  selector: "#username",
  text: "user@example.com"
})

// Fill password
browser_fill({
  pageId: "page-abc123",
  selector: "#password",
  text: "password123"
})

// Click login button
browser_click({
  pageId: "page-abc123",
  selector: "button[type='submit']"
})
```

### Content Extraction

```javascript
// Get all links
browser_get_all_links({
  pageId: "page-abc123"
})

// Get text from element
browser_get_text({
  pageId: "page-abc123",
  selector: "article.main-content"
})

// Convert page to markdown
browser_get_markdown({
  pageId: "page-abc123"
})
```

### JavaScript Execution

```javascript
// Execute custom JavaScript
browser_evaluate({
  pageId: "page-abc123",
  script: "document.querySelectorAll('.item').length"
})

// Execute with arguments
browser_evaluate({
  pageId: "page-abc123",
  script: "(selector) => document.querySelector(selector).textContent",
  args: ["h1"]
})
```

### Stealth Mode

```javascript
// Navigate with stealth mode
browser_stealth_navigate({
  url: "https://example.com",
  contextId: "my-context",
  preset: "news",
  waitForLoad: true,
  readPage: false
})

// Click like a human
browser_stealth_click({
  pageId: "page-abc123",
  selector: "#button",
  hoverFirst: true,
  hoverDelay: 500,
  clickDelay: 200,
  randomDelay: true
})

// Type with human-like behavior
browser_stealth_type({
  pageId: "page-abc123",
  selector: "#search-input",
  text: "search query",
  charDelay: 100,
  enableMistakes: true,
  mistakeRate: 0.05,
  randomDelay: true
})

// Scroll progressively
browser_stealth_scroll({
  pageId: "page-abc123",
  selector: "#footer",
  steps: 5,
  smooth: true,
  stepDelay: 300
})

// Fill form with human behavior
browser_stealth_fill_form({
  pageId: "page-abc123",
  fields: {
    "#username": "user@example.com",
    "#password": "password123"
  },
  fillDelay: 1000,
  shuffleFields: true
})

// Simulate reading the page
browser_stealth_read_page({
  pageId: "page-abc123",
  readingSpeed: 200,
  scrollThreshold: 0.3,
  maxScrolls: 50
})
```

## 🛠️ Development

### Scripts

```bash
npm run build          # Compile TypeScript
npm run dev            # Run in dev mode
npm start              # Run compiled server
npm run install-browsers  # Install Playwright browsers
npm run typecheck      # Check types without emitting
```

### Project Structure

```
mcp-browser-server/
├── src/
│   ├── index.ts              # MCP server entry point
│   ├── browser/
│   │   └── manager.ts        # Browser lifecycle management
│   └── tools/
│       ├── navigation.ts     # Navigation tools
│       ├── interaction.ts    # Element interaction
│       ├── content.ts        # Content extraction
│       ├── visual.ts         # Screenshots & PDF
│       ├── advanced.ts       # Advanced operations
│       ├── stealth.ts        # Stealth mode tools
│       ├── stealth-executor.ts # Stealth executor
│       ├── stealth-impl.ts   # Stealth implementations
│       └── executor.ts       # Tool execution logic
├── dist/                     # Compiled output
├── package.json
├── tsconfig.json
└── README.md
```

## 🔧 Troubleshooting

### Browser fails to start

```bash
# Install Playwright browsers
npm run install-browsers

# Try running in visible mode
# Set HEADLESS: "false" in config
```

### "Page not found" errors

Pages are automatically closed when their context is closed.

```javascript
// List active pages
browser_list_pages()

// Create new page
browser_navigate({
  url: "https://example.com"
})
```

### Permission Issues

Make sure the path to `dist/index.js` is absolute and correct in your MCP configuration.

## ⚠️ Stealth Mode Important Notes

### When to Use

✅ **Use for:**
- Testing & Development
- Learning & Research
- Legitimate data collection
- Authorized automation

### When NOT to Use

❌ **Don't use for:**
- Malicious purposes
- Creating fake accounts
- Scraping personal data
- Violating Terms of Service

### Limitations

- Stealth mode is **slower** than normal mode
- Not 100% guaranteed to evade detection
- Always check Terms of Service before use
- Use official APIs when available

### Testing Detection

Test stealth mode at:
- https://arh.antoinevastel.com/bots/areyouheadless

**Expected results if stealth mode works:**
- ✅ NOT headless
- ✅ NOT webdriver
- ✅ Chrome detected
- ✅ Plugins detected
- ✅ Canvas fingerprint protected

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Credits

Built with:

- [Playwright](https://playwright.dev/) - Browser automation framework
- [Model Context Protocol SDK](https://github.com/modelcontextprotocol/typescript-sdk) - MCP integration
- [TypeScript](https://www.typescriptlang.org/) - Type safety and developer experience

## 🔗 Links

- [MCP Documentation](https://modelcontextprotocol.io/)
- [Playwright Documentation](https://playwright.dev/docs/intro)
- [Claude Code](https://claude.ai/code)

## 💬 Support

If you find any issues or have questions:

- Open an issue on GitHub
- Check existing discussions
- Read the documentation

---

**Made with ❤️ for the MCP community**

## ⭐ Star History

If you find this project useful, please consider giving it a star! ⭐
