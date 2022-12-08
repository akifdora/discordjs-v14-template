/* Definitions */
const { EmbedBuilder, ContextMenuCommandBuilder, SlashCommandBuilder, ApplicationCommandType } = require("discord.js");

/* Command */
module.exports =  {
	data: {
		name: "avatar",
        aliases: ["av"],
        usage: "avatar [@user]",
		cooldown: 0,
        description: "It shows the avatar of the user you tagged!",
		slash: new SlashCommandBuilder()
			.addUserOption(option => option.setName("user").setDescription("User").setRequired(false)),
        contextMenu: new ContextMenuCommandBuilder().setType(ApplicationCommandType.User)
	},

    async executePrefix(client, message, args) {
		const user = message.mentions.users.first() || message.author;
		const avatarEmbed = new EmbedBuilder()
			.setTitle(`Avatar of a user named ${user.tag}`)
			.setImage(user.displayAvatarURL({ dynamic: true, size: 1024}))
			.setFooter({ text: `requested by ${message.author.tag}` })
        message.reply({ embeds: [avatarEmbed] });
    },

	async executeSlash(interaction) {
		const user = interaction.options.getMember("user")?.user || interaction.member.user;
		const avatarEmbed = new EmbedBuilder()
			.setTitle(`Avatar of a user named ${user.tag}`)
			.setImage(user.displayAvatarURL({ dynamic: true, size: 1024}))
			.setFooter({ text: `requested by  ${interaction.member.user.tag}` })
        interaction.reply({ embeds: [avatarEmbed] });
    }
};