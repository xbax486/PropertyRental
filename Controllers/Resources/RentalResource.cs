using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;

namespace PropertyRental.Controllers.Resources
{
    public class RentalResource
    {
        public TenantResource Tenant { get; set; }

        public int TenantId { get; set; }

        public PropertyResource Property { get; set; }

        public int PropertyId { get; set; }

        public DateTime StartDate { get; set; }

        public DateTime EndDate { get; set; }

        public int Payment { get; set; }

        public int Id { get; set; }
    }
}