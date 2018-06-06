using System;
using System.Collections.Generic;
using System.Text;

namespace DataModels
{
    public class SparePartList
    {
        public IEnumerable<SparePart> SpareParts { get; set; }

        public int PagesCount { get; set; }
    }
}
