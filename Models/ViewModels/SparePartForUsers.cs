using System;
using System.Collections.Generic;
using System.Text;

namespace DataModels
{
    public class SparePartForUsers
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public string Description { get; set; }

        public int ImageId { get; set; }

        public int MarkId { get; set; }

        public decimal Price { get; set; }

        public string MarkName { get; set; }
    }
}
