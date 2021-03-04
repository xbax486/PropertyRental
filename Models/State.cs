using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace PropertyRental.Models
{
    [Table("States")]
    public class State
    {
        [Required]
        [StringLength(255)]
        public string Name { get; set; }

        [Required]
        [StringLength(255)]
        public string Acronym { get; set; }

        public int Id { get; set; }
    }
}