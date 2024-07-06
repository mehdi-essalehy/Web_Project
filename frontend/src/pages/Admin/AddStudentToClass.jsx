import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AddStudentToClass() {

    const navigate = useNavigate();
    
    const [students, setStudents] = useState([]);
    const [classes, setClasses] = useState([]);

    useEffect(() => {
        fetch(`http://${process.env.REACT_APP_DOMAIN}:${process.env.REACT_APP_PORT}/admins/getAllStudents`, {
            method: 'GET',
            headers: {
              'content-type': 'application/json',
              'Authorization': 'Bearer ' + localStorage.getItem('jwt-token'),
            },
        })
        .then((response) => response.json())
        .then((data) => {
            setStudents(data.data);
        })
        .catch((error) => console.log(error));
    }, [])

    const MakeStudent = (student) => {
        return <option value={student.ID}>{student.Prenom + ' ' + student.Nom}</option>;
    };

    const MakeClass = (classe) => {
        return <option value={classe.ID}>{classe.ID + '. ' + classe.Matiere_Nom}</option>;
    }

    const onStudentSelected = (e) => {
        e.preventDefault();

        let student_id = document.getElementById('etudiants').value;
        let niveau = students.filter((student) => (String(student.ID) === student_id))[0].Niveau
        fetch(`http://${process.env.REACT_APP_DOMAIN}:${process.env.REACT_APP_PORT}/admins/getClassesFromStudent/${student_id}/${niveau}`, {
            method: 'GET',
            headers: {
              'content-type': 'application/json',
              'Authorization': 'Bearer ' + localStorage.getItem('jwt-token'),
            },
        })
        .then((response) => response.json())
        .then((data) => {
            setClasses(data.data);
        })
        .catch((error) => console.log(error));
    }

    const onSubmit = (e) => {
        e.preventDefault();

        let student_id = document.getElementById('etudiants').value
        let class_id = document.getElementById('classes').value
        fetch(`http://${process.env.REACT_APP_DOMAIN}:${process.env.REACT_APP_PORT}/admins/addStudentToClass`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('jwt-token'),
            },
            body: JSON.stringify({
                student_id: student_id,
                class_id: class_id,
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
        <form>
            <legend>Ajouter un Etudiant à une Classe</legend>
            <label>Etudiant:</label>
            <select name="etudiants" id="etudiants" onChange={onStudentSelected}>
                <option value="" disabled selected>Options</option>
                {students.map(MakeStudent)}
            </select>
            <label>Classe:</label>
            <select name="classes" id="classes">
                <option value="" disabled selected>Options</option>
                {classes.map(MakeClass)}
            </select>
            <button onClick={onSubmit}>Soumettre</button>   <button onClick={onReturn}>Retourner</button>
            <ToastContainer />
        </form>
    )
}

export default AddStudentToClass