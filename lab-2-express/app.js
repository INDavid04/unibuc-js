const express = require('express');
const app = express();
app.use(express.json());

/*
    Definiti o ruta de tip GET numita `/chat-log`.

    Endpoint-ul trebuie sa returneze un raspuns de tip JSON cu urmatorul format:
        {
            "data": [
                {
                    "userId": "123",
                    "message": "mesaj"
                },
                ...
            ]
        }

    Datele se vor citi din fisierul history.txt
*/

const fs = require("fs");
const path = require("path");

const historyPath = path.join(__dirname, "history.txt");

app.get("/chat-log", (request, response) => {
    const historyContent = fs.readFileSync(historyPath, 'utf-8');
    const raspuns = historyContent.split('\n')
    .filter(mesaj=> {
        return mesaj.length > 0
    })
    .map(mesaj => {
        // console.log(mesaj)
        const mesaj_impartit = mesaj.split(": ");
        const userId = mesaj_impartit[0];
        const message = mesaj_impartit[1];

        return {
            userId,
            message
        }
    });

    // console.log(raspuns);

    response.send({
        "data": 
            raspuns
    });
})

/* 
    Definiti o ruta de tip GET numita `/history` care sa accepte un segment dinamic (Ex: `/history/1986`)
    ce reprezinta un id de user.

    Raspunsul trebuie sa contina doar mesajele ce apartin user id-ului pasat sub forma:
    {
        "data": [
            {
                "userId": "123",
                "message": "mesaj"
            },
        ]
    }

*/

app.get("/history/:historyUserId", (request, response) => {
    const historyContent = fs.readFileSync(historyPath, 'utf-8');
    const raspuns = historyContent.split('\n')
    .filter(mesaj => {
        return mesaj.length > 0
    })
    .map(mesaj => {
        const mesaj_impartit = mesaj.split(": ");
        const userId = mesaj_impartit[0];
        const message = mesaj_impartit[1];

        return {
            userId,
            message
        }
    })
    .filter(mesaj => {
        return mesaj.userId === request.params.historyUserId;
    });

    response.send({
        "data": raspuns
    });
})

/*
    Definiti o ruta de tip POST denumita `/new-message`.
    
    Aceasta accepta un body de tip JSON cu urmatoarea forma:
    {
        "userId": "123",
        "message": "mesaj"
    }

    Folosind aceste date, adaugati in fisierul `history.txt` mesajul sub forma:

    `<userId>:<mesaj>\n`

    Raspunsul trebuie sa fie de forma:

    {
        "status": "ok"
    }
*/

app.post("/new-message", (request, response) => {
    const linie_noua = `${request.body.userId}:${request.body.message}\n`;
    fs.appendFileSync(historyPath, linie_noua);
    response.send({
        "status": "ok"
    });
})

module.exports = app;