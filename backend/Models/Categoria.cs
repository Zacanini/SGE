using System.Text.Json.Serialization;

namespace backend.Models
{
    public class Categoria
    {
        public int Id { get; set; }
        public string Nome { get; set; }
        [JsonIgnore]
        public List<Produto> Produtos { get; set; }
    }
}