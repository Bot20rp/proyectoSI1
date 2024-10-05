import {BrowserRouter,Routes,Route} from 'react-router-dom';
import { AuthProvider } from './context/AuthContext.jsx';
import LoginPage from './pages/LoginPage';
import TareasPage from './pages/TareasPage.jsx';
import ProtectedRoute from './ProtectedRoute.jsx';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
          <Routes>
            <Route path='/login' element={<LoginPage/>}/>

            <Route element={<ProtectedRoute/>}>
              <Route path='/tareas' element={<TareasPage/>}/>
            </Route>
          </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
