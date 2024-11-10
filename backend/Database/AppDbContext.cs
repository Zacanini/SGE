using Microsoft.EntityFrameworkCore;
using backend.Models;

namespace backend.Database
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        // Definição das tabelas
        public DbSet<Usuario> Usuarios { get; set;}
        public DbSet<Produto> Produtos { get; set;}
        public DbSet<Categoria> Categorias { get; set;}
        public DbSet<Movimentacao> Movimentacoes { get; set;}
    }
}