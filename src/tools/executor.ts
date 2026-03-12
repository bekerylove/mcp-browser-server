import { BrowserManager } from '../browser/manager.js';
import * as playwright from 'playwright';

interface ToolArgs {
  [key: string]: any;
}

interface ToolResult {
  success: boolean;
  [key: string]: any;
}

export class ToolExecutor {
  private dialogHandlers: Map<string, (dialog: any) => Promise<void>> = new Map();

  constructor(private browserManager: BrowserManager) {}

  async execute(toolName: string, args: ToolArgs): Promise<ToolResult> {
    try {
      switch (toolName) {
        // Navigation tools
        case 'browser_navigate':
          return await this.navigate(args);
        case 'browser_go_back':
          return await this.goBack(args);
        case 'browser_go_forward':
          return await this.goForward(args);
        case 'browser_reload':
          return await this.reload(args);

        // Interaction tools
        case 'browser_click':
          return await this.click(args);
        case 'browser_fill':
          return await this.fill(args);
        case 'browser_type':
          return await this.type(args);
        case 'browser_hover':
          return await this.hover(args);
        case 'browser_select_option':
          return await this.selectOption(args);
        case 'browser_upload_file':
          return await this.uploadFile(args);
        case 'browser_check':
          return await this.check(args);
        case 'browser_uncheck':
          return await this.uncheck(args);
        case 'browser_focus':
          return await this.focus(args);
        case 'browser_blur':
          return await this.blur(args);
        case 'browser_press_key':
          return await this.pressKey(args);

        // Content tools
        case 'browser_get_text':
          return await this.getText(args);
        case 'browser_get_html':
          return await this.getHtml(args);
        case 'browser_get_markdown':
          return await this.getMarkdown(args);
        case 'browser_get_attribute':
          return await this.getAttribute(args);
        case 'browser_evaluate':
          return await this.evaluate(args);
        case 'browser_get_inner_text':
          return await this.getInnerText(args);
        case 'browser_get_all_links':
          return await this.getAllLinks(args);
        case 'browser_get_all_images':
          return await this.getAllImages(args);
        case 'browser_get_element_count':
          return await this.getElementCount(args);
        case 'browser_get_multiple_attributes':
          return await this.getMultipleAttributes(args);
        case 'browser_get_table_data':
          return await this.getTableData(args);

        // Visual tools
        case 'browser_screenshot':
          return await this.screenshot(args);
        case 'browser_pdf':
          return await this.pdf(args);
        case 'browser_get_viewport_size':
          return await this.getViewportSize(args);
        case 'browser_set_viewport_size':
          return await this.setViewportSize(args);
        case 'browser_emulate_device':
          return await this.emulateDevice(args);
        case 'browser_get_element_bounds':
          return await this.getElementBounds(args);
        case 'browser_scroll_to':
          return await this.scrollTo(args);

        // Advanced tools
        case 'browser_wait_for_selector':
          return await this.waitForSelector(args);
        case 'browser_wait_for_navigation':
          return await this.waitForNavigation(args);
        case 'browser_wait_for_timeout':
          return await this.waitForTimeout(args);
        case 'browser_handle_dialog':
          return await this.handleDialog(args);
        case 'browser_set_content':
          return await this.setContent(args);
        case 'browser_add_script_tag':
          return await this.addScriptTag(args);
        case 'browser_add_style_tag':
          return await this.addStyleTag(args);
        case 'browser_get_cookies':
          return await this.getCookies(args);
        case 'browser_set_cookies':
          return await this.setCookies(args);
        case 'browser_get_page_url':
          return await this.getPageUrl(args);
        case 'browser_get_page_title':
          return await this.getPageTitle(args);
        case 'browser_close_page':
          return await this.closePage(args);
        case 'browser_close_context':
          return await this.closeContext(args);
        case 'browser_list_pages':
          return await this.listPages(args);
        case 'browser_list_contexts':
          return await this.listContexts(args);
        case 'browser_create_new_page':
          return await this.createNewPage(args);
        case 'browser_switch_to_page':
          return await this.switchToPage(args);
        case 'browser_wait_for_function':
          return await this.waitForFunction(args);
        case 'browser_intercept_request':
          return await this.interceptRequest(args);
        case 'browser_get_performance_metrics':
          return await this.getPerformanceMetrics(args);
        case 'browser_set_geolocation':
          return await this.setGeolocation(args);
        case 'browser_set_offline':
          return await this.setOffline(args);
        case 'browser_play_audio':
          return await this.playAudio(args);

        default:
          return {
            success: false,
            error: `Unknown tool: ${toolName}`
          };
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : String(error)
      };
    }
  }

