using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TwitterAPI.Upload
{
    public interface IFileUpload
    {
        List<string> ImageUpload(List<IFormFile> ImageFiles); 
    }
}
