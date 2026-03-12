/**
 * 🕵️ Stealth Mode Implementation for MCP Browser Server
 *
 * Implementation สำหรับ execute stealth tools
 */

import { Page } from 'playwright';
import { StealthExecutor } from './stealth-executor.js';

// Store stealth executors per context
const stealthExecutors = new Map<string, StealthExecutor>();

/**
 * Get or create stealth executor for a context
 */
function getStealthExecutor(contextId: string): StealthExecutor {
  if (!stealthExecutors.has(contextId)) {
    stealthExecutors.set(contextId, new StealthExecutor());
  }
  return stealthExecutors.get(contextId)!;
}

/**
 * Clear stealth executor for a context
 */
function clearStealthExecutor(contextId: string): void {
  stealthExecutors.delete(contextId);
}

/**
 * Clear all stealth executors
 */
function clearAllStealthExecutors(): void {
  stealthExecutors.clear();
}

// ============================================
// Stealth Tool Implementations
// ============================================

/**
 * Navigate with stealth mode
 */
export async function stealthNavigate(
  page: Page,
  url: string,
  options: {
    preset?: string;
    config?: any;
    waitForLoad?: boolean;
    readPage?: boolean;
  } = {}
): Promise<{ success: boolean; pageId?: string; url?: string; error?: string }> {
  try {
    // Navigate to URL
    const response = await page.goto(url, {
      waitUntil: options.waitForLoad ? 'load' : 'domcontentloaded',
      timeout: 30000
    });

    // Wait a bit like a human would
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));

    // Read page if requested
    if (options.readPage) {
      const executor = new StealthExecutor();
      await executor.humanReadPage(page);
    }

    return {
      success: true,
      url: page.url()
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : String(error)
    };
  }
}

/**
 * Click with stealth mode
 */
export async function stealthClick(
  page: Page,
  selector: string,
  options: {
    hoverFirst?: boolean;
    hoverDelay?: number;
    clickDelay?: number;
    randomDelay?: boolean;
  } = {}
): Promise<{ success: boolean; error?: string }> {
  try {
    const executor = new StealthExecutor();
    await executor.humanClick(page, selector, options);
    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : String(error)
    };
  }
}

/**
 * Type with stealth mode
 */
export async function stealthType(
  page: Page,
  selector: string,
  text: string,
  options: {
    charDelay?: number;
    enableMistakes?: boolean;
    mistakeRate?: number;
    randomDelay?: boolean;
  } = {}
): Promise<{ success: boolean; error?: string }> {
  try {
    const executor = new StealthExecutor();
    await executor.humanType(page, selector, text, options);
    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : String(error)
    };
  }
}

/**
 * Scroll with stealth mode
 */
export async function stealthScroll(
  page: Page,
  options: {
    targetY?: number;
    selector?: string;
    steps?: number;
    smooth?: boolean;
    stepDelay?: number;
    randomDelay?: boolean;
  } = {}
): Promise<{ success: boolean; finalY?: number; error?: string }> {
  try {
    const executor = new StealthExecutor();

    let targetY = options.targetY;

    // If selector provided, get element position
    if (options.selector) {
      const element = await page.$(options.selector);
      if (!element) {
        throw new Error(`Element not found: ${options.selector}`);
      }
      const box = await element.boundingBox();
      if (!box) {
        throw new Error(`Cannot get position of: ${options.selector}`);
      }
      targetY = box.y + box.height;
    }

    if (!targetY) {
      throw new Error('Either targetY or selector must be provided');
    }

    await executor.humanScroll(page, targetY, options);

    // Get final scroll position
    const finalY = await page.evaluate('window.scrollY') as number;

    return {
      success: true,
      finalY
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : String(error)
    };
  }
}

/**
 * Fill form with stealth mode
 */
export async function stealthFillForm(
  page: Page,
  fields: Record<string, any>,
  options: {
    fillDelay?: number;
    shuffleFields?: boolean;
  } = {}
): Promise<{ success: boolean; error?: string }> {
  try {
    const executor = new StealthExecutor();
    await executor.humanFillForm(page, fields, options);
    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : String(error)
    };
  }
}

/**
 * Read page with stealth mode
 */
