const puppeteer = require("puppeteer");
const cheerio = require("cheerio");

async function getHTMLPage(url) {
  // browser vars
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);
  var html = await page.evaluate(() => document.body.innerHTML);
  return html;
}

async function scrapeProductSite(html, defaultValue, selector) {
  // get the value from the selector
  defaultValue = cheerio(selector, html).first().text().trim();
  return defaultValue;
}

module.exports = { getHTMLPage, scrapeProductSite };
