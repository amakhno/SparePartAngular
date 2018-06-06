using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace DataModels
{
    public class User
    {
        [Key]
        public string UserName { get; set; }

        [MaxLength(32)]
        public string Password { get; set; }

        public int RoleId { get; set; }

        public Role Role { get; set; }
    }
}
