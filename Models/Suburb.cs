using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace PropertyRental.Models
{
    [Table("Suburbs")]
    public class Suburb
    {
        [Required]
        [StringLength(255)]
        public string Name { get; set; }

        [Required]
        [StringLength(255)]
        public string Postcode { get; set; }

        public State State { get; set; }

        public int StateId { get; set; }

        public int Id { get; set; }
    }
}