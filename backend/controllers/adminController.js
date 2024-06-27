const admins = require('../model/admins')
const bcrypt = require('bcryptjs')

const createNewStudent = async (req, res) => {
    const nom = req.body.nom;
    const prenom = req.body.prenom;
    const date_de_naissance = req.body.date_de_naissance;
    const niveau = req.body.niveau;
    const date_enregistrement = req.body.date_enregistrement;
    const password = req.body.password;

    if (!nom || !prenom || !date_de_naissance || !niveau || !date_enregistrement || !password) {
        return res.sendStatus(400);
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const response = admins.createNewStudent(nom, prenom, date_de_naissance, niveau, date_enregistrement, hashedPassword);
    res.json({response: response});

}

const createNewProf = async (req, res) => {
    const nom = req.body.nom;
    const prenom = req.body.prenom;
    const password = req.body.password;

    if (!nom || !prenom || !password) {
        return res.sendStatus(400);
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const response = admins.createNewProf(nom, prenom, hashedPassword);
    res.json({response: response});
}

const createNewAdmin = async (req, res) => {
    const nom = req.body.nom;
    const password = req.body.password;

    if (!nom || !password) {
        return res.sendStatus(400);
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const response = admins.createNewAdmin(nom, hashedPassword);
    res.json({response: response});
}

module.exports = {createNewStudent, createNewProf, createNewAdmin}