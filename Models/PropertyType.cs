using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace PropertyRental.Models
{
    [Table("PropertyTypes")]
    public class PropertyType
    {
        [Required]
        public string Name { get; set; }

        public int Id { get; set; }
    }
}