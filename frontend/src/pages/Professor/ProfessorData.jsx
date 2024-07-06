import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom'

function ProfessorData() {
    const [data, setData] = useState({});

    const navigate = useNavigate();

    useEffect(() => {
        fetch(`http://${process.env.REACT_APP_DOMAIN}:${process.env.REACT_APP_PORT}/professeurs/myData`, {
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

    const {ID, Prenom, Nom}  = data;

    const onReturn = (e) => {
        e.preventDefault();

        navigate(-1)
    }
    
    return (
        <div class="profile-container">
            <div class="profile-header">Profil de professeur</div>
            <div class="profile-field">
                <label for="prof-id">Professeur ID:</label>
                <div id="prof-id">{ID}</div>
            </div>
            <div class="profile-field">
                <label for="first-name">Prénom:</label>
                <div id="first-name">{Prenom}</div>
            </div>
            <div class="profile-field">
                <label for="last-name">Nom:</label>
                <div id="last-name">{Nom}</div>
            </div>
            <button onClick={onReturn}>Retourner</button>
        </div>
    )
}

export default ProfessorData