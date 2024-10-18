using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DVK.Helpers.RoleHelper
{
    public interface IRoleHelper
    {
        Task<List<object>> CheckRoles(string login);
    }
}
