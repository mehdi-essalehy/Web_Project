import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import Moment from 'moment';
import 'moment/locale/fr';

function StudentData() {
    const [data, setData] = useState({});
    const [orientation1, setOrientation1] = useState("")
    const [orientation2, setOrientation2] = useState("")
    const [orientation3, setOrientation3] = useState("")

    const navigate = useNavigate();

    useEffect(() => {
        fetch(`http://${process.env.REACT_APP_DOMAIN}:${process.env.REACT_APP_PORT}/etudiants/myData`, {
            method: 'GET',
            headers: {
              'content-type': 'application/json',
              'Authorization': 'Bearer ' + localStorage.getItem('jwt-token'),
            },
        })
        .then((response) => response.json())
        .then((data) => {
            console.log(data)
            setData(data.data[0]);
        })
        .catch((error) => console.log(error));
    }, [])

    const {ID, Prenom, Nom, Date_de_naissance, Niveau, Orientation_Tronc_Commun, Orientation_Bac_1, Orientation_Bac_2, Date_enregistrement}  = data;

    if (Niveau >= 1) {
            fetch(`http://${process.env.REACT_APP_DOMAIN}:${process.env.REACT_APP_PORT}/etudiants/getOrientationName/${Orientation_Tronc_Commun}`, {
                method: 'GET',
                headers: {
                  'content-type': 'application/json',
                  'Authorization': 'Bearer ' + localStorage.getItem('jwt-token'),
                },
            })
            .then((response) => response.json())
            .then((data) => {
                console.log(data)
                setOrientation1(data.data[0].Nom);
            })
            .catch((error) => console.log(error));
    }
    if (Niveau >= 2) {
            fetch(`http://${process.env.REACT_APP_DOMAIN}:${process.env.REACT_APP_PORT}/etudiants/getOrientationName/${Orientation_Bac_1}`, {
                method: 'GET',
                headers: {
                  'content-type': 'application/json',
                  'Authorization': 'Bearer ' + localStorage.getItem('jwt-token'),
                },
            })
            .then((response) => response.json())
            .then((data) => {
                console.log(data)
                setOrientation2(data.data[0].Nom);
            })
            .catch((error) => console.log(error));
    }
    if (Niveau === 3) {
            fetch(`http://${process.env.REACT_APP_DOMAIN}:${process.env.REACT_APP_PORT}/etudiants/getOrientationName/${Orientation_Bac_2}`, {
                method: 'GET',
                headers: {
                  'content-type': 'application/json',
                  'Authorization': 'Bearer ' + localStorage.getItem('jwt-token'),
                },
            })
            .then((response) => response.json())
            .then((data) => {
                console.log(data)
                setOrientation3(data.data[0].Nom);
            })
            .catch((error) => console.log(error));
    }

    const onReturn = (e) => {
        e.preventDefault();

        navigate(-1)
    }

    

    const Date_de_naissance_formatted = Moment(Date_de_naissance).locale('fr').format('LL');
    const Date_enregistrement_formatted = Moment(Date_enregistrement).locale('fr').format('LL');
    
    return (
        <div class="profile-container">
            <div class="profile-header">Profil d'étudiant</div>
            <div class="profile-field">
                <label for="prof-id">Etudiant ID:</label>
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
            <div class="profile-field">
                <label for="birthday">Date de Naissance:</label>
                <div id="birthday">{Date_de_naissance_formatted}</div>
            </div>
            <div class="profile-field">
                <label for="level">Niveau:</label>
                <div id="level">{Niveau}</div>
            </div>
            <div class="profile-field">
                <label for="tronc-commun">Tronc Commun:</label>
                <div id="tronc-commun">{orientation1}</div>
            </div>
            <div class="profile-field">
                <label for="bac-1">Bac 1:</label>
                <div id="bac-1">{orientation2}</div>
            </div>
            <div class="profile-field">
                <label for="bac-2">Bac 2:</label>
                <div id="bac-2">{orientation3}</div>
            </div>
            <div class="profile-field">
                <label for="registry-date">Date d'enregistrement:</label>
                <div id="registry-date">{Date_enregistrement_formatted}</div>
            </div>

            <button onClick={onReturn}>Retourner</button>
        </div>
    )
}

export default StudentData