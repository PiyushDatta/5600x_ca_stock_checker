const utils = require("../utils");

async function getNeweggProductDetails(url) {
  var html = await utils.getHTMLPage(url);

  // product name
  var defaultValue = "none";
  var selector = ".product-title";
  const productName = await utils.scrapeProductSite(
    html,
    defaultValue,
    selector
  );

  // product price
  defaultValue = "0.00";
  selector = ".product-price .price-current";
  var productPrice = await utils.scrapeProductSite(
    html,
    defaultValue,
    selector
  );
  productPrice = Number(productPrice.replace(/[^0-9.-]+/g, ""));

  // product availability
  defaultValue = "Currently not available.";
  selector = ".product-inventory";
  const productAvailability = await utils.scrapeProductSite(
    html,
    defaultValue,
    selector
  );

  return `Product name: ${productName}\nPrice: ${productPrice}\nAvailability: ${productAvailability}`;
}

module.exports = { getNeweggProductDetails };
