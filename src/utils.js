const cheerio = require("cheerio");
const axios = require("axios");

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

  return {
    name: productName,
    price: productPrice,
    availability: productAvailability,
  };
}

async function getHTMLPage(url) {
  return (await axios.get(url)).data;
}

async function scrapeProductSite(html, defaultValue, selector) {
  // get the value from the selector
  defaultValue = cheerio(selector, html).first().text().trim();
  return defaultValue;
}

// check if string is a valid number
function isNumeric(str) {
  // we only process strings!
  if (typeof str != "string") return false;
  return (
    // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
    !isNaN(str) &&
    // ...and ensure strings of whitespace fail
    !isNaN(parseFloat(str))
  );
}

module.exports = { getProductDetails, isNumeric };
