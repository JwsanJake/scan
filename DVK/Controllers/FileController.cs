using Dapper;
using DVK.DataAccess;
using DVK.Helpers.FileUploader;
using DVK.Models.Files;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Data;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace DVK.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class FileController : Controller
    {
        private readonly IConfiguration _configuration;
        private readonly MainContext _context;
        private readonly IFileService _upload;

        public FileController(IConfiguration configuration, MainContext context, IFileService upload)
        {
            _configuration = configuration;
            _context = context;
            _upload = upload;
        }

        [Authorize]
        [HttpPost]
        public async Task<ActionResult> DownloadFiles(string filename)
        {
            string storagePath = _configuration.GetValue<string>("upload_folder");
            string path = storagePath + $"\\{filename}";

            return File(System.IO.File.OpenRead(path), "application/octet-stream", Path.GetFileName(path));
        }

        [Authorize]
        [HttpDelete]
        public async Task DeleteFiles(string filename)
        {
            var reader = await _context.Database.GetDbConnection().QueryMultipleAsync("dbo.FILES_delete_path", new
            {
                filepath = filename
            }, commandType: CommandType.StoredProcedure);

            string storagePath = _configuration.GetValue<string>("upload_folder");
            string path = storagePath + $"\\{filename}";

            //if (System.IO.File.Exists(path))
            //{
                
            //}

            try
            {
                System.IO.File.Delete(path);
            }
            catch
            {

            }
        }

        [Authorize]
        [HttpPost]
        public async Task UploadFiles([FromForm]FileFormat file)
        {
            var EF = await _upload.UploadFiles(file.education_files);
            var CF = await _upload.UploadFiles(file.career_files);


            if (EF != null)
            {
                file.education_fileNames = EF;
                await _upload.SaveFilePath(file.identifier, file.education_fileNames, "education", file.event_identifier);
            }
            if (CF != null)
            {
                file.career_fileNames = CF;
                await _upload.SaveFilePath(file.identifier, file.career_fileNames, "career", file.event_identifier);
            }
        }

        //[Authorize]
        //[HttpPost]
        //public async Task AddEducationDocuments([FromForm] PersonEducation education)
        //{
        //    try
        //    {
        //        var EF = await _upload.UploadFiles(education.education_files);


        //        if (EF != null)
        //        {
        //            education.education_fileNames = EF;
        //            await _upload.SaveFilePath(education.identifier, education.education_fileNames, "education", "");
        //        }
        //    }
        //    catch (Exception ex)
        //    {
        //        Console.WriteLine(ex);
        //    }
        //}

        //[Authorize]
        //[HttpPost]
        //public async Task AddCareerDocuments([FromForm] PersonCareer career)
        //{
        //    try
        //    {
        //        var CF = await _upload.UploadFiles(career.career_files);


        //        if (CF != null)
        //        {
        //            career.career_fileNames = CF;
        //            await _upload.SaveFilePath(career.identifier, career.career_fileNames, "career", "");
        //        }
        //    }
        //    catch (Exception ex)
        //    {
        //        Console.WriteLine(ex);
        //    }
        //}
    }
}
