import { useNavigate, Link } from 'react-router-dom'

function ProfessorHome() {

    const navigate = useNavigate();

    return (
        <>
            <h1>Page d'accueil</h1>
            <nav>
                <ul>
                    <li>
                        <Link to='/professor/profile'>Mon Profil</Link>
                    </li>
                    <li>
                        <Link to='/professor/classes'>Mes Classes</Link>
                    </li>
                </ul>
            </nav>
        </>
    )
}

export default ProfessorHome