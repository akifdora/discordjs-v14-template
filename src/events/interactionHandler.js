const { EmbedBuilder } = require("discord.js");

/* Event */
module.exports = {
    name: "Interaction Handler",
    eventName: "interactionCreate",
    execute(interaction) {
        const command = client.commands.get(interaction.commandName);
        if (!command) return;

        const finish = new Date();
        finish.setSeconds(finish.getSeconds() + command.data.cooldown);

        if (client.cooldowns.has(`${interaction.commandName}_${interaction.user.id}`)) {
            const finish = client.cooldowns.get(`${interaction.commandName}_${interaction.user.id}`)
            const date = new Date();
            const remaining = (new Date(finish - date).getTime() / 1000).toFixed(2);
            return interaction.reply({ embeds:
              [
              new EmbedBuilder()
              .setTitle("THIS COMMAND HAS A COOLDOWN!")
              .setDescription(`You must wait **${remaining} seconds** to use this command again!`)
              .setColor(0xff0025)
              ]});
          };

        command.executeSlash(interaction);
        if (command.data.cooldown > 0) {
            client.cooldowns.set(`${interaction.commandName}_${interaction.user.id}`, finish);
            setTimeout(() => {
              client.cooldowns.delete(`${interaction.commandName}_${interaction.user.id}`);
            }, command.data.cooldown * 1000);
          };
    }
}