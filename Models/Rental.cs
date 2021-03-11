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
        public Owner Owner { get; set; }

        public int OwnerId { get; set; }

        public Tenant Tenant { get; set; }

        public int TenantId { get; set; }

        public Property Property { get; set; }

        public int PropertyId { get; set; }

        public DateTime StartDate { get; set; }

        public DateTime EndDate { get; set; }

        public int Payment { get; set; }

        public int Id { get; set; }

        private const int DAYS_PER_WEEK = 7;

        public int GetRentalWeeks()
        {
            return (EndDate - StartDate).Days / DAYS_PER_WEEK;
        }
    }
}
