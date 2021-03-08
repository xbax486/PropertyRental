using System.Collections.Generic;
using System.Collections.ObjectModel;

namespace PropertyRental.Controllers.Resources
{
    public class OwnerResource
    {
        public string Name { get; set; }

        public string Email { get; set; }

        public string Mobile { get; set; }

        //public IEnumerable<PropertyResource> Properties { get; set; }

        public int Id { get; set; }

        // public OwnerResource()
        // {
        //     this.Properties = new Collection<PropertyResource>();
        // }
    }
}
