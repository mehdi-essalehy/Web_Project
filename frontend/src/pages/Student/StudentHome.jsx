import { Link } from 'react-router-dom'

function StudentHome() {
    return (
        <>
            <h1>This is the Student home page</h1>
            <nav>
                <ul>
                    <li>
                        <Link to='/myClasses'>Classes</Link>
                    </li>
                    <li>
                        <Link to='/myData'>Profile</Link>
                    </li>
                    <li>
                        <Link to='/Tronc-Commun'>Tronc Commun</Link>
                    </li>
                    <li>
                        <Link to='/Bac-1'>Bac 1</Link>
                    </li>
                    <li>
                        <Link to='/Bac-2'>Bac 2</Link>
                    </li>
                </ul>
            </nav>
        </>
    )
}

export default StudentHome