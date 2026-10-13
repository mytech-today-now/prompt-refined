const { test, expect } = require('@playwright/test');
const { existsSync, readFileSync, readdirSync } = require('node:fs');
const { resolve } = require('node:path');

const repositoryRoot = resolve(__dirname, '../..');
const sharedScript = readFileSync(resolve(repositoryRoot, 'js/code.js'), 'utf8');
const sharedStyles = readFileSync(resolve(repositoryRoot, 'css/style.css'), 'utf8');
const generatedReportDirectory = resolve(repositoryRoot, 'ai-prompts');
const generatedReports = existsSync(generatedReportDirectory)
  ? readdirSync(generatedReportDirectory)
    .filter((name) => name.toLowerCase().endsWith('.html'))
    .map((name) => resolve(generatedReportDirectory, name))
  : [];
const baseUrl = 'http://127.0.0.1/report.html';
const debugPrefix = '[prompt-refined:report-debug]';
const sharedStyleUrl = 'https://raw.githubusercontent.com/mytech-today-now/prompt-refined/refs/heads/main/css/style.css';
const sharedScriptUrl = 'https://raw.githubusercontent.com/mytech-today-now/prompt-refined/refs/heads/main/js/code.js';

const reportFixture = (deferScript = true) => `<!doctype html>
<html lang="en" data-report-style="basic" data-color-mode="system">
<head>
  <meta charset="utf-8">
  <title>Local report-control fixture</title>
  <script ${deferScript ? 'defer ' : ''}src="/js/code.js"></script>
</head>
<body>
  <header class="report-header">
    <h1 class="report-title">Local report-control fixture</h1>
    <fieldset class="report-preferences" data-report-preferences disabled>
      <legend>Report appearance</legend>
      <label>Report style
        <select data-report-style-control disabled>
          <option value="basic" selected>Basic</option>
          <option value="minimal">Minimal</option>
          <option value="full">Full &amp; complete style</option>
        </select>
      </label>
      <label>Color mode
        <select data-color-mode-control disabled>
          <option value="system" selected>System</option>
          <option value="light">Light</option>
          <option value="dark">Dark</option>
        </select>
      </label>
      <p class="preferences-status" data-preferences-status role="status" aria-live="polite">JavaScript has not initialized appearance controls.</p>
    </fieldset>
    <p class="issue-progress-storage-status" data-issue-progress-status role="status" aria-live="polite">JavaScript has not initialized issue progress controls.</p>
  </header>
  <main class="report-main">
    <nav class="issue-toc" aria-label="Table of contents">
      <a class="issue-toc-link" href="#issue-01"><span class="issue-toc-status" data-issue-progress-indicator="issue-01" data-progress="incomplete">Incomplete</span></a>
    </nav>
    <section class="issue-list">
      <article class="issue" id="issue-01" data-issue-kind="core" data-progress="incomplete">
        <header class="issue-header">
          <span class="issue-number">Issue 1</span>
          <h2 class="issue-title">REPORT_TEXT_SENTINEL</h2>
        </header>
        <div class="issue-actions" data-issue-actions>
          <label>Progress
            <select data-issue-progress-control disabled>
              <option value="incomplete" selected>Incomplete</option>
              <option value="in-progress">In progress</option>
              <option value="complete">Complete</option>
            </select>
          </label>
          <span class="issue-progress-state" data-issue-progress-state data-progress="incomplete">Incomplete</span>
        </div>
        <p>REPORT_BODY_SENTINEL</p>
        <pre class="implementation-prompt" data-copy-target><code>PROMPT_TEXT_SENTINEL</code></pre>
      </article>
    </section>
  </main>
</body>
</html>`;

async function installLocalFixture(page, { deferScript = true } = {}) {
  await page.route('**/*', async (route) => {
    const requestUrl = new URL(route.request().url());
    if (requestUrl.pathname === '/js/code.js') {
      await route.fulfill({ status: 200, contentType: 'text/javascript', body: sharedScript });
      return;
    }
    await route.fulfill({ status: 200, contentType: 'text/html', body: reportFixture(deferScript) });
  });
}

async function installDiagnosticCollector(page) {
  await page.addInitScript((prefix) => {
    window.__reportDebugEvents = [];
    const originalInfo = window.console.info;
    window.console.info = function captureReportDiagnostics(messagePrefix, details) {
      if (messagePrefix === prefix && details && typeof details === 'object') {
        window.__reportDebugEvents.push(details);
      }
      return originalInfo.apply(this, arguments);
    };
  }, debugPrefix);
}

async function openReport(page, query = '') {
  await page.goto(`${baseUrl}${query}`);
}

