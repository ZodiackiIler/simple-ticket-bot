const {
  SlashCommandBuilder
} = require('@discordjs/builders');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('help')
    .setDescription('Помощь'),
  async execute(interaction, client) {
    const embed = new client.discord.MessageEmbed()
      .setColor('ff9600')
      .setAuthor('Помощь', client.user.avatarURL())
      .setDescription('/help - Узнать список команд\n /botinfo - Узнать информацию о боте\n /add  Добавить игрока в тикет\n /kick - Выгнать игрока с тикета\n /mute - Запретить игроку писать в тикете на время\n /ban - заблокировать игроку доступ к тикетам\n ')
      .setFooter(client.config.footerText, client.user.avatarURL())
      .setTimestamp();

    await interaction.reply({
      embeds: [embed]
    });
  },
};