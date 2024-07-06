import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function CreateStudent() {

    const navigate= useNavigate();

    const [orientations, setOrientations] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3500/admins/getOrienatationsTroncCommun', {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('jwt-token'),
            },

        })
        .then((response) => response.json())
        .then((data) => {
            setOrientations(data.data);
        })
        .catch((error) => console.log(error));
    }, [])

    const MakeOrientation = (orientation) => {
        return <option value={orientation.ID}>{orientation.ID + '. ' + orientation.Nom}</option>;
    };

    const onSubmit = (e) => {
        e.preventDefault();

        let Nom = document.getElementById('Nom').value;
        let Prenom = document.getElementById('Prenom').value;
        let Date_de_naissance = document.getElementById('date_de_naissance').value;
        let Orientation_id = document.getElementById('orientations').value;
        let Password = document.getElementById('Password').value;
        fetch('http://localhost:3500/admins/createNewStudent', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('jwt-token'),
            },
            body: JSON.stringify({
                nom: Nom,
                prenom: Prenom,
                date_de_naissance: Date_de_naissance,
                orientation_id: Orientation_id,
                password: Password,
            })
        })
        .then((response) => {
            if (response.status === 200) {
                toast.success('The record was updates successfully!')
            } else {
                toast.error('We were unable to update the record, try again later!')
            }
        })
    }

    const onReturn = (e) => {
        e.preventDefault();

        navigate(-1)
    }

    return (
        <form style={{textAlign: 'start'}}>
            <legend>Créer un Compte Etudiant</legend>
            <label>Prénom:</label><input id="Prenom" type="text" required/><br/><br/>
            <label>Nom:</label><input id="Nom" type="text" required/><br/><br/>
            <label>Date de Naissance:</label><input id="date_de_naissance" type="date" placeholder="dd-mm-yyyy" required/><br/><br/>
            <label>Orientation Tronc Commun:</label>
            <select name="orientations" id="orientations">
                <option value="" disabled selected>Options</option>
                {orientations.map(MakeOrientation)}
            </select>
            <label>Mot de Passe:</label><input id="Password" type="password" required/><br/><br/>
            <button onClick={onSubmit}>Soumettre</button>   <button onClick={onReturn}>Retourner</button>
            <ToastContainer />
        </form>
    )
}

export default CreateStudent