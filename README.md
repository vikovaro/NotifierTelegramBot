# Описание

Backend проект с функционалом рассылки сообщений по всем пользователям телеграм-бота.

## Используемые технологии

- **NestJS**
- **Prisma**
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

### POST `/login`

Авторизация через логин/пароль

**Тело запроса:**
```json
{
  "login": "admin",
  "password": "password"
}
```
**Тело ответа:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
}
```


### POST `/broadcast`

Рассылает сообщение всем пользователям Telegram-бота.

**Тело запроса:**

```json
{
  "message": "Ваш текст сообщения"
}
```
**Тело ответа:**
```json
{
  "status": "success",
  "message": "Broadcast completed",
  "totalUsers": 69
}
```

