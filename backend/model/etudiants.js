const {connectDB} = require('./connectDB');

const pool = connectDB();

const getMyEtudData = async (etudiant_id) => {
    const client = await pool.connect();

    try {
        const query = `SELECT "ID", "Nom", "Prenom", "Date de naissance", "Niveau", "Orientation Tronc Commun", "Orientation Bac 1", "Orientation Bac 2", "Date enregistrement" FROM public."Etudiant" WHERE "ID" = ${etudiant_id}`;
        const response = await client.query(query);
        const {rows} = response;
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
        const query = `SELECT "Classe"."ID" AS "Classe ID", "Matiere"."Nom" AS "Matiere", "Classe"."Annee", "Etudiant_Classe"."Note" FROM public."Classe" INNER JOIN public."Matiere" ON "Classe"."Matiere_ID" = "Matiere"."ID" INNER JOIN public."Etudiant_Classe" ON "Classe"."ID" = "Etudiant_Classe"."Classe_ID" WHERE "Etudiant_Classe"."Etudiant_ID" = ${etudiant_id}`;
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
        const query = `SELECT "Classe"."ID" AS "Classe ID", "Matiere"."Nom" AS "Matiere", "Classe"."Annee", "Etudiant_Classe"."Note" FROM public."Classe" INNER JOIN public."Matiere" ON "Classe"."Matiere_ID" = "Matiere"."ID" INNER JOIN public."Etudiant_Classe" ON "Classe"."ID" = "Etudiant_Classe"."Classe_ID" WHERE "Etudiant_Classe"."Etudiant_ID" = ${etudiant_id} AND "Matiere"."Niveau" = 1`;
        const response = await client.query(query);
        const {rows} = response;
        return rows;
    } catch (err) {
        console.log(err);
    } finally {
        client.release();
    }
}

const enroll1 = async (etudiant_id, orientation) => {
    const client = await pool.connect();

    try {
        const query = ``;
        const response = await client.query(query);
        console.log(response);
    } catch (err) {
        console.log(err);
    } finally {
        client.release();
    }
}

const getMyEtudClasses2 = async (etudiant_id) => {
    const client = await pool.connect();

    try {
        const query = `SELECT "Classe"."ID" AS "Classe ID", "Matiere"."Nom" AS "Matiere", "Classe"."Annee", "Etudiant_Classe"."Note" FROM public."Classe" INNER JOIN public."Matiere" ON "Classe"."Matiere_ID" = "Matiere"."ID" INNER JOIN public."Etudiant_Classe" ON "Classe"."ID" = "Etudiant_Classe"."Classe_ID" WHERE "Etudiant_Classe"."Etudiant_ID" = ${etudiant_id} AND "Matiere"."Niveau" = 2`;
        const response = await client.query(query);
        const {rows} = response;
        return rows;
    } catch (err) {
        console.log(err);
    } finally {
        client.release();
    }
}

const enroll2 = async (etudiant_id, orientation) => {
    const client = await pool.connect();

    try {
        const query = ``;
        const response = await client.query(query);
        console.log(response);
    } catch (err) {
        console.log(err);
    } finally {
        client.release();
    }
}

const getMyEtudClasses3 = async (etudiant_id) => {
    const client = await pool.connect();

    try {
        const query = `SELECT "Classe"."ID" AS "Classe ID", "Matiere"."Nom" AS "Matiere", "Classe"."Annee", "Etudiant_Classe"."Note" FROM public."Classe" INNER JOIN public."Matiere" ON "Classe"."Matiere_ID" = "Matiere"."ID" INNER JOIN public."Etudiant_Classe" ON "Classe"."ID" = "Etudiant_Classe"."Classe_ID" WHERE "Etudiant_Classe"."Etudiant_ID" = ${etudiant_id} AND "Matiere"."Niveau" = 3`;
        const response = await client.query(query);
        const {rows} = response;
        return rows;
    } catch (err) {
        console.log(err);
    } finally {
        client.release();
    }
}

const enroll3 = async (etudiant_id, orientation) => {
    const client = await pool.connect();

    try {
        const query = ``;
        const response = await client.query(query);
        console.log(response);
    } catch (err) {
        console.log(err);
    } finally {
        client.release();
    }
}

module.exports = {getMyEtudData, getEtudCredentials, updateMyEtudData, getMyEtudClasses, addComment, studentInClass, getMyEtudClasses1, enroll1, getMyEtudClasses2, enroll2, getMyEtudClasses3, enroll3}