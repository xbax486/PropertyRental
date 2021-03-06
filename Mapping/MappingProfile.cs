using AutoMapper;
using PropertyRental.Controllers.Resources;
using PropertyRental.Models;

namespace PropertyRental.Mapping
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            // Domain class to API resource
            CreateMap<State, StateResource>();
            CreateMap<Suburb, SuburbResource>();
            // CreateMap<Owner, OwnerResource>();
            // CreateMap<Property, PropertyResource>();
            // CreateMap<PropertyType, PropertyTypeResource>();

            // API resource to domain class
            CreateMap<StateResource, State>()
                .ForMember(stateResource => stateResource.Id, state => state.Ignore());
            CreateMap<SuburbResource, Suburb>()
                .ForMember(suburbResource => suburbResource.Id, suburb => suburb.Ignore());
        }
    }
}
