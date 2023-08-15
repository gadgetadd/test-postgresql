# test-postgresql

Тестовий API сервер, побудований з використанням Node.js, Express, PostgreSQL.

## Встановлення

Перед початком роботи над проектом, переконайтеся, що на вашому локальному комп'ютері встановлені Docker та docker-compose. Виконайте наступні команди в терміналі, щоб перевірити їх наявність:
```
docker --version
```
```
docker-compose --version
```

Для початку роботи з проектом, склонуйте репозиторій за допомогою наступної команди:
```
git clone https://github.com/gadgetadd/test-postgresql.git
```

Після клонування, відкрийте термінал у папці проекту та виконайте наступну команду:
```
docker-compose up
```

Зачекайте завершення розгортання проекту. Успішним завершенням буде повідомлення "database system is ready to accept connections".

## Використання

Сервер обробляє наступні типи запитів:

* Отримання списку користувачів:

        Запит: GET http://localhost:3003/api/users/
        Фільтрація: Можливість відфільтрувати користувачів за полем "Role", вказавши значення ("user" або "admin"). Наприклад: GET http://localhost:3003/api/users/admin


* Додавання нового користувача:

        Запит: POST http://localhost:3003/api/users/
        Тіло запиту: Дані у форматі JSON з наступною структурою:
```
    {
        "username": "example",
        "email": "example@mail.com",
        "role": "user",
        "state": "male",
        "firstName": "Test",
        "lastName": "User"
    }
```
    Доступні варіанти:
        Role: admin або user,
        State: male або female,
        

* Редагування інформації про користувача:

        Запит: PUT http://localhost:3003/api/users/:id
        Параметри запиту: ID користувача.
        Тіло запиту: JSON з властивостями для зміни.


* Видалення користувача:

        Запит: DELETE http://localhost:3003/api/users/:id
        Параметри запиту: ID користувача, якого необхідно видалити.




