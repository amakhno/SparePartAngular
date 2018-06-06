using DataModels;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Repositories
{
    public interface IMarkRepository
    {
        Task<Mark> SaveMark(Mark input);
        Mark GetById(int id);
        Task<Mark> PutMark(Mark input);
        MarkList GetList(MarkFilter filter);
        Mark[] GetList();
        void Delete(int id);
    }
}
