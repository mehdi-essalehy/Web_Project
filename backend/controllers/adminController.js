const admins = require('../model/admins')
const bcrypt = require('bcryptjs')

const createNewStudent = async (req, res) => {
    const nom = req.body.nom;
    const prenom = req.body.prenom;
    const date_de_naissance = req.body.date_de_naissance;
    const orientation_id = req.body.orientation_id;
    const password = req.body.password;

    if (!nom || !prenom || !date_de_naissance || !orientation_id || !password) {
        return res.sendStatus(400);
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const response = await admins.createNewStudent(nom, prenom, date_de_naissance, orientation_id, hashedPassword);
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

    const response = await admins.createNewProf(nom, prenom, hashedPassword);
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

    const response = await admins.createNewAdmin(nom, hashedPassword);
    res.json({response: response});
}

const createNewClass = async (req, res) => {
    const prof_id = req.body.prof_id;
    const matiere_id = req.body.matiere_id;
    const annee = req.body.annee;

    const response = await admins.createNewClass(prof_id, matiere_id, annee);
    res.json({response: response});
}

const getAllProfs = async (req, res) => {
    const data = await admins.getAllProfs();
    res.json({data: data});
}

const getAllSubjects = async (req, res) => {
    const data = await admins.getAllSubjects();
    res.json({data: data});
}

const addStudentToClass = async (req, res) => {
    const student_id = req.body.student_id;
    const class_id = req.body.class_id

    const response = await admins.addStudentToClass(student_id, class_id);
    res.json({response: response});
}

const getAllStudents = async (req, res) => {
    const data = await admins.getAllStudents();
    res.json({data: data});
}

const getStudentCurrentOrientation = async (req, res) => {
    const student_id = req.params.student_id;
    const niveau = req.params.niveau;

    const data = await admins.getStudentCurrentOrientation(student_id, niveau);
    res.json({data: data});
}

const getClassesFromOrientation = async (req, res) => {
    const orientation_id = req.params.orientation_id;
    const student_id = req.params.student_id;

    const data = await admins.getClassesFromOrientation(orientation_id, student_id);
    res.json({data: data});
}

const getClassesFromStudent = async (req, res) => {
    const student_id = req.params.student_id;
    const niveau = req.params.niveau;

    const currentOrientation = await admins.getStudentCurrentOrientation(student_id, niveau);
    const data = await admins.getClassesFromOrientation(currentOrientation[0].ID, student_id);
    res.json({data: data});
}

const getOrienatationsTroncCommun = async (req, res) => {
    const data = await admins.getOrienatationsTroncCommun();
    res.json({data: data});
}
module.exports = {createNewStudent, createNewProf, createNewAdmin, createNewClass, getAllProfs, getAllSubjects, getAllStudents, getStudentCurrentOrientation, getClassesFromOrientation, getClassesFromStudent, addStudentToClass, getOrienatationsTroncCommun}