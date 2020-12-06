const Discord = require("discord.js");
const website = require("./src/websites");
const stockCheck = require("./src/stockCheck");
require("dotenv").config();

async function checkProductStocks() {
  var productDetails = [];
  for (var i = 0; i < website.amd5600xUrls.length; ++i) {
    productDetails.push(await stockCheck.getProductDetails(website.amd5600xUrls[i]));
  }
  return productDetails[0]['site'];
}

// discord client
const client = new Discord.Client();

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});
client.on("message", async (msg) => {
  if (msg.content === "yo") {
    msg.reply("you a dummy");
  } else if (msg.content === "ping") {
    const channel = client.channels.cache.find(
      (channel) => channel.name === "datapi_bot"
    );
    channel.send(await checkProductStocks());
  }
});
client.login(process.env.BOT_TOKEN);
