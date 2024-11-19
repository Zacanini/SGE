using backend.Database;
using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Services
{
    public class MovimentacaoService
    {
        private readonly AppDbContext _context;

        public MovimentacaoService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<List<Movimentacao>> GetAllAsync()
        {
            return await _context.Movimentacoes
                .Include(m => m.Produto)
                .ToListAsync();
        }

        public async Task<Movimentacao> CreateAsync(Movimentacao movimentacao)
        {
            _context.Movimentacoes.Add(movimentacao);
            await _context.SaveChangesAsync();
            return movimentacao;
        }
    }
}
