const express = require('express');

const app = express();

app.use(express.json());

const db = {
    users: [],
};

/// User id unic
let nextUserId = 100;
function getNextUserId() {
  return nextUserId++;
}

/* Conventii pentru toate exercitiile:
 * - Raspunsurile de eroare au forma { error: String } (ex: { error: 'Email is required' }).
 * - 400 = date invalide trimise de client, 404 = user-ul cu id-ul cerut nu exista.
 * - id-ul unui user este un numar unic, generat automat la creare. Nu refolositi id-urile
 *   userilor stersi.
 */

/* E1 - Create Users
 * Definiti o ruta care sa primeasca un request de tip POST la adresa /users.
 * Ruta va primi un obiect de forma { name: String, email: String }.
 * Daca obiectul nu are ambele proprietati, se va returna status 400 si un mesaj de eroare.
 * Daca exista deja un user cu acelasi email, se va returna status 400 si un mesaj de eroare.
 * Altfel, user-ul se va adauga in array-ul users din memorie.
 * Ruta va returna status 201 si obiectul adaugat, impreuna cu id-ul generat automat.
 */

app.post("/users", (req, res) => {
    const { name, email } = req.body || {};

    if (!name || !email) {
        return res.status(400).json({ error: "Name and email are required!" });
    }

    const anotherMail = db.users.find((user) => user.email === email);

    if (anotherMail) {
        return res.status(400).json({ error: "Email is already used!" });
    } else {
        const newUser = { id: getNextUserId(), name, email };
        db.users.push(newUser);
        res.status(201).json(newUser);
    }
});

/* E2 - Update Users
 * Definiti o ruta care sa primeasca un request de tip PUT la adresa /users/:id.
 * Ruta va primi un obiect de forma { name: String, email: String }.
 * Daca obiectul nu are ambele proprietati, se va returna status 400 si un mesaj de eroare.
 * Se va cauta in array-ul users din memorie user-ul cu id-ul primit in ruta.
 * Daca user-ul nu exista, se va returna status 404 si un mesaj de eroare.
 * Daca user-ul exista, i se vor actualiza proprietatile cu valorile din obiect
 * si se va returna status 200 si obiectul actualizat.
 */

app.put("/users/:id", (req, res) => {
    const { name, email } = req.body || {};

    if (!name || !email) {
        return res.status(400).json({ error: "Name and email are required!" });
    }

    const id = Number(req.params.id);
    const user = db.users.find((user) => user.id === id);

    if (!user) {
        return res.status(404).json({ error: "User not found!" });
    }

    if (name !== undefined) user.name = name;
    if (email !== undefined) user.email = email;

    res.json(user);
});

/* E3 - List Users
 * Definiti o ruta care sa primeasca un request de tip GET la adresa /users.
 * Ruta poate accepta doua query params optionale: page si limit.
 * Daca nu sunt trimise, page si limit vor avea valorile implicite 0 si 10.
 * Daca sunt trimise, page trebuie sa fie un numar intreg >= 0, iar limit un numar intreg >= 1.
 * Altfel, se va returna status 400 si un mesaj de eroare.
 * page incepe de la 0: page=0 inseamna primii `limit` useri, page=1 urmatorii `limit` useri etc.
 * Ruta va returna status 200 si un array cu userii din pagina ceruta.
 * Daca nu exista useri in pagina ceruta, se va returna un array gol.
 */

app.get("/users/", (req, res) => {
    if (req.query.page === undefined) {
        page = 0;
    } else {
        page = Number(req.query.page);
    }

    if (req.query.limit === undefined) {
        limit = 10;
    } else {
        limit = Number(req.query.limit);
    }

    if (page < 0 || limit < 1 || isNaN(page) || isNaN(limit)) {
        return res.status(400).json({ error: "Invalid page or limit!" });
        /// Un url de forma localhost://3000/users?page=ana ar face ca page sa fie NaN
    }

    const left_edge = page * limit; /// pentru 0 si 10 avem 0
    const right_edge = left_edge + limit; /// pentru 0 si 10 avem 10
    const requestedUsers = db.users.slice(left_edge, right_edge);

    return res.json(requestedUsers);
});

/* E4 - Delete Users
 * Definiti o ruta care sa primeasca un request de tip DELETE la adresa /users/:id.
 * Ruta va cauta in array-ul users din memorie user-ul cu id-ul primit in ruta.
 * Daca user-ul nu exista, se va returna status 404 si un mesaj de eroare.
 * Daca user-ul exista, se va sterge din array si se va returna status 200.
 */

app.delete("/users/:id", (req, res) => {
    const id = Number(req.params.id);
    const index = db.users.findIndex((user) => user.id === id);

    if (index === -1) {
        return res.status(404).json({ error: "User not found!" });
    }

    const [deleted] = db.users.splice(index, 1);
    res.json(deleted);
});

module.exports = app;
