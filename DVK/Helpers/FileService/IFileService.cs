using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DVK.Helpers.FileUploader
{
    public interface IFileService
    {
        Task<string> UploadFile(IFormFile file);
        Task<List<string>> UploadFiles(List<IFormFile> files);
        Task SaveFilePath(string identifier, List<string> finSolvency, string inputType, string eventIdentifier);
    }
}
