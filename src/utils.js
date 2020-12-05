const puppeteer = require("puppeteer");
const cheerio = require("cheerio");

async function getProductDetails(url, selectors) {
  var html = await getHTMLPage(url);

  // product name
  var defaultValue = "Could not find product name.";
  const productName = await scrapeProductSite(
    html,
    defaultValue,
    selectors["productName"]
  );

  // product price
  defaultValue = "0.00";
  var productPrice = await scrapeProductSite(
    html,
    defaultValue,
    selectors["productPrice"]
  );
  productPrice = Number(productPrice.replace(/[^0-9.-]+/g, ""));

  // product availability
  defaultValue = "Could not find product availability.";
  const productAvailability = await scrapeProductSite(
    html,
    defaultValue,
    selectors["productAvailability"]
  );

  return `Product name: ${productName}\nPrice: ${productPrice}\nAvailability: ${productAvailability}`;
}

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

module.exports = { getProductDetails };
