using Microsoft.EntityFrameworkCore;
using PropertyRental.Models;

namespace PropertyRental.Persistence
{
    public class PropertyRentalContext : DbContext
    {
        // public DbSet<Owner> Owners { get; set; }
        //public DbSet<Property> Properties { get; set; }

        public DbSet<State> States { get; set; }

        public DbSet<Suburb> Suburbs { get; set; }

        public DbSet<PropertyType> PropertyTypes { get; set; }

        public PropertyRentalContext(DbContextOptions<PropertyRentalContext> options)
            : base(options)
        {
        }
    }
}
