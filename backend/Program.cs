using backend.Database;
using backend.Models;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Registra o contexto do Entity Framework com sqlite 3
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection")));

var app = builder.Build();

// Endpoint para inserção de dados na tabela "produtos" do banco de dados [TESTANDO CONEXÃO COM DATABASE]
app.MapPost("/api/produtos", async (Produto produto, AppDbContext dbContext) =>
{
    dbContext.Produtos.Add(produto);
    await dbContext.SaveChangesAsync();
    return Results.Created($"/api/produtos/{produto.Id}", produto);
});

app.Run();
