const {connectDB} = require('./connectDB');

const pool = connectDB();

const getMyEtudData = async (etudiant_id) => {
    const client = await pool.connect();

    try {
        const query = `SELECT "ID", "Nom", "Prenom", "Date_de_naissance", "Niveau", "Orientation_Tronc_Commun", "Orientation_Bac_1", "Orientation_Bac_2", "Date_enregistrement" FROM public."Etudiant" WHERE "ID" = ${etudiant_id}`;
        const response = await client.query(query);
        const {rows} = response;
        return rows;
    } catch (err) {
        console.log(err);
    } finally {
        client.release();
    }
}

const getOrientationName = async (orientation_id) => {
    const client = await pool.connect();

    try {
        const query = `SELECT "Nom" FROM public."Orientation" WHERE "ID" = ${orientation_id}`;
        const response = await client.query(query);
        const { rows } = response;
        return rows;
    } catch (err) {
        console.log(err);
    } finally {
        client.release();
    }
}

const getEtudCredentials = async (etudiant_id) => {
    const client = await pool.connect();

    try {
        const query = `SELECT "ID" AS "User_ID", "Password" FROM public."Etudiant" WHERE "ID" = ${etudiant_id}`;
        const response = await client.query(query);
        const {rows} = response;
        return rows;
    } catch (err) {
        console.log(err);
    } finally {
        client.release();
    }
}

const updateMyEtudData = async (etudiant_id, nom, prenom, date_de_naissance) => {
    const client = await pool.connect();

    try {
        const query = `UPDATE public."Etudiant" SET "Nom" = '${nom}', "Prenom" = '${prenom}', "Date de naissance" = '${date_de_naissance}' WHERE "ID" = ${etudiant_id}`;
        const response = await client.query(query);
        return response;
    } catch (err) {
        console.log(err);
    } finally {
        client.release();
    }
}

const getMyEtudClasses = async (etudiant_id) => {
    const client = await pool.connect();

    try {
        const query = `SELECT "Classe"."ID" AS "ClasseID", "Matiere"."Nom" AS "Matiere", "Classe"."Annee", "Etudiant_Classe"."Note" FROM public."Classe" INNER JOIN public."Matiere" ON "Classe"."Matiere_ID" = "Matiere"."ID" INNER JOIN public."Etudiant_Classe" ON "Classe"."ID" = "Etudiant_Classe"."Classe_ID" WHERE "Etudiant_Classe"."Etudiant_ID" = ${etudiant_id}`;
        const response = await client.query(query);
        const {rows} = response;
        return rows;
    } catch (err) {
        console.log(err);
    } finally {
        client.release();
    }
}

const getEtudClass = async (etudiant_id, classe_id) => {
    const client = await pool.connect();

    try {
        const query = `SELECT "Matiere"."Nom" AS "Matiere", "Etudiant_Classe"."Note", "Etudiant_Classe"."Remarque_du_prof", "Classe"."Annee", "Etudiant_Classe"."Commentaire" FROM public."Classe" INNER JOIN public."Matiere" ON "Classe"."Matiere_ID" = "Matiere"."ID" INNER JOIN public."Etudiant_Classe" ON "Classe"."ID" = "Etudiant_Classe"."Classe_ID" WHERE "Etudiant_Classe"."Etudiant_ID" = ${etudiant_id} AND "Classe"."ID" = ${classe_id}`;
        const response = await client.query(query);
        const {rows} = response;
        return rows;
    } catch (err) {
        console.log(err);
    } finally {
        client.release();
    }
}

