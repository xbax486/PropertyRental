namespace PropertyRental.Controllers.Resources
{
    public class SuburbResource
    {
        public string Name { get; set; }

        public int Postcode { get; set; }

        public StateResource State { get; set; }

        public int Id { get; set; }
    }
}