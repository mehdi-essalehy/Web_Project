import { FaSignInAlt, FaSignOutAlt, FaUser } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'

function Header() {
  const navigate = useNavigate()

  return (
    <header className='header'>
      <div className='logo'>
        <Link to='/'>Application</Link>
      </div>
      <ul>
        <li>
          <Link to='/login'>
            <FaSignInAlt /> Login
          </Link>
        </li>
      </ul>
    </header>
  )
}

export default Header
