using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Options;
using System.Collections.Generic;
using System.Threading.Tasks;
using TwitterAPI.Services.Abstract;
using TwitterAPI.Settings;

namespace TwitterAPI.Services.Concrete
{
    public class UploadService : IUploadService
    {
        private readonly IOptions<CloudinarySettings> cloudinarySettings;

        public UploadService(IOptions<CloudinarySettings> cloudinarySettings)
        {
            this.cloudinarySettings = cloudinarySettings;
        }

        public async Task<List<string>> UploadImagesAsync(List<IFormFile> imageFiles)
        {
            if (imageFiles != null)
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

                if (imageFiles.Count > 0)
                {
                    foreach (var image in imageFiles)
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
            }
            return null;
        }

        public async Task<string> UploadImageAsync(IFormFile imageFile)
        {
            if (imageFile != null)
            {
                Account account = new Account()
                {
                    ApiKey = cloudinarySettings.Value.ApiKey,
                    ApiSecret = cloudinarySettings.Value.ApiSecret,
                    Cloud = cloudinarySettings.Value.CloudName
                };
                var cloudinary = new Cloudinary(account);
                var uploadResult = new ImageUploadResult();

                using (var fileStream = imageFile.OpenReadStream())
                {
                    var uploadParams = new ImageUploadParams
                    {
                        File = new FileDescription(imageFile.FileName, fileStream)
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
