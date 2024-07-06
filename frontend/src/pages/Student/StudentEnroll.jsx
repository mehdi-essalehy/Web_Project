import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function StudentEnroll() {

    const navigate = useNavigate();

    const [niveau, setNiveau] = useState(0)
    const [currentOrientation, setCurrentOrientation] = useState()
    const [possibleOrientations, setPossibleOrientations] = useState([])
    const [orientationDescription, setOrientationDescription] = useState("")

    useEffect(() => {

        const getMyLevel = async () => {
            try {
                const response = await fetch('http://localhost:3500/etudiants/getMyLevel', {
                    method: 'GET',
                    headers: {
                      'content-type': 'application/json',
                      'Authorization': 'Bearer ' + localStorage.getItem('jwt-token'),
                    },
                })
                const data = await response.json()
                return data.data[0].Niveau;
            } catch (err) {
                console.log(err)
            }
        }

        const getCurrentOrientation = async (niveau) => {
            try {
                const response = await fetch('http://localhost:3500/etudiants/getCurrentOrientation/' + niveau, {
                    method: 'GET',
                    headers: {
                      'content-type': 'application/json',
                      'Authorization': 'Bearer ' + localStorage.getItem('jwt-token'),
                    },
                })
                const data = await response.json()
                return data.data[0].ID;
            } catch (err) {
                console.log(err)
            }
        }

        const getPossibleOrientations = async (currentOrientation) => {
            try {
                const response = await fetch('http://localhost:3500/etudiants/getPossibleOrientations/' + currentOrientation, {
                    method: 'GET',
                    headers: {
                      'content-type': 'application/json',
                      'Authorization': 'Bearer ' + localStorage.getItem('jwt-token'),
                    },
                })
                const data = await response.json()
                return data.data;
            } catch (err) {
                console.log(err)
            }

        }

        const getAll = async () => {
            const tempNiveau = await getMyLevel();
            const tempCurrentOrientation = await getCurrentOrientation(tempNiveau);
            const tempPossibleOrientations = await getPossibleOrientations(tempCurrentOrientation);

            setNiveau(tempNiveau);
            setCurrentOrientation(tempCurrentOrientation);
            setPossibleOrientations(tempPossibleOrientations);
        }

        getAll();
    }, [])

    const MakeOrientation = (orientation) => {
        return <option value={orientation.ID}>{orientation.ID + '. ' + orientation.Nom}</option>;
    };

    const onSubmit = (e) => {
        e.preventDefault();

        let orientation_id = document.getElementById('orientations').value
        fetch('http://localhost:3500/etudiants/enrollInNextOrientation', {
            method: 'put',
            headers: {
                'content-type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('jwt-token'),
            },
            body: JSON.stringify({
                orientation_id: orientation_id,
                niveau: niveau,
            })
        })
        .then((response) => {
            if (response.status === 200) {
                toast.success('The record was updates successfully!')
            } else {
                toast.error('We were unable to update the record, try again later!')
            }
        })

        navigate(0);
    }

    const onReturn = (e) => {
        e.preventDefault();

        navigate(-1)
    }

    const onOrientationSelected = (e) => {
        e.preventDefault();

        let tempDescription = possibleOrientations.filter((orientation) => {return String(orientation.ID) === document.getElementById("orientations").value})[0].Description
        setOrientationDescription(tempDescription)
    }

    return (
        <form>
            <legend>Inscrivez vous pour l'année prochaine</legend>
            <label>Orientation:</label>
            <select name="orientations" id="orientations" onChange={onOrientationSelected}>
                <option value="" disabled selected>Options</option>
                {possibleOrientations.map(MakeOrientation)}
            </select>
            <label>Description:</label>
            <div className="info-field">
                <div style={{textAlign: "start"}}>{orientationDescription}</div>
            </div>
            <button onClick={onSubmit}>Soumettre</button>   <button onClick={onReturn}>Retourner</button>
            <ToastContainer />
        </form>
    )
}

export default StudentEnroll 