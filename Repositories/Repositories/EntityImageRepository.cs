using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using DataModels;
using EntityFramework;

namespace Repositories
{
    public class EntityImageRepository : IImageRepository
    {
        public int RemoveImage(int id)
        {
            using (EntityFrameworkContext contex = new EntityFrameworkContext())
            {
                var entity = contex.Images.Where(x => x.Id == id).First();
                if (entity == null)
                {
                    return 0;
                }
                contex.Images.Remove(entity);
                contex.SaveChanges();
                return 1;
            }
        }

        public int SaveImage(Image image)
        {
            using (EntityFrameworkContext contex = new EntityFrameworkContext())
            {
                try
                {
                    contex.Images.Add(image);
                    contex.SaveChanges();
                    return image.Id;
                }
                catch (Exception e)
                {
                    throw new Exception(e.Message);
                }
            }
        }
    }
}
