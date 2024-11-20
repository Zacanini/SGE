import systemLogo from '../../assets/logo.svg'
import './Navbar.css'

export function Navbar() {
    return (
        <nav className='navbar'>
            <img src={systemLogo} alt="Logotipo do sistema" />
            <h1>Sistema de Gerenciamento de Estoque</h1>
        </nav>
    );
}