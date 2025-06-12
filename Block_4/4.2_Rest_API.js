const express = require('express');
const moment = require('moment-timezone');
const fetch = require('node-fetch');

const app = express();
const port = 3000;

// Middleware
app.use(express.urlencoded({ extended: true })); // Für Formulardaten (POST)
app.use(express.json()); // Für JSON-Daten (PATCH)

// In-Memory-Daten
let names = [];
let me = {
    name: 'Max',
    age: 25,
    city: 'Zürich'
};

// 1
app.get('/now', (req, res) => {
    const tz = req.query.tz || 'UTC';
    if (!moment.tz.zone(tz)) {
        return res.status(400).send('Ungültige Zeitzone');
    }
    const time = moment().tz(tz).format();
    res.json({ timezone: tz, time });
});

// 2
app.post('/names', (req, res) => {
    const name = req.body.name;
    if (!name) return res.status(400).send('Name fehlt');
    names.push(name);
    res.send(`Name "${name}" hinzugefügt. Aktuelle Liste: ${names.join(', ')}`);
});

// 3
app.delete('/names', (req, res) => {
    const name = req.query.name;
    if (!name) return res.status(400).send('Name fehlt');
    names = names.filter(n => n !== name);
    res.sendStatus(204); // Kein Inhalt
});

// 4
app.get('/secret2', (req, res) => {
    const auth = req.headers.authorization;
    if (auth === 'Basic aGFja2VyOjEyMzQ=') {
        return res.sendStatus(200);
    } else {
        return res.sendStatus(401);
    }
});

//
// 5
app.get('/chuck', async (req, res) => {
    const name = req.query.name || 'Chuck Norris';
    try {
        const response = await fetch('https://api.chucknorris.io/jokes/random');
        const data = await response.json();
        const joke = data.value.replace(/Chuck Norris/g, name);
        res.json({ joke });
    } catch (err) {
        res.status(500).send('Fehler beim Abrufen des Witzes');
    }
});

// 6
app.patch('/me', (req, res) => {
    const updates = req.body;
    me = { ...me, ...updates };
    res.json(me);
});

// Server starten
app.listen(port, () => {
    console.log(`Server läuft auf http://localhost:${port}`);
});
