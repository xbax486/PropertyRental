namespace PropertyRental.Models
{
    public class PropertyQuery
    {
        public bool? Available { get; set; }
        public int? SuburbId { get; set; }
        public int? StateId { get; set; }
        public string SortBy { get; set; }
        public bool? isSortedAscending { get; set; }
    }
}