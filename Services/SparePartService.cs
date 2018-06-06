using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using DataModels;
using Repositories;

namespace Services
{
    public class SparePartService : ISparePartService
    {
        private readonly ISparePartRepository _sparePartRepository;
        private readonly IImageService _imageService;

        public SparePartService(ISparePartRepository sparePartRepository, IImageService imageService)
        {
            _sparePartRepository = sparePartRepository;
            _imageService = imageService;
        }

        public SparePart GetById(int Id)
        {
            return _sparePartRepository.GetById(Id);
        }

        public SparePart Post(SparePart input, Image image)
        {
            int imageId = 0;
            if (image != null)
            {
                imageId = _imageService.SaveImage(image);
                input.ImageId = imageId;
            }
            input.Id = 0;
            return _sparePartRepository.SaveSparePart(input);
        }


        public SparePart Put(SparePart input, Image image)
        {
            int imageId = 0;
            if (image != null)
            {
                imageId = _imageService.SaveImage(image);
                input.ImageId = imageId;
            }
            return _sparePartRepository.PutSparePart(input);
        }

        public void Delete(int Id)
        {
            _sparePartRepository.DeleteSparePart(Id);
        }

        public SparePartList GetList(SparePartFilter filter)
        {
            return _sparePartRepository.GetList(filter);
        }
    }
}
