using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Database
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<Usuario> Usuarios { get; set; }
        public DbSet<Produto> Produtos { get; set; }
        public DbSet<Categoria> Categorias { get; set; }
        public DbSet<Movimentacao> Movimentacoes { get; set; }
        public DbSet<SubCategoria> SubCategorias { get; set; } // Adiciona a tabela SubCategorias
    }
}

// using Microsoft.EntityFrameworkCore;
// using backend.Models;

// namespace backend.Database
// {
//     public class AppDbContext : DbContext
//     {
//         public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

//         // Definição das tabelas
//         public DbSet<Usuario> Usuarios { get; set; }
//         public DbSet<Produto> Produtos { get; set; }
//         public DbSet<Categoria> Categorias { get; set; }
//         public DbSet<Movimentacao> Movimentacoes { get; set; }

        // Método initialize (seed) para popular o banco de dados

        // public static void Initialize(AppDbContext context)
        // {
        //     if (!context.Categorias.Any())
        //     {
        //         context.Categorias.AddRange(
        //             new Categoria { Nome = "Eletrônicos" },
        //             new Categoria { Nome = "Vestuário" },
        //             new Categoria { Nome = "Alimentos" }
        //         );
        //         context.SaveChanges();
        //     }

        //     if (!context.Produtos.Any())
        //     {
        //         context.Produtos.AddRange(
        //             new Produto { Codigo = "P001", Nome = "Smartphone", Descricao = "Um smartphone moderno", Preco = 1200.00M, EstoqueAtual = 10, EstoqueMinimo = 5, CategoriaId = 1 },
        //             new Produto { Codigo = "P002", Nome = "Camisa", Descricao = "Camisa de algodão", Preco = 50.00M, EstoqueAtual = 20, EstoqueMinimo = 10, CategoriaId = 2 },
        //             new Produto { Codigo = "P003", Nome = "Arroz", Descricao = "Pacote de 1kg de arroz", Preco = 5.00M, EstoqueAtual = 100, EstoqueMinimo = 20, CategoriaId = 3 }
        //         );
        //         context.SaveChanges();
        //     }
        // }
//     }
// }