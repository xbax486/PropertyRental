using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PropertyRental.Models
{
    [Table("Rentals")]
    public class Rental
    {
        public Tenant Tenant { get; set; }

        public int TenantId { get; set; }

        public Property Property { get; set; }

        public int PropertyId { get; set; }

        public DateTime StartDate { get; set; }

        public DateTime EndDate { get; set; }

        public int Payment { get; set; }

        public int Id { get; set; }
    }
}
