namespace PropertyRental.Controllers.Resources
{
    public class PropertyResource
    {
        public string Unit { get; set; }

        public string Street { get; set; }

        public SuburbResource Suburb { get; set; }

        public int SuburbId { get; set; }

        public PropertyTypeResource PropertyType { get; set; }

        public int PropertyTypeId { get; set; }

        public byte Bedroom { get; set; }

        public byte Bathroom { get; set; }

        public byte Parking { get; set; }

        public bool PetsAllowed { get; set; }

        public bool BuiltInWardrobe { get; set; }

        public bool GasAvailable { get; set; }

        public bool HasStudyRoom { get; set; }

        public bool Furnished { get; set; }

        public int Id { get; set; }
    }
}
