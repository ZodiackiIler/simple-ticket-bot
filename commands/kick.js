const {
  SlashCommandBuilder
} = require('@discordjs/builders');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('kick')
    .setDescription('кикнуть участника.')
    .addUserOption(option =>
      option.setName('target')
      .setDescription('кикнуть участника')
      .setRequired(true))
    .addStringOption(option =>
        option.setName('Reason')
        .setDescription('причина кика')
        .setRequired(false)),
  async execute(interaction, client) {
    const user = client.guilds.cache.get(interaction.guildId).members.cache.get(interaction.options.getUser('target').id);
    const executer = client.guilds.cache.get(interaction.guildId).members.cache.get(interaction.user.id);

    if (!executer.permissions.has(client.discord.Permissions.FLAGS.KICK_MEMBERS)) return interaction.reply({
      content: 'у вас нет разрешения на эту команду! (`KICK_MEMBERS`)',
      ephemeral: true
    });

    if (user.roles.highest.rawPosition > executer.roles.highest.rawPosition) return interaction.reply({
      content: 'ты не можешь кикнуть этого участника',
      ephemeral: true
    });

    if (!user.kickable) return interaction.reply({
      content: 'я не могу кикнуть этого члена.',
      ephemeral: true
    });

    if (interaction.options.getString('Reason')) {
      user.kick(interaction.options.getString('Reason'))
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