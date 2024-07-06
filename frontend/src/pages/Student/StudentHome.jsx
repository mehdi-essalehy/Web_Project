import { useNavigate, Link } from 'react-router-dom'

function StudentHome() {

    return (
        <>
            <h1>Page d'accueil</h1>
            <nav>
                <ul>
                    <li>
                        <Link to='/student/profile'>Mon Profil</Link>
                    </li>

                    <li>
                        <Link to='/student/classes'>Mes Classes</Link>
                    </li>
                    <li>
                        <Link to='/student/Tronc-Commun'>Mes Classes de Tronc Commun</Link>
                    </li>
                    <li>
                        <Link to='/student/Bac-1'>Mes Classes de Bac 1</Link>
                    </li>
                    <li>
                        <Link to='/student/Bac-2'>Mes Classes de Bac 2</Link>
                    </li>
                    <li>
                        <Link to='/student/Enroll'>Choix de Filière</Link>
                    </li>
                </ul>
            </nav>
        </>
    )
}

export default StudentHome