  // Navigation methods
  private async navigate(args: ToolArgs): Promise<ToolResult> {
    const { url, contextId, waitUntil = 'load', timeout = 30000 } = args;
    const context = await this.browserManager.createContext(contextId);
    const page = await this.browserManager.getPage((context as any).id || contextId);

    await page.goto(url, { waitUntil: waitUntil as any, timeout });

    return {
      success: true,
      pageId: this.browserManager.getPageId(page),
      contextId: (context as any).id || contextId || 'default',
      url: page.url(),
      title: await page.title()
    };
  }

  private async goBack(args: ToolArgs): Promise<ToolResult> {
    const { pageId, waitUntil = 'load' } = args;
    const page = this.browserManager.getPageById(pageId);

    await page.goBack({ waitUntil: waitUntil as any });

    return {
      success: true,
      url: page.url(),
      title: await page.title()
    };
  }

  private async goForward(args: ToolArgs): Promise<ToolResult> {
    const { pageId, waitUntil = 'load' } = args;
    const page = this.browserManager.getPageById(pageId);

    await page.goForward({ waitUntil: waitUntil as any });

    return {
      success: true,
      url: page.url(),
      title: await page.title()
    };
  }

  private async reload(args: ToolArgs): Promise<ToolResult> {
    const { pageId, waitUntil = 'load' } = args;
    const page = this.browserManager.getPageById(pageId);

    await page.reload({ waitUntil: waitUntil as any });

    return {
      success: true,
      url: page.url(),
      title: await page.title()
    };
  }

  // Interaction methods
  private async click(args: ToolArgs): Promise<ToolResult> {
    const { pageId, selector, waitForSelector = true, timeout = 10000, clickCount = 1, button = 'left' } = args;
    const page = this.browserManager.getPageById(pageId);

    if (waitForSelector) {
      await page.waitForSelector(selector, { timeout });
    }

    await page.click(selector, { clickCount, button: button as 'left' | 'middle' | 'right' });

    return { success: true, clicked: selector };
  }

  private async fill(args: ToolArgs): Promise<ToolResult> {
    const { pageId, selector, text, waitForSelector = true, timeout = 10000 } = args;
    const page = this.browserManager.getPageById(pageId);

    if (waitForSelector) {
      await page.waitForSelector(selector, { timeout });
    }

    await page.fill(selector, text);

    return { success: true, filled: selector, text };
  }

  private async type(args: ToolArgs): Promise<ToolResult> {
    const { pageId, selector, text, delay = 50, waitForSelector = true, timeout = 10000 } = args;
    const page = this.browserManager.getPageById(pageId);

    if (waitForSelector) {
      await page.waitForSelector(selector, { timeout });
    }

    await page.type(selector, text, { delay });

    return { success: true, typed: selector, text };
  }

  private async hover(args: ToolArgs): Promise<ToolResult> {
    const { pageId, selector, waitForSelector = true, timeout = 10000 } = args;
    const page = this.browserManager.getPageById(pageId);

    if (waitForSelector) {
      await page.waitForSelector(selector, { timeout });
    }

    await page.hover(selector);

    return { success: true, hovered: selector };
  }

  private async selectOption(args: ToolArgs): Promise<ToolResult> {
    const { pageId, selector, value, label, index, waitForSelector = true, timeout = 10000 } = args;
    const page = this.browserManager.getPageById(pageId);

    if (waitForSelector) {
      await page.waitForSelector(selector, { timeout });
    }

    const selectOptions: any = {};
    if (value !== undefined) selectOptions.value = value;
    if (label !== undefined) selectOptions.label = label;
    if (index !== undefined) selectOptions.index = index;

    await page.selectOption(selector, selectOptions);

    return { success: true, selected: selector, options: selectOptions };
  }

  private async uploadFile(args: ToolArgs): Promise<ToolResult> {
    const { pageId, selector, filePath, waitForSelector = true, timeout = 10000 } = args;
    const page = this.browserManager.getPageById(pageId);

    if (waitForSelector) {
      await page.waitForSelector(selector, { timeout });
    }

    await page.setInputFiles(selector, filePath);

    return { success: true, uploaded: selector, filePath };
  }

