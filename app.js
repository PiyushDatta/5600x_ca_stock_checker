const http = require("http");
const stock_check = require("./src/stock_check");

const amazonLink =
  // "https://www.amazon.ca/AMD-Ryzen-3700X-16-thread-processor/dp/B07SXMZLPK/";
  "https://www.amazon.ca/DANIPEW-Sepu-ltura-Cotton-Performance-T-Shirt/dp/B08166SLDF/";

// Create an instance of the http server to handle HTTP requests
let app = http.createServer(async (req, res) => {
  // Set a response type of plain text for the response
  res.writeHead(200, { "Content-Type": "text/plain" });
  amazonPrice = await stock_check.getAmazonPrice(amazonLink);
  // Send back a response and end the connection
  res.end("Here is the price: \n" + amazonPrice);
});

// Start the server on port 3000
app.listen(3000, "127.0.0.1");
console.log("Node server running on port 3000");
console.log("http://localhost:3000/");
