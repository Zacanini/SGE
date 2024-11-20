import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Produto from './pages/Produto';
import Categoria from './pages/Categoria';
import Movimentacao from './pages/Movimentacao';
import Usuario from './pages/Usuario';
import './global.css';
import Home from './pages/Home';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/produtos" element={<Produto />} />
                <Route path="/categorias" element={<Categoria />} />
                <Route path="/movimentacoes" element={<Movimentacao />} />
                <Route path="/usuarios" element={<Usuario />} />
                <Route path="/" element={<Home />} />
            </Routes>
        </Router>
    );
};

export default App;