  private async check(args: ToolArgs): Promise<ToolResult> {
    const { pageId, selector, waitForSelector = true, timeout = 10000 } = args;
    const page = this.browserManager.getPageById(pageId);

    if (waitForSelector) {
      await page.waitForSelector(selector, { timeout });
    }

    await page.check(selector);

    return { success: true, checked: selector };
  }

  private async uncheck(args: ToolArgs): Promise<ToolResult> {
    const { pageId, selector, waitForSelector = true, timeout = 10000 } = args;
    const page = this.browserManager.getPageById(pageId);

    if (waitForSelector) {
      await page.waitForSelector(selector, { timeout });
    }

    await page.uncheck(selector);

    return { success: true, unchecked: selector };
  }

  private async focus(args: ToolArgs): Promise<ToolResult> {
    const { pageId, selector, waitForSelector = true, timeout = 10000 } = args;
    const page = this.browserManager.getPageById(pageId);

    if (waitForSelector) {
      await page.waitForSelector(selector, { timeout });
    }

    await page.focus(selector);

    return { success: true, focused: selector };
  }

  private async blur(args: ToolArgs): Promise<ToolResult> {
    const { pageId } = args;
    const page = this.browserManager.getPageById(pageId);

    const focusedElement = await page.evaluate(() => {
      // @ts-ignore - DOM types in browser context
      const el = document.activeElement;
      if (el) {
        el.blur();
        return true;
      }
      return false;
    });

    return { success: true, blurred: focusedElement };
  }

  private async pressKey(args: ToolArgs): Promise<ToolResult> {
    const { pageId, key, delay = 0 } = args;
    const page = this.browserManager.getPageById(pageId);

    await page.keyboard.press(key, { delay });

    return { success: true, pressed: key };
  }

  // Content methods
  private async getText(args: ToolArgs): Promise<ToolResult> {
    const { pageId, selector, trim = true } = args;
    const page = this.browserManager.getPageById(pageId);

    const text = selector
      ? await page.locator(selector).allTextContents()
      : await page.textContent('body');

    const result = Array.isArray(text) ? text.join('\n') : text;
    return {
      success: true,
      text: trim ? (result || '').trim() : result,
      selector: selector || 'body'
    };
  }

  private async getHtml(args: ToolArgs): Promise<ToolResult> {
    const { pageId, selector, outer = true } = args;
    const page = this.browserManager.getPageById(pageId);

    let html: string;
    if (selector) {
      const element = page.locator(selector);
      html = outer
        ? await element.evaluate((el: any) => el.outerHTML)
        : await element.evaluate((el: any) => el.innerHTML);
    } else {
      html = await page.content();
    }

    return {
      success: true,
      html,
      selector: selector || 'full page'
    };
  }