function faultInjection(feature) {
  const injections = {
    appearance: `(() => {
      const original = Document.prototype.querySelector;
      let failed = false;
      Document.prototype.querySelector = function(selector) {
        if (!failed && selector === '[data-report-preferences], .report-preferences') {
          failed = true;
          throw new TypeError('REPORT_TEXT_SENTINEL PROMPT_TEXT_SENTINEL SECRET_QUERY_VALUE');
        }
        return original.call(this, selector);
      };
    })();`,
    'issue-progress': `(() => {
      const original = Document.prototype.querySelectorAll;
      let failed = false;
      Document.prototype.querySelectorAll = function(selector) {
        if (!failed && selector === '[data-issue-progress-indicator]') {
          failed = true;
          throw new TypeError('REPORT_TEXT_SENTINEL PROMPT_TEXT_SENTINEL SECRET_QUERY_VALUE');
        }
        return original.call(this, selector);
      };
    })();`,
    'issue-copy': `(() => {
      const original = Element.prototype.prepend;
      let failed = false;
      Element.prototype.prepend = function(...nodes) {
        if (!failed && this.matches('.issue-actions') && nodes[0]?.classList?.contains('issue-copy-button')) {
          failed = true;
          throw new TypeError('REPORT_TEXT_SENTINEL PROMPT_TEXT_SENTINEL SECRET_QUERY_VALUE');
        }
        return original.apply(this, nodes);
      };
    })();`,
    'implementation-prompt-copy': `(() => {
      const original = Element.prototype.insertAdjacentElement;
      let failed = false;
      Element.prototype.insertAdjacentElement = function(position, element) {
        if (!failed && this.hasAttribute('data-copy-target') && position === 'afterend') {
          failed = true;
          throw new TypeError('REPORT_TEXT_SENTINEL PROMPT_TEXT_SENTINEL SECRET_QUERY_VALUE');
        }
        return original.call(this, position, element);
      };
    })();`
  };
  return injections[feature];
}

test('debug mode reports safe lifecycle details and initializes each report feature', async ({ page }) => {
  await installDiagnosticCollector(page);
  await page.addInitScript(() => {
    window.localStorage.setItem('prompt-refined:report-preferences:v1', 'STORAGE_SECRET_SENTINEL');
    Object.defineProperty(window.navigator, 'clipboard', {
      configurable: true,
      value: { writeText: async (text) => { window.__clipboardContents = text; } }
    });
  });
  await installLocalFixture(page);
  await openReport(page, '?debug=1&token=SECRET_QUERY_VALUE');

  await expect(page.locator('[data-report-preferences]')).toBeEnabled();
  await expect(page.locator('[data-issue-progress-control]')).toBeEnabled();
  await expect(page.locator('.issue-copy-button')).toHaveCount(1);
  await expect(page.locator('[data-copy-target] + .copy-control button')).toHaveCount(1);
  await page.locator('.issue-copy-button').click();
  await expect(page.locator('.issue-copy-status')).toContainText('copied to the clipboard');

  const events = await page.evaluate(() => window.__reportDebugEvents);
  const eventNames = events.map(({ event }) => event);
  expect(eventNames).toContain('script:executed');
  expect(eventNames).toContain('startup:initializing-immediately');
  for (const feature of ['appearance', 'issue-progress', 'issue-copy', 'implementation-prompt-copy']) {
    expect(eventNames).toContain('feature:start');
    expect(events.some((entry) => entry.event === 'feature:success' && entry.feature === feature)).toBe(true);
  }

  const appearanceStart = events.find((entry) => entry.event === 'feature:start' && entry.feature === 'appearance');
  const appearanceSuccess = events.find((entry) => entry.event === 'feature:success' && entry.feature === 'appearance');
  expect(appearanceStart.state.enabledControls).toBe(0);
  expect(appearanceSuccess.state.enabledControls).toBe(2);
  expect(events.find((entry) => entry.event === 'script:executed').readyState).toMatch(/interactive|complete/);

  const serialized = JSON.stringify(events);
  for (const forbidden of ['REPORT_TEXT_SENTINEL', 'PROMPT_TEXT_SENTINEL', 'SECRET_QUERY_VALUE', 'STORAGE_SECRET_SENTINEL', 'token=', 'report.html']) {
    expect(serialized).not.toContain(forbidden);
  }
  expect(await page.evaluate(() => window.__clipboardContents)).toContain('PROMPT_TEXT_SENTINEL');
  for (const entry of events) {
    expect(entry).not.toHaveProperty('message');
    expect(entry).not.toHaveProperty('stack');
    expect(entry).not.toHaveProperty('url');
  }
});

