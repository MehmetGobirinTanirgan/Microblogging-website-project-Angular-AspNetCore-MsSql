using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TwitterAPI.Upload
{
    public interface IFileUpload
    {
        Task<List<string>> ImageUploadAsync(List<IFormFile> ImageFiles);
        Task<string> ImageUploadAsync(IFormFile ImageFile);
    }
}