const addComment = async (etudiant_id, classe_id, commentaire) => {
    const client = await pool.connect();

    try {
        const query = `UPDATE public."Etudiant_Classe" SET "Commentaire" = '${commentaire}' WHERE "Etudiant_ID" = ${etudiant_id} AND "Classe_ID" = ${classe_id}`;
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

const getMyEtudClasses1 = async (etudiant_id) => {
    const client = await pool.connect();

    try {
        const query = `SELECT "Classe"."ID" AS "ClasseID", "Matiere"."Nom" AS "Matiere", "Classe"."Annee", "Etudiant_Classe"."Note" FROM public."Classe" INNER JOIN public."Matiere" ON "Classe"."Matiere_ID" = "Matiere"."ID" INNER JOIN public."Etudiant_Classe" ON "Classe"."ID" = "Etudiant_Classe"."Classe_ID" WHERE "Etudiant_Classe"."Etudiant_ID" = ${etudiant_id} AND "Matiere"."Niveau" = 1`;
        const response = await client.query(query);
        const {rows} = response;
        return rows;
    } catch (err) {
        console.log(err);
    } finally {
        client.release();
    }
}

const getMyEtudClasses2 = async (etudiant_id) => {
    const client = await pool.connect();

    try {
        const query = `SELECT "Classe"."ID" AS "ClasseID", "Matiere"."Nom" AS "Matiere", "Classe"."Annee", "Etudiant_Classe"."Note" FROM public."Classe" INNER JOIN public."Matiere" ON "Classe"."Matiere_ID" = "Matiere"."ID" INNER JOIN public."Etudiant_Classe" ON "Classe"."ID" = "Etudiant_Classe"."Classe_ID" WHERE "Etudiant_Classe"."Etudiant_ID" = ${etudiant_id} AND "Matiere"."Niveau" = 2`;
        const response = await client.query(query);
        const {rows} = response;
        return rows;
    } catch (err) {
        console.log(err);
    } finally {
        client.release();
    }
}

const getMyEtudClasses3 = async (etudiant_id) => {
    const client = await pool.connect();

    try {
        const query = `SELECT "Classe"."ID" AS "ClasseID", "Matiere"."Nom" AS "Matiere", "Classe"."Annee", "Etudiant_Classe"."Note" FROM public."Classe" INNER JOIN public."Matiere" ON "Classe"."Matiere_ID" = "Matiere"."ID" INNER JOIN public."Etudiant_Classe" ON "Classe"."ID" = "Etudiant_Classe"."Classe_ID" WHERE "Etudiant_Classe"."Etudiant_ID" = ${etudiant_id} AND "Matiere"."Niveau" = 3`;
        const response = await client.query(query);
        const {rows} = response;
        return rows;
    } catch (err) {
        console.log(err);
    } finally {
        client.release();
    }
}

const getEtudGrade1 = async (etudiant_id) => {
    const client = await pool.connect();

    try {
        const query = `SELECT ROUND(SUM("Note" * "Coefficient")/SUM("Coefficient"), 2) AS "Note_Finale" FROM public."Etudiant" INNER JOIN public."Etudiant_Classe" ON "Etudiant"."ID" = "Etudiant_Classe"."Etudiant_ID" INNER JOIN public."Classe" ON "Classe"."ID" = "Etudiant_Classe"."Classe_ID" INNER JOIN public."Orientation_Matiere" ON "Etudiant"."Orientation_Tronc_Commun" = "Orientation_Matiere"."Orientation_ID" AND "Classe"."Matiere_ID" = "Orientation_Matiere"."Matiere_ID" WHERE "Etudiant"."ID" = ${etudiant_id}`
        const response = await client.query(query);
        const { rows } = response;
        return rows;
    } catch (err) {
        console.log(err);
    } finally {
        client.release();
    }
}

const getEtudGrade2 = async (etudiant_id) => {
    const client = await pool.connect();

    try {
        const query = `SELECT ROUND(SUM("Note" * "Coefficient")/SUM("Coefficient"), 2) AS "Note_Finale" FROM public."Etudiant" INNER JOIN public."Etudiant_Classe" ON "Etudiant"."ID" = "Etudiant_Classe"."Etudiant_ID" INNER JOIN public."Classe" ON "Classe"."ID" = "Etudiant_Classe"."Classe_ID" INNER JOIN public."Orientation_Matiere" ON "Etudiant"."Orientation_Bac_1" = "Orientation_Matiere"."Orientation_ID" AND "Classe"."Matiere_ID" = "Orientation_Matiere"."Matiere_ID" WHERE "Etudiant"."ID" = ${etudiant_id}`
        const response = await client.query(query);
        const { rows } = response;
        return rows;
    } catch (err) {
        console.log(err);
    } finally {
        client.release();
    }
}

const getEtudGrade3 = async (etudiant_id) => {
    const client = await pool.connect();

    try {
        const query = `SELECT ROUND(SUM("Note" * "Coefficient")/SUM("Coefficient"), 2) AS "Note_Finale" FROM public."Etudiant" INNER JOIN public."Etudiant_Classe" ON "Etudiant"."ID" = "Etudiant_Classe"."Etudiant_ID" INNER JOIN public."Classe" ON "Classe"."ID" = "Etudiant_Classe"."Classe_ID" INNER JOIN public."Orientation_Matiere" ON "Etudiant"."Orientation_Bac_2" = "Orientation_Matiere"."Orientation_ID" AND "Classe"."Matiere_ID" = "Orientation_Matiere"."Matiere_ID" WHERE "Etudiant"."ID" = ${etudiant_id}`
        const response = await client.query(query);
        const { rows } = response;
        return rows;
    } catch (err) {
        console.log(err);
    } finally {
        client.release();
    }
}

const getCurrentOrientation = async (student_id, niveau) => {
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
            throw new Error(`Niveau Cannot be: ${niveau}`);
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

const getPossibleOrientations = async (orientation_id) => {
    const client = await pool.connect();

    try {
        const query = `SELECT "ID", "Nom", "Description" FROM public."Orientation" INNER JOIN public."Orientation_Dependance" ON "Orientation"."ID" = "Orientation_Dependance"."Orientation_Suivante" WHERE "Orientation_Dependance"."Orientation" = ${orientation_id}`;
        const response = await client.query(query);
        const { rows } = response;
        return rows;
    } catch (err) {
        console.log(err);
    } finally {
        client.release();
    }
}

const enrollInNextOrientation = async (student_id, orientation_id, niveau) => {
    const client = await pool.connect();

    try {
        let tempQuery = new String()
        if (niveau === 1) {
            tempQuery = `UPDATE public."Etudiant" SET "Orientation_Bac_1" = ${orientation_id}, "Niveau" = "Niveau" + 1 WHERE "ID" = ${student_id}`;
        } else if (niveau === 2) {
            tempQuery = `UPDATE public."Etudiant" SET "Orientation_Bac_2" = ${orientation_id}, "Niveau" = "Niveau" + 1 WHERE "ID" = ${student_id}`;
        } else {
            throw new Error('Niveau cannot be less than 1 or greater than 2!');
        }
    
        const query = tempQuery;
        const response = await client.query(query);
        return response;    
    } catch (err) {
        console.log(err);
    } finally {
        client.release();
    }
}

const getMyLevel = async (student_id) => {
    const client = await pool.connect();

    try {
        const query = `SELECT "Niveau" FROM public."Etudiant" WHERE "ID" = ${student_id}`;
        const response = await client.query(query);
        const {rows} = response;
        return rows;    
    } catch (err) {
        console.log(err);
    } finally {
        client.release();
    }
}


module.exports = {getMyEtudData, getEtudCredentials, updateMyEtudData, getMyEtudClasses, getEtudClass, addComment, studentInClass, getMyEtudClasses1, getMyEtudClasses2, getMyEtudClasses3, getOrientationName, getEtudGrade1, getEtudGrade2, getEtudGrade3, getPossibleOrientations, enrollInNextOrientation, getCurrentOrientation, getMyLevel}