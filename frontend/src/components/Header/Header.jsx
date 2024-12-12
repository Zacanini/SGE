import React, { useContext } from "react";
import { Home, Category, Store, SwapHoriz, People } from "@mui/icons-material";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import "./Header.css";

export function Header({ children }) {
  const { user, isGerente } = useContext(AuthContext);

  return (
    <div className="headerContainer">
      <div className="navButtons">
        <NavLink to="/home" title="Home" className={({ isActive }) => isActive ? "navlink active" : "navlink"}>
          <Home className="icon" />
          Home page
        </NavLink>
        <NavLink to="/categorias" title="Categorias" className={({ isActive }) => isActive ? "navlink active" : "navlink"}>
          <Category className="icon" />
          Categorias
        </NavLink>
        <NavLink to="/produtos" title="Produtos" className={({ isActive }) => isActive ? "navlink active" : "navlink"}>
          <Store className="icon" />
          Produtos
        </NavLink>
        <NavLink to="/movimentacoes" title="Movimentações" className={({ isActive }) => isActive ? "navlink active" : "navlink"}>
          <SwapHoriz className="icon" />
          Movimentações
        </NavLink>
        {isGerente && (
          <NavLink to="/usuarios" title="Usuários" className={({ isActive }) => isActive ? "navlink active" : "navlink"}>
            <People className="icon" />
            Usuários
          </NavLink>
        )}
      </div>
      <header className="content">
        {user && (
          <div className="welcomeMessage">
            <h1>{isGerente ? "GERENTE" : "FUNCIONÁRIO"}</h1>
            <p>Olá, {user.nome}! Seja Bem Vindo</p>
          </div>
        )}
        {children}
      </header>
    </div>
  );
}