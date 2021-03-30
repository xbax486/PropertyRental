using System.Collections.Generic;

namespace PropertyRental.Models.Query
{
    public class QueryResult<T>
    {
        public int TotalItems { get; set; }
        public IEnumerable<T> Items { get; set; }
    }
}