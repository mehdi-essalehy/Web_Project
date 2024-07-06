const {connectDB} = require('./connectDB');

const pool = connectDB();

const getAdminCredentials = async (admin_id) => {
    const client = await pool.connect();

    try {
        const query = `SELECT "ID" AS "User_ID", "Password" FROM public."Admin" WHERE "ID" = ${admin_id}`;
        const response = await client.query(query);
        const {rows} = response;
        return rows;
    } catch (err) {
        console.log(err);
    } finally {
        client.release();
    }
}

const createNewStudent = async (nom, prenom, date_de_naissance, orientation_id, password) => {
    const client = await pool.connect();

    try {
        const query = `INSERT INTO public."Etudiant" ("Nom", "Prenom", "Date_de_naissance", "Niveau", "Orientation_Tronc_Commun", "Date_enregistrement", "Password") VALUES('${nom}', '${prenom}', '${date_de_naissance}', 1, ${orientation_id}, CURRENT_DATE, '${password}')`;
        const response = await client.query(query);
        return response;
    } catch (err) {
        console.log(err);
    } finally {
        client.release();
    }
}

const createNewProf = async (nom, prenom, password) => {
    const client = await pool.connect();

    try {
        const query = `INSERT INTO public."Professeur" ("Nom", "Prenom", "Password") VALUES('${nom}', '${prenom}', '${password}')`;
        const response = await client.query(query);
        return response;
    } catch (err) {
        console.log(err);
    } finally {
        client.release();
    }
}

const createNewAdmin = async (nom, password) => {
    const client = await pool.connect();

    try {
        const query = `INSERT INTO public."Admin" ("Nom", "Password") VALUES('${nom}', '${password}')`;
        const response = await client.query(query);
        return response;
    } catch (err) {
        console.log(err);
    } finally {
        client.release();
    }
}

const createNewClass = async (prof_id, matiere_id, annee) => {
    const client = await pool.connect();

    try {
        const query = `INSERT INTO public."Classe" ("Prof_ID", "Matiere_ID", "Annee") VALUES(${prof_id}, ${matiere_id}, ${annee})`;
        const response = await client.query(query);
        return response;
    } catch (err) {
        console.log(err);
    } finally {
        client.release();
    }
}

const getAllProfs = async () => {
    const client = await pool.connect();

    try {
        const query = `SELECT "ID", "Prenom", "Nom" FROM public."Professeur"`;
        const response = await client.query(query);
        const {rows} = response;
        return rows;
    } catch (err) {
        console.log(err);
    } finally {
        client.release();
    }
}

const getAllSubjects = async () => {
    const client = await pool.connect();

    try {
        const query = `SELECT "ID", "Nom", "Niveau" FROM public."Matiere"`;
        const response = await client.query(query);
        const {rows} = response;
        return rows;
    } catch (err) {
        console.log(err);
    } finally {
        client.release();
    }
}

const addStudentToClass = async (student_id, class_id) => {
    const client = await pool.connect();

    try {
        const query = `INSERT INTO public."Etudiant_Classe" ("Etudiant_ID", "Classe_ID") VALUES(${student_id}, ${class_id})`;
        const response = await client.query(query);
        return response;
    } catch (err) {
        console.log(err);
    } finally {
        client.release();
    }
}

const getAllStudents = async () => {
    const client = await pool.connect();

    try {
        const query = `SELECT "ID", "Nom", "Prenom", "Niveau" FROM public."Etudiant"`;
        const response = await client.query(query);
        const { rows } = response;
        return rows;
    } catch (err) {
        console.log(err);
    } finally {
        client.release();
    }
}

const getStudentCurrentOrientation = async (student_id, niveau) => {
    const client = await pool.connect();

    try {
        let tempQuery = new String()
        if (niveau === '1') {
            tempQuery = `SELECT "Orientation"."ID", "Orientation"."Nom" FROM public."Orientation" INNER JOIN public."Etudiant" ON "Etudiant"."Orientation_Tronc_Commun" = "Orientation"."ID" WHERE "Etudiant"."ID" = ${student_id}`;
        } else if (niveau === '2') {
            tempQuery = `SELECT "Orientation"."ID", "Orientation"."Nom" FROM public."Orientation" INNER JOIN public."Etudiant" ON "Etudiant"."Orientation_Bac_1" = "Orientation"."ID" WHERE "Etudiant"."ID" = ${student_id}`;
        } else if (niveau === '3') {
            tempQuery = `SELECT "Orientation"."ID", "Orientation"."Nom" FROM public."Orientation" INNER JOIN public."Etudiant" ON "Etudiant"."Orientation_Bac_2" = "Orientation"."ID" WHERE "Etudiant"."ID" = ${student_id}`;
        } else {
            throw new Error('Niveau cannot be less than 1 or greater than 3!');
        }

        const query = tempQuery;
        const response = await client.query(query);
        const { rows } = response;
        return rows;
    } catch (err) {
        console.log(err);
    } finally {
        client.release();
    }
}

const getClassesFromOrientation = async (orientation_id, student_id) => {
    const client = await pool.connect();

    try {
        const query = `SELECT "Classe"."ID", "Classe"."Prof_ID", "Classe"."Matiere_ID", "Classe"."Annee", "Matiere"."Nom" AS "Matiere_Nom", "Professeur"."Nom" AS "Prof_Nom", "Professeur"."Prenom" AS "Prof_Prenom" FROM public."Orientation_Matiere" INNER JOIN public."Matiere" ON "Orientation_Matiere"."Matiere_ID" = "Matiere"."ID" INNER JOIN public."Classe" ON "Classe"."Matiere_ID" = "Matiere"."ID" INNER JOIN public."Professeur" ON "Professeur"."ID" = "Classe"."Prof_ID" WHERE "Orientation_Matiere"."Orientation_ID" = ${orientation_id} AND "Classe"."Matiere_ID" NOT IN (SELECT "Classe"."Matiere_ID" FROM public."Etudiant_Classe" INNER JOIN public."Classe" ON "Etudiant_Classe"."Classe_ID" = "Classe"."ID" WHERE "Etudiant_Classe"."Etudiant_ID" = ${student_id})`;
        const response = await client.query(query);
        const { rows } = response;
        return rows;
    } catch (err) {
        console.log(err);
    } finally {
        client.release();
    }
}

const getOrienatationsTroncCommun = async () => {
    const client = await pool.connect();

    try {
        const query = `SELECT "ID", "Nom" FROM public."Orientation" WHERE "Niveau" = 1`;
        const response = await client.query(query);
        const { rows } = response;
        return rows;
    } catch (err) {
        console.log(err);
    } finally {
        client.release();
    }
}
module.exports = {getAdminCredentials, createNewStudent, createNewProf, createNewAdmin, createNewClass, getAllProfs, getAllSubjects, getAllStudents, getStudentCurrentOrientation, getClassesFromOrientation, addStudentToClass, getOrienatationsTroncCommun}