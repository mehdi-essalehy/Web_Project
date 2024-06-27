import React, { useState, useEffect } from "react";

function ProfessorData() {
    const [data, setData] = useState(null);

    useEffect(() => {
        fetch('http://localhost:3500/professeurs/myData', {
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

    return (
        <>
            <h1>This is the Professor profile page</h1>
            <p>ID: {data.ID}</p><br />
            <p>Prenom: {data.Prenom}</p><br />
            <p>Nom: {data.Nom}</p><br />
        </>
    )
}

export default ProfessorData