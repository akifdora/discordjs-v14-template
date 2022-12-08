/* Definitions */
const { SlashCommandBuilder, AttachmentBuilder, ContextMenuCommandBuilder, ApplicationCommandType } = require("discord.js");
const { QuickDB } = require("quick.db");
const doradb = new QuickDB();
const canvafy = require("canvafy");

/* Command */
module.exports =  {
	data: {
		name: "level",
        aliases: ["lvl"],
        usage: "level [@user]",
		cooldown: 5,
        description: "It shows your level and experience score!",
		slash: new SlashCommandBuilder()
			.addUserOption(option => option.setName("user").setDescription("User").setRequired(false)),
        contextMenu: new ContextMenuCommandBuilder().setType(ApplicationCommandType.User)
	},

    async executePrefix(client, message, args) {
		const user = message.mentions.users.first() || message.author;
        const level = await doradb.get(`DoraTech_Level.${user.id}`) || 0;
        const exp = await doradb.get(`DoraTech_EXP.${user.id}`) || 0;

        let reqExp = 100;
        for (let i = 1; i <= level; i++) reqExp += 5 * (i ^ 2) + (50 * i) + 100;

        const rank = await new canvafy.Rank()
        .setAvatar(user.displayAvatarURL({ forceStatic: true, extension: "png", size: 512 }))
        .setBackground("image", "https://media.discordapp.net/attachments/1042712923618955354/1042752858879184996/angryimg.png")
        .setUsername(user.username)
        .setDiscriminator(user.discriminator)
        .setBarColor("#373b48")
        .setBarOpacity(0.7)
        .setCustomStatus("#ffffff")
        .setLevel(level)
        .setCurrentXp(exp)
        .setRequiredXp(reqExp)
        .build();

        const levelCard = new AttachmentBuilder(rank.toBuffer(), "rank.png");
        message.reply({ files: [levelCard] });
    },

	async executeSlash(interaction) {
        const user = interaction.options.getMember("user")?.user || interaction.targetUser || interaction.member.user;
        const level = await doradb.get(`DoraTech_Level.${user.id}`) || 0;
        const exp = await doradb.get(`DoraTech_EXP.${user.id}`) || 0;

        let reqExp = 100;
        for (let i = 1; i <= level; i++) reqExp += 5 * (i ^ 2) + (50 * i) + 100;

        const rank = await new canvafy.Rank()
        .setAvatar(user.displayAvatarURL({ forceStatic: true, extension: "png", size: 512 }))
        .setBackground("image", "https://media.discordapp.net/attachments/1042712923618955354/1042752858879184996/angryimg.png")
        .setUsername(user.username)
        .setDiscriminator(user.discriminator)
        .setBarColor("#373b48")
        .setBarOpacity(0.7)
        .setCustomStatus("#ffffff")
        .setLevel(level)
        .setCurrentXp(exp)
        .setRequiredXp(reqExp)
        .build();

        const levelCard = new AttachmentBuilder(rank.toBuffer(), "rank.png");

        interaction.reply({
            files: [levelCard],
            ephemeral: false
        })
    }
};
