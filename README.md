<h1>Запуск Бота</h1>
Для запуска бота нужно для начала настроить переменные среды (environment variables),
как показано в .env.example

`BOT_TOKEN = "YOUR TELEGRAM BOT TOKEN"`

`BOT_SECRET = "YOUR TELEGRAM BOT SECRET PHRASE"`

Далее запускаем
<ol>
    <li><a>yarn</a> либо <a>npm i</a>
    <li>
        <ul style = "margin: 0;
            padding: 0;
            border: 0;
            margin-left: 10px;
            font-size: 100%;
            font: inherit;
            vertical-align: baseline;">
            <li><a>yarn start</a> либо <a>npm run start</a> (чтобы запустить через pm2)</li>
            <li><a>node srcindex.js</a> (обычный запуск через node)</li>
        </ul>
</ol>

<h1>Установка группы поддержки</h1>
<ol>
    <li>Добавить бота в телеграм группу поддержки</li>
    <li>Дать ему администратора</li>
    <li>Используя команду:
    <br/>
    <a>/set_this_group_as_support {BOT_SECRET}</a> установить данную группу как группу поддержки</li>
</ol>