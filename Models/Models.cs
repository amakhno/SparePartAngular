using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DataModels
{
    public class Model
    {
        public int Id { get; set; }

        public Mark Mark { get; set; }

        public int MarkId { get; set; }

        public string Name { get; set; }
        
    }
}
