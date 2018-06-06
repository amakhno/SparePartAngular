using DataModels;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Services
{
    public interface IMarkService
    {
        Task<Mark> Save(Mark input, Image image);
        Mark GetById(int Id);
        MarkList GetList(MarkFilter filter);
        Mark[] GetListForSelect();
        void Delete(int id);
    }
}
