using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DataModels;
using EntityFramework;
using Microsoft.EntityFrameworkCore;

namespace Repositories
{
    public class EntitySparePartRepository : ISparePartRepository
    {
        public SparePart GetById(int id)
        {
            using (EntityFrameworkContext context = new EntityFrameworkContext())
            {
                return context.SpareParts.Find(id);
            }
        }

        public SparePart SaveSparePart(SparePart input)
        {
            using (EntityFrameworkContext context = new EntityFrameworkContext())
            {
                var resut = context.SpareParts.Add(input);
                context.SaveChanges();
                return resut.Entity;
            }
        }

        public SparePart PutSparePart(SparePart input)
        {
            using (EntityFrameworkContext context = new EntityFrameworkContext())
            {
                var SparePart = context.SpareParts.Find(input.Id);
                SparePart.ImageId = input.ImageId;
                SparePart.Name = input.Name;
                SparePart.Description = input.Description;
                SparePart.MarkId = input.MarkId;
                SparePart.ImageId = input.ImageId;
                SparePart.Price = input.Price;
                context.Entry(SparePart).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
                context.SaveChanges();
                return SparePart;
            }
        }

        public void DeleteSparePart(int id)
        {
            using (EntityFrameworkContext context = new EntityFrameworkContext())
            {
                var SparePart = context.SpareParts.Find(id);
                context.SpareParts.Remove(SparePart);
                context.SaveChanges();
            }
        }

        public SparePartList GetList(SparePartFilter filter)
        {
            using (EntityFrameworkContext context = new EntityFrameworkContext())
            {
                SparePartList list = new SparePartList();
                var spareParts = context.SpareParts.Include(x=>x.Mark).Where(x => x.Name.ToUpper().Contains(filter.NameFilter));
                if (filter.MarkIds.Length > 0)
                {
                    spareParts = spareParts.Where(x=>filter.MarkIds.Contains(x.MarkId));
                }
                list.PagesCount = (int)Math.Ceiling(spareParts.Count() / (double)filter.PageSize);
                if (filter.Sort > 0)
                {
                    if ((int)filter.Sort % 2 == 0)
                    {
                        spareParts = spareParts.OrderBy(x=>SortFunction[(int)filter.Sort / 2](x));
                    }
                    else
                    {
                        spareParts = spareParts.OrderByDescending(x => SortFunction[(int)filter.Sort / 2 + 1](x));
                    }
                }
                list.SpareParts = spareParts.Skip((filter.PageNumber - 1) * filter.PageSize).Take(filter.PageSize).ToList();
                return list;
            }
        }

        //private delegate object SortFunctions(SparePart sparePart); 

        //private SortFunctions[] SortFunction = new SortFunctions[] { x => x, x => x.Name, x => x.Id, x => x.Description, x=>x.Price };

        private Func<SparePart, object>[] SortFunction = { x => x, x => x.Name, x => x.Id, x => x.Description, x => x.Price };
    }
}
