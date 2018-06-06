using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace DataModels.ViewModels
{
    public class MarkAdminEditViewModel
    {
        public int Id { get; set; }

        [Required]
        public string Name { get; set; }
        
        public int ImageId { get; set; }
    }
}
