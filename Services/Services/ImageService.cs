using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using DataModels;
using Repositories;

namespace Services
{
    public class ImageService : IImageService
    {
        private readonly IImageRepository _imageRepository;

        public ImageService(IImageRepository markRepository)
        {
            _imageRepository = markRepository;
        }

        public int SaveImage(Image image)
        {
            return _imageRepository.SaveImage(image);
        }

        public int RemoveImage(int Id)
        {
            return _imageRepository.RemoveImage(Id);
        }
    }
}
