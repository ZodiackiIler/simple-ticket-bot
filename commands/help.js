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
        .setAuthor('Команды бота', client.user.avatarURL())
        .setDescription('Команды пользователя:\n/botinfo - развлекательная команда информации о боте\n/help - узнать команды бота\n/add - Добавить пользователя в билет\n\n\nКоманды администрации\n/kick - кикнуть пользователя из билета\n/mute - выдать мут пользователю в билетах\n/ban - выдать бан пользователю в билетах\n')
        .setFooter(client.config.footerText, client.user.avatarURL())
        .setTimestamp();
  
      await interaction.reply({
        embeds: [embed]
      });
    },
  };