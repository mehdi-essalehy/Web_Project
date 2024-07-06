import React from "react";
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function CreateProf() {

    const navigate= useNavigate();

    const onSubmit = (e) => {
        e.preventDefault();

        let Nom = document.getElementById('Nom').value;
        let Prenom = document.getElementById('Prenom').value;
        let Password = document.getElementById('Password').value;
        fetch(`http://${process.env.REACT_APP_DOMAIN}:${process.env.REACT_APP_PORT}/admins/createNewProf`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('jwt-token'),
            },
            body: JSON.stringify({
                nom: Nom,
                prenom: Prenom,
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
            <legend>Créer un Compte Professeur</legend>
            <label>Prénom:</label><input id="Prenom" type="text" required/><br/><br/>
            <label>Nom:</label><input id="Nom" type="text" required/><br/><br/>
            <label>Mot de Passe:</label><input id="Password" type="password" required/><br/><br/>
            <button onClick={onSubmit}>Soumettre</button>   <button onClick={onReturn}>Retourner</button>
            <ToastContainer />
        </form>
    )
}

export default CreateProf