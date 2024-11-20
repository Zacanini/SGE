import React, { Children, useEffect, useState } from "react";
import {
  getAllMovimentacoes,
  createMovimentacao,
} from "../services/movimentacaoService";
import { Navbar } from "../components/Navbar/Navbar";
import { Header } from "../components/Header/Header";

const Movimentacao = () => {
  const [movimentacoes, setMovimentacoes] = useState([]);
  const [newMovimentacao, setNewMovimentacao] = useState({
    ProdutoId: "",
    Quantidade: 0,
    Tipo: "entrada",
  });

  useEffect(() => {
    fetchMovimentacoes();
  }, []);

  const fetchMovimentacoes = async () => {
    const data = await getAllMovimentacoes();
    setMovimentacoes(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createMovimentacao(newMovimentacao);
    fetchMovimentacoes();
    setNewMovimentacao({ ProdutoId: "", Quantidade: 0, Tipo: "entrada" });
  };

  return (
    <>
      <Navbar />
      <Header>
        <h1>Movimentações</h1>
        <form onSubmit={handleSubmit}>
          <input
            placeholder="ID do Produto"
            value={newMovimentacao.ProdutoId}
            onChange={(e) =>
              setNewMovimentacao({
                ...newMovimentacao,
                ProdutoId: e.target.value,
              })
            }
          />
          <input
            type="number"
            placeholder="Quantidade"
            value={newMovimentacao.Quantidade}
            onChange={(e) =>
              setNewMovimentacao({
                ...newMovimentacao,
                Quantidade: e.target.value,
              })
            }
          />
          <input
            placeholder="Tipo"
            value={newMovimentacao.Tipo}
            onChange={(e) =>
              setNewMovimentacao({ ...newMovimentacao, Tipo: e.target.value })
            }
          />
          <button type="submit">Adicionar Movimentação</button>
        </form>
        <ul>
          {Array.isArray(movimentacoes) &&
            movimentacoes.map((movimentacao) => (
              <li
                key={movimentacao.Id}
              >{`Produto ID: ${movimentacao.ProdutoId}, Tipo: ${movimentacao.Tipo}, Quantidade: ${movimentacao.Quantidade}`}</li>
            ))}
        </ul>
      </Header>
    </>
  );
};

export default Movimentacao;
