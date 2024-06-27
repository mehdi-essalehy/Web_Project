import { Link } from 'react-router-dom'

function ProfessorHome() {
    
    return (
        <>
            <h1>This is the Professor home page</h1>
            <nav>
                <ul>
                    <li>
                        <Link to='/professor/profile'>Profile</Link>
                    </li>
                    <li>
                        <Link to='/professor/classes'>Classes</Link>
                    </li>
                </ul>
            </nav>
        </>
    )
}

export default ProfessorHome