import React, { useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';

function StudentClasses() {

    const [data, setData] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        fetch('http://localhost:3500/etudiants/myClasses', {
            method: 'GET',
            headers: {
              'content-type': 'application/json',
              'Authorization': 'Bearer ' + localStorage.getItem('jwt-token'),
            },
        })
        .then((response) => response.json())
        .then((data) => {
            setData(data.data);
        })
        .catch((error) => console.log(error));
    }, [])

    function show({data}) {
        var res = []
        for (let i = 0; i < data.length; i++) {
            let row = data[i]
            let path = '/student/updateClass/' + row.ClasseID;
            res.push(<tr><td><Link to={path}>{row.ClasseID}</Link></td><td>{row.Matiere}</td><td>{row.Annee}</td><td>{row.Note}</td></tr>)
        }
        return res;
    }

    const onReturn = (e) => {
        e.preventDefault();

        navigate(-1)
    }


    return (
        <>
            <h2><b>Mes Classes</b></h2>
            <table border={1}>
                <thead>
                    <tr>
                        <th>Classe ID</th>
                        <th>Nom de la Matiere</th>
                        <th>Annee </th>
                        <th>Note</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        show({data: data})
                    }
                </tbody>
            </table>
            <button onClick={onReturn}>Retourner</button>
        </>
    )
}

export default StudentClasses