  private async getMarkdown(args: ToolArgs): Promise<ToolResult> {
    const { pageId, selector } = args;
    const page = this.browserManager.getPageById(pageId);

    const script = selector
      ? `
        (selector) => {
          const el = document.querySelector(selector);
          if (!el) return '';
          // Simple HTML to Markdown conversion
          let html = el.innerHTML;
          html = html.replace(/<h1[^>]*>(.*?)<\\/h1>/gi, '# $1\\n\\n');
          html = html.replace(/<h2[^>]*>(.*?)<\\/h2>/gi, '## $1\\n\\n');
          html = html.replace(/<h3[^>]*>(.*?)<\\/h3>/gi, '### $1\\n\\n');
          html = html.replace(/<strong[^>]*>(.*?)<\\/strong>/gi, '**$1**');
          html = html.replace(/<b[^>]*>(.*?)<\\/b>/gi, '**$1**');
          html = html.replace(/<em[^>]*>(.*?)<\\/em>/gi, '*$1*');
          html = html.replace(/<i[^>]*>(.*?)<\\/i>/gi, '*$1*');
          html = html.replace(/<a[^>]*href="([^"]*)"[^>]*>(.*?)<\\/a>/gi, '[$2]($1)');
          html = html.replace(/<img[^>]*src="([^"]*)"[^>]*alt="([^"]*)"[^>]*>/gi, '![$2]($1)');
          html = html.replace(/<img[^>]*src="([^"]*)"[^>]*>/gi, '![]($1)');
          html = html.replace(/<p[^>]*>(.*?)<\\/p>/gi, '$1\\n\\n');
          html = html.replace(/<br[^>]*>/gi, '\\n');
          html = html.replace(/<li[^>]*>(.*?)<\\/li>/gi, '- $1\\n');
          html = html.replace(/<[^>]+>/g, '');
          html = html.replace(/&nbsp;/g, ' ');
          html = html.replace(/&amp;/g, '&');
          html = html.replace(/&lt;/g, '<');
          html = html.replace(/&gt;/g, '>');
          html = html.replace(/&quot;/g, '"');
          return html.trim();
        }
      `
      : `
        () => {
          // Simple HTML to Markdown conversion for full page
          let html = document.body.innerHTML;
          html = html.replace(/<h1[^>]*>(.*?)<\\/h1>/gi, '# $1\\n\\n');
          html = html.replace(/<h2[^>]*>(.*?)<\\/h2>/gi, '## $1\\n\\n');
          html = html.replace(/<h3[^>]*>(.*?)<\\/h3>/gi, '### $1\\n\\n');
          html = html.replace(/<strong[^>]*>(.*?)<\\/strong>/gi, '**$1**');
          html = html.replace(/<b[^>]*>(.*?)<\\/b>/gi, '**$1**');
          html = html.replace(/<em[^>]*>(.*?)<\\/em>/gi, '*$1*');
          html = html.replace(/<i[^>]*>(.*?)<\\/i>/gi, '*$1*');
          html = html.replace(/<a[^>]*href="([^"]*)"[^>]*>(.*?)<\\/a>/gi, '[$2]($1)');
          html = html.replace(/<img[^>]*src="([^"]*)"[^>]*alt="([^"]*)"[^>]*>/gi, '![$2]($1)');
          html = html.replace(/<img[^>]*src="([^"]*)"[^>]*>/gi, '![]($1)');
          html = html.replace(/<p[^>]*>(.*?)<\\/p>/gi, '$1\\n\\n');
          html = html.replace(/<br[^>]*>/gi, '\\n');
          html = html.replace(/<li[^>]*>(.*?)<\\/li>/gi, '- $1\\n');
          html = html.replace(/<[^>]+>/g, '');
          html = html.replace(/&nbsp;/g, ' ');
          html = html.replace(/&amp;/g, '&');
          html = html.replace(/&lt;/g, '<');
          html = html.replace(/&gt;/g, '>');
          html = html.replace(/&quot;/g, '"');
          return html.trim();
        }
      `;

    const markdown = await page.evaluate(script);
    return {
      success: true,
      markdown,
      selector: selector || 'full page'
    };
  }

  private async getAttribute(args: ToolArgs): Promise<ToolResult> {
    const { pageId, selector, attribute, waitForSelector = true, timeout = 10000 } = args;
    const page = this.browserManager.getPageById(pageId);

    if (waitForSelector) {
      await page.waitForSelector(selector, { timeout });
    }

    const value = await page.getAttribute(selector, attribute);

    return {
      success: true,
      selector,
      attribute,
      value: value ?? null
    };
  }

  private async evaluate(args: ToolArgs): Promise<ToolResult> {
    const { pageId, script, args: evalArgs = [] } = args;
    const page = this.browserManager.getPageById(pageId);

    let result: any;
    if (evalArgs.length > 0) {
      result = await page.evaluate(`${script}(${evalArgs.map((a: any) => JSON.stringify(a)).join(',')})`);
    } else {
      result = await page.evaluate(script);
    }

    return {
      success: true,
      result
    };
  }

  private async getInnerText(args: ToolArgs): Promise<ToolResult> {
    const { pageId, selector, waitForSelector = true, timeout = 10000 } = args;
    const page = this.browserManager.getPageById(pageId);

    if (waitForSelector) {
      await page.waitForSelector(selector, { timeout });
    }

    const text = await page.innerText(selector);

    return {
      success: true,
      text,
      selector
    };
  }

  private async getAllLinks(args: ToolArgs): Promise<ToolResult> {
    const { pageId, selector = 'a', includeText = true } = args;
    const page = this.browserManager.getPageById(pageId);

    const links = await page.evaluate(
      ({ sel, incText }) => {
        // @ts-ignore - DOM types in browser context
        const elements = document.querySelectorAll(sel);
        return Array.from(elements).map((el: any) => ({
          href: el.href,
          text: incText ? el.textContent?.trim() || '' : ''
        }));
      },
      { sel: selector, incText: includeText }
    );

    return {
      success: true,
      links,
      count: links.length
    };
  }

