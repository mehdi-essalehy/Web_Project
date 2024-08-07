const professeurs = require('../model/professeurs')

const getMyProfData = async (req, res) => {
    const user_id = req.user_id;

    const data = await professeurs.getMyProfData(user_id);
    res.json({data: data});
}

const updateMyProfData = async (req, res) => {
    const user_id = req.user_id;
    const nom = req.body.nom;
    const prenom = req.body.prenom;

    const response = await professeurs.updateMyProfData(user_id, nom, prenom);
    res.json({response: response});
}

const getMyProfClasses = async (req, res) => {
    const user_id = req.user_id;

    const data = await professeurs.getMyProfClasses(user_id);
    res.json({data: data});
}

const getStudentsFromClass = async (req, res) => {
    const user_id = req.user_id;
    const class_id = req.params.id;

    const class_prof = await professeurs.getProfFromClass(class_id);
    if (class_prof === user_id) {
        const data = await professeurs.getStudentsFromClass(class_id);
        res.json({data: data});
    } else {
        return res.sendStatus(401);
    }
}

const getStudentFromClass = async (req, res) => {
    const user_id = req.user_id;
    const class_id = req.params.class_id
    const student_id = req.params.student_id

    const class_prof = await professeurs.getProfFromClass(class_id);
    if (class_prof === user_id) {
        if (professeurs.studentInClass(student_id, class_id)) {
            const data = await professeurs.getStudentFromClass(student_id, class_id);
            res.json({data: data})
        } else {
            return res.sendStatus(401);
        }
    } else {
        return res.sendStatus(401);
    }
}

const setGrade = async (req, res) => {
    const user_id = req.user_id;
    const class_id = req.params.id;
    const etudiant_id = req.body.etudiant_id;
    const note = req.body.note;
    const remarque = req.body.remarque;

    if (!note || note > 20 || note < 0) {
        return res.sendStatus(400);
    }

    const class_prof = await professeurs.getProfFromClass(class_id);
    if (class_prof === user_id) {
        if (await professeurs.studentInClass(etudiant_id, class_id)) {
            const response = await professeurs.setGrade(etudiant_id, class_id, note, remarque);
            res.json({response: response});
        } else {
            return res.sendStatus(401);
        }
    } else {
        return res.sendStatus(401);
    }
}

module.exports = {getMyProfData, updateMyProfData, getMyProfClasses, getStudentsFromClass, setGrade, getStudentFromClass}