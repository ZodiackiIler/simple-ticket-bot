const {
  SlashCommandBuilder
} = require('@discordjs/builders');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('botinfo')
    .setDescription('Информация бота'),
  async execute(interaction, client) {
    const embed = new client.discord.MessageEmbed()
      .setColor('ff9600')
      .setAuthor('Информация бота', client.user.avatarURL())
      .setDescription('Информация о боте.\n\nСоздатель бота Tenebrae#6433\n\n Github:https://github.com/ZodiackiIler/ticket-bot \n Discord-Support:dsc.gg/MineProject')
      .setFooter(client.config.footerText, client.user.avatarURL())
      .setTimestamp();

    await interaction.reply({
      embeds: [embed]
    });
  },
};