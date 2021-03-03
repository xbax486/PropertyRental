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
        public short Postcode { get; set; }

        [Required]
        [StringLength(255)]
        public string State { get; set; }

        [Required]
        [StringLength(255)]
        public string Abbreviation { get; set; }

        public int Id { get; set; }
    }
}