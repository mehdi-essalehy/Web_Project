const etudiants = require('../model/etudiants')

const getMyEtudData = async (req, res) => {
    const user_id = req.user_id;

    const data = await etudiants.getMyEtudData(user_id);
    res.json({data: data});
}

const getOrientationName = async (req, res) => {
    const orientation_id = req.params.orientation_id;

    const data = await etudiants.getOrientationName(orientation_id);
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

const getEtudClass = async (req, res) => {
    const user_id = req.user_id;
    const classe_id = req.params.id;

    if (etudiants.studentInClass(user_id, classe_id)) {
        const data = await etudiants.getEtudClass(user_id, classe_id);
        res.json({data: data});
    } else {
        return res.sendStatus(401);
    }
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

const getEtudGrade1 = async (req, res) => {
    const user_id = req.user_id;

    const data = await etudiants.getEtudGrade1(user_id);
    res.json({data: data})
}

const getMyEtudClasses2 = async (req, res) => {
    const user_id = req.user_id;

    const data = await etudiants.getMyEtudClasses2(user_id);
    res.json({data: data});
}

const getEtudGrade2 = async (req, res) => {
    const user_id = req.user_id;

    const data = await etudiants.getEtudGrade2(user_id);
    res.json({data: data})
}

const getMyEtudClasses3 = async (req, res) => {
    const user_id = req.user_id;

    const data = await etudiants.getMyEtudClasses3(user_id);
    res.json({data: data});
}

const getEtudGrade3 = async (req, res) => {
    const user_id = req.user_id;

    const data = await etudiants.getEtudGrade3(user_id);
    res.json({data: data})
}

const getCurrentOrientation = async (req, res) => {
    const user_id = req.user_id;
    const niveau = req.params.niveau;

    const data = await etudiants.getCurrentOrientation(user_id, niveau);
    res.json({data: data});
}

const getPossibleOrientations = async (req, res) => {
    const orientation_id = req.params.orientation_id

    const data = await etudiants.getPossibleOrientations(orientation_id);
    res.json({data: data});
}

const enrollInNextOrientation = async (req, res) => {
    const user_id = req.user_id;
    const orientation_id = req.body.orientation_id;
    const niveau = req.body.niveau;

    if (niveau > 2 || niveau < 1) {
        return res.sendStatus(400)
    }

    const response = await etudiants.enrollInNextOrientation(user_id, orientation_id, niveau);
    res.json({response: response});
}

const getMyLevel = async (req, res) => {
    const user_id = req.user_id;
    
    const data = await etudiants.getMyLevel(user_id);
    res.json({data: data});
}

module.exports = {getMyEtudData, updateMyEtudData, getMyEtudClasses, getEtudClass, addComment, getMyEtudClasses1, getMyEtudClasses2, getMyEtudClasses3, getOrientationName, getEtudGrade1, getEtudGrade2, getEtudGrade3, getCurrentOrientation, getPossibleOrientations, enrollInNextOrientation, getMyLevel}