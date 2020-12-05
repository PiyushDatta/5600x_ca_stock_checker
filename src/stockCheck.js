const utils = require("./utils");

async function getProductDetails(url) {
  switch (true) {
    // AMAZON
    case url.includes("amazon"):
      selectors = {
        productName: "#productTitle",
        productPrice: "#price_inside_buybox",
        productAvailability: "#availability .a-size-medium",
      };
      return (
        "Site: Amazon\n" +
        "Link: " +
        url +
        "\n" +
        (await utils.getProductDetails(url, selectors))
      );
    // NEWEGG
    case url.includes("newegg"):
      selectors = {
        productName: ".product-title",
        productPrice: ".product-price .price-current",
        productAvailability: ".product-inventory",
      };
      return (
        "Site: Newegg\n" +
        "Link: " +
        url +
        "\n" +
        (await utils.getProductDetails(url, selectors))
      );
    // CANADA COMPUTERS
    case url.includes("canadacomputers"):
      selectors = {
        productName: ".h3.mb-0",
        productPrice: ".h2-big",
        productAvailability: ".pi-prod-availability span",
      };
      return (
        "Site: Canada Computers\n" +
        "Link: " +
        url +
        "\n" +
        (await utils.getProductDetails(url, selectors))
      );
    default:
      return "No scraper found for: " + url;
  }
}
module.exports = { getProductDetails };
