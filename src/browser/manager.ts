import { chromium, Browser, BrowserContext, Page, LaunchOptions } from 'playwright';

export interface PageInfo {
  pageId: string;
  contextId: string;
  url: string;
  title: string;
}

export class BrowserManager {
  private browser: Browser | null = null;
  private contexts: Map<string, BrowserContext> = new Map();
  private pages: Map<string, Page> = new Map();
  private pageToContext: Map<string, string> = new Map();
  private headless: boolean = true;

  constructor(headless: boolean = true) {
    this.headless = headless;
  }

  async getBrowser(): Promise<Browser> {
    if (!this.browser || !this.browser.isConnected()) {
      const launchOptions: LaunchOptions = {
        headless: this.headless,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
      };

      // Allow running in WSL/WSL2 with proper flags
      if (process.platform === 'linux') {
        launchOptions.args?.push(
          '--disable-dev-shm-usage',
          '--disable-accelerated-2d-canvas',
          '--no-first-run',
          '--no-zygote',
          '--single-process',
          '--disable-gpu'
        );
      }

      this.browser = await chromium.launch(launchOptions);
    }
    return this.browser;
  }

  async createContext(contextId?: string, options?: { viewport?: { width: number; height: number }, userAgent?: string }): Promise<BrowserContext & { id: string }> {
    const browser = await this.getBrowser();
    const context = await browser.newContext({
      viewport: options?.viewport || { width: 1920, height: 1080 },
      userAgent: options?.userAgent || 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      ignoreHTTPSErrors: true
    }) as BrowserContext & { id: string };

    const id = contextId || this.generateId();
    context.id = id;
    this.contexts.set(id, context);

    // Handle context close
    context.on('close', () => {
      this.contexts.delete(id);
      // Remove all pages associated with this context
      for (const [pageId, ctxId] of this.pageToContext.entries()) {
        if (ctxId === id) {
          this.pages.delete(pageId);
          this.pageToContext.delete(pageId);
        }
      }
    });

    return context;
  }

  async getPage(contextId: string, pageId?: string): Promise<Page> {
    const context = this.contexts.get(contextId);
    if (!context) {
      throw new Error(`Context not found: ${contextId}`);
    }

    if (pageId) {
      const page = this.pages.get(pageId);
      if (page && !page.isClosed()) {
        return page;
      }
      // Page was closed, remove from tracking
      this.pages.delete(pageId);
      this.pageToContext.delete(pageId);
    }

    // Create new page
    const page = await context.newPage();
    const pid = pageId || this.generateId();
    this.pages.set(pid, page);
    this.pageToContext.set(pid, contextId);

    // Handle page close
    page.on('close', () => {
      this.pages.delete(pid);
      this.pageToContext.delete(pid);
    });

    return page;
  }

  getPageById(pageId: string): Page {
    const page = this.pages.get(pageId);
    if (!page || page.isClosed()) {
      throw new Error(`Page not found or closed: ${pageId}`);
    }
    return page;
  }

  getPageId(page: Page): string | undefined {
    for (const [id, p] of this.pages.entries()) {
      if (p === page) {
        return id;
      }
    }
    return undefined;
  }

  getContextById(contextId: string): BrowserContext | undefined {
    return this.contexts.get(contextId);
  }

  async closePage(pageId: string): Promise<void> {
    const page = this.pages.get(pageId);
    if (page && !page.isClosed()) {
      await page.close();
    }
    this.pages.delete(pageId);
    this.pageToContext.delete(pageId);
  }

  async closeContext(contextId: string): Promise<void> {
    const context = this.contexts.get(contextId);
    if (context) {
      // Close all pages in this context
      for (const [pageId, ctxId] of this.pageToContext.entries()) {
        if (ctxId === contextId) {
          const page = this.pages.get(pageId);
          if (page && !page.isClosed()) {
            await page.close();
          }
          this.pages.delete(pageId);
          this.pageToContext.delete(pageId);
        }
      }
      await context.close();
      this.contexts.delete(contextId);
    }
  }

  async close(): Promise<void> {
    // Close all contexts (which will close all pages)
    for (const [id, context] of this.contexts.entries()) {
      try {
        await context.close();
      } catch (error) {
        // Context might already be closed
        console.error(`Error closing context ${id}:`, error);
      }
    }
    this.contexts.clear();
    this.pages.clear();
    this.pageToContext.clear();

    // Close browser
    if (this.browser && this.browser.isConnected()) {
      await this.browser.close();
    }
    this.browser = null;
  }

  async getPagesInfo(): Promise<PageInfo[]> {
    const info: PageInfo[] = [];
    for (const [pageId, page] of this.pages.entries()) {
      if (!page.isClosed()) {
        const contextId = this.pageToContext.get(pageId) || 'unknown';
        try {
          info.push({
            pageId,
            contextId,
            url: page.url(),
            title: await page.title()
          });
        } catch (error) {
          // Page might be in an invalid state
          info.push({
            pageId,
            contextId,
            url: 'unknown',
            title: 'unknown'
          });
        }
      }
    }
    return info;
  }

  getContextsInfo(): Array<{ contextId: string; pageCount: number }> {
    const info: Array<{ contextId: string; pageCount: number }> = [];
    for (const [contextId] of this.contexts.entries()) {
      let pageCount = 0;
      for (const ctxId of this.pageToContext.values()) {
        if (ctxId === contextId) {
          pageCount++;
        }
      }
      info.push({ contextId, pageCount });
    }
    return info;
  }

  private generateId(): string {
    return Math.random().toString(36).substring(2, 9);
  }

  isConnected(): boolean {
    return this.browser !== null && this.browser.isConnected();
  }
}
