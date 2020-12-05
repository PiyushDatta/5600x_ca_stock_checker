const amazonStockCheck = require("./urlStockCheckers/amazonStockCheck");
const neweggStockCheck = require("./urlStockCheckers/neweggStockCheck");
const canadaComputersStockCheck = require("./urlStockCheckers/canadaComputersStockCheck");

async function getProductDetails(url) {
  switch (true) {
    case url.includes("amazon"):
      return (
        "Site: Amazon\n" +
        "Link: " +
        url +
        "\n" +
        (await amazonStockCheck.getAmazonProductDetails(url))
      );
    case url.includes("newegg"):
      return (
        "Site: Newegg\n" +
        "Link: " +
        url +
        "\n" +
        (await neweggStockCheck.getNeweggProductDetails(url))
      );
    case url.includes("canadacomputers"):
      return (
        "Site: Canada Computers\n" +
        "Link: " +
        url +
        "\n" +
        (await canadaComputersStockCheck.getCanadaComputersProductDetails(url))
      );
    default:
      return "No scraper found for: " + url;
  }
}
module.exports = { getProductDetails };
