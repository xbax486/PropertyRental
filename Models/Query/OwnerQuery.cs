using PropertyRental.Extensions;

namespace PropertyRental.Models.Query
{
    public class OwnerQuery : IQueryObject
    {
        public string SortBy { get; set; }
        public bool isSortedAscending { get; set; }
        public int Page { get; set; }
        public int PageSize { get; set; }
    }
}