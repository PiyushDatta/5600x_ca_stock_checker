const website = require("./src/websites");
const http = require("http");
const stockCheck = require("./src/stockCheck");

// Create an instance of the http server to handle HTTP requests
let app = http.createServer(async (req, res) => {
  // Set a response type of plain text for the response
  res.writeHead(200, { "Content-Type": "text/plain" });
  var productDetails = "";
  for (var i = 0; i < website.amd5600xUrls.length; ++i) {
    productDetails +=
      (await stockCheck.getProductDetails(website.amd5600xUrls[i])) + "\n\n";
  }
  // amazonProductDetails = await stockCheck.getAmazonProductDetails(amazonLink);
  // Send back a response and end the connection
  res.end(productDetails);
});

// Start the server on port 3000
app.listen(3000, "127.0.0.1");
console.log("Node server running on port 3000");
console.log("http://localhost:3000/");
