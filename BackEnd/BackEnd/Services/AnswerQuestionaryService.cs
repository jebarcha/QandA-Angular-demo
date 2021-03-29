using BackEnd.Domain.IRepositories;
using BackEnd.Domain.IServices;
using BackEnd.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BackEnd.Services
{
    public class AnswerQuestionaryService : IAnswerQuestionaryService
    {
        private readonly IAnswerQuestionaryRepository _answerQuestionaryRepository;

        public AnswerQuestionaryService(IAnswerQuestionaryRepository answerQuestionaryRepository)
        {
            _answerQuestionaryRepository = answerQuestionaryRepository;
        }

        public async Task DeleteAnswerQuestionary(AnswerQuestionary answerQuestionary)
        {
            await _answerQuestionaryRepository.DeleteAnswerQuestionary(answerQuestionary);
        }

        public async Task<AnswerQuestionary> GetAnswerQuestionary(int answerQuestionaryId, int userId)
        {
            return await _answerQuestionaryRepository.GetAnswerQuestionary(answerQuestionaryId, userId);
        }

        public async Task<List<AnswerQuestionary>> ListAnswerQuestionary(int questionaryId, int userId)
        {
            return await _answerQuestionaryRepository.ListAnswerQuestionary(questionaryId, userId);
        }

        public async Task SaveAnswerQuestionary(AnswerQuestionary answerQuestionary)
        {
            await _answerQuestionaryRepository.SaveAnswerQuestionary(answerQuestionary);
        }
        public async Task<int> GetQuestionaryIdByAnswerId(int answerId) 
        {
            return await _answerQuestionaryRepository.GetQuestionaryIdByAnswerId(answerId);
        }

        public async Task<List<AnswerQuestionaryDetail>> GetListAnswers(int answerId)
        {
            return await _answerQuestionaryRepository.GetListAnswers(answerId);
        }
    }
}