test('existing generated HTML documents initialize in Chromium with their exact shared asset references', async ({ page }) => {
  test.skip(generatedReports.length === 0, 'There are no existing generated HTML documents in ai-prompts/.');
  await installDiagnosticCollector(page);

  let stylesheetRequests = 0;
  let scriptRequests = 0;
  await page.route(sharedStyleUrl, async (route) => {
    stylesheetRequests += 1;
    await route.fulfill({
      status: 200,
      contentType: 'text/css',
      headers: { 'access-control-allow-origin': '*' },
      body: sharedStyles
    });
  });
  await page.route(sharedScriptUrl, async (route) => {
    scriptRequests += 1;
    await route.fulfill({
      status: 200,
      contentType: 'text/javascript',
      headers: { 'access-control-allow-origin': '*' },
      body: sharedScript
    });
  });
  await page.route('http://127.0.0.1/reports/**', async (route) => {
    const index = Number(new URL(route.request().url()).pathname.split('/').at(-1).replace('.html', ''));
    const reportFile = generatedReports[index];
    if (!Number.isInteger(index) || !reportFile) {
      await route.abort();
      return;
    }
    await route.fulfill({
      status: 200,
      contentType: 'text/html',
      body: readFileSync(reportFile, 'utf8')
    });
  });

  const contractProblems = [];
  for (const [index, reportFile] of generatedReports.entries()) {
    stylesheetRequests = 0;
    scriptRequests = 0;
    await page.goto(`http://127.0.0.1/reports/${index}.html?debug=1`);

    const staticHtml = readFileSync(reportFile, 'utf8');
    const stylesheetCount = (staticHtml.match(/<link\b[^>]*rel="stylesheet"[^>]*>/gi) || []).length;
    const scriptInHead = await page.locator(`head script[defer][src="${sharedScriptUrl}"]`).count();
    const scriptAnywhere = await page.locator(`script[defer][src="${sharedScriptUrl}"]`).count();
    if (stylesheetCount !== 1) contractProblems.push('expected exactly one stylesheet link');
    if (staticHtml.split(sharedStyleUrl).length - 1 !== 1) {
      contractProblems.push('expected exactly one permitted stylesheet URL');
    }
    if (scriptInHead !== 1) contractProblems.push('the single deferred shared script is not inside head');
    if (scriptAnywhere !== 1) contractProblems.push('expected exactly one deferred shared script');
    const initialStatusTexts = ['data-preferences-status', 'data-issue-progress-status'].map((attribute) => {
      const match = staticHtml.match(new RegExp(`<p\\b[^>]*\\b${attribute}[^>]*>([\\s\\S]*?)<\\/p>`, 'i'));
      return match ? match[1] : '';
    });
    if (initialStatusTexts.some((status) => (
      !/JavaScript has not initialized/i.test(status)
      || !/persistent message[\s\S]*shared script did not complete/i.test(status)
    ))) {
      contractProblems.push('initial control status does not explain the persistent uninitialized state');
    }

    await expect(page.locator('[data-report-preferences]')).toBeEnabled();
    await expect(page.locator('[data-report-style-control]')).toBeEnabled();
    await expect(page.locator('[data-color-mode-control]')).toBeEnabled();
    await expect(page.locator('[data-issue-progress-control]')).toHaveCount(20);
    await expect(page.locator('[data-issue-progress-control]:enabled')).toHaveCount(20);
    await expect(page.locator('.issue-copy-button')).toHaveCount(20);
    await expect(page.locator('[data-copy-target] + .copy-control button')).toHaveCount(20);
    expect(stylesheetRequests, reportFile).toBe(1);
    expect(scriptRequests, reportFile).toBe(1);

    const events = await page.evaluate(() => window.__reportDebugEvents);
    for (const feature of ['appearance', 'issue-progress', 'issue-copy', 'implementation-prompt-copy']) {
      expect(events.some((entry) => entry.event === 'feature:success' && entry.feature === feature), reportFile).toBe(true);
    }
    await expect(page.locator('[data-preferences-status]')).not.toContainText('will become available after initialization');
  }
  expect(contractProblems).toEqual([]);
});

test('debug diagnostics are fail-closed for missing, invalid, duplicate, and malformed switch values', async ({ page }) => {
  await installDiagnosticCollector(page);
  await installLocalFixture(page);

  for (const query of ['', '?debug=0', '?debug=true', '?debug=1&debug=1', '?debug=1&debug=0', '?debug=%ZZ']) {
    await openReport(page, query);
    await expect(page.locator('[data-report-preferences]')).toBeEnabled();
    expect(await page.evaluate(() => window.__reportDebugEvents)).toEqual([]);
  }
});

