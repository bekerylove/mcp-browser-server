# MCP Browser Automation Server

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-%3E=18.0.0-green)](https://nodejs.org/)
[![Playwright](https://img.shields.io/badge/Playwright-1.48-orange)](https://playwright.dev/)

# เซิร์ฟเวอร์ MCP สำหรับ Browser Automation

A powerful Model Context Protocol (MCP) server that enables AI agents to control web browsers through automation. Built with Playwright and TypeScript, this server provides comprehensive browser automation capabilities.

เซิร์ฟเวอร์ MCP ที่ทำให้ AI สามารถควบคุมเว็บเบราว์เซอร์ได้อย่างสมบูรณ์ สร้างด้วย Playwright และ TypeScript

## Features / ฟีเจอร์หลัก

### 🌐 Full Browser Control / การควบคุมเบราว์เซอร์เต็มรูปแบบ
- Navigate websites / เข้าชมเว็บไซต์
- Interact with elements / โต้ตอบกับ elements ต่างๆ
- Fill forms / กรอกข้อมูลในฟอร์ม
- Click buttons / คลิกปุ่ม
- Upload files / อัปโหลดไฟล์

### 📸 Visual Capture / การจับภาพ
- Take screenshots / ถ่ายภาพหน้าจอ
- Generate PDF / สร้าง PDF
- Get element bounds / ดำตำแหน่งและขนาดของ elements

### 🔍 Content Extraction / การดึงข้อมูล
- Extract text / ดึงข้อความ
- Extract HTML / ดึง HTML
- Convert to Markdown / แปลงเป็น Markdown
- Extract links & images / ดึงลิงก์และรูปภาพ
- Extract table data / ดึงข้อมูลจากตาราง

### ⚙️ Advanced Operations / การดำเนินการขั้นสูง
- Handle dialogs / จัดการ dialog boxes
- Manage cookies / จัดการ cookies
- Execute JavaScript / รัน JavaScript
- Device emulation / จำลองอุปกรณ์ต่างๆ
- Geolocation control / ควบคุมตำแหน่ง

## Installation / การติดตั้ง

### Prerequisites / สิ่งที่ต้องมีก่อน

- Node.js 18 หรือสูงกว่า
- npm, yarn, หรือ pnpm

### Setup / การติดตั้ง

1. **Clone or download this repository:**
   ```bash
   git clone https://github.com/yourusername/mcp-browser-server.git
   cd mcp-browser-server
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Install Playwright browsers:**
   ```bash
   npm run install-browsers
   ```

4. **Build the project:**
   ```bash
   npm run build
   ```

## Configuration / การตั้งค่า

### Claude Code Integration

เพิ่มข้อมูลต่อไปนี้ใน Claude Code settings (โดยปกติอยู่ที่ `.claude/settings.json`):

Add this to your Claude Code settings (usually in `.claude/settings.json`):

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

**Windows Path Example:**
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

**Mac/Linux Path Example:**
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

### Environment Variables / ตัวแปรสภาพแวดล้อม

- `HEADLESS`: ตั้งค่าเป็น `"false"` เพื่อแสดง browser หรือ `"true"` เพื่อซ่อน (default: `"true"`)

## Available Tools / เครื่องมือที่มี

### Navigation Tools / เครื่องมือนำทาง

| Tool / ชื่อเครื่องมือ | Description / คำอธิบาย |
|------|-------------|
| `browser_navigate` | Navigate to a URL / เข้าชมเว็บไซต์ |
| `browser_go_back` | Navigate back in history / ย้อนกลับ |
| `browser_go_forward` | Navigate forward in history / ไปข้างหน้า |
| `browser_reload` | Reload the current page / โหลดหน้าใหม่ |

### Interaction Tools / เครื่องมือโต้ตอบ

| Tool / ชื่อเครื่องมือ | Description / คำอธิบาย |
|------|-------------|
| `browser_click` | Click an element / คลิก element |
| `browser_fill` | Fill text into input / กรอกข้อความ |
| `browser_type` | Type character by character / พิมพ์ทีละตัวอักษร |
| `browser_hover` | Hover over element / ชี้ไปที่ element |
| `browser_select_option` | Select from dropdown / เลือกจาก dropdown |
| `browser_upload_file` | Upload a file / อัปโหลดไฟล์ |
| `browser_check` | Check a checkbox / ติ๊ก checkbox |
| `browser_uncheck` | Uncheck a checkbox / ยกเลิก checkbox |
| `browser_focus` | Focus on element / โฟกัสที่ element |
| `browser_press_key` | Press keyboard key / กดปุ่มคีย์บอร์ด |

### Content Extraction Tools / เครื่องมือดึงข้อมูล

| Tool / ชื่อเครื่องมือ | Description / คำอธิบาย |
|------|-------------|
| `browser_get_text` | Extract text / ดึงข้อความ |
| `browser_get_html` | Extract HTML / ดึง HTML |
| `browser_get_markdown` | Convert to markdown / แปลงเป็น markdown |
| `browser_get_attribute` | Get element attribute / ดึง attribute |
| `browser_evaluate` | Execute JavaScript / รัน JavaScript |
| `browser_get_all_links` | Extract all links / ดึงลิงก์ทั้งหมด |
| `browser_get_all_images` | Extract all images / ดึงรูปภาพทั้งหมด |
| `browser_get_table_data` | Extract table data / ดึงข้อมูลจากตาราง |

### Visual Tools / เครื่องมือภาพ

| Tool / ชื่อเครื่องมือ | Description / คำอธิบาย |
|------|-------------|
| `browser_screenshot` | Take screenshot / ถ่ายภาพหน้าจอ |
| `browser_pdf` | Generate PDF / สร้าง PDF |
| `browser_set_viewport_size` | Set viewport size / ตั้งขนาดหน้าจอ |
| `browser_emulate_device` | Emulate mobile device / จำลองมือถือ |

### Advanced Tools / เครื่องมือขั้นสูง

| Tool / ชื่อเครื่องมือ | Description / คำอธิบาย |
|------|-------------|
| `browser_wait_for_selector` | Wait for element / รอ element |
| `browser_handle_dialog` | Handle alerts / จัดการ alert |
| `browser_get_cookies` | Get cookies / ดึง cookies |
| `browser_set_cookies` | Set cookies / ตั้งค่า cookies |
| `browser_set_geolocation` | Set location / ตั้งตำแหน่ง |
| `browser_set_offline` | Set offline mode / ตั้งโหมด offline |

## Usage Examples / ตัวอย่างการใช้งาน

### Example 1: Basic Navigation / การนำทางพื้นฐาน

```javascript
// Navigate to a website / เข้าชมเว็บไซต์
browser_navigate("https://example.com")

// Take a screenshot / ถ่ายภาพหน้าจอ
browser_screenshot({ pageId: "page-abc123" })

// Get the page title / ดึงหัวข้อหน้า
browser_get_page_title({ pageId: "page-abc123" })
```

### Example 2: Form Filling / กรอกฟอร์ม

```javascript
// Navigate to login page / ไปที่หน้า login
browser_navigate("https://example.com/login")

// Fill username / กรอกชื่อผู้ใช้
browser_fill({
  pageId: "page-abc123",
  selector: "#username",
  text: "user@example.com"
})

// Fill password / กรอกรหัสผ่าน
browser_fill({
  pageId: "page-abc123",
  selector: "#password",
  text: "password123"
})

// Click login button / คลิกปุ่ม login
browser_click({
  pageId: "page-abc123",
  selector: "button[type='submit']"
})
```

### Example 3: Content Extraction / ดึงข้อมูล

```javascript
// Get all links / ดึงลิงก์ทั้งหมด
browser_get_all_links({ pageId: "page-abc123" })

// Get text from element / ดึงข้อความจาก element
browser_get_text({
  pageId: "page-abc123",
  selector: "article.main-content"
})

// Convert page to markdown / แปลงหน้าเป็น markdown
browser_get_markdown({ pageId: "page-abc123" })
```

### Example 4: JavaScript Execution / รัน JavaScript

```javascript
// Execute custom JavaScript / รัน JavaScript กำหนดเอง
browser_evaluate({
  pageId: "page-abc123",
  script: "document.querySelectorAll('.item').length"
})

// Execute with arguments / รันพร้อม arguments
browser_evaluate({
  pageId: "page-abc123",
  script: "(selector) => document.querySelector(selector).textContent",
  args: ["h1"]
})
```

## Development / การพัฒนา

### Scripts / คำสั่ง

```bash
npm run build        # Compile TypeScript / คอมไพล์ TypeScript
npm run dev          # Run in dev mode / รันโหมดพัฒนา
npm start            # Run compiled server / รัน server ที่คอมไพล์แล้ว
npm run install-browsers  # Install browsers / ติดตั้ง browser
npm run typecheck    # Check types / ตรวจสอบ types
```

### Project Structure / โครงสร้างโปรเจกต์

```
mcp-browser-server/
├── src/
│   ├── index.ts          # MCP server entry point
│   ├── browser/
│   │   └── manager.ts    # Browser lifecycle management
│   └── tools/
│       ├── navigation.ts # Navigation tools
│       ├── interaction.ts # Element interaction
│       ├── content.ts    # Content extraction
│       ├── visual.ts     # Screenshots & PDF
│       ├── advanced.ts   # Advanced operations
│       └── executor.ts   # Tool execution logic
├── dist/                # Compiled output
├── package.json
├── tsconfig.json
└── README.md
```

## Troubleshooting / การแก้ปัญหา

### Browser fails to start / Browser เปิดไม่ได้

```bash
# Install Playwright browsers / ติดตั้ง Playwright browsers
npm run install-browsers

# Try running in visible mode / ลองรันแบบมองเห็นได้
# Set HEADLESS: "false" in config
```

### "Page not found" errors / ข้อผิดพลาด "ไม่พบหน้า"

Pages จะถูกปิดอัตโนมัติเมื่อ context ถูกปิด
Pages are automatically closed when their context is closed

```javascript
// List active pages / ดูหน้าที่เปิดอยู่
browser_list_pages()

// Create new page / สร้างหน้าใหม่
browser_navigate("https://example.com")
```

## Contributing / การร่วมพัฒนา

ยินดีต้อนรับ contributions! กรุณาอ่าน CONTRIBUTING.md สำหรับรายละเอียด

Contributions are welcome! Please read CONTRIBUTING.md for details

## License / ใบอนุญาต

MIT License - ดูไฟล์ [LICENSE](LICENSE) สำหรับรายละเอียด

## Credits / เครดิต

สร้างด้วย:
Built with:

- [Playwright](https://playwright.dev/) - Browser automation
- [Model Context Protocol SDK](https://github.com/modelcontextprotocol/typescript-sdk) - MCP integration
- [TypeScript](https://www.typescriptlang.org/) - Type safety

## Links / ลิงก์

- [MCP Documentation](https://modelcontextprotocol.io/)
- [Playwright Documentation](https://playwright.dev/docs/intro)
- [Claude Code](https://claude.ai/code)

## Support / การสนับสนุน

หากพบปัญหาหรือมีคำถาม สามารถ:
If you find issues or have questions:

- Open an issue on GitHub
- Check existing discussions
- Read the documentation

---

**Made with ❤️ for the MCP community**
**สร้างด้วย ❤️ สำหรับชุมชน MCP**
