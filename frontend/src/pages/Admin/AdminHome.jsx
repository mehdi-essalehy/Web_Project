import { useNavigate, Link } from 'react-router-dom'

function AdminHome() {

    const navigate = useNavigate();

    return (
        <>
            <h1>Page d'accueil</h1>
            <nav>
                <ul>
                    <li>
                        <Link to='/admin/createProf'>Créer un Compte Professeur</Link>
                    </li>
                    <li>
                        <Link to='/admin/createStudent'>Créer un Compte Etudiant</Link>
                    </li>
                    <li>
                        <Link to='/admin/createAdmin'>Créer un Compte Administrateur</Link>
                    </li>
                    <li>
                        <Link to='/admin/createClass'>Créer une Classe</Link>
                    </li>
                    <li>
                        <Link to='/admin/AddStudentToClass'>Ajouter un Etudiant à une Classe</Link>
                    </li>
                </ul>
            </nav>
        </>
    )
}

export default AdminHome