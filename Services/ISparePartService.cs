using DataModels;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Services
{
    public interface ISparePartService
    {
        SparePart Put(SparePart input, Image image);

        SparePart Post(SparePart input, Image image);

        SparePart GetById(int Id);

        void Delete(int Id);

        SparePartList GetList(SparePartFilter filter);
    }
}
