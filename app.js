const Discord = require("discord.js");
const website = require("./src/websites");
const stockCheck = require("./src/stockCheck");
const utils = require("./src/utils");
require("dotenv").config();

// discord client
const client = new Discord.Client();
// acceptable price
var currentAcceptablePrice = 530;

async function checkProductStocks() {
  var productDetails = [];
  for (var i = 0; i < website.amd5600xUrls.length; ++i) {
    productDetails.push(
      await stockCheck.getProductDetails(website.amd5600xUrls[i])
    );
  }

  const productAvailableStrings = ["in stock."];
  var res = "";
  var product;
  for (product of productDetails) {
    if (
      // check if status is good
      product["status"] === "0" &&
      // only if price is under the currentAcceptablePrice
      Number(product["price"]) <= currentAcceptablePrice &&
      // only if product is available for purchase
      productAvailableStrings.includes(product["availability"].toLowerCase())
    ) {
      res += `Site: ${product["site"]}\nLink: ${product["link"]}\nProduct name: ${product["name"]}\nPrice: ${product["price"]}\nAvailability: ${product["availability"]}\n\n`;
    }
  }
  return res;
}

// constantly track websites and check for availability
client.on("ready", async () => {
  console.log(`Logged in as ${client.user.tag}!`);
  const channel = client.channels.cache.find(
    (channel) => channel.name === "datapi_bot"
  );
  // channel.send("datapi_bot has initiated and will now search the web.");
  var numTimesProductsChecked = 0;
  while (true) {
    // sleep for 2 seconds to avoid getting banned/rejected from websites
    // for crawling their pages too often
    if (numTimesProductsChecked % 10 == 0) {
      await new Promise((r) => setTimeout(r, 2000));
    }

    var notifMsg = await checkProductStocks();
    numTimesProductsChecked++;

    if (notifMsg !== "") {
      channel.send(notifMsg);
      channel.send("=================================");
      // sleep for 2 seconds to avoid discord api abuse
      await new Promise((r) => setTimeout(r, 2000));
    }
  }
});

// do things if users send a certain message
client.on("message", async (message) => {
  // if a user mentions this bot
  if (message.mentions.has(client.user.id)) {
    // send list of urls
    if (message.content.includes("list url")) {
      var listOfUrls = "";
      for (var i = 0; i < website.amd5600xUrls.length; ++i) {
        listOfUrls +=
          (i + 1).toString() + ". " + website.amd5600xUrls[i] + "\n";
      }
      (
        await message.reply("List of urls being tracked:\n" + listOfUrls)
      ).suppressEmbeds(true);
    }

    // send current price target
    if (
      message.content.includes("target price") ||
      message.content.includes("price target")
    ) {
      message.reply(
        "We post any products/links that are below CAD $" +
          currentAcceptablePrice.toString()
      );
    }

    // when user wants to set the current price target
    if (
      message.content.includes("set target price") ||
      message.content.includes("set price target")
    ) {
      // only process number after $
      newPrice = message.content
        .substring(message.content.lastIndexOf("$") + 1)
        .trim();
      if (utils.isNumeric(newPrice)) {
        currentAcceptablePrice = Number(newPrice);
        message.reply(
          "Set new target price for the session to CAD $" + newPrice.toString()
        );
      } else {
        message.reply(
          "Sorry the new price you set is not a valid number: " +
            newPrice.toString() +
            "\nexample of setting a number: 'set target price $500'"
        );
      }
    }
  }
});

client.login(process.env.BOT_TOKEN);
