using DVK.Models.Admin;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DVK.Repositories.Admin
{
    public interface IAdminRepository
    {
        Task<List<object>> GetAllAccesses();
        Task<List<object>> GetAllFactories();
        Task<List<object>> GetAllDirections();
        Task<List<object>> GetAllSubdivisions();
        Task<List<object>> GetAllPositions();
        Task<List<object>> GetAllEmployees();
        Task AddFactory(Factory factory);
        Task AddDirection(Direction direction);
        Task AddSubdivision(Subdivision subdivision);
        Task AddPosition(Position position);
        Task AddUser(User user);
    }
}
