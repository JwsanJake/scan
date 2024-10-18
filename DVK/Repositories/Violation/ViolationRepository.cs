using Dapper;
using DVK.DataAccess;
using DVK.Models.Violation;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;

namespace DVK.Repositories.Violation
{
    public class ViolationRepository : IViolationRepository
    {
        private readonly MainContext _context;

        public ViolationRepository(MainContext context)
        {
            _context = context;
        }

        public async Task<List<object>> GetAllViolations()
        {
            var reader = await _context.Database.GetDbConnection().QueryMultipleAsync("dbo.VIOLATION_get_all",
               commandType: CommandType.StoredProcedure);

            var companies = reader.Read<object>();

            return companies.AsList();
        }

        public async Task<object> GetViolationById(string id)
        {
            var reader = await _context.Database.GetDbConnection().QueryAsync("dbo.VIOLATION_get_by_id",
                new { id }, commandType: CommandType.StoredProcedure);

            var company = reader.FirstOrDefault<object>();

            return company;
        }

        public async Task<List<object>> GetPersonViolations(string id)
        {
            var reader = await _context.Database.GetDbConnection().QueryMultipleAsync("dbo.VIOLATION_get_by_person",
                new { id }, commandType: CommandType.StoredProcedure);

            var violations = reader.Read<object>().AsList();

            return violations;
        }

        public async Task<List<object>> GetCompanyViolations(string id)
        {
            var reader = await _context.Database.GetDbConnection().QueryMultipleAsync("dbo.VIOLATION_get_by_company",
                new { id }, commandType: CommandType.StoredProcedure);

            var violations = reader.Read<object>().AsList();

            return violations;
        }

        public async Task<List<object>> GetViolationCategories()
        {
            var reader = await _context.Database.GetDbConnection().QueryMultipleAsync("dbo.VIOLATION_get_categories",
                commandType: CommandType.StoredProcedure);

            var categories = reader.Read<object>().AsList();

            return categories;
        }

        public async Task<List<object>> GetViolationKinds(int id)
        {
            var reader = await _context.Database.GetDbConnection().QueryMultipleAsync("dbo.VIOLATION_get_kinds",
                new { id }, commandType: CommandType.StoredProcedure);

            var kinds = reader.Read<object>();

            return kinds.AsList();
        }

        public async Task<string> AddPersonnelMonitoringViolation(PersonnelMonitoringViolation violation)
        {
            var reader = await _context.Database.GetDbConnection().QueryMultipleAsync("dbo.VIOLATION_add_personnel_monitoring",
                new
                {

                }, commandType: CommandType.StoredProcedure);

            var id = reader.Read<string>().FirstOrDefault();

            return id;
        }

        public async Task<string> AddContractorMonitoringViolation(ContractorMonitoringViolation violation)
        {
            var reader = await _context.Database.GetDbConnection().QueryMultipleAsync("dbo.VIOLATION_add_contractor_monitoring",
                new
                {

                }, commandType: CommandType.StoredProcedure);

            var id = reader.Read<string>().FirstOrDefault();

            return id;
        }

        public async Task<string> AddISAViolation(InformationSearchActivityViolation violation)
        {
            var reader = await _context.Database.GetDbConnection().QueryMultipleAsync("dbo.VIOLATION_add_ISA",
                new
                {

                }, commandType: CommandType.StoredProcedure);

            var id = reader.Read<string>().FirstOrDefault();

            return id;
        }

        public async Task UpdatePersonnelMonitoringViolation(PersonnelMonitoringViolation violation)
        {
            var reader = await _context.Database.GetDbConnection().QueryMultipleAsync("dbo.VIOLATION_update_personnel_monitoring",
                new
                {

                }, commandType: CommandType.StoredProcedure);

        }

        public async Task UpdateContractorMonitoringViolation(ContractorMonitoringViolation violation)
        {
            var reader = await _context.Database.GetDbConnection().QueryMultipleAsync("dbo.VIOLATION_update_contractor_monitoring",
                new
                {

                }, commandType: CommandType.StoredProcedure);

        }

        public async Task UpdateISAViolation(InformationSearchActivityViolation violation)
        {
            var reader = await _context.Database.GetDbConnection().QueryMultipleAsync("dbo.VIOLATION_update_ISA",
                new
                {

                }, commandType: CommandType.StoredProcedure);

        }













        

        public async Task<List<object>> GetViolationResponseMeasures()
        {
            var reader = await _context.Database.GetDbConnection().QueryMultipleAsync("dbo.VIOLATION_get_response_measures",
                commandType: CommandType.StoredProcedure);

            var responseMeasures = reader.Read<object>();

            return responseMeasures.AsList();
        }

        //public async Task<List<object>> GetViolationResponseMeasuresTypes(int id)
        //{
        //    var 
        //}

    }
}
