import React, { useEffect, useState, useContext } from "react";
import { getAllCategorias } from "../services/categoriaService";
import { getAllSubCategorias } from "../services/subCategoriaService";
import { getAllProdutos, createProduto, deleteProduto, updateProduto } from "../services/produtoService";
import { createMovimentacao } from "../services/movimentacaoService"; // Importar a função de criação de movimentação
import { Navbar } from "../components/Navbar/Navbar";
import { Header } from "../components/Header/Header";
import { AuthContext } from "../contexts/AuthContext";
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import UpdateIcon from '@mui/icons-material/Update';
import { Container, TextField, Button, MenuItem, Select, InputLabel, FormControl, Box, Typography, Modal, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const Produto = () => {
  const { isGerente } = useContext(AuthContext);
  const [produtos, setProdutos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [subCategorias, setSubCategorias] = useState([]);
  const [filteredSubCategorias, setFilteredSubCategorias] = useState([]);
  const [newProduto, setNewProduto] = useState({
    Codigo: "",
    Nome: "",
    Descricao: "",
    Preco: "",
    EstoqueAtual: 0,
    EstoqueMinimo: 0,
    CategoriaId: "",
    SubCategoriaId: ""
  });
  const [modalOpen, setModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [modalSearchTerm, setModalSearchTerm] = useState('');
  const [selectedProduto, setSelectedProduto] = useState({
    id: "",
    Codigo: "",
    Nome: "",
    Descricao: "",
    Preco: "",
    EstoqueAtual: 0,
    EstoqueMinimo: 0,
    CategoriaId: "",
    SubCategoriaId: ""
  });

  useEffect(() => {
    fetchProdutos();
    fetchCategorias();
    fetchSubCategorias();
  }, []);

  const fetchProdutos = async () => {
    try {
      const data = await getAllProdutos();
      setProdutos(data.$values || []);
    } catch (erro) {
      console.error("Erro ao buscar produtos", erro);
      setProdutos([]);
    }
  };

  const fetchCategorias = async () => {
    try {
      const data = await getAllCategorias();
      setCategorias(data.$values || []);
    } catch (error) {
      console.error("Erro ao buscar categorias", error);
    }
  };

  const fetchSubCategorias = async () => {
    try {
      const data = await getAllSubCategorias();
      setSubCategorias(data.$values || []);
    } catch (error) {
      console.error("Erro ao buscar subcategorias", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const senha = prompt("Digite a senha para confirmar a adição:");
    if (senha === "senha123") { // Substitua "senha123" pela senha correta
      try {
        const produtoCriado = await createProduto(newProduto);
        fetchProdutos();
        setNewProduto({
          Codigo: "",
          Nome: "",
          Descricao: "",
          Preco: "",
          EstoqueAtual: 0,
          EstoqueMinimo: 0,
          CategoriaId: "",
          SubCategoriaId: ""
        });
        alert("Produto adicionado com sucesso!");

        // Criar uma movimentação de entrada
        const movimentacao = {
          ProdutoId: produtoCriado.id,
          Quantidade: produtoCriado.estoqueAtual,
          Tipo: "entrada",
          Data: new Date().toISOString()
        };
        await createMovimentacao(movimentacao);
        alert("Movimentação de entrada criada com sucesso!");
      } catch (error) {
        console.error("Erro ao adicionar produto", error);
      }
    } else {
      alert("Senha incorreta!");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewProduto({ ...newProduto, [name]: value });
  };

  const handleSelectCategoria = (e) => {
    const categoriaId = e.target.value;
    setNewProduto({ ...newProduto, CategoriaId: categoriaId, SubCategoriaId: '' });
    setFilteredSubCategorias(subCategorias.filter(sub => sub.categoriaId === categoriaId));
  };

  const handleSelectSubCategoria = (e) => {
    const subCategoriaId = e.target.value;
    setNewProduto({ ...newProduto, SubCategoriaId: subCategoriaId });
  };

  const handleDelete = async (id) => {
    const senha = prompt("Digite a senha para confirmar a exclusão:");
    if (senha === "senha123") { // Substitua "senha123" pela senha correta
      try {
        await deleteProduto(id);
        fetchProdutos();
        alert("Produto deletado com sucesso!");
      } catch (error) {
        console.error("Erro ao deletar produto", error);
      }
    } else {
      alert("Senha incorreta!");
    }
  };

  const handleEdit = (produto) => {
    setSelectedProduto({
      id: produto.id,
      Codigo: produto.codigo,
      Nome: produto.nome,
      Descricao: produto.descricao,
      Preco: produto.preco,
      EstoqueAtual: produto.estoqueAtual,
      EstoqueMinimo: produto.estoqueMinimo,
      CategoriaId: produto.categoriaId,
      SubCategoriaId: produto.subCategoriaId
    });
    setFilteredSubCategorias(subCategorias.filter(sub => sub.categoriaId === produto.categoriaId));
    setEditModalOpen(true);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    const senha = prompt("Digite a senha para confirmar a edição:");
    if (senha === "senha123") { // Substitua "senha123" pela senha correta
      try {
        await updateProduto(selectedProduto.id, selectedProduto);
        fetchProdutos();
        setEditModalOpen(false);
        alert("Produto atualizado com sucesso!");
      } catch (error) {
        console.error("Erro ao atualizar produto", error);
      }
    } else {
      alert("Senha incorreta!");
    }
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setSelectedProduto({ ...selectedProduto, [name]: value });
  };

  const handleModalSearch = (e) => {
    setModalSearchTerm(e.target.value);
  };

  const filteredModalProdutos = produtos.filter(produto =>
    produto.nome && produto.nome.toLowerCase().includes(modalSearchTerm.toLowerCase())
  );

  return (
    <>
      <Navbar />
      <Header>
        <Container maxWidth="md">
          <Typography variant="h4" component="h1" gutterBottom>
            Adicionar Produto {<Button startIcon={<SearchIcon />} style={{ marginBottom: '12px', marginLeft: '200px' }} onClick={() => setModalOpen(true)} variant="contained" color="primary" sx={{ mt: 2 }}>
              Buscar Produtos
            </Button>}
          </Typography>
          <Box name="SeçãoAddProduto" component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2, backgroundColor: '#f5f5f5', padding: 3, borderRadius: 2 }}>
            <TextField
              label="Código"
              variant="outlined"
              name="Codigo"
              value={newProduto.Codigo}
              onChange={handleChange}
              fullWidth
              InputProps={{
                style: { backgroundColor: 'white' },
              }}
            />
            <TextField
              label="Nome"
              variant="outlined"
              name="Nome"
              value={newProduto.Nome}
              onChange={handleChange}
              fullWidth
              InputProps={{
                style: { backgroundColor: 'white' },
              }}
            />
            <TextField
              label="Descrição"
              variant="outlined"
              name="Descricao"
              value={newProduto.Descricao}
              onChange={handleChange}
              fullWidth
              InputProps={{
                style: { backgroundColor: 'white' },
              }}
            />
            <TextField
              label="Preço"
              variant="outlined"
              name="Preco"
              value={newProduto.Preco}
              onChange={handleChange}
              fullWidth
              InputProps={{
                style: { backgroundColor: 'white' },
                inputProps: { inputMode: 'numeric', pattern: '[0-9]*' }
              }}
            />
            <TextField
              label="Estoque Atual"
              variant="outlined"
              name="EstoqueAtual"
              type="number"
              value={newProduto.EstoqueAtual}
              onChange={handleChange}
              fullWidth
              InputProps={{
                style: { backgroundColor: 'white' },
              }}
            />
            <TextField
              label="Estoque Mínimo"
              variant="outlined"
              name="EstoqueMinimo"
              type="number"
              value={newProduto.EstoqueMinimo}
              onChange={handleChange}
              fullWidth
              InputProps={{
                style: { backgroundColor: 'white' },
              }}
            />
            <FormControl variant="outlined" fullWidth>
              <InputLabel>Categoria</InputLabel>
              <Select
                name="CategoriaId"
                value={newProduto.CategoriaId}
                onChange={handleSelectCategoria}
                label="Categoria"
                style={{ backgroundColor: 'white' }}
              >
                {categorias.map((categoria) => (
                  <MenuItem key={categoria.id} value={categoria.id}>
                    {categoria.nome}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl variant="outlined" fullWidth disabled={!newProduto.CategoriaId}>
              <InputLabel>SubCategoria</InputLabel>
              <Select
                name="SubCategoriaId"
                value={newProduto.SubCategoriaId}
                onChange={handleSelectSubCategoria}
                label="SubCategoria"
                style={{ backgroundColor: 'white' }}
              >
                {filteredSubCategorias.map((subCategoria) => (
                  <MenuItem key={subCategoria.id} value={subCategoria.id}>
                    {subCategoria.nome}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Button startIcon={<AddIcon />} type="submit" variant="contained" color="primary">
              Adicionar Produto
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
        <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '80%', maxHeight: '80vh', overflowY: 'auto', bgcolor: '#f5f5f5', boxShadow: 24, p: 4, borderRadius: 2 }}>
          <Typography id="modal-title" variant="h6" component="h2">
            Lista de Produtos
          </Typography>
          <TextField
            label="Buscar Produto"
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
                  <TableCell>Código</TableCell>
                  <TableCell>Nome</TableCell>
                  <TableCell>Descrição</TableCell>
                  <TableCell>Preço</TableCell>
                  <TableCell>Estoque Atual</TableCell>
                  <TableCell>Estoque Mínimo</TableCell>
                  <TableCell>Categoria</TableCell>
                  <TableCell>SubCategoria</TableCell> {/* Adicione esta linha */}
                  <TableCell>Ações</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredModalProdutos.map((produto) => (
                  <TableRow key={produto.id}>
                    <TableCell>{produto.codigo}</TableCell>
                    <TableCell>{produto.nome}</TableCell>
                    <TableCell>{produto.descricao}</TableCell>
                    <TableCell>{produto.preco}</TableCell>
                    <TableCell>{produto.estoqueAtual}</TableCell>
                    <TableCell>{produto.estoqueMinimo}</TableCell>
                    <TableCell>{produto.categoriaId}</TableCell>
                    <TableCell>{produto.subCategoriaId}</TableCell> {/* Adicione esta linha */}
                    <TableCell>
                      {isGerente && (
                        <Button startIcon={<DeleteIcon />} variant="contained" color="secondary" onClick={() => handleDelete(produto.id)} sx={{ mr: 2 }}>
                          Deletar
                        </Button>
                      )}
                      <Button startIcon={<EditIcon />} variant="contained" color="primary" onClick={() => handleEdit(produto)}>
                        Editar
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Modal>

      <Modal
        open={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        aria-labelledby="edit-modal-title"
        aria-describedby="edit-modal-description"
      >
        <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '80%', maxHeight: '80vh', overflowY: 'auto', bgcolor: '#f5f5f5', boxShadow: 24, p: 4, borderRadius: 2 }}>
          <Typography id="edit-modal-title" variant="h6" component="h2">
            Editar Produto
          </Typography>
          {selectedProduto && (
            <Box component="form" onSubmit={handleEditSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <TextField
                label="Código"
                variant="outlined"
                name="Codigo"
                value={selectedProduto.Codigo}
                onChange={handleEditChange}
                fullWidth
                placeholder={selectedProduto.Codigo}
                InputProps={{
                  style: { backgroundColor: 'white' },
                }}
              />
              <TextField
                label="Nome"
                variant="outlined"
                name="Nome"
                value={selectedProduto.Nome}
                onChange={handleEditChange}
                fullWidth
                placeholder={selectedProduto.Nome}
                InputProps={{
                  style: { backgroundColor: 'white' },
                }}
              />
              <TextField
                label="Descrição"
                variant="outlined"
                name="Descricao"
                value={selectedProduto.Descricao}
                onChange={handleEditChange}
                fullWidth
                placeholder={selectedProduto.Descricao}
                InputProps={{
                  style: { backgroundColor: 'white' },
                }}
              />
              {isGerente && (
                <>
                  <TextField
                    label="Preço"
                    variant="outlined"
                    name="Preco"
                    value={selectedProduto.Preco}
                    onChange={handleEditChange}
                    fullWidth
                    placeholder={selectedProduto.Preco}
                    InputProps={{
                      style: { backgroundColor: 'white' },
                      inputProps: { inputMode: 'numeric', pattern: '[0-9]*' }
                    }}
                  />
                  <TextField
                    label="Estoque Mínimo"
                    variant="outlined"
                    name="EstoqueMinimo"
                    type="number"
                    value={selectedProduto.EstoqueMinimo}
                    onChange={handleEditChange}
                    fullWidth
                    placeholder={selectedProduto.EstoqueMinimo}
                    InputProps={{
                      style: { backgroundColor: 'white' },
                    }}
                  />
                </>
              )}
              <TextField
                label="Estoque Atual"
                variant="outlined"
                name="EstoqueAtual"
                type="number"
                value={selectedProduto.EstoqueAtual}
                onChange={handleEditChange}
                fullWidth
                placeholder={selectedProduto.EstoqueAtual}
                InputProps={{
                  style: { backgroundColor: 'white' },
                }}
              />
              <FormControl variant="outlined" fullWidth>
                <InputLabel>Categoria</InputLabel>
                <Select
                  name="CategoriaId"
                  value={selectedProduto.CategoriaId}
                  onChange={(e) => {
                    handleEditChange(e);
                    setFilteredSubCategorias(subCategorias.filter(sub => sub.categoriaId === e.target.value));
                  }}
                  label="Categoria"
                  style={{ backgroundColor: 'white' }}
                >
                  {categorias.map((categoria) => (
                    <MenuItem key={categoria.id} value={categoria.id}>
                      {categoria.nome}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl variant="outlined" fullWidth disabled={!selectedProduto.CategoriaId}>
                <InputLabel>SubCategoria</InputLabel>
                <Select
                  name="SubCategoriaId"
                  value={selectedProduto.SubCategoriaId}
                  onChange={handleEditChange}
                  label="SubCategoria"
                  style={{ backgroundColor: 'white' }}
                >
                  {filteredSubCategorias.map((subCategoria) => (
                    <MenuItem key={subCategoria.id} value={subCategoria.id}>
                      {subCategoria.nome}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <Button startIcon={<UpdateIcon />} type="submit" variant="contained" color="primary">
                Atualizar Produto
              </Button>
            </Box>
          )}
        </Box>
      </Modal>
    </>
  );
};

export default Produto;