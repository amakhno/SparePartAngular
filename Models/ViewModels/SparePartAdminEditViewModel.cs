using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DataModels
{
    public class SparePartAdminEditViewModel
    {
        public int Id {get; set;}

        public string Name { get; set; }

        public string Description { get; set; }

        public decimal Price { get; set; }

        public int MarkId { get; set; }

        public int ImageId { get; set; }

        public string ImageBase64 { get; set; }

        public string ImageName { get; set; }
    }
}
