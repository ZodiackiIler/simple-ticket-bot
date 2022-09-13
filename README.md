# Ticket Bot

TicketBot- это билетная касса discord с кнопками, сделанными на Discord.js v13

![](https://github.com/ZodiackiIler/ticket-bot/img)

## Как установить?

Вам нужно иметь Node.JS 16+
``````bash
git clone https://github.com/ZodiackiIler/ticket-bot
cd simple-ticket-bot
npm i
``````

## Как настроить?

```json
//config.json
{
  "clientId": "id Бота",

  "language": "ru.yml", //Вы также можете изменить язык, их можно увидеть в папке lang, там же есть пример который можно настроить под себя

  "parentOpened": "id of категории при открытии билета",
  "parentTransactions": "id категории, когда билет является билетной операцией",
  "parentHosting": "id из категории, когда билет является билетом на Хостинг",
  "parentOther": "id из категории, когда билет является билетом другие",
  "parentExample": "id из категории, для вашего варианта билета",


  "roleSupport": "id поддержки роли",

  
  "logsTicket": "id канала журналов регистрации билетов",
  "ticketChannel": "id канала, по которому отправляется вставка для создания тикета",
  
  "footerText": "нижний колонтитул вкладок"
}
```

```json
//token.json
{
  "token": "токен вашего бота discord"
}
```

## Как запустить?
```bash
node deploy-commands.js # Для развертывания команд
node index.js # Чтобы запустить ticket-bot
```

## Большое спасибо людям, которые поставят ⭐!
