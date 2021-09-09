import puppeteer, { Page } from 'puppeteer-core';
import chrome from 'chrome-aws-lambda';

export async function getOptions() {
  const isDev = !process.env.AWS_REGION;
  let options;

  const chromeExecPaths = {
    win32: 'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
    linux: '/usr/bin/google-chrome-stable',
    darwin: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    aix: '',
    freebsd: '',
    openbsd: '',
    sunos: '',
    android: '',
    haiku: '',
    cygwin: '',
    netbsd: '',
  };

  const exePath = chromeExecPaths[process.platform];

  if (isDev) {
    options = {
      args: [],
      executablePath: exePath,
      headless: true,
    };
  } else {
    options = {
      args: chrome.args,
      executablePath: await chrome.executablePath,
      headless: chrome.headless,
    };
  }

  return options;
}

let pageConfig: Page | null;
async function getPage(): Promise<Page> {
  if (pageConfig) {
    return pageConfig;
  }

  const options = await getOptions();
  const browser = await puppeteer.launch(options);

  pageConfig = await browser.newPage();

  return pageConfig;
}

export async function getScreenshot(
  html: string,
  { width, height } = { width: 1200, height: 627 },
) {
  const page = await getPage();

  await page.setViewport({ width, height });
  await page.setContent(html);

  const file = await page.screenshot({ type: 'png' });

  return file;
}
