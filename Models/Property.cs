using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;
using System.Collections.ObjectModel;

namespace PropertyRental.Models
{
    [Table("Properties")]
    public class Property
    {
        [Required]
        [StringLength(255)]
        public string Unit { get; set; }

        [Required]
        [StringLength(255)]
        public string Street { get; set; }

        public Suburb Suburb { get; set; }

        public int SuburbId { get; set; }

        public PropertyType PropertyType { get; set; }

        public int PropertyTypeId { get; set; }

        public byte Bedroom { get; set; }

        public byte Bathroom { get; set; }

        public byte Parking { get; set; }

        public bool PetsAllowed { get; set; }

        public bool BuiltInWardrobe { get; set; }

        public bool GasAvailable { get; set; }

        public bool HasStudyRoom { get; set; }

        public bool Furnished { get; set; }

        public bool Rented { get; set; }

        public int Id { get; set; }
    }
}
