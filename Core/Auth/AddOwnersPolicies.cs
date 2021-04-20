using Microsoft.AspNetCore.Authorization;

namespace PropertyRental.Core.Auth
{
    public static class AddOwnersPolicies
    {
        public static void AddPolicies(AuthorizationOptions options)
        {
            options.AddPolicy("NormalUser", policyBuilder =>
            {
                policyBuilder.Requirements.Add(new HasScopeRequirement("get:owners", PropertyRentalAuthDetails.Domain));
            });

            options.AddPolicy("Administrator", policyBuilder =>
            {
                policyBuilder.Requirements.Add(new HasScopeRequirement("update:owner", PropertyRentalAuthDetails.Domain));
            });
        }
    }
}