  private async getAllImages(args: ToolArgs): Promise<ToolResult> {
    const { pageId, selector = 'img', includeAlt = true } = args;
    const page = this.browserManager.getPageById(pageId);

    const images = await page.evaluate(
      ({ sel, incAlt }) => {
        // @ts-ignore - DOM types in browser context
        const elements = document.querySelectorAll(sel);
        return Array.from(elements).map((el: any) => ({
          src: el.src,
          alt: incAlt ? el.alt || '' : ''
        }));
      },
      { sel: selector, incAlt: includeAlt }
    );

    return {
      success: true,
      images,
      count: images.length
    };
  }

  private async getElementCount(args: ToolArgs): Promise<ToolResult> {
    const { pageId, selector } = args;
    const page = this.browserManager.getPageById(pageId);

    const count = await page.locator(selector).count();

    return {
      success: true,
      selector,
      count
    };
  }

  private async getMultipleAttributes(args: ToolArgs): Promise<ToolResult> {
    const { pageId, selector, attributes, waitForSelector = true, timeout = 10000 } = args;
    const page = this.browserManager.getPageById(pageId);

    if (waitForSelector) {
      await page.waitForSelector(selector, { timeout });
    }

    const elements = await page.locator(selector).all();

    const results = await Promise.all(
      elements.map(async (element) => {
        const obj: any = {};
        for (const attr of attributes) {
          const value = await element.evaluate((el: any, a) => el.getAttribute(a), attr);
          obj[attr] = value;
        }
        return obj;
      })
    );

    return {
      success: true,
      selector,
      elements: results,
      count: results.length
    };
  }

  private async getTableData(args: ToolArgs): Promise<ToolResult> {
    const { pageId, selector = 'table', includeHeaders = true, waitForSelector = true, timeout = 10000 } = args;
    const page = this.browserManager.getPageById(pageId);

    if (waitForSelector) {
      await page.waitForSelector(selector, { timeout });
    }

    const table = await page.evaluate(
      ({ sel, incHdr }) => {
        // @ts-ignore - DOM types in browser context
        const table = document.querySelector(sel);
        if (!table) return null;

        const rows: string[][] = [];
        // @ts-ignore - DOM types in browser context
        const headerRow = table.querySelector('thead tr');

        if (incHdr && headerRow) {
          const headers = Array.from(headerRow.querySelectorAll('th, td')).map(
            // @ts-ignore - DOM types in browser context
            (cell) => cell.textContent?.trim() || ''
          );
          rows.push(headers);
        }

        // @ts-ignore - DOM types in browser context
        const bodyRows = table.querySelectorAll('tbody tr, tr');
        for (const row of bodyRows) {
          // @ts-ignore - DOM types in browser context
          if (row.closest('thead')) continue;

          const cells = Array.from(row.querySelectorAll('td, th')).map(
            // @ts-ignore - DOM types in browser context
            (cell) => cell.textContent?.trim() || ''
          );
          if (cells.length > 0) {
            rows.push(cells);
          }
        }

        return rows;
      },
      { sel: selector, incHdr: includeHeaders }
    );

    return {
      success: true,
      table,
      rows: table?.length || 0,
      cols: table?.[0]?.length || 0
    };
  }

  // Visual methods
  private async screenshot(args: ToolArgs): Promise<ToolResult> {
    const { pageId, selector, path, format = 'png', quality = 80, fullPage = false, clip } = args;
    const page = this.browserManager.getPageById(pageId);

    const options: any = {
      type: format as 'png' | 'jpeg',
      fullPage,
      ...(format === 'jpeg' && { quality })
    };

    if (path) {
      options.path = path;
    }

    if (selector) {
      const element = page.locator(selector);
      const boundingBox = await element.boundingBox();
      if (!boundingBox) {
        return { success: false, error: 'Element not found or has no bounding box' };
      }
      options.clip = boundingBox;
    } else if (clip) {
      options.clip = clip;
    }

    const screenshot = await page.screenshot(options);

    if (!path) {
      return {
        success: true,
        format,
        data: screenshot.toString('base64'),
        size: screenshot.length
      };
    }

    return { success: true, path };
  }

