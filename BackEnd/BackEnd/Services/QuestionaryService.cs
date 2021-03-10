using BackEnd.Domain.IRepositories;
using BackEnd.Domain.IServices;
using BackEnd.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BackEnd.Services
{
    public class QuestionaryService : IQuestionaryService
    {
        private readonly IQuestionaryRepository _questionaryRepository;
        public QuestionaryService(IQuestionaryRepository questionaryRepository)
        {
            _questionaryRepository = questionaryRepository;
        }
        public async Task CreateQuestionary(Questionary questionary)
        {
            await _questionaryRepository.CreateQuestionary(questionary);
        }

        public async Task<List<Questionary>> GetListQuestionaryByUser(int idUser)
        {
            return await _questionaryRepository.GetListQuestionaryByUser(idUser);
        }

        public async Task<Questionary> GetQuestionary(int questionaryId)
        {
            return await _questionaryRepository.GetQuestionary(questionaryId);
        }
        public async Task<Questionary> SearchQuestionary(int questionaryId, int userId)
        {
            return await _questionaryRepository.SearchQuestionary(questionaryId, userId);
        }
        public async Task RemoveQuestionary(Questionary questionary)
        {
            await _questionaryRepository.RemoveQuestionary(questionary);
        }

        public async Task<List<Questionary>> GetListQuestionaries()
        {
            return await _questionaryRepository.GetListQuestionaries();
        }
    }
}
