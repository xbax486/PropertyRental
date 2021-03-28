namespace PropertyRental.Extensions
{
    public interface IQueryObject
    {
        string SortBy { get; set; }
        bool isSortedAscending { get; set; }
        int Page { get; set; }
        int PageSize { get; set; }
    }
}