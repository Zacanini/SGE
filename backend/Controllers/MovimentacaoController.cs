using backend.Models;
using backend.Services;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class MovimentacaoController : ControllerBase
    {
        private readonly MovimentacaoService _movimentacaoService;

        public MovimentacaoController(MovimentacaoService movimentacaoService)
        {
            _movimentacaoService = movimentacaoService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllMovimentacoes()
        {
            var movimentacoes = await _movimentacaoService.GetAllAsync();
            return Ok(movimentacoes);
        }

        [HttpPost]
        public async Task<IActionResult> CreateMovimentacao(Movimentacao movimentacao)
        {
            var createdMovimentacao = await _movimentacaoService.CreateAsync(movimentacao);
            return CreatedAtAction(nameof(GetAllMovimentacoes), new { id = createdMovimentacao.Id }, createdMovimentacao);
        }
    }
}
