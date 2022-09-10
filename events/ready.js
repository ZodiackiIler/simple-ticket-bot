module.exports = {
  name: 'ready',
  async execute(client) {
    console.log('Bot Online!')
    const oniChan = client.channels.cache.get(client.config.ticketChannel)

    function sendTicketMSG() {
      const embed = new client.discord.MessageEmbed()
        .setColor('ff0000')
        .setAuthor('Создание билета', client.user.avatarURL())
        .setDescription('Добро пожаловать в Службу поддержки билетов\n\nСуществует четыре различных типа билетов. Чтобы открыть билет,\nнажми по кнопке\n\nСлужба поддержки\nЗапрос в службу поддержки для всего, что связано с сервером\n• Сервера\n• Поддержка\n• Общее\n• Выдача призов\n• Покупки\n• Сотрудничество\n\n• Общие вопросы и темы\n\nЗлоупотребление наказывается штрафом/баном.')
        .setFooter(client.config.footerText, client.user.avatarURL())
      const row = new client.discord.MessageActionRow()
        .addComponents(
          new client.discord.MessageButton()
          .setCustomId('open-ticket')
          .setLabel('Создать билет')
          .setEmoji('🎫')
          .setStyle('PRIMARY'),
        );

      oniChan.send({
        embeds: [embed],
        components: [row]
      })
    }

    const toDelete = 10;

    async function fetchMore(channel, limit) {
      if (!channel) {
        throw new Error(`Канал создан ${typeof channel}.`);
      }
      if (limit <= 100) {
        return channel.messages.fetch({
          limit
        });
      }

      let collection = [];
      let lastId = null;
      let options = {};
      let remaining = limit;

      while (remaining > 0) {
        options.limit = remaining > 100 ? 100 : remaining;
        remaining = remaining > 100 ? remaining - 100 : 0;

        if (lastId) {
          options.before = lastId;
        }

        let messages = await channel.messages.fetch(options);

        if (!messages.last()) {
          break;
        }

        collection = collection.concat(messages);
        lastId = messages.last().id;
      }
      collection.remaining = remaining;

      return collection;
    }

    const list = await fetchMore(oniChan, toDelete);

    let i = 1;

    list.forEach(underList => {
      underList.forEach(msg => {
        i++;
        if (i < toDelete) {
          setTimeout(function () {
            msg.delete()
          }, 1 * i)
        }
      })
    })

    setTimeout(() => {
      sendTicketMSG()
    }, i);
  },
};
