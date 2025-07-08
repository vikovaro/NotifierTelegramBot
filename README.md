# Описание

Backend проект с функционалом рассылки сообщений по всем пользователям телеграм-бота.

## Используемые технологии

- **NestJS**
- **Sequelize**
- **grammy**

### Содержимое env файла

```
DB_HOST=""
DB_PORT=""
DB_USERNAME=""
DB_PASSWORD=""
DB_NAME=""
TELEGRAM_BOT_TOKEN=""
```

## Документация

### POST `/broadcast`

Рассылает сообщение всем пользователям Telegram-бота.

**Тело запроса:**

```json
{
  "message": "Ваш текст сообщения"
}
```
**Пример ответа:**
```json
{
  "status": "success",
  "message": "Broadcast completed",
  "totalUsers": 69
}
```

