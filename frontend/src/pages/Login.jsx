import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Login() {

  const [formData, setFormData] = useState({
      user_id: '',
      password: '',
      role: '',
  })  
    
  const { user_id, password, role } = formData

  const navigate = useNavigate()
  
  const onChange = (e) => {
      setFormData((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.value,
      }))
  }
  
  const onSubmit = (e) => {
      e.preventDefault()
  
      const userData = {
        user_id,
        password,
        role,
      }

      fetch('http://localhost:3500/login', {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify(userData),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.message === 'success' && data.role === '1') {
            localStorage.setItem('isLoggedIn', true)
            localStorage.setItem('jwt-token', data.token)
            localStorage.setItem('user_id', data.user_id)
            localStorage.setItem('role', data.role)
            navigate('/professor/home')
          } else if (data.message === 'success' && data.role === '2') {
            localStorage.setItem('jwt-token', data.token)
            localStorage.setItem('user_id', data.user_id)
            localStorage.setItem('role', data.role)
            navigate('/student/home')
          } else if (data.message === 'success'  && data.role === '3') {
            localStorage.setItem('jwt-token', data.token)
            localStorage.setItem('user_id', data.user_id)
            localStorage.setItem('role', data.role)
            navigate('/admin/home')
          } else {
            navigate('/400')
          }
        })
  }

  return (
      <>
        <section className='form'>
          <form onSubmit={onSubmit}>
            <legend>Connectez vous à votre compte</legend>
            <div className='form-group'>
              <input
                type='number'
                className='form-control'
                id='user_id'
                name='user_id'
                value={user_id}
                placeholder='Rentrez votre identifiant'
                onChange={onChange}
              />
            </div>
            <div className='form-group'>
              <input
                type='password'
                className='form-control'
                id='password'
                name='password'
                value={password}
                placeholder='Rentrez votre mot de passe'
                onChange={onChange}
              />
            </div>
            <div className='form-control'>
              <label htmlFor="professor"  className="form-control">
              <input
                type='radio'
                className='form-control'
                id='professor'
                name='role'
                value='1'
                onChange={onChange}
              />Professeur</label><br />
              <label htmlFor="student"  className="form-control">
              <input
                type='radio'
                className='form-control'
                id='student'
                name='role'
                value='2'
                onChange={onChange}
              />Etudiant</label><br />
              <label htmlFor="admin"  className="form-control">
              <input
                type='radio'
                className='form-control'
                id='admin'
                name='role'
                value='3'
                onChange={onChange}
              />Administrateur</label><br />
            </div>
            <div className='form-group'>
              <button type='submit' className='btn btn-block'>
                Soumettre
              </button>
            </div>
          </form>
        </section>
      </>
  )   
}

export default Login
