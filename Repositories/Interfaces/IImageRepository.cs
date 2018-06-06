using DataModels;
using System;
using System.Collections.Generic;
using System.Text;

namespace Repositories
{
    public interface IImageRepository
    {
        int SaveImage(Image image);
        int RemoveImage(int id);
    }
}
