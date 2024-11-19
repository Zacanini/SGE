using backend.Models;
using backend.Services;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProdutoController : ControllerBase
    {
        private readonly ProdutoService _produtoService;

        public ProdutoController(ProdutoService produtoService)
        {
            _produtoService = produtoService;
        }

        [HttpGet] // endpoint 🆗
        public async Task<IActionResult> GetAllProdutos()
        {
            var produtos = await _produtoService.GetAllAsync();
            return Ok(produtos);
        }

        [HttpGet("{id}")] // endpoint 🆗
        public async Task<IActionResult> GetProdutoById(int id)
        {
            var produto = await _produtoService.GetByIdAsync(id);
            if (produto == null)
                return NotFound();

            return Ok(produto);
        }

        [HttpPost] // endpoint 🆗
        public async Task<IActionResult> CreateProduto(Produto produto)
        {
            var createdProduto = await _produtoService.CreateAsync(produto);
            return CreatedAtAction(nameof(GetProdutoById), new { id = createdProduto.Id }, createdProduto);
        }

        [HttpPut("{id}")] // endpoint 🆗
        public async Task<IActionResult> UpdateProduto(int id, Produto produto)
        {
            if (id != produto.Id)
                return BadRequest();

            var updatedProduto = await _produtoService.UpdateAsync(produto);
            if (updatedProduto == null)
                return NotFound();

            return Ok(updatedProduto);
        }

        [HttpDelete("{id}")] // endpoint 🆗
        public async Task<IActionResult> DeleteProduto(int id)
        {
            var result = await _produtoService.DeleteAsync(id);
            if (!result)
                return NotFound();

            return NoContent();
        }
    }
}
