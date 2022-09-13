const {
  SlashCommandBuilder
} = require('@discordjs/builders');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('ban')
    .setDescription('дать бан пользователю')
    .addUserOption(option =>
      option.setName('target')
      .setDescription('Выбрать пользователя')
      .setRequired(true))
    .addStringOption(option =>
      option.setName('reason')
      .setDescription('Причина бана')
      .setRequired(false)),
  async execute(interaction, client) {
    const user = client.guilds.cache.get(interaction.guildId).members.cache.get(interaction.options.getUser('target').id);
    const executer = client.guilds.cache.get(interaction.guildId).members.cache.get(interaction.user.id);

    if (!executer.permissions.has(client.discord.Permissions.FLAGS.BAN_MEMBERS)) return interaction.reply({
      content: 'у вас нет прав для выполнения данной команды! (`BAN_MEMBERS`)',
      ephemeral: true
    });

    if (user.roles.highest.rawPosition > executer.roles.highest.rawPosition) return interaction.reply({
      content: 'Вы не можете дать бан этому пользователю',
      ephemeral: true
    });

    if (!user.bannable) return interaction.reply({
      content: 'Вы не можете забанить этого пользователя.',
      ephemeral: true
    });

    if (interaction.options.getString('reason')) {
      user.ban({
        reason: interaction.options.getString('reason'),
        days: 1
      });
      interaction.reply({
        content: `**${user.user.tag}** был забанен!`
      });
    } else {
      user.ban({
        days: 1
      });
      interaction.reply({
        content: `**${user.user.tag}** бал забанен!`
      });
    };
  },
};