using System;
using PropertyRental.Extensions;

namespace PropertyRental.Models.Query
{
    public class RentalQuery : IQueryObject
    {
        public int? SuburbId { get; set; }
        public int? StateId { get; set; }
        public int? MinimumRent { get; set; }
        public int? MaximumRent { get; set; }
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public string SortBy { get; set; }
        public bool isSortedAscending { get; set; }
        public int Page { get; set; }
        public int PageSize { get; set; }
    }
}