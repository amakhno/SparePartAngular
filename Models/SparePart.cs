using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DataModels
{
    public class SparePart
    {
        public int Id {get; set;}

        public string Name { get; set; }

        public string Description { get; set; }

        public int ImageId { get; set; }

        public int MarkId { get; set; }

        public decimal Price { get; set; }

        public Mark Mark {get; set;}
    }
}
