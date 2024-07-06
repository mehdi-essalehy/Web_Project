import React, { useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';

function ProfessorClasses() {

    const [data, setData] = useState({data: []})

    const navigate = useNavigate();

    useEffect(() => {
        fetch(`http://${process.env.REACT_APP_DOMAIN}:${process.env.REACT_APP_PORT}/professeurs/myClasses`, {
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
            let path = '/professor/class/' + row.ClasseID;
            res.push(<tr><td><Link to={path}>{row.ClasseID}</Link></td><td>{row.Matiere}</td><td>{row.Annee}</td></tr>)
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

export default ProfessorClasses