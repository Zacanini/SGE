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

        [HttpGet]
        public async Task<IActionResult> GetAllCategorias()
        {
            var categorias = await _categoriaService.GetAllAsync();
            return Ok(categorias);
        }

        [HttpPost]
        public async Task<IActionResult> CreateCategoria(Categoria categoria)
        {
            var createdCategoria = await _categoriaService.CreateAsync(categoria);
            return CreatedAtAction(nameof(GetAllCategorias), new { id = createdCategoria.Id }, createdCategoria);
        }
    }
}