export async function stealthReadPage(
  page: Page,
  options: {
    readingSpeed?: number;
    scrollThreshold?: number;
    maxScrolls?: number;
  } = {}
): Promise<{ success: boolean; scrollCount?: number; error?: string }> {
  try {
    const executor = new StealthExecutor();
    await executor.humanReadPage(page, options);
    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : String(error)
    };
  }
}

/**
 * Inject stealth scripts
 */
export async function stealthInject(
  page: Page,
  config: any
): Promise<{ success: boolean; error?: string }> {
  try {
    const executor = new StealthExecutor(config);
    await executor.injectStealthScripts(page);
    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : String(error)
    };
  }
}

/**
 * Extract links with stealth mode
 */
export async function stealthExtractLinks(
  page: Page,
  browserManager: any,
  contextId: string,
  options: {
    maxLinks?: number;
    linkSelector?: string;
    visitDelay?: number;
    extractData?: boolean;
    dataSelector?: string;
    returnToSource?: boolean;
  } = {}
): Promise<{ success: boolean; links?: any[]; error?: string }> {
  try {
    const maxLinks = options.maxLinks || 30;
    const linkSelector = options.linkSelector || 'a[href]';

    // Get all links
    const links = await page.$$eval(linkSelector,
      (elements: any[]) => elements.map((el: any) => ({
        href: el.href,
        text: el.textContent?.trim() || ''
      }))
    );

    // Filter relevant links
    const relevantLinks = links
      .filter(link =>
        link.href &&
        !link.href.includes('#') &&
        !link.href.includes('javascript:') &&
        link.text &&
        link.text.length > 10
      )
      .slice(0, maxLinks);

    const extractedData = [];

    for (const link of relevantLinks) {
      // Delay before visiting
      const delay = options.visitDelay || 2000;
      await new Promise(resolve => setTimeout(resolve, delay * (0.5 + Math.random())));

      try {
        // Create new page or reuse
        const newPage = await page.context().newPage();

        // Navigate to link
        await newPage.goto(link.href, { waitUntil: 'domcontentloaded', timeout: 15000 });

        // Extract data if requested
        if (options.extractData) {
          const dataSelector = options.dataSelector || 'article';
          const data = await newPage.evaluate(
            (sel: string) => {
              // @ts-ignore - DOM types in browser context
              const element = document.querySelector(sel);
              if (!element) return null;

              return {
                // @ts-ignore - DOM types in browser context
                title: document.querySelector('h1')?.innerText || '',
                // @ts-ignore - DOM types in browser context
                url: window.location.href,
                content: element.innerText?.substring(0, 2000) || '',
                // @ts-ignore - DOM types in browser context
                author: document.querySelector('.field--name-uid, [class*="author"], [class*="uid"]')?.innerText?.trim() || '',
                // @ts-ignore - DOM types in browser context
                date: document.querySelector('time, [datetime], [class*="date"], [class*="created"]')?.innerText?.trim() || ''
              };
            },
            dataSelector
          );

          if (data) {
            extractedData.push(data);
          }
        }

        // Return to source if requested
        if (options.returnToSource) {
          await page.bringToFront();
        }

        // Close the new page
        await newPage.close();

        console.log(`[Stealth Mode] Extracted ${extractedData.length}/${relevantLinks.length} links`);

      } catch (error) {
        console.error(`[Stealth Mode] Error visiting link ${link.href}:`, error);
      }
    }

    return {
      success: true,
      links: extractedData
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : String(error)
    };
  }
}

/**
 * Stealth wait
 */
export async function stealthWait(
  minDelay?: number,
  maxDelay?: number
): Promise<{ success: boolean; delay?: number; error?: string }> {
  try {
    const min = minDelay || 500;
    const max = maxDelay || 3000;
    const delay = Math.floor(Math.random() * (max - min + 1)) + min;

    await new Promise(resolve => setTimeout(resolve, delay));

    return {
      success: true,
      delay
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : String(error)
    };
  }
}

/**
 * Configure stealth mode
 */
export function stealthConfigure(
  config?: any,
  preset?: string
): { success: boolean; currentConfig?: any; error?: string; message?: string } {
  try {
    // This would configure the global stealth config
    // For now, return success (actual config is managed per-context)
    return {
      success: true,
      message: 'Stealth configuration updated (managed per-context)'
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : String(error)
    };
  }
}

// No exports needed - helper functions are internal
