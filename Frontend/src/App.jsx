/* react router dom */
import {BrowserRouter,Routes,Route} from 'react-router-dom';

/* context */
import { AuthProvider } from './context/AuthContext.jsx';
import { CartProvider } from './context/CartContext.jsx';
/* componentes reutilizados */
import {Footer} from './components/Footer/Footer.jsx'
import {Navbar} from './components/Navbar/Navbar.jsx'
/* componentes publicos  publicas que podran ver todos las personas */
import { Home } from './pages/Home.jsx';
import LoginPage from './pages/LoginPage';
import TareasPage from './pages/TareasPage.jsx';
import ProtectedRoute from './ProtectedRoute.jsx';
import { Shop } from './pages/Shop.jsx';
import { Product } from './pages/Product.jsx';
import { Cart } from './pages/Cart.jsx';
import { Contact } from './pages/Contact.jsx';

/* ------------------------------------------------------------ */

function App() {
  return (
    <AuthProvider>
      <CartProvider>
      <BrowserRouter>
          <Navbar/>
          <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/login' element={<LoginPage/>}/>
            <Route path='/shop' element={<Shop/>}/>
            <Route path='/shop/:id' element={<Product/>}/>
            <Route path='/cart' element={<Cart/>}/>
            <Route path='/contact' element={<Contact/>}/>
          






            {/* rutas protegoidasasas */}
            <Route element={<ProtectedRoute/>}>
              <Route path='/tareas' element={<TareasPage/>}/>
            </Route>

          </Routes>
            <Footer/>
      </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  )
}

export default App
