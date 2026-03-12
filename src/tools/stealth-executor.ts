/**
 * 🕵️ Stealth Mode Executor
 *
 * Execute stealth mode tools with human-like behavior
 */

import { Page } from 'playwright';
import { getRandomDelay, getStealthScripts, mergeStealthConfig, StealthConfig } from './stealth.js';

export { StealthConfig };

export class StealthExecutor {
  private config: StealthConfig;

  constructor(config?: Partial<StealthConfig>) {
    this.config = mergeStealthConfig(config);
  }

  /**
   * Update stealth configuration
   */
  configure(config: Partial<StealthConfig>, preset?: string): void {
    this.config = mergeStealthConfig(config, preset);
  }

  /**
   * Get current configuration
   */
  getConfig(): StealthConfig {
    return { ...this.config };
  }

  /**
   * Random delay
   */
  async delay(min?: number, max?: number): Promise<void> {
    const minVal = min || this.config.timing.minDelay;
    const maxVal = max || this.config.timing.maxDelay;
    const ms = getRandomDelay(minVal, maxVal);

    return new Promise(resolve => setTimeout(resolve, ms));
  }

  /**
   * Inject stealth scripts into page
   */
  async injectStealthScripts(page: Page): Promise<void> {
    const scripts = getStealthScripts(this.config);

    await page.addInitScript(scripts);

    console.log('[Stealth Mode] Anti-detection scripts injected');
  }

  /**
   * Click element like a human
   */
  async humanClick(
    page: Page,
    selector: string,
    options: {
      hoverFirst?: boolean;
      hoverDelay?: number;
      clickDelay?: number;
      randomDelay?: boolean;
    } = {}
  ): Promise<void> {
    const {
      hoverFirst = true,
      hoverDelay = 500,
      clickDelay = 200,
      randomDelay = true
    } = options;

    // Random delay before action
    if (randomDelay) {
      await this.delay();
    }

    // Hover first
    if (hoverFirst) {
      try {
        await page.hover(selector, { timeout: 5000 });
        await this.delay(hoverDelay - 200, hoverDelay + 300);
      } catch (e) {
        console.log(`[Stealth Mode] Hover failed: ${(e as Error).message}, continuing to click`);
      }
    }

    // Click
    await page.click(selector, { timeout: 5000 });

    // Delay after click
    await this.delay(clickDelay, clickDelay + 500);

    console.log(`[Stealth Mode] Human-like click on ${selector}`);
  }

  /**
   * Type text like a human
   */
  async humanType(
    page: Page,
    selector: string,
    text: string,
    options: {
      charDelay?: number;
      enableMistakes?: boolean;
      mistakeRate?: number;
      randomDelay?: boolean;
    } = {}
  ): Promise<void> {
    const {
      charDelay = this.config.typing.charDelay,
      enableMistakes = this.config.typing.enableMistakes,
      mistakeRate = this.config.typing.mistakeRate,
      randomDelay = true
    } = options;

    // Random delay before typing
    if (randomDelay) {
      await this.delay();
    }

    const chars = text.split('');

    for (let i = 0; i < chars.length; i++) {
      const char = chars[i];

      // Check if we should make a mistake
      if (enableMistakes && Math.random() < mistakeRate) {
        // Type wrong character
        const wrongChar = String.fromCharCode(char.charCodeAt(0) + 1);
        await page.type(selector, wrongChar, { delay: 0 });
        await this.delay(200, 400);

        // Backspace
        await page.keyboard.press('Backspace');
        await this.delay(100, 200);
      }

      // Type correct character
      await page.type(selector, char, { delay: 0 });

      // Random delay between characters
      if (randomDelay) {
        await this.delay(
          Math.floor(charDelay * 0.5),
          Math.floor(charDelay * 1.5)
        );
      }
    }

    console.log(`[Stealth Mode] Human-like typing on ${selector}: "${text}"`);
  }

