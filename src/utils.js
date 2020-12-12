const cheerio = require("cheerio");
const axios = require("axios");

async function getProductDetails(url, selectors) {
  var html = await getHTMLPage(url);

  // product name
  var productName = "Could not find product name.";
  // product price
  var productPrice = "0.00";
  // product availability
  var productAvailability = '';

  if (html === "") {
    return {
      name: productName,
      price: productPrice,
      availability: productAvailability,
    };
  }

  productName = await scrapeProductSite(
    html,
    productName,
    selectors["productName"]
  );

  productPrice = await scrapeProductSite(
    html,
    productPrice,
    selectors["productPrice"]
  );
  productPrice = Number(productPrice.replace(/[^0-9.-]+/g, ""));

  productAvailability = await scrapeProductSite(
    html,
    productAvailability,
    selectors["productAvailability"]
  );

  return {
    name: productName,
    price: productPrice,
    availability: productAvailability,
  };
}

async function getHTMLPage(url) {
  const config = {
    headers: { "Access-Control-Allow-Origin": "*" },
  };
  var resp = "";
  try {
    resp = (await axios.get(url, config)).data;
  } catch (error) {
    console.log("Got an error in getHTMLPage");
    console.log("For url: " + url);
    if (error.response) {
      /*
       * The request was made and the server responded with a
       * status code that falls out of the range of 2xx
       */
      console.log("Got error response");
      console.log(error.response.status);
      console.log();
      console.log(error.response.data);
      console.log(error.response.headers);
    } else if (error.request) {
      /*
       * The request was made but no response was received, `error.request`
       * is an instance of XMLHttpRequest in the browser and an instance
       * of http.ClientRequest in Node.js
       */
      console.log("No error response, got error request");
      console.log(error.request);
    } else {
      // Something happened in setting up the request and triggered an Error
      console.log("Something else happened");
      console.log("Error", error.message);
    }
    console.log();
  }
  return resp;
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

function getCurrentDateTime() {
  var currentdate = new Date();
  var datetime =
    currentdate.getDate() +
    "/" +
    (currentdate.getMonth() + 1) +
    "/" +
    currentdate.getFullYear() +
    " @ " +
    currentdate.getHours() +
    ":" +
    currentdate.getMinutes() +
    ":" +
    currentdate.getSeconds();

  return datetime;
}

module.exports = { getProductDetails, isNumeric, getCurrentDateTime };
