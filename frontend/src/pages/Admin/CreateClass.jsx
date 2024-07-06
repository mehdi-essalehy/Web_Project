import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function CreateClass() {

    const navigate = useNavigate();

    const [profs, setProfs] = useState([])
    const [subjects, setSubjects] = useState([])
    const [subjectsToDisplay, setSubjectsToDisplay] = useState([])

    useEffect(() => {
        fetch('http://localhost:3500/admins/getAllProfs', {
            method: 'GET',
            headers: {
              'content-type': 'application/json',
              'Authorization': 'Bearer ' + localStorage.getItem('jwt-token'),
            },
        })
        .then((response) => response.json())
        .then((data) => {
            setProfs(data.data);
        })
        .catch((error) => console.log(error));
        fetch('http://localhost:3500/admins/getAllSubjects', {
            method: 'GET',
            headers: {
              'content-type': 'application/json',
              'Authorization': 'Bearer ' + localStorage.getItem('jwt-token'),
            },
        })
        .then((response) => response.json())
        .then((data) => {
            setSubjectsToDisplay(data.data);
            setSubjects(data.data);
        })
        .catch((error) => console.log(error));
    }, [])    
        
    const MakeSubject = (subject) => {
        return <option value={subject.ID}>{subject.ID + '. ' + subject.Nom}</option>;
    };

    const MakeProf = (prof) => {
        return <option value={prof.ID}>{prof.Prenom + ' ' + prof.Nom}</option>;
    };

    const onLevelSelected = (e) => {
        e.preventDefault();

        setSubjectsToDisplay(subjects.filter((subject) => String(subject.Niveau) === document.getElementById('niveau').value))
    }

    const onSubmit = (e) => {
        e.preventDefault();

        let subject_id = document.getElementById('subjects').value;
        let prof_id = document.getElementById('profs').value;
        let annee = document.getElementById('annee').value;
        fetch('http://localhost:3500/admins/createNewClass', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('jwt-token'),
            },
            body: JSON.stringify({
                prof_id: prof_id,
                matiere_id: subject_id,
                annee: annee,
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
            <legend>Créer une Classe</legend>
            <label htmlFor="Niveau">Niveau:</label>
            <select name="niveau" id="niveau" onChange={onLevelSelected}>
                <option value="" disabled selected>Options</option>
                <option value={1}>Tronc Commun</option>
                <option value={2}>Bac 1</option>
                <option value={3}>Bac 2</option>
            </select>
            <br/><br/>
            <label htmlFor="subjects">Matière:</label>
            <select name="subjects" id="subjects">
                {subjectsToDisplay.map(MakeSubject)}
            </select>
            <br/><br/>
            <label htmlFor="profs">Professeur:</label>
            <select name="profs" id="profs">
                {profs.map(MakeProf)}
            </select>
            <label htmlFor="annee">Année:</label>
            <input type="number" id="annee" required />
            <button onClick={onSubmit}>Soumettre</button>   <button onClick={onReturn}>Retourner</button>
            <ToastContainer />
        </form>
    )
}

export default CreateClass