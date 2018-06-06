using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DataModels;
using EntityFramework;

namespace Repositories
{
    public class EntityMarkRepository : IMarkRepository
    {
        public Mark GetById(int id)
        {
            using (EntityFrameworkContext context = new EntityFrameworkContext())
            {
                return context.Marks.Find(id);
            }
        }

        public async Task<Mark> SaveMark(Mark input)
        {
            using (EntityFrameworkContext context = new EntityFrameworkContext())
            {
                var resut = await context.Marks.AddAsync(input);
                await context.SaveChangesAsync();
                return resut.Entity;
            }            
        }

        public async Task<Mark> PutMark(Mark input)
        {
            using (EntityFrameworkContext context = new EntityFrameworkContext())
            {
                var mark = context.Marks.Find(input.Id);
                mark.ImageId = input.ImageId;
                mark.Name = input.Name;
                context.Entry(mark).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
                await context.SaveChangesAsync();
                return mark;
            }
        }

        public MarkList GetList(MarkFilter filter)
        {
            using (EntityFrameworkContext context = new EntityFrameworkContext())
            {
                MarkList list = new MarkList();
                var marks = context.Marks.Where(x => x.Name.ToUpper().Contains(filter.NameFilter));
                list.PagesCount = (int)Math.Ceiling(marks.Count() / (double)filter.PageSize);
                list.Marks = marks.Skip((filter.PageNumber - 1) * filter.PageSize).Take(filter.PageSize).ToList();
                return list;
            }
        }

        public Mark[] GetList()
        {
            using (EntityFrameworkContext context = new EntityFrameworkContext())
            {
                MarkList list = new MarkList();
                var marks = context.Marks;
                return marks.ToArray();
            }
        }

        public void Delete(int id)
        {
            using (EntityFrameworkContext context = new EntityFrameworkContext())
            {
                context.Marks.Remove(context.Marks.Find(id));
                context.SaveChanges();
            }
        }
    }
}
