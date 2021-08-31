const puppeteer = require("puppeteer");

class Puppeteer {
  async init() {
    try {
      this.browser = await puppeteer.launch({
        headless: true,
        // devtools: true,
        // executablePath: "/usr/bin/google-chrome",
        ignoreHTTPSErrors: true,
        args: [
          // "--start-fullscreen",
          "--no-sandbox",
          "--disable-setuid-sandbox",
          "--disable-dev-shm-usage",
          "--disable-web-security",
          "--start-maximized",
        ],
        slowMo: 20,
      });
      this.page = await this.browser.newPage();
      await this.page.setViewport({ width: 1380, height: 670 });
    } catch ({ message }) {
      throw new Error(message);
    }
  }
}
module.exports = Puppeteer;
