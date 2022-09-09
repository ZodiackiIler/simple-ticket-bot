const {
  SlashCommandBuilder
} = require('@discordjs/builders');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('ban')
    .setDescription('Запрет одного человека.')
    .addUserOption(option =>
      option.setName('target')
      .setDescription('Блокировка членов')
      .setRequired(true))
    .addStringOption(option =>
      option.setName('Reason')
      .setDescription('Причина бана')
      .setRequired(false)),
  async execute(interaction, client) {
    const user = client.guilds.cache.get(interaction.guildId).members.cache.get(interaction.options.getUser('target').id);
    const executer = client.guilds.cache.get(interaction.guildId).members.cache.get(interaction.user.id);

    if (!executer.permissions.has(client.discord.Permissions.FLAGS.BAN_MEMBERS)) return interaction.reply({
      content: 'у вас нет разрешения на эту команду! (`BAN_MEMBERS`)',
      ephemeral: true
    });

    if (user.roles.highest.rawPosition > executer.roles.highest.rawPosition) return interaction.reply({
      content: 'Вы не можете запретить этому участнику',
      ephemeral: true
    });

    if (!user.bannable) return interaction.reply({
      content: 'Вы не можете запретить этому участнику.',
      ephemeral: true
    });

    if (interaction.options.getString('Reason')) {
      user.ban({
        reason: interaction.options.getString('Reason'),
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
        content: `**${user.user.tag}** был забанен!`
      });
    };
  },
};