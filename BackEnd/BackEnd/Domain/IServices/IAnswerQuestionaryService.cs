using BackEnd.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BackEnd.Domain.IServices
{
    public interface IAnswerQuestionaryService
    {
        Task SaveAnswerQuestionary(AnswerQuestionary answerQuestionary);
        Task<List<AnswerQuestionary>> ListAnswerQuestionary(int questionaryId, int userId);
        Task<AnswerQuestionary> GetAnswerQuestionary(int answerQuestionaryId, int userId);
        Task DeleteAnswerQuestionary(AnswerQuestionary answerQuestionary);
        Task<int> GetQuestionaryIdByAnswerId(int answerId);
        Task<List<AnswerQuestionaryDetail>> GetListAnswers(int answerId);
    }
}
