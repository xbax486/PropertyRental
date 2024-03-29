using PropertyRental.Extensions;

namespace PropertyRental.Models.Query
{
    public class TenantQuery : IQueryObject
    {
        public bool? Available { get; set; }
        public string SortBy { get; set; }
        public bool isSortedAscending { get; set; }
        public int Page { get; set; }
        public int PageSize { get; set; }
    }
}