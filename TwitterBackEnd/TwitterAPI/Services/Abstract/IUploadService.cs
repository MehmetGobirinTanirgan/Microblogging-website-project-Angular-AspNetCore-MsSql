using Microsoft.AspNetCore.Http;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace TwitterAPI.Services.Abstract
{
    public interface IUploadService
    {
        Task<List<string>> UploadImagesAsync(List<IFormFile> ImageFiles);
        Task<string> UploadImageAsync(IFormFile ImageFile);
    }
}
