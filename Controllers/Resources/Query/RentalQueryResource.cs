namespace PropertyRental.Controllers.Resources.Query
{
    public class RentalQueryResource
    {
        public int? SuburbId { get; set; }
        public int? StateId { get; set; }
        public int? MinimumRent { get; set; }
        public int? MaximumRent { get; set; }
        public string SortBy { get; set; }
        public bool isSortedAscending { get; set; }
        public int Page { get; set; }
        public int PageSize { get; set; }
    }
}