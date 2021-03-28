using System;
using System.Linq;
using System.Collections.Generic;
using System.Linq.Expressions;

namespace PropertyRental.Extensions
{
    public static class IQueryExtensions
    {
        public static IQueryable<T> ApplyOrdering<T>(this IQueryable<T> query, IQueryObject queryObject, Dictionary<string, Expression<Func<T, object>>> columnsMap)
        {
            if (!columnsMap.ContainsKey(queryObject.SortBy) || String.IsNullOrWhiteSpace(queryObject.SortBy))
                return query;
            if (queryObject.isSortedAscending)
                return query.OrderBy(columnsMap[queryObject.SortBy]);
            else
                return query.OrderByDescending(columnsMap[queryObject.SortBy]);
        }
    }
}