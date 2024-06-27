import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Login from './pages/Login'
import ProfessorHome from './pages/Professor/ProfessorHome'
import ProfessorData from './pages/Professor/ProfessorData'
import ProfessorClasses from './pages/Professor/ProfessorClasses'
import StudentHome from './pages/Student/StudentHome';
import AdminHome from './pages/Admin/AdminHome';


function App() {
  return (
    <>
      <Router>
        <div className='container'>
          <Header />
          <Routes>
            <Route path='/login' element={<Login />} />

            <Route path='/professor/home'  element={<ProfessorHome />} />
            <Route path='/professor/profile' element={<ProfessorData />} />
            <Route path='/professor/classes' element={<ProfessorClasses />} />

            <Route path='/student/home'  element={<StudentHome />} />

            <Route path='/admin/home'  element={<AdminHome />} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
