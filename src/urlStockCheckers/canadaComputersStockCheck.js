const utils = require("../utils");

async function getCanadaComputersProductDetails(url) {
  var html = await utils.getHTMLPage(url);

  // product name
  var defaultValue = "none";
  var selector = ".h3.mb-0";
  const productName = await utils.scrapeProductSite(
    html,
    defaultValue,
    selector
  );

  // product price
  defaultValue = "0.00";
  selector = ".h2-big";
  var productPrice = await utils.scrapeProductSite(
    html,
    defaultValue,
    selector
  );
  productPrice = Number(productPrice.replace(/[^0-9.-]+/g, ""));

  // product availability
  defaultValue = "Currently not available.";
  selector = ".pi-prod-availability span";
  const productAvailability = await utils.scrapeProductSite(
    html,
    defaultValue,
    selector
  );

  return `Product name: ${productName}\nPrice: ${productPrice}\nAvailability: ${productAvailability}`;
}

module.exports = { getCanadaComputersProductDetails };
