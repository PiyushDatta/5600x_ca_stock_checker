const puppeteer = require("puppeteer");
const cheerio = require("cheerio");

async function getAmazonProductDetails(url) {
  // browser vars
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);
  var html = await page.evaluate(() => document.body.innerHTML);

  // product name
  var defaultValue = "none";
  var selector = "#productTitle";
  const productName = await scrapeAmazonProductSite(
    html,
    defaultValue,
    selector
  );

  // product price
  defaultValue = "0.00";
  selector = "#price_inside_buybox";
  var productPrice = await scrapeAmazonProductSite(
    html,
    defaultValue,
    selector
  );
  productPrice = Number(productPrice.replace(/[^0-9.-]+/g, ""));

  // product availability
  defaultValue = "Currently unavailable.";
  selector = "#availability .a-size-medium";
  const productAvailability = await scrapeAmazonProductSite(
    html,
    defaultValue,
    selector
  );

  return `Product name: ${productName}\nPrice: ${productPrice}\nAvailability: ${productAvailability}`;
}

async function scrapeAmazonProductSite(html, defaultValue, selector) {
  // get the value from the selector
  cheerio(selector, html).each(function (i, item) {
    defaultValue = cheerio(this).text().trim();
  });

  return defaultValue;
}
module.exports = { getAmazonProductDetails };