  private async pdf(args: ToolArgs): Promise<ToolResult> {
    const { pageId, path, format = 'A4', printBackground = true, landscape = false, margin, pageRanges } = args;
    const page = this.browserManager.getPageById(pageId);

    const options: any = {
      format: format as any,
      printBackground,
      landscape,
      ...(margin && { margin })
    };

    if (path) {
      options.path = path;
    }

    if (pageRanges) {
      options.pageRanges = pageRanges;
    }

    const pdf = await page.pdf(options);

    if (!path) {
      return {
        success: true,
        format,
        data: pdf.toString('base64'),
        size: pdf.length
      };
    }

    return { success: true, path };
  }

  private async getViewportSize(args: ToolArgs): Promise<ToolResult> {
    const { pageId } = args;
    const page = this.browserManager.getPageById(pageId);

    const viewport = page.viewportSize();

    return {
      success: true,
      viewport: {
        width: viewport?.width || 0,
        height: viewport?.height || 0
      }
    };
  }

  private async setViewportSize(args: ToolArgs): Promise<ToolResult> {
    const { pageId, width, height } = args;
    const page = this.browserManager.getPageById(pageId);

    await page.setViewportSize({ width, height });

    return {
      success: true,
      viewport: { width, height }
    };
  }

  private async emulateDevice(args: ToolArgs): Promise<ToolResult> {
    const { pageId, device } = args;
    const page = this.browserManager.getPageById(pageId);

    // Map device names to Playwright device descriptors
    const devices: Record<string, any> = {
      'iPhone 13': playwright.devices['iPhone 13'],
      'iPhone 13 Pro': playwright.devices['iPhone 13 Pro'],
      'iPhone 13 Pro Max': playwright.devices['iPhone 13 Pro Max'],
      'iPhone 12': playwright.devices['iPhone 12'],
      'iPhone 12 Pro': playwright.devices['iPhone 12 Pro'],
      'iPhone 12 Pro Max': playwright.devices['iPhone 12 Pro Max'],
      'iPhone 11': playwright.devices['iPhone 11'],
      'iPhone 11 Pro': playwright.devices['iPhone 11 Pro'],
      'iPhone 11 Pro Max': playwright.devices['iPhone 11 Pro Max'],
      'iPhone SE': playwright.devices['iPhone SE'],
      'iPad Pro': playwright.devices['iPad Pro 11'],
      'iPad': playwright.devices['iPad'],
      'iPad Mini': playwright.devices['iPad Mini'],
      'Galaxy S21': playwright.devices['Galaxy S21'],
      'Galaxy S20': playwright.devices['Galaxy S20'],
      'Pixel 5': playwright.devices['Pixel 5']
    };

    const deviceDescriptor = devices[device];
    if (deviceDescriptor) {
      // Apply device emulation to the page
      await page.setViewportSize(deviceDescriptor.viewport);
      if (deviceDescriptor.userAgent) {
        await page.setExtraHTTPHeaders({ 'User-Agent': deviceDescriptor.userAgent });
      }
      return {
        success: true,
        device,
        viewport: deviceDescriptor.viewport
      };
    }

    return {
      success: false,
      error: `Unknown device: ${device}`
    };
  }

  private async getElementBounds(args: ToolArgs): Promise<ToolResult> {
    const { pageId, selector, waitForSelector = true, timeout = 10000 } = args;
    const page = this.browserManager.getPageById(pageId);

    if (waitForSelector) {
      await page.waitForSelector(selector, { timeout });
    }

    const bounds = await page.locator(selector).boundingBox();

    return {
      success: true,
      selector,
      bounds: bounds || null
    };
  }

  private async scrollTo(args: ToolArgs): Promise<ToolResult> {
    const { pageId, selector, x, y } = args;
    const page = this.browserManager.getPageById(pageId);

    if (selector) {
      await page.locator(selector).scrollIntoViewIfNeeded();
    } else if (x !== undefined && y !== undefined) {
      await page.evaluate(
        // @ts-ignore - DOM types in browser context
        ({ xPos, yPos }) => { window.scrollTo(xPos, yPos); },
        { xPos: x, yPos: y }
      );
    }

    return { success: true };
  }

  // Advanced methods
  private async waitForSelector(args: ToolArgs): Promise<ToolResult> {
    const { pageId, selector, state = 'visible', timeout = 30000 } = args;
    const page = this.browserManager.getPageById(pageId);

    await page.waitForSelector(selector, { state: state as any, timeout });

    return {
      success: true,
      selector,
      state
    };
  }

