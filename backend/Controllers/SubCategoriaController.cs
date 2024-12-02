using backend.Models;
using backend.Services;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class SubCategoriaController : ControllerBase
    {
        private readonly SubCategoriaService _subCategoriaService;

        public SubCategoriaController(SubCategoriaService subCategoriaService)
        {
            _subCategoriaService = subCategoriaService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllSubCategorias()
        {
            var subCategorias = await _subCategoriaService.GetAllAsync();
            return Ok(subCategorias);
        }

        [HttpPost]
        public async Task<IActionResult> CreateSubCategoria(SubCategoria subCategoria)
        {
            var createdSubCategoria = await _subCategoriaService.CreateAsync(subCategoria);
            return CreatedAtAction(nameof(GetAllSubCategorias), new { id = createdSubCategoria.Id }, createdSubCategoria);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteSubCategoria(int id)
        {
            var result = await _subCategoriaService.DeleteAsync(id);
            if (!result)
            {
                return NotFound();
            }
            return NoContent();
        }
    }
}