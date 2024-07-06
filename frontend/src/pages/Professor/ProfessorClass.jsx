import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from 'react-router-dom'

function ProfessorClass() {

    const navigate = useNavigate()

    const { classID } = useParams()

    const [data, setData] = useState([])

    useEffect(() => {
        fetch(`http://${process.env.REACT_APP_DOMAIN}:${process.env.REACT_APP_PORT}/professeurs/myClasses/${classID}`, {
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
            let studentID = row.ID
            let path = '/professor/updateClass/' + classID + '/' + studentID;
            res.push(<tr><td><Link to={path}>{row.Prenom}</Link></td><td><Link to={path}>{row.Nom}</Link></td><td>{row.Note}</td></tr>) //<td>{row.Remarque_du_prof}</td>
        }
        return res;
    }

    const tableStyle = {margin: '0px auto'}

    const onReturn = (e) => {
        e.preventDefault();

        navigate(-1)
    }

    return (
        <>
            <table border={1} style={tableStyle}>
                <thead>
                    <tr>
                        <th>Prenom</th>
                        <th>Nom</th>
                        <th>Note</th>
                        {/* <th>Remarque du Prof</th> */}
                    </tr>
                </thead>
                <tbody>
                    {
                        show({data: data})
                    }
                </tbody>
            </table>
            <br/>
            <button onClick={onReturn}>Retourner</button>
        </>
    )
}

export default ProfessorClass