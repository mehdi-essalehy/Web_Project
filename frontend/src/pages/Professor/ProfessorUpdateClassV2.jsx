import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ProfessorUpdateClassV2() {

    const navigate = useNavigate()
    
    const { classID, studentID } = useParams()

    const [data, setData] = useState({data: []})

    useEffect(() => {
        fetch('http://localhost:3500/professeurs/myStudent/' + classID + '/' + studentID, {
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

    const onSubmit = (e) => {
        e.preventDefault();

        let Note = document.getElementById('Note').value;
        let Remarque = document.getElementById('Remarque').value;
        fetch('http://localhost:3500/professeurs/myClasses/' + classID, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('jwt-token'),
            },
            body: JSON.stringify({
                etudiant_id: studentID,
                note: Note,
                remarque: Remarque,
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
            <fieldset>
            <div class="info-field">
                <label>Classe ID:</label>
                <div>{classID}</div>
            </div>
            <div class="info-field">
                <label>Etudiant ID:</label>
                <div>{studentID}</div>
            </div>
            <div class="info-field">
                <label>Prénom:</label>
                <div>{data.Prenom}</div>
            </div>
            <div class="info-field">
                <label>Nom:</label>
                <div>{data.Nom}</div>
            </div>
            </fieldset>
            <label>Note:</label><input defaultValue={data.Note} id="Note" type="number" min={0} max={20} required/>
            <label>Remarque:</label><textarea defaultValue={data.Remarque_du_prof} id="Remarque" rows={3}></textarea>
            <button onClick={onSubmit}>Soumettre</button>   <button onClick={onReturn}>Retourner</button>
            <ToastContainer />
        </form>
    )
}

export default ProfessorUpdateClassV2