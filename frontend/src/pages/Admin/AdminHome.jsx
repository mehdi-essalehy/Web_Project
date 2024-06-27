import { Link } from 'react-router-dom'

function AdminHome() {
    return (
        <>
            <h1>This is the Admin home page</h1>
            <nav>
                <ul>
                    <li>
                        <Link to='/createNewProfessor'>Create Professor</Link>
                    </li>
                    <li>
                        <Link to='/createNewStudent'>Create Student</Link>
                    </li>
                    <li>
                        <Link to='/createNewAdmin'>Create Admin</Link>
                    </li>
                </ul>
            </nav>
        </>
    )
}

export default AdminHome