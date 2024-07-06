import { FaSignInAlt, FaSignOutAlt, FaUser } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'

function Header() {

  const navigate = useNavigate();

  function logout() {
    localStorage.clear();

    navigate('/')
  }

  function NavBar() {  
    let isLoggedIn = localStorage.getItem('isLoggedIn')
    let role = localStorage.getItem('role')

    let res = []
    
    if (isLoggedIn === false) {
      res.push(
        <>
          <div className='logo'>
          <Link to='/login'>Accueil</Link>
          </div>
          <ul>
            <li>
              <Link to='/login'>
                <FaSignInAlt /> Se Connecter
              </Link>
            </li>
          </ul>
        </>
      )
    }
    else if (role ==='1') {
      res.push(
        <>
          <div className='logo'>
            <Link to='/professor/home'>Page d'accueil</Link>
          </div>
          <ul>
            <li>
              <Link to='/login' onClick={logout}>
                <FaSignOutAlt /> Se Deconnecter
              </Link>
            </li>
          </ul>
        </>
      )
    }
    else if (role ==='2') {
      res.push(
        <>
          <div className='logo'>
            <Link to='/student/home'>Page d'accueil</Link>
          </div>
          <ul>
            <li>
              <Link to='/login' onClick={logout}>
                <FaSignOutAlt /> Se Deconnecter
              </Link>
            </li>
          </ul>
        </>
      )
    }
    else if (role ==='3') {
      res.push(
        <>
          <div className='logo'>
            <Link to='/admin/home'>Page d'accueil</Link>
          </div>
          <ul>
            <li>
              <Link to='/login' onClick={logout}>
                <FaSignOutAlt /> Se Deconnecter
              </Link>
            </li>
          </ul>
        </>
      )
    }

    return res
  }

  return (
    <header className='header'>
      <NavBar/>
    </header>
  )
}

export default Header
