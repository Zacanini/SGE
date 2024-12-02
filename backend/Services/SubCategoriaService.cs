using backend.Database;
using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Services
{
    public class SubCategoriaService
    {
        private readonly AppDbContext _context;

        public SubCategoriaService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<List<SubCategoria>> GetAllAsync()
        {
            return await _context.SubCategorias.ToListAsync();
        }

        public async Task<SubCategoria> CreateAsync(SubCategoria subCategoria)
        {
            _context.SubCategorias.Add(subCategoria);
            await _context.SaveChangesAsync();
            return subCategoria;
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var subCategoria = await _context.SubCategorias.FindAsync(id);
            if (subCategoria == null)
            {
                return false;
            }

            _context.SubCategorias.Remove(subCategoria);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}