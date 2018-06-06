using System;
using System.Collections.Generic;
using System.Text;

namespace DataModels
{   

    public class SparePartFilter
    {
        public enum FilterSort
        {
            Empty,
            NameUp,
            NameDown,
            IdUp,
            IdDown,
            DescriptionUp,
            DescriptionDown,
            PriceUp,
            PriceDown
        }

        public string NameFilter { get; set; }

        public int PageNumber { get; set; }

        public int PageSize { get; set; }

        public FilterSort Sort { get; set; }

        public int[] MarkIds { get; set; }
    }
}
