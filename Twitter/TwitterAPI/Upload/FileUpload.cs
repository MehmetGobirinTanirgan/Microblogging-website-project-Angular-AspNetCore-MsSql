using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Options;
using System.Collections.Generic;
using System.Threading.Tasks;
using TwitterAPI.Settings;

namespace TwitterAPI.Upload
{
    public class FileUpload : IFileUpload
    {
        private readonly IOptions<CloudinarySettings> cloudinarySettings;

        public FileUpload(IOptions<CloudinarySettings> cloudinarySettings)
        {
            this.cloudinarySettings = cloudinarySettings;
        }

        public async Task<List<string>> ImageUploadAsync(List<IFormFile> ImageFiles)
        {
            Account account = new Account()
            {
                ApiKey = cloudinarySettings.Value.ApiKey,
                ApiSecret = cloudinarySettings.Value.ApiSecret,
                Cloud = cloudinarySettings.Value.CloudName
            };

            var cloudinary = new Cloudinary(account);
            var uploadResult = new ImageUploadResult();
            var ImagePaths = new List<string>();

            if (ImageFiles.Count > 0)
            {
                foreach (var image in ImageFiles)
                {
                    using (var fileStream = image.OpenReadStream())
                    {
                        var uploadParams = new ImageUploadParams
                        {
                            File = new FileDescription(image.FileName, fileStream)
                        };
                        uploadResult = await cloudinary.UploadAsync(uploadParams);
                    }

                    if (uploadResult == null)
                    {
                        return null;
                    }

                    ImagePaths.Add(uploadResult.Url.ToString());
                }
                return ImagePaths;
            }
            return null;
        }

        public async Task<string> ImageUploadAsync(IFormFile ImageFile)
        {
            Account account = new Account()
            {
                ApiKey = cloudinarySettings.Value.ApiKey,
                ApiSecret = cloudinarySettings.Value.ApiSecret,
                Cloud = cloudinarySettings.Value.CloudName
            };

            var cloudinary = new Cloudinary(account);
            var uploadResult = new ImageUploadResult();

            if (ImageFile != null)
            {
                using (var fileStream = ImageFile.OpenReadStream())
                {
                    var uploadParams = new ImageUploadParams
                    {
                        File = new FileDescription(ImageFile.FileName, fileStream)
                    };
                    uploadResult = await cloudinary.UploadAsync(uploadParams);
                }

                if (uploadResult == null)
                {
                    return null;
                }
                return uploadResult.Url.ToString();
            }
            return null;
        }
    }
}
