import
const app = express();
const port = 3000;

// Middleware: Formulardaten lesen (URL-encoded)
app.use(express.urlencoded({ extended: true }));

// Namensliste im Speicher
const names = [];

// POST /names – Name hinzufügen
app.post('/names', (req, res) => {
    const name = req.body.name;

    if (!name) {
        return res.status(400).send('Name fehlt!');
    }

    names.push(name);
    res.send(`Name "${name}" wurde hinzugefügt. Liste: ${names.join(', ')}`);
});

// GET /names – zum Anzeigen der aktuellen Liste (optional)
app.get('/names', (req, res) => {
    res.send(`Namensliste: ${names.join(', ')}`);
});

app.listen(port, () => {
    console.log(`Server läuft auf http://localhost:${port}`);
});