  /**
   * Scroll page like a human
   */
  async humanScroll(
    page: Page,
    targetY: number,
    options: {
      steps?: number;
      smooth?: boolean;
      stepDelay?: number;
      randomDelay?: boolean;
    } = {}
  ): Promise<void> {
    const {
      steps = this.config.scroll.steps,
      smooth = this.config.scroll.smooth,
      stepDelay = this.config.timing.scrollDelay,
      randomDelay = true
    } = options;

    // Get current scroll position
    const currentY = await page.evaluate('window.scrollY') as number;
    const distance = targetY - currentY;
    const stepSize = Math.floor(distance / steps);

    // Scroll progressively
    for (let i = 0; i < steps; i++) {
      const newY = currentY + (stepSize * (i + 1));

      if (smooth) {
        await page.evaluate(`
          window.scrollTo({
            top: ${newY},
            behavior: 'smooth'
          });
        `);
      } else {
        await page.evaluate(`window.scrollBy(0, ${stepSize})`);
      }

      // Random delay between steps
      if (randomDelay) {
        await this.delay(
          stepDelay * 0.7,
          stepDelay * 2
        );
      } else {
        await page.waitForTimeout(stepDelay);
      }
    }

    console.log(`[Stealth Mode] Human-like scroll from ${currentY} to ${targetY}`);
  }

  /**
   * Fill form like a human
   */
  async humanFillForm(
    page: Page,
    fields: Record<string, any>,
    options: {
      fillDelay?: number;
      shuffleFields?: boolean;
      useType?: boolean;
    } = {}
  ): Promise<void> {
    const {
      fillDelay = this.config.timing.minDelay,
      shuffleFields = false,
      useType = true
    } = options;

    // Convert fields to array
    let fieldEntries = Object.entries(fields);

    // Shuffle if requested
    if (shuffleFields) {
      fieldEntries = this.shuffleArray(fieldEntries);
    }

    // Fill each field
    for (const [selector, value] of fieldEntries) {
      // Delay before filling field
      await this.delay(fillDelay * 0.5, fillDelay * 2);

      if (typeof value === 'string' && useType) {
        // Type like a human
        await this.humanType(page, selector, value);
      } else if (value && typeof value === 'object') {
        if (value.type === 'select') {
          // Handle dropdown
          await page.click(selector);
          await this.delay(500, 1000);

          if (value.option) {
            await page.click(`option[value="${value.option}"]`);
          } else if (value.label) {
            await page.click(`option:has-text("${value.label}")`);
          } else if (value.index !== undefined) {
            await page.click(`option:nth-child(${value.index + 1})`);
          }
        } else if (value.type === 'checkbox') {
          // Handle checkbox
          if (value.checked) {
            await page.check(selector);
          } else {
            await page.uncheck(selector);
          }
        } else {
          // Regular value
          await page.fill(selector, String(value));
        }
      }
    }

    console.log('[Stealth Mode] Form filled with human-like behavior');
  }

  /**
   * Read page like a human
   */
  async humanReadPage(
    page: Page,
    options: {
      readingSpeed?: number;
      scrollThreshold?: number;
      maxScrolls?: number;
      randomDelay?: boolean;
    } = {}
  ): Promise<void> {
    const {
      readingSpeed = this.config.scroll.readingSpeed,
      scrollThreshold = this.config.scroll.scrollThreshold,
      maxScrolls = 50,
      randomDelay = true
    } = options;

    const totalHeight = await page.evaluate('document.documentElement.scrollHeight') as number;
    const viewportHeight = await page.evaluate('window.innerHeight') as number;
    const scrollStep = viewportHeight * scrollThreshold;

    let currentScroll = await page.evaluate('window.scrollY') as number;
    let scrollCount = 0;

    while (currentScroll < totalHeight - viewportHeight && scrollCount < maxScrolls) {
      // Calculate reading time
      const wordsOnScreen = Math.floor(scrollStep / 10);
      const readingTime = (wordsOnScreen / readingSpeed) * 1000;

      // Wait like we're reading
      if (randomDelay) {
        await this.delay(readingTime * 0.5, readingTime * 2);
      } else {
        await page.waitForTimeout(readingTime);
      }

      // Scroll down
      currentScroll += scrollStep;
      await this.humanScroll(page, currentScroll, {
        steps: 3,
        smooth: true,
        randomDelay
      });

      scrollCount++;
    }

    console.log(`[Stealth Mode] Page read with ${scrollCount} scrolls`);
  }

  /**
   * Shuffle array
   */
  private shuffleArray<T>(array: T[]): T[] {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  }
}