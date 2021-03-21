using System.Threading.Tasks;

namespace PropertyRental.Core
{
    public interface IUnitOfWork
    {
        Task CompleteAsync();
    }
}