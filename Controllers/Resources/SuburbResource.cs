namespace PropertyRental.Controllers.Resources
{
    public class SuburbResource
    {
        public string Name { get; set; }

        public short Postcode { get; set; }

        public StateResource State { get; set; }

        public int StateId { get; set; }

        public int Id { get; set; }
    }
}