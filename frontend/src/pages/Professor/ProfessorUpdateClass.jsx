import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom'

function ProfessorUpdateClass() {

    const navigate = useNavigate()

    const { classID } = useParams()

    const [data, setData] = useState({data: []})

    useEffect(() => {
        fetch('http://localhost:3500/professeurs/myClasses/' + classID, {
            method: 'GET',
            headers: {
              'content-type': 'application/json',
              'Authorization': 'Bearer ' + localStorage.getItem('jwt-token'),
            },
        })
        .then((response) => {
            response.json()
        })
        .then((data) => {
            setData(data);
        })
        .catch((error) => console.log(error));
    }, [])

    function show({data}) {
        var res = [];
        for (let i = 0; i < data.length; i++) {
            let row = data[i];
            let id = String(i);
            let NoteID = 'Note' + id
            let RemarqueID = 'Remarque' + id
            res.push(<tr><td>{row.Prenom}</td><td>{row.Nom}</td><td><input id={NoteID} type="number" min={0} max={20} defaultValue={row.Note} /></td><td><textarea id={RemarqueID}>{row.Remarque_du_prof}</textarea></td></tr>) //
        }
        return res;
    }


    const onSubmit = (e) => {
        e.preventDefault();

        for (let i = 0; i < data.data.length; i++) {
            let row = data.data[i];
            row.Note = document.getElementById('Note' + String(i)).value;
            row.Remarque_du_prof = document.getElementById('Remarque' + String(i)).value;
            fetch('http://localhost:3500/professeurs/myClasses/' + classID, {
                method: 'PUT',
                headers: {
                  'content-type': 'application/json',
                  'Authorization': 'Bearer ' + localStorage.getItem('jwt-token'),
                },
                body: JSON.stringify({
                    etudiant_id: row.ID,
                    note: row.Note,
                    remarque: row.Remarque_du_prof,
                })
            })
        }
        console.log(data);
    }

    const onReturn = (e) => {
        e.preventDefault();

        setData({data: []})
        navigate('/professor/class/' + classID)
    }

    const tableStyle = {margin: '0px auto'}

    return (
        <>
            <table border={1} style={tableStyle}>
                <thead>
                    <tr>
                        <th>Prenom</th>
                        <th>Nom</th>
                        <th>Note</th>
                        <th>Remarque du Prof</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        show(data)
                    }
                </tbody>
            </table>
            <br/>
            <button onClick={onSubmit}>Soumettre</button>   <button onClick={onReturn}>Retourner</button>
        </>
    )
}

export default ProfessorUpdateClass