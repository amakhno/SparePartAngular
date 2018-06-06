using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using DataModels;
using Repositories;

namespace Services
{
    public class MarkService : IMarkService
    {
        private readonly IMarkRepository _markRepository;
        private readonly IImageService _imageService;

        public MarkService(IMarkRepository markRepository, IImageService imageService)
        {
            _markRepository = markRepository;
            _imageService = imageService;
        }

        public Mark GetById(int Id)
        {
            return _markRepository.GetById(Id);
        }

        public MarkList GetList(MarkFilter filter)
        {
            return _markRepository.GetList(filter);
        }

        public Mark[] GetListForSelect()
        {
            return _markRepository.GetList();
        }

        public Task<Mark> Save(Mark input, Image image)
        {
            int imageId = 0;
            if (image != null)
            {
                imageId = _imageService.SaveImage(image);
                input.ImageId = imageId;
            }
            if (input.Id > 0)
            {
                var oldMark = _markRepository.GetById(input.Id);
                if (oldMark == null)
                {
                    throw new Exception("Производитель не найден");
                }
                if (oldMark.ImageId > 0 && input.ImageId < 1)
                {
                    input.ImageId = oldMark.ImageId;
                }
                return _markRepository.PutMark(input);
            }
            return _markRepository.SaveMark(input);
        }

        public void Delete(int id)
        {
            _markRepository.Delete(id);
        }

    }
}
