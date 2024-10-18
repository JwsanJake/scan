using Dapper;
using DVK.DataAccess;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Data;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace DVK.Helpers.FileUploader
{
    public class FileService : IFileService
    {
        private readonly IConfiguration _configuration;
        private readonly MainContext _context;

        public FileService(IConfiguration configuration, MainContext context)
        {
            _configuration = configuration;
            _context = context;
        }

        public async Task<string> UploadFile(IFormFile file)
        {
            if (file == null)
            {
                return null;
            }

            string storagePath = _configuration.GetValue<string>("upload_folder");

            if (file == null)
            {
                throw new Exception("Your file is null");
            }

            string fileName = "";

            var upload = Path.Combine(storagePath);
            var filePath = Path.Combine(upload, file.FileName);
            string filePathToUpload = file.FileName ;
            fileName = filePathToUpload;
            using (Stream fileStream = new FileStream(filePath, FileMode.Create))
            {
                await file.CopyToAsync(fileStream);
            }

            return fileName;
        }



        public async Task<List<string>> UploadFiles(List<IFormFile> files)
        {
            if (files == null)
            {
                return null;
            }

            string storagePath = _configuration.GetValue<string>("upload_folder");

            if (files == null)
            {
                throw new Exception("Your file is null");
            }

            List<string> fileNames = new List<string>();

            foreach (var item in files)
            {
                var uploads = Path.Combine(storagePath);
                var filePath = Path.Combine(uploads, item.FileName);
                string filePathToUpload = item.FileName;
                fileNames.Add(filePathToUpload);
                using (Stream fileStream = new FileStream(filePath, FileMode.Create))
                {
                    await item.CopyToAsync(fileStream);
                }
            }

            return fileNames;
        }

        public async Task SaveFilePath(string identifier, List<string> finSolvency, string inputType, string eventIdentifier)
        {
            foreach (var filePath in finSolvency)
            {
                var reader = await _context.Database.GetDbConnection().QueryMultipleAsync("dbo.FILES_save_path",
                new
                {
                    identifier,
                    eventIdentifier,
                    inputType,
                    filePath
                }, commandType: CommandType.StoredProcedure);

                reader.Dispose();
            }
        }



        //public static async Task<File> GetFiles()
        //{
        //    return null;
        //    //if (System.IO.File.Exists(path))
        //    //{
        //    //    return File(System.IO.File.OpenRead(path), "application/octet-stream", Path.GetFileName(path));
        //    //}
        //    //var fs = new FileStream(path, FileMode.Open);
        //    //return File(fs, "application/octet-stream", "Sample.xlsx");

        //    //var memory = new MemoryStream();
        //    //using (var stream = new FileStream(path, FileMode.Open))
        //    //{
        //    //    await stream.CopyToAsync(memory);
        //    //    return File(memory, GetContentType(path), Path.GetFileName(path));
        //    //}
        //}
    }
}
