const Puppeteer = require("../config/puppeteer");
const PanelRepository = require("../repositories/panelRepository");
const fs = require("fs");
require("dotenv").config();

class PanelService extends Puppeteer {
  constructor() {
    super();
    this.repository = new PanelRepository();
  }

  async panelsData() {
    this.validDir();

    this.repository.getPanels().then(async (res) => {
      await this.init();
      let count = 0;
      for (const data of res.data) {
        if (data.status == "A" && data.script.startsWith("https://")) {
          await this.screenShotPanel(data, count);
          count++;
        }
      }
      this.browser.close();
    });
  }

  async screenShotPanel(data, index) {
    let prefix = "https://ih.haoc.com.br";
    this.page.goto("http://paineisbi.haoc.net/get_token.php");

    await this.page.waitForNavigation();

    let token = await this.page.evaluate(() => {
      return document.getElementsByTagName("body")[0].innerText;
    });

    let splitedPath = data.script.split(prefix);

    prefix = `${prefix}/trusted/${token}`;

    let path = `${prefix}${splitedPath[1]}`;

    await this.page.goto(path);

    await this.page.waitForNavigation();

    await this.page.waitForTimeout(2000);

    let needLogin = await this.page.evaluate((sel) => {
      return document.querySelectorAll(sel).length != 0 ? true : false;
    }, '[tb-test-id="button-signin"]');

    if (!needLogin) {
      console.log(data);
      await this.page.screenshot({
        path: `${process.env.PATH_SERVERFILE}/${data.titulo}/${data.id} - ${data.ip}.png`,
        fullPage: true,
      });
      console.log(`print /${data.titulo} ${data.id} - ${data.ip}.png`);
    }
  }

  async validDir() {
    await this.repository.getDirectories().then((res) => {
      res.data.forEach((data) => {
        let path = `${process.env.PATH_SERVERFILE}/${data.titulo}`;

        if (!fs.existsSync(path)) {
          fs.mkdir(path, function (err) {
            if (err) {
              console.log(err);
            } else {
              console.log(`criado diretório ${data.titulo}`);
            }
          });
        }
      });
    });
  }
}

module.exports = PanelService;
