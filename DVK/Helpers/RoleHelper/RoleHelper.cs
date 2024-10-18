using Dapper;
using DVK.DataAccess;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;

namespace DVK.Helpers.RoleHelper
{
    public class RoleHelper : IRoleHelper
    {
        private readonly MainContext _context;

        public RoleHelper(MainContext context)
        {
            _context = context;
        }

        public async Task<List<object>> CheckRoles(string login)
        {
            var reader = await _context.Database.GetDbConnection().QueryAsync("dbo.AUTH_get_user_roles",
                new { login }, commandType: CommandType.StoredProcedure);

            ////var roles = reader.Read<object>();

            ////return roles.AsList();

            //var claims = new Dictionary<string, object>();

            //var mainInfo = reader.Read<object>().ToList();

            //if (mainInfo.Count > 0)
            //{
            //    allData.Add("mainInfo", mainInfo[0]);

            //    var activities = reader.Read<dynamic>().ToList();
            //    allData.Add("activities", activities);

            //    var licenses = reader.Read<dynamic>().ToList();
            //    allData.Add("licenses", licenses);

            //    var files = reader.Read<dynamic>().ToList();
            //    allData.Add("files", files);
            //}

            //return allData;

            return null;
        }
    }
}
