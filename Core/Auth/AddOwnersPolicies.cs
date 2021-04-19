using Microsoft.AspNetCore.Authorization;

namespace PropertyRental.Core.Auth
{
    public static class AddOwnersPolicies
    {
        public static void AddPolicies(AuthorizationOptions options)
        {
            options.AddPolicy("get:owners", policy =>
            {
                policy.Requirements.Add(new HasScopeRequirement("get:owners", PropertyRentalAuthDetails.Domain));
            });

            options.AddPolicy("get:owner", policy =>
            {
                policy.Requirements.Add(new HasScopeRequirement("get:owner", PropertyRentalAuthDetails.Domain));
            });

            options.AddPolicy("create:owner", policy =>
            {
                policy.Requirements.Add(new HasScopeRequirement("create:owner", PropertyRentalAuthDetails.Domain));
            });

            options.AddPolicy("update:owner", policy =>
            {
                policy.Requirements.Add(new HasScopeRequirement("update:owner", PropertyRentalAuthDetails.Domain));
            });

            options.AddPolicy("delete:owner", policy =>
            {
                policy.Requirements.Add(new HasScopeRequirement("delete:owner", PropertyRentalAuthDetails.Domain));
            });
        }
    }
}