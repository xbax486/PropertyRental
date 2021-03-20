using System.Threading.Tasks;

namespace PropertyRental.Persistence
{
    public interface IUnitOfWork
    {
        Task CompleteAsync();
    }
}