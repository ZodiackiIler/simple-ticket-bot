const {
    SlashCommandBuilder
  } = require('@discordjs/builders');
  
  module.exports = {
    data: new SlashCommandBuilder()
      .setName('mute')
      .setDescription('замутить участника.')
      .addUserOption(option =>
        option.setName('target')
        .setDescription('мут участника')
        .setRequired(true))
      .addStringOption(option =>
        option.setName('Reason')
        .setDescription('причина для мута')
        .setRequired(false)),
    async execute(interaction, client) {
      const user = client.guilds.cache.get(interaction.guildId).members.cache.get(interaction.options.getUser('target').id);
      const executer = client.guilds.cache.get(interaction.guildId).members.cache.get(interaction.user.id);
  
      if (!executer.permissions.has(client.discord.Permissions.FLAGS.BAN_MEMBERS)) return interaction.reply({
        content: 'у вас нет разрешения на использование этой команды! (`MUTE_MEMBERS`)',
        ephemeral: true
      });
  
      if (user.roles.highest.rawPosition > executer.roles.highest.rawPosition) return interaction.reply({
        content: 'вы не можете замутить этого участника',
        ephemeral: true
      });
  
      if (!user.bannable) return interaction.reply({
        content: 'я не могу замутить этого участника.',
        ephemeral: true
      });
  
      if (interaction.options.getString('Reason')) {
        user.mute({
          reason: interaction.options.getString('Reason'),
          days: 1
        });
        interaction.reply({
          content: `**${user.user.tag}** был замутен!`
        });
      } else {
        user.mute({
          days: 1
        });
        interaction.reply({
          content: `**${user.user.tag}** был замутен!`
        });
      };
    },
  };