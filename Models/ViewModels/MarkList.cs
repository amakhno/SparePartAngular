using System;
using System.Collections.Generic;
using System.Text;

namespace DataModels
{
    public class MarkList
    {
        public IEnumerable<Mark> Marks { get; set; }

        public int PagesCount { get; set; }
    }
}
