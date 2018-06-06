using DataModels;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Repositories
{
    public interface ISparePartRepository
    {
        SparePart SaveSparePart(SparePart input);
        SparePart GetById(int id);
        SparePart PutSparePart(SparePart input);
        void DeleteSparePart(int id);
        SparePartList GetList(SparePartFilter filter);
    }
}
