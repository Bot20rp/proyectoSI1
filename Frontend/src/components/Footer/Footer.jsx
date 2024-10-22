import logo from '../../assets/react.svg'
import './Footer.css'
export const Footer = () => {
  return (
    <>
        <footer>
            <div className='footerr-fila'>
                {/* primera columnaaa */}
            <div className="footerr-col1">
                <div className="logo">
                  {/*   <img src={logo} alt="logo_licoreria_bunker" /> */}
                    <h1>EL BUNKER</h1>

                </div>
                
                <p>Disfruta responsablemente - no compartas este contenido con menores de edad. Tomar bebidas alcoholicas en exceso es dañino.</p>
            </div>
            {/* segunda coluna  */}
            <div className='footerr-col2'> 
                <h2>Sobre El BUNKER</h2>
                <ul>
                    <li>info@bunker.com.bo</li>
                    <li>Aviso de Privacidad</li>
                    <li>Ternino de uso</li>
                    
                </ul>
            </div>

            {/* tercera  columnaaaa */}
            <div className='footerr-col3'>
                <h2>Contactanos</h2>
                <ul>
                    <li>calle chuquisaca Nª121 , Zona challampa</li>
                    <li>Correo: LicoBunker@gmail.com</li>
                    <li>telefono : 12345678</li>

                </ul>
            </div>

            </div>

        </footer>

    </>
  )
}
