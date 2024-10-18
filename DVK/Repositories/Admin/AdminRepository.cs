using Dapper;
using DVK.DataAccess;
using DVK.Helpers.AuthHelper;
using DVK.Models.Admin;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;

namespace DVK.Repositories.Admin
{
    public class AdminRepository : IAdminRepository
    {
        private readonly MainContext _context;
        private readonly IAuthHelper _authHelper;

        public AdminRepository(MainContext context, IAuthHelper authHelper)
        {
            _context = context;
            _authHelper = authHelper;
        }

        public async Task<List<object>> GetAllAccesses()
        {
            var reader = await _context.Database.GetDbConnection().QueryMultipleAsync("dbo.ADMIN_get_all_accesses",
                commandType: CommandType.StoredProcedure);

            var accesses = reader.Read<object>();

            return accesses.AsList();
        }

        public async Task<List<object>> GetAllFactories()
        {
            var reader = await _context.Database.GetDbConnection().QueryMultipleAsync("dbo.ADMIN_get_all_factories",
                commandType: CommandType.StoredProcedure);

            var factories = reader.Read<object>();

            return factories.AsList();
        }

        public async Task<List<object>> GetAllDirections()
        {
            var reader = await _context.Database.GetDbConnection().QueryMultipleAsync("dbo.ADMIN_get_all_directions",
                commandType: CommandType.StoredProcedure);

            var directions = reader.Read<object>();

            return directions.AsList();
        }
        
        public async Task<List<object>> GetAllSubdivisions()
        {
            var reader = await _context.Database.GetDbConnection().QueryMultipleAsync("dbo.ADMIN_get_all_subdivisions",
                commandType: CommandType.StoredProcedure);

            var subdivisions = reader.Read<object>();

            return subdivisions.AsList();
        }

        public async Task<List<object>> GetAllPositions()
        {
            var reader = await _context.Database.GetDbConnection().QueryMultipleAsync("dbo.ADMIN_get_all_positions",
                commandType: CommandType.StoredProcedure);

            var positions = reader.Read<object>();

            return positions.AsList();
        }

        public async Task<List<object>> GetAllEmployees()
        {
            var reader = await _context.Database.GetDbConnection().QueryMultipleAsync("dbo.ADMIN_get_all_employees",
                commandType: CommandType.StoredProcedure);

            var users = reader.Read<object>();

            return users.AsList();
        }

        public async Task AddFactory(Factory factory)
        {
            var reader = await _context.Database.GetDbConnection().QueryMultipleAsync("dbo.ADMIN_add_factory",
                new { factoryName = factory.FactoryName }, commandType: CommandType.StoredProcedure);
        }

        public async Task AddDirection(Direction direction)
        {
            foreach (int item in direction.Factories)
            {
                var reader = await _context.Database.GetDbConnection().QueryMultipleAsync("dbo.ADMIN_add_direction",
                new { factoryId = item ,direction.DirectionName }, commandType: CommandType.StoredProcedure);

                reader.Dispose();
            }
        }

        public async Task AddSubdivision(Subdivision subdivision)
        {
            var reader = await _context.Database.GetDbConnection().QueryMultipleAsync("dbo.ADMIN_add_subdivision",
             
                new { subdivision.FactoryId, subdivision.ParentId, subdivision.SubdivisionName },
                commandType: CommandType.StoredProcedure);
        }

        public async Task AddPosition(Position position)
        {
            var reader = await _context.Database.GetDbConnection().QueryMultipleAsync("dbo.ADMIN_add_position",
                new { position.subdivisionId , position.PositionName },
                commandType: CommandType.StoredProcedure);
            
            var id = reader.Read<int>().FirstOrDefault();

            reader.Dispose();

            foreach (var access in position.AccessIds)
            {
                var reader2 = await _context.Database.GetDbConnection().QueryMultipleAsync("dbo.ADMIN_add_accesses",
                    new { id, access }, commandType: CommandType.StoredProcedure);

                reader2.Dispose();
            }
        }

        public async Task AddUser(User user)
        {
            string hashedPassword = _authHelper.HashPassword("12345Qwerty");

            var reader = await _context.Database.GetDbConnection().QueryMultipleAsync("dbo.ADMIN_add_user",
                new { lastName = user.LastName, firstName = user.FirstName, middleName = user.MiddleName, email = user.Email, passwordHash = hashedPassword },
                commandType: CommandType.StoredProcedure);
        }

    }
}
