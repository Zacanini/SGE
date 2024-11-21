import React, { useEffect, useState } from 'react';
import { getAllUsuarios, createUsuario, deleteUsuario } from '../services/usuarioService';
import { Navbar } from "../components/Navbar/Navbar";
import { Header } from "../components/Header/Header";
import { Container, TextField, Button, MenuItem, Select, InputLabel, FormControl, Box, Typography, List, ListItem, ListItemText, Modal, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const Usuario = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [newUsuario, setNewUsuario] = useState({ Nome: '', Email: '', SenhaHash: '', Role: 'funcionario' });
  const [modalOpen, setModalOpen] = useState(false);
  const [modalSearchTerm, setModalSearchTerm] = useState('');

  useEffect(() => {
    fetchUsuarios();
  }, []);

  const fetchUsuarios = async () => {
    try {
      const data = await getAllUsuarios();
      setUsuarios(data.$values || []);
    } catch (error) {
      console.error("Erro ao buscar usuários:", error);
      setUsuarios([]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createUsuario(newUsuario);
      fetchUsuarios();
      setNewUsuario({ Nome: '', Email: '', SenhaHash: '', Role: 'funcionario' });
      alert("Usuário adicionado com sucesso!");
    } catch (error) {
      console.error("Erro ao criar usuário:", error);
    }
  };

  const handleModalSearch = (e) => {
    setModalSearchTerm(e.target.value);
  };

  const handleDelete = async (id) => {
    const senha = prompt("Digite a senha para confirmar a exclusão:");
    if (senha === "senha123") { // Substitua "senha123" pela senha correta
      try {
        await deleteUsuario(id);
        fetchUsuarios();
        alert("Usuário deletado com sucesso!");
      } catch (error) {
        console.error("Erro ao deletar usuário:", error);
      }
    } else {
      alert("Senha incorreta!");
    }
  };

  const filteredModalUsuarios = usuarios.filter(usuario =>
    usuario.nome && usuario.nome.toLowerCase().includes(modalSearchTerm.toLowerCase())
  );

  return (
    <>
      <Navbar />
      <Header>
        <Container maxWidth="md">
          <Typography variant="h4" component="h1" gutterBottom>
            Usuários
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              label="Nome"
              variant="outlined"
              value={newUsuario.Nome}
              onChange={(e) => setNewUsuario({ ...newUsuario, Nome: e.target.value })}
              fullWidth
              InputProps={{
                style: { backgroundColor: 'white' },
              }}
            />
            <TextField
              label="Email"
              variant="outlined"
              value={newUsuario.Email}
              onChange={(e) => setNewUsuario({ ...newUsuario, Email: e.target.value })}
              fullWidth
              InputProps={{
                style: { backgroundColor: 'white' },
              }}
            />
            <TextField
              label="Senha"
              type="password"
              variant="outlined"
              value={newUsuario.SenhaHash}
              onChange={(e) => setNewUsuario({ ...newUsuario, SenhaHash: e.target.value })}
              fullWidth
              InputProps={{
                style: { backgroundColor: 'white' },
              }}
            />
            <FormControl variant="outlined" fullWidth>
              <InputLabel>Role</InputLabel>
              <Select
                value={newUsuario.Role}
                onChange={(e) => setNewUsuario({ ...newUsuario, Role: e.target.value })}
                label="Role"
                style={{ backgroundColor: 'white' }}
              >
                <MenuItem value="funcionario">Funcionário</MenuItem>
                <MenuItem value="gerente">Gerente</MenuItem>
              </Select>
            </FormControl>
            <Button type="submit" variant="contained" color="primary">
              Adicionar Usuário
            </Button>
          </Box>
          <Box sx={{ mt: 4 }}>
            <Button onClick={() => setModalOpen(true)} variant="contained" color="primary" sx={{ mt: 2 }}>
              Buscar Usuários
            </Button>
          </Box>
        </Container>
      </Header>

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '80%', bgcolor: 'background.paper', boxShadow: 24, p: 4 }}>
          <Typography id="modal-title" variant="h6" component="h2">
            Lista de Usuários
          </Typography>
          <TextField
            label="Buscar Usuário"
            variant="outlined"
            value={modalSearchTerm}
            onChange={handleModalSearch}
            fullWidth
            InputProps={{
              style: { backgroundColor: 'white' },
            }}
            sx={{ mt: 2, mb: 2 }}
          />
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Nome</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Role</TableCell>
                  <TableCell>Ações</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredModalUsuarios.map((usuario) => (
                  <TableRow key={usuario.id}>
                    <TableCell>{usuario.nome}</TableCell>
                    <TableCell>{usuario.email}</TableCell>
                    <TableCell>{usuario.role}</TableCell>
                    <TableCell>
                      <Button variant="contained" color="secondary" onClick={() => handleDelete(usuario.id)}>
                        Deletar
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Modal>
    </>
  );
};

export default Usuario;