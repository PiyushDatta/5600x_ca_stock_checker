const puppeteer = require("puppeteer");
const cheerio = require("cheerio");

async function getAmazonPrice(url) {
  // browser vars
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);
  var html = await page.evaluate(() => document.body.innerHTML);

  // specific to getting product price
  var price = "0";
  var selector = "#price_inside_buybox";

  // get the value from the selector (span id/class)
  cheerio(selector, html).each(function () {
    var dollarPrice = cheerio(this).text();
    price = Number(dollarPrice.replace(/[^0-9.-]+/g, ""));
    console.log("Price: " + price);
  });

  // if our price didn't change then our selector didn't get anything
  // nothing in amazon is $0
  if (price == "0") {
    console.log("Didn't get anything for given selector");
  }

  return price;
}

module.exports = { getAmazonPrice };