  private async waitForNavigation(args: ToolArgs): Promise<ToolResult> {
    const { pageId, timeout = 30000, waitUntil = 'load' } = args;
    const page = this.browserManager.getPageById(pageId);

    const [response] = await Promise.all([
      page.waitForNavigation({ timeout, waitUntil: waitUntil as any }),
      // Trigger some action that causes navigation (would be done by caller)
    ]);

    return {
      success: true,
      url: page.url(),
      response: response?.url() || null
    };
  }

  private async waitForTimeout(args: ToolArgs): Promise<ToolResult> {
    const { pageId, timeout } = args;
    const page = this.browserManager.getPageById(pageId);

    await page.waitForTimeout(timeout);

    return {
      success: true,
      waited: timeout
    };
  }

  private async handleDialog(args: ToolArgs): Promise<ToolResult> {
    const { pageId, action, promptText } = args;
    const page = this.browserManager.getPageById(pageId);

    // Set up the dialog handler
    page.once('dialog', async (dialog) => {
      if (action === 'accept') {
        if (promptText !== undefined && dialog.type() === 'prompt') {
          await dialog.accept(promptText);
        } else {
          await dialog.accept();
        }
      } else {
        await dialog.dismiss();
      }
    });

    return {
      success: true,
      action,
      message: 'Dialog handler registered. The next dialog will be handled.'
    };
  }

  private async setContent(args: ToolArgs): Promise<ToolResult> {
    const { pageId, html, url = 'about:blank', waitUntil = 'load' } = args;
    const page = this.browserManager.getPageById(pageId);

    await page.setContent(html, { waitUntil: waitUntil as any });

    // Set the URL via JavaScript if specified
    if (url && url !== 'about:blank') {
      await page.evaluate((urlStr) => {
        // @ts-ignore - DOM types in browser context
        history.pushState({}, '', urlStr);
      }, url);
    }

    return {
      success: true,
      url: page.url()
    };
  }

  private async addScriptTag(args: ToolArgs): Promise<ToolResult> {
    const { pageId, url, content, type } = args;
    const page = this.browserManager.getPageById(pageId);

    const options: any = {};
    if (url) options.url = url;
    if (content) options.content = content;
    if (type) options.type = type;

    await page.addScriptTag(options);

    return {
      success: true,
      added: 'script'
    };
  }

  private async addStyleTag(args: ToolArgs): Promise<ToolResult> {
    const { pageId, url, content } = args;
    const page = this.browserManager.getPageById(pageId);

    const options: any = {};
    if (url) options.url = url;
    if (content) options.content = content;

    await page.addStyleTag(options);

    return {
      success: true,
      added: 'style'
    };
  }

  private async getCookies(args: ToolArgs): Promise<ToolResult> {
    const { contextId, urls } = args;
    const context = this.browserManager.getContextById(contextId);

    if (!context) {
      return {
        success: false,
        error: `Context not found: ${contextId}`
      };
    }

    const cookies = urls
      ? await context.cookies(urls as string[])
      : await context.cookies();

    return {
      success: true,
      cookies,
      count: cookies.length
    };
  }

  private async setCookies(args: ToolArgs): Promise<ToolResult> {
    const { contextId, cookies } = args;
    const context = this.browserManager.getContextById(contextId);

    if (!context) {
      return {
        success: false,
        error: `Context not found: ${contextId}`
      };
    }

    await context.addCookies(cookies);

    return {
      success: true,
      cookies,
      count: cookies.length
    };
  }

  private async getPageUrl(args: ToolArgs): Promise<ToolResult> {
    const { pageId } = args;
    const page = this.browserManager.getPageById(pageId);

    return {
      success: true,
      url: page.url()
    };
  }

  private async getPageTitle(args: ToolArgs): Promise<ToolResult> {
    const { pageId } = args;
    const page = this.browserManager.getPageById(pageId);

    return {
      success: true,
      title: await page.title()
    };
  }

  private async closePage(args: ToolArgs): Promise<ToolResult> {
    const { pageId } = args;
    await this.browserManager.closePage(pageId);

    return {
      success: true,
      closed: pageId
    };
  }

  private async closeContext(args: ToolArgs): Promise<ToolResult> {
    const { contextId } = args;
    await this.browserManager.closeContext(contextId);

    return {
      success: true,
      closed: contextId
    };
  }

  private async listPages(args: ToolArgs): Promise<ToolResult> {
    const pages = await this.browserManager.getPagesInfo();

    return {
      success: true,
      pages,
      count: pages.length
    };
  }

