using System.Threading.Tasks;
using PropertyRental.Core;

namespace PropertyRental.Persistence
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly PropertyRentalContext context;

        public UnitOfWork(PropertyRentalContext context)
        {
            this.context = context;
        }
        public async Task CompleteAsync()
        {
            await context.SaveChangesAsync();
        }
    }
}