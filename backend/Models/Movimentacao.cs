namespace backend.Models
{
    public class Movimentacao
    {
        public int Id { get; set; }
        public DateTime Data { get; set; }
        public int ProdutoId { get; set; }
        public Produto Produto { get; set; }
        public int Quantidade { get; set; } 
        public string Tipo { get; set; } // entrada ou saida
        
    }
}