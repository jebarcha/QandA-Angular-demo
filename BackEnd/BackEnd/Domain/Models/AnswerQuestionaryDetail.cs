using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BackEnd.Domain.Models
{
    public class AnswerQuestionaryDetail
    {
        public int Id { get; set; }
        public AnswerQuestionary AnswerQuestionary { get; set; }
        public int AnswerId { get; set; }
        public int AnswerQuestionaryId { get; set; }
        public Answer Answer { get; set; }
    }
}
