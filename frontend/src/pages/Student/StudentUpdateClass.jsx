import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function StudentUpdateClass() {

    const navigate = useNavigate()

    const { classID } = useParams()

    const [data, setData] = useState({data: []})

    useEffect(() => {
        fetch('http://localhost:3500/etudiants/myClass/' + classID, {
            method: 'GET',
            headers: {
              'content-type': 'application/json',
              'Authorization': 'Bearer ' + localStorage.getItem('jwt-token'),
            },
        })
        .then((response) => response.json())
        .then((data) => {
            setData(data.data[0]);
        })
        .catch((error) => console.log(error));
    }, [])

    const { Matiere, Note, Remarque_du_prof, Annee, Commentaire } = data;

    const onSubmit = (e) => {
        e.preventDefault();

        let commentaire = document.getElementById('commentaire').value;
        fetch('http://localhost:3500/etudiants/myClasses/' + classID, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('jwt-token'),
            },
            body: JSON.stringify({
                commentaire: commentaire,
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
            <legend>Note et Remarque du professeur</legend>
            <fieldset>
            <div className="info-field">
                <label>Classe ID:</label>
                <div>{classID}</div>
            </div>
            <div className="info-field">
                <label>Matière:</label>
                <div>{Matiere}</div>
            </div>
            <div className="info-field">
                <label>Note:</label>
                <div>{Note}</div>
            </div>
            <div className="info-field">
                <label>Remarque du professeur:</label>
                <div>{Remarque_du_prof}</div>
            </div>
            <div className="info-field">
                <label>Année:</label>
                <div>{Annee}</div>
            </div>
            </fieldset>
            <label>Commentaire:</label><textarea id="commentaire" defaultValue={Commentaire} rows={3}></textarea><br/>
            <button onClick={onSubmit}>Soumettre</button>   <button onClick={onReturn}>Retourner</button>
            <ToastContainer />
        </form>
    )
}

export default StudentUpdateClass