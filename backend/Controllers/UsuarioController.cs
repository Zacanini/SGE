using backend.Models;
using backend.Services;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsuarioController : ControllerBase
    {
        private readonly UsuarioService _usuarioService;

        public UsuarioController(UsuarioService usuarioService)
        {
            _usuarioService = usuarioService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllUsuarios()
        {
            var usuarios = await _usuarioService.GetAllAsync();
            return Ok(usuarios);
        }

        [HttpPost]
        public async Task<IActionResult> CreateUsuario(Usuario usuario)
        {
            var createdUsuario = await _usuarioService.CreateAsync(usuario);
            return CreatedAtAction(nameof(GetAllUsuarios), new { id = createdUsuario.Id }, createdUsuario);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUsuario(int id)
        {
            var result = await _usuarioService.DeleteAsync(id);
            if (!result)
            {
                return NotFound();
            }
            return NoContent();
        }

    }
}
