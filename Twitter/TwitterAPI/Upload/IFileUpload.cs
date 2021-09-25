using Microsoft.AspNetCore.Http;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace TwitterAPI.Upload
{
    public interface IFileUpload
    {
        Task<List<string>> ImageUploadAsync(List<IFormFile> ImageFiles);
        Task<string> ImageUploadAsync(IFormFile ImageFile);
    }
}
