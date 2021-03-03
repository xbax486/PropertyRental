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
        public ICollection<Tenant> Tenants { get; set; }
        public Property Property { get; set; }
        public int PropertyId { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public short Payment { get; set; }
        public int Id { get; set; }
        private const int DAYS_PER_WEEK = 7;

        public Rental()
        {
            Tenants = new Collection<Tenant>();
        }

        public int GetRentalWeeks()
        {
            return (EndDate - StartDate).Days / DAYS_PER_WEEK;
        }
    }
}
