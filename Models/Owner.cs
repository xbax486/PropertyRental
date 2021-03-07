using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Collections.Generic;
using System.Collections.ObjectModel;

namespace PropertyRental.Models
{
    [Table("Owners")]
    public class Owner
    {
        [Required]
        [StringLength(255)]
        public string Name { get; set; }

        [Required]
        [StringLength(255)]
        public string Email { get; set; }

        [Required]
        [StringLength(255)]
        public string Mobile { get; set; }

        public ICollection<Property> Properties { get; set; }

        public int Id { get; set; }

        public Owner()
        {
            this.Properties = new Collection<Property>();
        }
    }
}