test('missing or throwing URL parsers disable diagnostics without interrupting controls', async ({ context }) => {
  const parserFailures = [
    () => { window.URL = undefined; },
    () => { window.URL = class { constructor() { throw new Error('URL parser failure'); } }; }
  ];
  for (const setup of parserFailures) {
    const page = await context.newPage();
    await installDiagnosticCollector(page);
    await page.addInitScript(setup);
    await installLocalFixture(page);
    await openReport(page, '?debug=1');
    await expect(page.locator('[data-report-preferences]')).toBeEnabled();
    expect(await page.evaluate(() => window.__reportDebugEvents)).toEqual([]);
    await page.close();
  }
});

test('startup waits for DOMContentLoaded when the script runs during parsing', async ({ page }) => {
  await installDiagnosticCollector(page);
  await installLocalFixture(page, { deferScript: false });
  await openReport(page, '?debug=1');

  const events = await page.evaluate(() => window.__reportDebugEvents);
  const eventNames = events.map(({ event }) => event);
  expect(eventNames).toContain('startup:waiting-dom-content-loaded');
  expect(eventNames).toContain('startup:dom-content-loaded');
  expect(eventNames.indexOf('startup:waiting-dom-content-loaded')).toBeLessThan(eventNames.indexOf('startup:dom-content-loaded'));
  await expect(page.locator('[data-report-preferences]')).toBeEnabled();
});

for (const feature of ['appearance', 'issue-progress', 'issue-copy', 'implementation-prompt-copy']) {
  test(`${feature} failure is announced, safely logged, and does not block other features`, async ({ page }) => {
    await installDiagnosticCollector(page);
    await page.addInitScript(faultInjection(feature));
    await installLocalFixture(page);
    await openReport(page, '?debug=1&token=SECRET_QUERY_VALUE');

    const events = await page.evaluate(() => window.__reportDebugEvents);
    const failure = events.find((entry) => entry.event === 'feature:failure' && entry.feature === feature);
    expect(failure).toBeTruthy();
    expect(failure.errorType).toBe('TypeError');
    expect(events.some((entry) => entry.event === 'startup:initialization-complete')).toBe(true);

    const statusSelectors = {
      appearance: '[data-preferences-status]',
      'issue-progress': '[data-issue-progress-status]',
      'issue-copy': '[data-issue-copy-initialization-status]',
      'implementation-prompt-copy': '[data-prompt-copy-initialization-status]'
    };
    await expect(page.locator(statusSelectors[feature])).toContainText('could not initialize');

    for (const unaffectedFeature of ['appearance', 'issue-progress', 'issue-copy', 'implementation-prompt-copy']) {
      if (unaffectedFeature === feature) continue;
      expect(events.some((entry) => entry.event === 'feature:success' && entry.feature === unaffectedFeature)).toBe(true);
    }

    const serialized = JSON.stringify(events);
    for (const forbidden of ['REPORT_TEXT_SENTINEL', 'PROMPT_TEXT_SENTINEL', 'SECRET_QUERY_VALUE', 'STORAGE_SECRET_SENTINEL', 'token=', 'report.html', 'stack']) {
      expect(serialized).not.toContain(forbidden);
    }
  });
}

test('missing or throwing console.info does not prevent initialization', async ({ context }) => {
  for (const setup of [
    () => { window.console.info = undefined; },
    () => { window.console.info = () => { throw new Error('console failure'); }; }
  ]) {
    const page = await context.newPage();
    await page.addInitScript(setup);
    await installLocalFixture(page);
    await openReport(page, '?debug=1');
    await expect(page.locator('[data-report-preferences]')).toBeEnabled();
    await expect(page.locator('[data-issue-progress-control]')).toBeEnabled();
    await page.close();
  }
});

test('re-evaluating the shared script does not duplicate controls or listeners', async ({ page }) => {
  await installDiagnosticCollector(page);
  await page.addInitScript(() => {
    const originalSetItem = Storage.prototype.setItem;
    window.__appearanceWriteCount = 0;
    Storage.prototype.setItem = function(key, value) {
      if (key === 'prompt-refined:report-preferences:v1') window.__appearanceWriteCount += 1;
      return originalSetItem.call(this, key, value);
    };
  });
  await installLocalFixture(page);
  await openReport(page, '?debug=1');

  await page.addScriptTag({ content: sharedScript });
  await expect(page.locator('[data-report-preferences]')).toBeEnabled();
  await expect(page.locator('[data-issue-progress-control]')).toHaveCount(1);
  await expect(page.locator('.issue-copy-button')).toHaveCount(1);
  await expect(page.locator('[data-copy-target] + .copy-control button')).toHaveCount(1);
  expect((await page.evaluate(() => window.__reportDebugEvents)).some((entry) => (
    entry.event === 'startup:duplicate-initialization-attempt'
  ))).toBe(true);

  await page.locator('[data-report-style-control]').selectOption('minimal');
  expect(await page.evaluate(() => window.__appearanceWriteCount)).toBe(1);
});
