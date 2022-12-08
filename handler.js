/* Definitions */
const { Collection } = require("discord.js");
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");
const fs = require("fs");
const settings = require("./app.js");

/* Event Loader */
try {
    fs.readdirSync("./src/events").filter(file => file.endsWith(".js")).forEach(async file => {
        const event = await require(`./src/events/${file}`);
        
        if (!event) return;
        client.on(event.eventName, event.execute);
        console.log(`[EVENT] The ${event.name} event has been successfully uploaded!`);
    });
} catch(e) {
    console.log(`[EVENT] An error appeared while loading events:\n` + e); 
};


/* Command Loader */
try {
    client.commands = new Collection();
    client.cooldowns = new Collection();

    if (settings.slashCommands) {
        const rest = new REST({ version: '10' }).setToken(settings.token);
        const slashCommands = [];
    
        fs.readdirSync("./src/commands").forEach(async dir => {
            fs.readdirSync(`./src/commands/${dir}`).filter(file => file.endsWith(".js")).forEach(async file => {
                const command = await require(`./src/commands/${dir}/${file}`)
                await client.commands.set(command.data.name, command);
                await command.data.slash.setName(command.data.name).setDescription(command.data.description)
                await slashCommands.push(command.data.slash.toJSON());
                if (command.data.contextMenu) {
                    await command.data.contextMenu.setName(command.data.name);
                    await slashCommands.push(command.data.contextMenu.toJSON());
                }
                await console.log(`[/CMDS] The command ${command.data.name} is loaded.`);
            });
        });
    
        setTimeout(() => {
            if (settings.slashCommands === "global") {
                rest.put(Routes.applicationCommands(client.user.id, settings.slashCommands),  { body: slashCommands }).then(() => console.log("[/CMDS] Slash commands were successfully installed globally."))
            } else {
                rest.put(Routes.applicationGuildCommands(client.user.id, settings.slashCommands),  { body: slashCommands }).then(() => console.log("[/CMDS] Slash commands were successfully uploaded to only one server."))
            }
        }, 5000);
    }

} catch(e) {
    console.log(`[CMDS] An error appeared while loading commands:\n` + e); 
};

/* Error Handler */
process.on('uncaughtException', err => console.log(err));