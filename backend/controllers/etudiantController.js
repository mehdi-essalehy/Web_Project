const etudiants = require('../model/etudiants')

const getMyEtudData = async (req, res) => {
    const user_id = req.user_id;

    const data = await etudiants.getMyEtudData(user_id);
    res.json({data: data});
}

const updateMyEtudData = async (req, res) => {
    const user_id = req.user_id;
    const nom = req.body.nom;
    const prenom = req.body.prenom;
    const date_de_naissance = req.body.date_de_naissance;

    const response = await etudiants.updateMyEtudData(user_id, nom, prenom, date_de_naissance);
    res.json({response: response});
}

const getMyEtudClasses = async (req, res) => {
    const user_id = req.user_id;

    const data = await etudiants.getMyEtudClasses(user_id);
    res.json({data: data});
}

const addComment = async (req, res) => {
    const user_id = req.user_id;
    const class_id = req.params.id;
    const commentaire = req.body.commentaire;

    if (etudiants.studentInClass(user_id, class_id)) {
        const response = await etudiants.addComment(user_id, class_id, commentaire);
        res.json({response: response});
    } else {
        return res.sendStatus(401);
    }
}

const getMyEtudClasses1 = async (req, res) => {
    const user_id = req.user_id;

    const data = await etudiants.getMyEtudClasses1(user_id);
    res.json({data: data});
}

const getMyEtudClasses2 = async (req, res) => {
    const user_id = req.user_id;

    const data = await etudiants.getMyEtudClasses2(user_id);
    res.json({data: data});
}

const getMyEtudClasses3 = async (req, res) => {
    const user_id = req.user_id;

    const data = await etudiants.getMyEtudClasses3(user_id);
    res.json({data: data});
}

module.exports = {getMyEtudData, updateMyEtudData, getMyEtudClasses, addComment, getMyEtudClasses1, getMyEtudClasses2, getMyEtudClasses3}