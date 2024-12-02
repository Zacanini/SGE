import React, { useEffect, useState } from 'react';
import { getAllCategorias, createCategoria, deleteCategoria } from '../services/categoriaService';
import { getAllSubCategorias, createSubCategoria, deleteSubCategoria } from '../services/subCategoriaService';
import { getAllProdutos } from '../services/produtoService';
import { Navbar } from "../components/Navbar/Navbar";
import { Header } from "../components/Header/Header";
import { Container, TextField, Button, Box, Typography, List, ListItem, ListItemText, Popover, Modal, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import ListIcon from '@mui/icons-material/List';
import CategoryIcon from '@mui/icons-material/Category';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteIcon from '@mui/icons-material/Delete';

const Categoria = () => {
  const [categorias, setCategorias] = useState([]);
  const [subCategorias, setSubCategorias] = useState([]);
  const [produtos, setProdutos] = useState([]);
  const [newCategoria, setNewCategoria] = useState({ Nome: '' });
  const [newSubCategoria, setNewSubCategoria] = useState({ Nome: '', CategoriaId: '' });
  const [anchorEl, setAnchorEl] = useState(null);
  const [countModalOpen, setCountModalOpen] = useState(false);
  const [categoryCounts, setCategoryCounts] = useState([]);
  const [selectedCategoria, setSelectedCategoria] = useState(null);
  const [produtoModalOpen, setProdutoModalOpen] = useState(false);

  useEffect(() => {
    fetchCategorias();
    fetchSubCategorias();
    fetchProdutos();
  }, []);

  const fetchCategorias = async () => {
    const data = await getAllCategorias();
    setCategorias(data.$values || []);
  };

  const fetchSubCategorias = async () => {
    const data = await getAllSubCategorias();
    setSubCategorias(data.$values || []);
  };

  const fetchProdutos = async () => {
    const data = await getAllProdutos();
    setProdutos(data.$values || []);
  };

  const handleSubmitCategoria = async (e) => {
    e.preventDefault();
    try {
      await createCategoria(newCategoria);
      fetchCategorias();
      setNewCategoria({ Nome: '' });
      alert("Categoria adicionada com sucesso!");
    } catch (error) {
      console.error("Erro ao adicionar categoria", error);
    }
  };

  const handleSubmitSubCategoria = async (e) => {
    e.preventDefault();
    try {
      await createSubCategoria(newSubCategoria);
      fetchSubCategorias();
      setNewSubCategoria({ Nome: '', CategoriaId: '' });
      alert("SubCategoria adicionada com sucesso!");
    } catch (error) {
      console.error("Erro ao adicionar subcategoria", error);
    }
  };

  const handleChangeCategoria = (e) => {
    const { name, value } = e.target;
    setNewCategoria({ ...newCategoria, [name]: value });
  };

  const handleChangeSubCategoria = (e) => {
    const { name, value } = e.target;
    setNewSubCategoria({ ...newSubCategoria, [name]: value });
  };

  const handleSelectCategoria = (e) => {
    setNewSubCategoria({ ...newSubCategoria, CategoriaId: e.target.value });
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleCountClick = () => {
    const counts = categorias.map(categoria => {
      const count = produtos.filter(produto => produto.categoriaId === categoria.id).length;
      return { ...categoria, count };
    });

    setCategoryCounts(counts);
    setCountModalOpen(true);
  };

  const handleCountClose = () => {
    setCountModalOpen(false);
  };

  const handleProdutoClick = (categoria) => {
    setSelectedCategoria(categoria);
    setProdutoModalOpen(true);
  };

  const handleProdutoClose = () => {
    setProdutoModalOpen(false);
  };

  const handleDeleteCategoria = async (id) => {
    try {
      await deleteCategoria(id);
      fetchCategorias();
      alert("Categoria deletada com sucesso!");
    } catch (error) {
      console.error("Erro ao deletar categoria", error);
    }
  };

  const handleDeleteSubCategoria = async (id) => {
    try {
      await deleteSubCategoria(id);
      fetchSubCategorias();
      alert("SubCategoria deletada com sucesso!");
    } catch (error) {
      console.error("Erro ao deletar subcategoria", error);
    }
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <>
      <Navbar />
      <Header>
        <Container maxWidth="md">
          <Typography variant="h4" component="h1" gutterBottom>
            Categorias
          </Typography>
          <Box component="form" onSubmit={handleSubmitCategoria} sx={{ display: 'flex', flexDirection: 'column', gap: 2, backgroundColor: '#f5f5f5', padding: 3, borderRadius: 2 }}>
            <TextField
              label="Nome da Categoria"
              variant="outlined"
              name="Nome"
              value={newCategoria.Nome}
              onChange={handleChangeCategoria}
              fullWidth
              InputProps={{
                style: { backgroundColor: 'white' },
              }}
            />
            <Button startIcon={<AddIcon />} type="submit" variant="contained" color="primary">
              Adicionar Categoria
            </Button>
          </Box>
          <Box component="form" onSubmit={handleSubmitSubCategoria} sx={{ display: 'flex', flexDirection: 'column', gap: 2, backgroundColor: '#f5f5f5', padding: 3, borderRadius: 2, mt: 4 }}>
            <TextField
              label="Nome da SubCategoria"
              variant="outlined"
              name="Nome"
              value={newSubCategoria.Nome}
              onChange={handleChangeSubCategoria}
              fullWidth
              InputProps={{
                style: { backgroundColor: 'white' },
              }}
            />
            <FormControl fullWidth>
              <InputLabel id="categoria-select-label">Categoria</InputLabel>
              <Select
                labelId="categoria-select-label"
                value={newSubCategoria.CategoriaId}
                label="Categoria"
                onChange={handleSelectCategoria}
              >
                {categorias.map((categoria) => (
                  <MenuItem key={categoria.id} value={categoria.id}>
                    {categoria.nome}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Button startIcon={<AddIcon />} type="submit" variant="contained" color="primary">
              Adicionar SubCategoria
            </Button>
          </Box>
          <Box sx={{ mt: 4 }}>
            <Button startIcon={<ListIcon />} onClick={handleClick} variant="contained" color="primary">
              Ver Categorias
            </Button>
            <Button startIcon={<CategoryIcon />} onClick={handleCountClick} variant="contained" color="primary" sx={{ ml: 2 }}>
              Contagem de Produtos por Categoria
            </Button>
          </Box>
        </Container>
      </Header>

      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <Box sx={{ width: '500px', maxHeight: '400px', overflowY: 'auto', bgcolor: '#f5f5f5', p: 2, borderRadius: 2 }}>
          <Typography id="modal-title" variant="h6" component="h2" sx={{ color: 'black' }}>
            Lista de Categorias
          </Typography>
          <List>
            {Array.isArray(categorias) && categorias.map((categoria) => (
              <ListItem key={categoria.id} secondaryAction={
                <Button startIcon={<DeleteIcon />} variant="contained" color="secondary" onClick={() => handleDeleteCategoria(categoria.id)}>
                  Deletar
                </Button>
              }>
                <ListItemText primary={categoria.nome} sx={{ color: 'black' }} />
                <List>
                  {Array.isArray(subCategorias) && subCategorias.filter(sub => sub.CategoriaId === categoria.id).map((subCategoria) => (
                    <ListItem key={subCategoria.id} secondaryAction={
                      <Button startIcon={<DeleteIcon />} variant="contained" color="secondary" onClick={() => handleDeleteSubCategoria(subCategoria.id)}>
                        Deletar
                      </Button>
                    }>
                      <ListItemText primary={subCategoria.nome} sx={{ color: 'black' }} />
                    </ListItem>
                  ))}
                </List>
              </ListItem>
            ))}
          </List>
        </Box>
      </Popover>

      <Modal
        open={countModalOpen}
        onClose={handleCountClose}
        aria-labelledby="count-modal-title"
        aria-describedby="count-modal-description"
      >
        <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '50%', maxHeight: '50vh', overflowY: 'auto', bgcolor: '#f5f5f5', boxShadow: 24, p: 4, borderRadius: 2 }}>
          <Typography id="count-modal-title" variant="h6" component="h2">
            Contagem de Produtos por Categoria
          </Typography>
          <List>
            {categoryCounts.map((categoria) => (
              <ListItem key={categoria.id}>
                <ListItemText primary={`${categoria.nome}: ${categoria.count} produtos`} sx={{ color: 'black' }} />
                <Button startIcon={<VisibilityIcon />} variant="contained" color="primary" onClick={() => handleProdutoClick(categoria)}>
                  Ver Produtos
                </Button>
              </ListItem>
            ))}
          </List>
        </Box>
      </Modal>

      <Modal
        open={produtoModalOpen}
        onClose={handleProdutoClose}
        aria-labelledby="produto-modal-title"
        aria-describedby="produto-modal-description"
      >
        <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '50%', maxHeight: '50vh', overflowY: 'auto', bgcolor: '#f5f5f5', boxShadow: 24, p: 4, borderRadius: 2 }}>
          <Typography id="produto-modal-title" variant="h6" component="h2">
            Produtos da Categoria: {selectedCategoria && selectedCategoria.nome}
          </Typography>
          <List>
            {selectedCategoria && produtos.filter(produto => produto.categoriaId === selectedCategoria.id).map((produto) => (
              <ListItem key={produto.id}>
                <ListItemText primary={`${produto.nome} - Estoque Atual: ${produto.estoqueAtual}`} sx={{ color: 'black' }} />
              </ListItem>
            ))}
          </List>
        </Box>
      </Modal>
    </>
  );
};

export default Categoria;