  private async listContexts(args: ToolArgs): Promise<ToolResult> {
    const contexts = this.browserManager.getContextsInfo();

    return {
      success: true,
      contexts,
      count: contexts.length
    };
  }

  private async createNewPage(args: ToolArgs): Promise<ToolResult> {
    const { contextId } = args;
    const page = await this.browserManager.getPage(contextId);

    return {
      success: true,
      pageId: this.browserManager.getPageId(page),
      contextId
    };
  }

  private async switchToPage(args: ToolArgs): Promise<ToolResult> {
    const { pageId } = args;
    const page = this.browserManager.getPageById(pageId);

    await page.bringToFront();

    return {
      success: true,
      pageId,
      url: page.url(),
      title: await page.title()
    };
  }

  private async waitForFunction(args: ToolArgs): Promise<ToolResult> {
    const { pageId, script, args: evalArgs = [], timeout = 30000 } = args;
    const page = this.browserManager.getPageById(pageId);

    let pollFn: any;
    if (evalArgs.length > 0) {
      pollFn = `(${script})(${evalArgs.map((a: any) => JSON.stringify(a)).join(',')})`;
    } else {
      pollFn = script.startsWith('function') ? `(${script})()` : `() => ${script}`;
    }

    const result = await page.waitForFunction(pollFn, { timeout });

    return {
      success: true,
      result: await result.jsonValue()
    };
  }

  private async interceptRequest(args: ToolArgs): Promise<ToolResult> {
    const { pageId, urlPattern, action, mockResponse } = args;
    const page = this.browserManager.getPageById(pageId);

    let handler: any;
    if (action === 'abort') {
      handler = (route: any) => route.abort();
    } else if (action === 'continue') {
      handler = (route: any) => route.continue();
    } else if (action === 'mock' && mockResponse) {
      handler = (route: any) =>
        route.fulfill({
          status: mockResponse.status || 200,
          headers: mockResponse.headers || {},
          body: mockResponse.body || '',
          contentType: mockResponse.contentType || 'text/plain'
        });
    } else {
      return {
        success: false,
        error: 'Invalid action or missing mock response'
      };
    }

    await page.route(urlPattern, handler);

    return {
      success: true,
      intercepted: urlPattern,
      action
    };
  }

  private async getPerformanceMetrics(args: ToolArgs): Promise<ToolResult> {
    const { pageId } = args;
    const page = this.browserManager.getPageById(pageId);

    const metrics = await page.evaluate(() => {
      // @ts-ignore - DOM performance API in browser context
      const perfData = performance.timing;
      // @ts-ignore - DOM performance API in browser context
      const navigation = performance.getEntriesByType('navigation')[0];

      return {
        domContentLoaded: perfData.domContentLoadedEventEnd - perfData.navigationStart,
        loadComplete: perfData.loadEventEnd - perfData.navigationStart,
        domInteractive: perfData.domInteractive - perfData.navigationStart,
        firstPaint: (navigation as any)?.loadTime || 0,
        // @ts-ignore - DOM performance API in browser context
        resources: performance.getEntriesByType('resource').length
      };
    });

    return {
      success: true,
      metrics
    };
  }

  private async setGeolocation(args: ToolArgs): Promise<ToolResult> {
    const { contextId, latitude, longitude, accuracy = 0 } = args;
    const context = this.browserManager.getContextById(contextId);

    if (!context) {
      return {
        success: false,
        error: `Context not found: ${contextId}`
      };
    }

    await context.setGeolocation({ latitude, longitude, accuracy });

    return {
      success: true,
      geolocation: { latitude, longitude, accuracy }
    };
  }

  private async setOffline(args: ToolArgs): Promise<ToolResult> {
    const { contextId, offline } = args;
    const context = this.browserManager.getContextById(contextId);

    if (!context) {
      return {
        success: false,
        error: `Context not found: ${contextId}`
      };
    }

    await context.setOffline(offline);

    return {
      success: true,
      offline
    };
  }

  private async playAudio(args: ToolArgs): Promise<ToolResult> {
    const { pageId, url } = args;
    const page = this.browserManager.getPageById(pageId);

    await page.evaluate(
      ({ audioUrl }) => {
        // @ts-ignore - DOM Audio API in browser context
        const audio = new Audio(audioUrl);
        audio.play();
      },
      { audioUrl: url }
    );

    return {
      success: true,
      url
    };
  }
}
