using backend.Models;
using backend.Services;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CategoriaController : ControllerBase
    {
        private readonly CategoriaService _categoriaService;

        public CategoriaController(CategoriaService categoriaService)
        {
            _categoriaService = categoriaService;
        }

        [HttpGet] // endpoint 🆗
        public async Task<IActionResult> GetAllCategorias()
        {
            var categorias = await _categoriaService.GetAllAsync();
            return Ok(categorias);
        }

        [HttpPost] // endpoint 🆗
        public async Task<IActionResult> CreateCategoria(Categoria categoria)
        {
            var createdCategoria = await _categoriaService.CreateAsync(categoria);
            return CreatedAtAction(nameof(GetAllCategorias), new { id = createdCategoria.Id }, createdCategoria);
        }

        [HttpDelete("{id}")] // novo endpoint para deletar
        public async Task<IActionResult> DeleteCategoria(int id)
        {
            var result = await _categoriaService.DeleteAsync(id);
            if (!result)
            {
                return NotFound();
            }
            return NoContent();
        }
    }
}
