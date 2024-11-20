import React, { useEffect, useState } from 'react';
import { getAllUsuarios, createUsuario } from '../services/usuarioService';
import { Navbar } from "../components/Navbar/Navbar";
import { Header } from "../components/Header/Header";

const Usuario = () => {
    const [usuarios, setUsuarios] = useState([]);
    const [newUsuario, setNewUsuario] = useState({ Nome: '', Email: '', SenhaHash: '', Role: 'user' });

    useEffect(() => {
        fetchUsuarios();
    }, []);

    const fetchUsuarios = async () => {
        const data = await getAllUsuarios();
        setUsuarios(data);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await createUsuario(newUsuario);
        fetchUsuarios();
        setNewUsuario({ Nome: '', Email: '', SenhaHash: '', Role: 'user' });
    };

    return (
        <>
        <Navbar />
        <Header>
            <h1>Usuários</h1>
            <form onSubmit={handleSubmit}>
                <input placeholder="Nome" value={newUsuario.Nome} onChange={(e) => setNewUsuario({ ...newUsuario, Nome: e.target.value })} />
                <input placeholder="Email" value={newUsuario.Email} onChange={(e) => setNewUsuario({ ...newUsuario, Email: e.target.value })} />
                <input placeholder="Senha" type="password" value={newUsuario.SenhaHash} onChange={(e) => setNewUsuario({ ...newUsuario, SenhaHash: e.target.value })} />
                <button type="submit">Adicionar Usuário</button>
            </form>
            <ul>
                {Array.isArray(usuarios) && usuarios.map(usuario => (
                    <li key={usuario.Id}>{usuario.Nome} - {usuario.Email}</li>
                ))}
            </ul>
        </Header>
        </>
    );
};

export default Usuario;