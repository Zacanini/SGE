import React, { useEffect, useState } from 'react';
import { getAllCategorias, createCategoria } from '../services/categoriaService';
import { Navbar } from "../components/Navbar/Navbar";
import { Header } from "../components/Header/Header";

const Categoria = () => {
    const [categorias, setCategorias] = useState([]);
    const [newCategoria, setNewCategoria] = useState({ Nome: '' });

    useEffect(() => {
        fetchCategorias();
    }, []);

    const fetchCategorias = async () => {
        const data = await getAllCategorias();
        setCategorias(data);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await createCategoria(newCategoria);
        fetchCategorias();
        setNewCategoria({ Nome: '' });
    };

    return (
        <>
        <Navbar />
        <Header>
            <h1>Categorias</h1>
            <form onSubmit={handleSubmit}>
                <input placeholder="Nome da Categoria" value={newCategoria.Nome} onChange={(e) => setNewCategoria({ Nome: e.target.value })} />
                <button type="submit">Adicionar Categoria</button>
            </form>
            <ul>
                {Array.isArray(categorias) && categorias.map(categoria=> (
                    <li key={categoria.Id}>{categoria.Nome}</li>
                ))}
            </ul>
        </Header>
        </>
    );
};

export default Categoria;