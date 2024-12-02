using System.Text.Json.Serialization;

namespace backend.Models
{
    public class SubCategoria
    {
        public int Id { get; set; }
        public string? Nome { get; set; }
        public int CategoriaId { get; set; }
        [JsonIgnore]
        public Categoria? Categoria { get; set; }
    }
}