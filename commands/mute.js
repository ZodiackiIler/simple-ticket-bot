const {
    SlashCommandBuilder
  } = require('@discordjs/builders');
  
  module.exports = {
    data: new SlashCommandBuilder()
      .setName('mute')
      .setDescription('Выдать мут участнику.')
      .addUserOption(option =>
        option.setName('target')
        .setDescription('выбрать участника')
        .setRequired(true))
      .addStringOption(option =>
        option.setName('reason')
        .setDescription('Причина для мута')
        .setRequired(false)),
    async execute(interaction, client) {
      const user = client.guilds.cache.get(interaction.guildId).members.cache.get(interaction.options.getUser('target').id);
      const executer = client.guilds.cache.get(interaction.guildId).members.cache.get(interaction.user.id);
  
      if (!executer.permissions.has(client.discord.Permissions.FLAGS.BAN_MEMBERS)) return interaction.reply({
        content: 'У вас нет права для выполнения данной команды! (`MUTE_MEMBERS`)',
        ephemeral: true
      });
  
      if (user.roles.highest.rawPosition > executer.roles.highest.rawPosition) return interaction.reply({
        content: 'Вы не можете дать мут этому пользователю',
        ephemeral: true
      });
  
      if (!user.bannable) return interaction.reply({
        content: 'я не могу выдать мут этому пользователю',
        ephemeral: true
      });
  
      if (interaction.options.getString('reason')) {
        user.mute({
          reason: interaction.options.getString('reason'),
          days: 1
        });
        interaction.reply({
          content: `**${user.user.tag}** получил мут!`
        });
      } else {
        user.mute({
          days: 1
        });
        interaction.reply({
          content: `**${user.user.tag}** получил мут!`
        });
      };
    },
  };