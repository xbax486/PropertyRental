using AutoMapper;
using PropertyRental.Models;
using PropertyRental.Controllers.Resources;
using PropertyRental.Controllers.Resources.Query;
using PropertyRental.Models.Query;

namespace PropertyRental.Mapping
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            // Domain class to API resource
            CreateMap<State, StateResource>();
            CreateMap<Suburb, SuburbResource>();
            CreateMap<Owner, OwnerResource>();
            CreateMap<Property, PropertyResource>();
            CreateMap<PropertyType, PropertyTypeResource>();
            CreateMap<Tenant, TenantResource>();
            CreateMap<Rental, RentalResource>();
            CreateMap(typeof(QueryResult<>), typeof(QueryResultResource<>));

            // API resource to domain class
            CreateMap<StateResource, State>()
                .ForMember(state => state.Id, opt => opt.Ignore());
            CreateMap<SuburbResource, Suburb>()
                .ForMember(suburb => suburb.Id, opt => opt.Ignore());
            CreateMap<PropertyResource, Property>()
                .ForMember(property => property.Id, opt => opt.Ignore());
            CreateMap<OwnerResource, Owner>()
                .ForMember(owner => owner.Id, opt => opt.Ignore());
            CreateMap<TenantResource, Tenant>()
                .ForMember(tenant => tenant.Id, opt => opt.Ignore());
            CreateMap<RentalResource, Rental>()
                .ForMember(rental => rental.Id, opt => opt.Ignore());
            CreateMap<PropertyQueryResource, PropertyQuery>();
            CreateMap<TenantQueryResource, TenantQuery>();
            CreateMap<OwnerQueryResource, OwnerQuery>();
            CreateMap<SuburbQueryResource, SuburbQuery>();
            CreateMap<RentalQueryResource, RentalQuery>();
        }
    }
}
