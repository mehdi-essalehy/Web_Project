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

const createNewStudent = async (nom, prenom, date_de_naissance, niveau, date_enregistrement, password) => {
    const client = await pool.connect();

    try {
        const query = `INSERT INTO public."Etudiant" ("Nom", "Prenom", "Date de naissance", "Niveau", "Date enregistrement", "Password") VALUES('${nom}', '${prenom}', '${date_de_naissance}', ${niveau}, '${date_enregistrement}', '${password}')`;
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

module.exports = {getAdminCredentials, createNewStudent, createNewProf, createNewAdmin}