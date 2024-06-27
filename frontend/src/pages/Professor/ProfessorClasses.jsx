import React, { useState, useEffect } from "react";

function ProfessorClasses() {

    const [data, setData] = useState(null);

    useEffect(() => {
        fetch('http://localhost:3500/professeurs/myClasses', {
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

    // console.log(data);

    return (
        <>
            <table border={1}>
                <tr>
                    <th>Classe ID</th>
                    <th>Nom de la Matiere</th>
                    <th>Annee </th>
                </tr>
                {/* {
                    data.map((row) => (
                        <tr><td>{row.ClasseID}</td><td>{row.Matiere}</td><td>{row.Annee}</td></tr>
                    ))
                } */}
            </table>
        </>
    )
}

export default ProfessorClasses