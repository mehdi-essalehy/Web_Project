const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const verifyJWT = require('./middleware/verifyJWT');
const PORT = 3500;

app.use(cors())
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/login', require('./routes/login'));

app.use(verifyJWT);
app.use('/professeurs', require('./routes/API/professeurs'));
app.use('/etudiants', require('./routes/API/etudiants'));
app.use('/admins', require('./routes/API/admins'));

app.all('*', (req, res) => {
    res.status(404);
    if (req.accepts('html')) {
        res.sendFile(path.join(__dirname, 'views', '404.html'));
    } else if (req.accepts('json')) {
        res.json({ "error": "404 Not Found" });
    } else {
        res.type('txt').send("404 Not Found");
    }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));