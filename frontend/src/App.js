import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Login from './pages/Login'
import ProfessorHome from './pages/Professor/ProfessorHome'
import ProfessorData from './pages/Professor/ProfessorData'
import ProfessorClasses from './pages/Professor/ProfessorClasses'
import ProfessorClass from './pages/Professor/ProfessorClass'
import ProfessorUpdateClass from './pages/Professor/ProfessorUpdateClass'
import ProfessorUpdateClassV2 from './pages/Professor/ProfessorUpdateClassV2'
import StudentHome from './pages/Student/StudentHome';
import StudentData from './pages/Student/StudentData';
import StudentClasses from './pages/Student/StudentClasses';
import StudentUpdateClass from './pages/Student/StudentUpdateClass';
import TroncCommun from './pages/Student/StudentTroncCommun';
import Bac1 from './pages/Student/StudentBac1';
import Bac2 from './pages/Student/StudentBac2';
import StudentEnroll from './pages/Student/StudentEnroll';
import AdminHome from './pages/Admin/AdminHome';
import CreateProf from './pages/Admin/CreateProf';
import CreateStudent from './pages/Admin/CreateStudent';
import CreateAdmin from './pages/Admin/CreateAdmin';
import CreateClass from './pages/Admin/CreateClass';
import AddStudentToClass from './pages/Admin/AddStudentToClass';

function App() {

  return (
    <>
      <Router>
        <div className='container'>
          <Header />
          <Routes>
            <Route path='/' element={<Login />} />
            <Route path='/login' element={<Login />} />

            <Route path='/professor/home'  element={<ProfessorHome />} />
            <Route path='/professor/profile' element={<ProfessorData />} />
            <Route path='/professor/classes' element={<ProfessorClasses />} />
            <Route path='/professor/class/:classID' element={<ProfessorClass />}/>
            <Route path='/professor/updateClass/:classID' element={<ProfessorUpdateClass />}/>
            <Route path='/professor/updateClass/:classID/:studentID' element={<ProfessorUpdateClassV2 />} />

            <Route path='/student/home'  element={<StudentHome />} />
            <Route path='/student/profile'  element={<StudentData />} />
            <Route path='/student/classes' element={<StudentClasses />}/>
            <Route path='/student/updateClass/:classID' element={<StudentUpdateClass />} />
            <Route path='/student/Tronc-Commun' element={<TroncCommun />} />
            <Route path='/student/Bac-1' element={<Bac1 />} />
            <Route path='/student/Bac-2' element={<Bac2 />} />
            <Route path='/student/Enroll' element={<StudentEnroll />} />

            <Route path='/admin/home'  element={<AdminHome />} />
            <Route path='/admin/createProf' element={<CreateProf />} />
            <Route path='/admin/createStudent' element={<CreateStudent />} />
            <Route path='/admin/createAdmin' element={<CreateAdmin />} />
            <Route path='/admin/createClass' element={<CreateClass />} />
            <Route path='/admin/AddStudentToClass' element={<AddStudentToClass />} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
