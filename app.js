/* Definitions */
const { Client, Collection } = require("discord.js");
const client = new Client({
    intents: 3276799
});

/* Configuration */
const settings = {
    token: "BOT_TOKEN",
    slashCommands: "", // Write global or Guild ID, if you dont use Slash Commands set undefined
}

/* Handlers */
import("./handler.js");
global.client = client;

/* Error Handler */
const express = require("express")
const app = express()
app.get("/foo", (req, res, next) => {
    const foo = JSON.parse(req.body.jsonString)
})
process.on("unhandledRejection", (reason, promise) => {})

/* Login */
client.login(settings.token)
    .then(() => console.log("[BOT] The bot has logged in!"))
    .catch(e => console.log("[BOT] An error occurred while logging into the bot:\n" + e));

/* Export */
module.exports = settings;