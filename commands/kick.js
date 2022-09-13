const {
  SlashCommandBuilder
} = require('@discordjs/builders');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('kick')
    .setDescription('Кикнуть пользователя с билета.')
    .addUserOption(option =>
      option.setName('target')
      .setDescription('выбрать пользователя')
      .setRequired(true))
    .addStringOption(option =>
        option.setName('reason')
        .setDescription('Причина для кика')
        .setRequired(false)),
  async execute(interaction, client) {
    const user = client.guilds.cache.get(interaction.guildId).members.cache.get(interaction.options.getUser('target').id);
    const executer = client.guilds.cache.get(interaction.guildId).members.cache.get(interaction.user.id);

    if (!executer.permissions.has(client.discord.Permissions.FLAGS.KICK_MEMBERS)) return interaction.reply({
      content: 'У вас нет прав для выполнения данной команды! (`KICK_MEMBERS`)',
      ephemeral: true
    });

    if (user.roles.highest.rawPosition > executer.roles.highest.rawPosition) return interaction.reply({
      content: 'ты не можешь кикнуть этого пользователя',
      ephemeral: true
    });

    if (!user.kickable) return interaction.reply({
      content: 'я не могу кикнуть этого пользователя.',
      ephemeral: true
    });

    if (interaction.options.getString('reason')) {
      user.kick(interaction.options.getString('reason'))
      interaction.reply({
        content: `**${user.user.tag}** был кикнут!`
      });
    } else {
      user.kick()
      interaction.reply({
        content: `**${user.user.tag}** был кикнут!`
      });
    };
  },
};