import systemLogo from '../../assets/logo.svg'
import './Navbar.css'

export function Navbar() {
    return (
        <nav className='navbar'>
            <img src={systemLogo} alt="Logotipo do sistema" />
            <h1 style={{textAlign:'initial'}}>ZACANINI SYSTEMS <br /> gerenciamento de estoque</h1>
        </nav>
    );
}