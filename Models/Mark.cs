using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DataModels
{
    public class Mark
    {
        public int Id {get; set;}
        public int ImageId { get; set; }
        [Required]
        public string Name {get; set;}
    }
}
