# Ticket Bot

TicketBot- это билетная касса discord с кнопками, сделанными на Discord.js v13

![](https://github.com/ZodiackiIler/simple-ticket-bot/img)

## Как установить?

Вам нужно иметь Node.JS 16+
``````bash
git clone https://github.com/ZodiackiIler/simple-ticket-bot
cd simple-ticket-bot
npm i
``````

## Как настроить?

```json
//config.json
{
  "clientId": "ID", /*id клиента бота*/

  "parentOpened": "ID", //d Категории в который будет попадать билет, после выбора категории
  "parentApply": "ID", //Id Категории в который будет попадать билет, после выбора категории
  "parentSupport": "ID", //Id Категории в который будет попадать билет, после выбора категории
  "parentComplaint": "ID", //Id Категории в который будет попадать билет, после выбора категории
  "parentPartnership": "ID", //Id Категории в который будет попадать билет, после выбора категории
  "parentHosting": "ID", //Id Категории в который будет попадать билет, после выбора категории
  "parentExample": "ID", //Id Категории в который будет попадать билет, после выбора категории(для вас)

  "roleSupport": "ID", //ID роли поддержки
  
  "logsTicket": "ID", //Id канала в котором будет история билетов
  "ticketChannel": "ID", //Id канала в котором будет публикация билета

  "footerText": "Создан для поддержке YouServer | © 2022 " //Текст нижнего колонтитула
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
