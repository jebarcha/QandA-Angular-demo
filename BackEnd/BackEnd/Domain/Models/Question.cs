using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace BackEnd.Domain.Models
{
    public class Question
    {
        public int Id { get; set; }
        [Required]
        [Column(TypeName = "varchar(100)")]
        public string Description { get; set; }
        public int QuestionaryId { get; set; }
        public Questionary Questionary { get; set; }
        public List<Answer> ListAnswers { get; set; }
    }
}
