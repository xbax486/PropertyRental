namespace PropertyRental.Controllers.Resources.Query
{
    public class RentalQueryResource
    {
        public string SortBy { get; set; }
        public bool isSortedAscending { get; set; }
        public int Page { get; set; }
        public int PageSize { get; set; }
    }
}