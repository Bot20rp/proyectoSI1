import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

/* context */
import { AuthProvider } from "./context/AuthContext.jsx";
import { CartProvider } from "./context/CartContext.jsx";
/* componentes reutilizados */
import { Footer } from "./components/Footer/Footer.jsx";
import { Navbar } from "./components/Navbar/Navbar.jsx";
/* componentes publicos  publicas que podran ver todos las personas */
import { Home } from "./pages/Home.jsx";
import LoginPage from "./pages/LoginPage";
import ProtecComponente from "./ProtecComponente.jsx";
import { Shop } from "./pages/Shop.jsx";
import { Product } from "./pages/Product.jsx";
import { Cart } from "./pages/Cart.jsx";
import { Contact } from "./pages/Contact.jsx";
import RegisterClientPage from './pages/RegisterClientPage.jsx'
/* componente protegisdo */
import { Homed } from "./components/HomeD/Homed.jsx";
/* ------------------------------------------------------------ */

function Main() {
  const location = useLocation(); 

  
  const isDashboardRoute = location.pathname.startsWith("/dasboard");

  return (
    <>
      
    {/*   {!isDashboardRoute && <Navbar />} */}
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/shop/:id" element={<Product />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/clientRegister" element={<RegisterClientPage />} />
        <Route path="/dasboard/*" element={<ProtecComponente component={Homed} />} />
      </Routes>
      {!isDashboardRoute && <Footer />}
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <BrowserRouter>
          <Main />
        </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;