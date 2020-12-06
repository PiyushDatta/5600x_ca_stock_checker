const utils = require("./utils");

async function getProductDetails(url) {
  var resDict = {};
  switch (true) {
    // AMAZON
    case url.includes("amazon"):
      selectors = {
        productName: "#productTitle",
        productPrice: "#price_inside_buybox",
        productAvailability: "#availability .a-size-medium",
      };
      resDict = await utils.getProductDetails(url, selectors);
      resDict["site"] = "Amazon";
      resDict["link"] = url;
      resDict["status"] = "0";
      return resDict;
    // NEWEGG
    case url.includes("newegg"):
      selectors = {
        productName: ".product-title",
        productPrice: ".product-price .price-current",
        productAvailability: ".product-inventory",
      };
      resDict = await utils.getProductDetails(url, selectors);
      resDict["site"] = "Newegg";
      resDict["link"] = url;
      resDict["status"] = "0";
      return resDict;
    // CANADA COMPUTERS
    case url.includes("canadacomputers"):
      selectors = {
        productName: ".h3.mb-0",
        productPrice: ".h2-big",
        productAvailability: ".pi-prod-availability span",
      };
      resDict = await utils.getProductDetails(url, selectors);
      resDict["site"] = "Canada Computers";
      resDict["link"] = url;
      resDict["status"] = "0";
      return resDict;
    default:
      resDict["status"] = "1";
      return resDict;
  }
}
module.exports = { getProductDetails };
