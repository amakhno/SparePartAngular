using System;
using System.Collections.Generic;
using System.Text;

namespace DataModels
{
    public class SparePartListForUsers
    {
        public IEnumerable<SparePartForUsers> SpareParts { get; set; }

        public int PagesCount { get; set; }
    }
}
