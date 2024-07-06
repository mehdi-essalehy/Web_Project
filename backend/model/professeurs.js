const {connectDB} = require('./connectDB');

const pool = connectDB();

const getMyProfData = async (prof_id) => {
    const client = await pool.connect();

    try {
        const query = `SELECT "ID", "Nom", "Prenom" FROM public."Professeur" WHERE "ID" = ${prof_id}`;
        const response = await client.query(query);
        const {rows} = response;
        return rows;
    } catch (err) {
        console.log(err);
    } finally {
        client.release();
    }
}

const getProfCredentials = async (prof_id) => {
    const client = await pool.connect();

    try {
        const query = `SELECT "ID" AS "User_ID", "Password" FROM public."Professeur" WHERE "ID" = ${prof_id}`;
        const response = await client.query(query);
        const {rows} = response;
        return rows;
    } catch (err) {
        console.log(err);
    } finally {
        client.release();
    }
}

const updateMyProfData = async (prof_id, nom, prenom) => {
    const client = await pool.connect();

    try {
        const query = `UPDATE public."Professeur" SET "Nom" = '${nom}', "Prenom" = '${prenom}' WHERE "ID" = ${prof_id}`;
        const response = await client.query(query);
        return response;
    } catch (err) {
        console.log(err);
    } finally {
        client.release();
    }
}

const getMyProfClasses = async (prof_id) => {
    const client = await pool.connect();

    try {
        const query = `SELECT "Classe"."ID" AS "ClasseID", "Matiere"."Nom" AS "Matiere", "Classe"."Annee" FROM public."Classe" INNER JOIN public."Matiere" ON "Classe"."Matiere_ID" = "Matiere"."ID" WHERE "Classe"."Prof_ID" = ${prof_id} ORDER BY "Classe"."ID"`;
        const response = await client.query(query);    
        const {rows} = response;
        return rows;
    } catch (err) {
        console.log(err);
    } finally {
        client.release();
    }
}

const getStudentsFromClass = async (class_id) => {
    const client = await pool.connect();

    try {
        const query = `SELECT "Etudiant"."ID", "Etudiant"."Prenom", "Etudiant"."Nom", "Etudiant_Classe"."Note", "Etudiant_Classe"."Remarque_du_prof"  FROM public."Etudiant" INNER JOIN public."Etudiant_Classe" ON "Etudiant"."ID" = "Etudiant_Classe"."Etudiant_ID" WHERE "Etudiant_Classe"."Classe_ID" = ${class_id}`;
        const response = await client.query(query);    
        const {rows} = response;
        return rows;
    } catch (err) {
        console.log(err);
    } finally {
        client.release();
    }
}

const getProfFromClass = async (class_id) => {
    const client = await pool.connect();

    try {
        const query = `SELECT "Prof_ID" FROM public."Classe" WHERE "ID" = ${class_id}`;
        const response = await client.query(query);
        const {rows} = response;
        if (rows.length === 0) {return -1};
        return rows[0].Prof_ID;
    } catch (err) {
        console.log(err);
    } finally {
        client.release();
    }
}

const getStudentFromClass = async (student_id, class_id) => {
    const client = await pool.connect();

    try {
        const query = `SELECT "Etudiant"."ID", "Etudiant"."Prenom", "Etudiant"."Nom", "Etudiant_Classe"."Note", "Etudiant_Classe"."Remarque_du_prof"  FROM public."Etudiant" INNER JOIN public."Etudiant_Classe" ON "Etudiant"."ID" = "Etudiant_Classe"."Etudiant_ID" WHERE "Etudiant_Classe"."Classe_ID" = ${class_id} AND "Etudiant"."ID" = ${student_id}`;
        const response = await client.query(query);    
        const {rows} = response;
        return rows;
    } catch (err) {
        console.log(err);
    } finally {
        client.release();
    }
}

const setGrade = async (etudiant_id, classe_id, note, remarque) => {
    const client = await pool.connect();

    try {
        const query = `UPDATE public."Etudiant_Classe" SET "Note" = ${note}, "Remarque_du_prof" = '${remarque}' WHERE "Etudiant_ID" = ${etudiant_id} AND "Classe_ID" = ${classe_id}`;
        const response = await client.query(query);
        return response;
    } catch (err) {
        console.log(err);
    } finally {
        client.release();
    }
}

const studentInClass = async (etudiant_id, class_id) => {
    const client = await pool.connect();

    try {
        const query = `SELECT "Etudiant_ID", "Classe_ID" FROM public."Etudiant_Classe" WHERE "Etudiant_ID" = ${etudiant_id} AND "Classe_ID" = ${class_id}`;
        const response = await client.query(query);
        const {rows} = response;
        return (rows.length !== 0);
    } catch (err) {
        console.log(err);
    } finally {
        client.release();
    }
}

module.exports = {getMyProfData, getProfCredentials, updateMyProfData, getMyProfClasses, getStudentsFromClass, getProfFromClass, setGrade, studentInClass, getStudentFromClass}