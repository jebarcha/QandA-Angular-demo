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
        private readonly IQuestionaryRepository _questionaryService;
        public QuestionaryService(IQuestionaryRepository questionaryService)
        {
            _questionaryService = questionaryService;
        }
        public async Task CreateQuestionary(Questionary questionary)
        {
            await _questionaryService.CreateQuestionary(questionary);
        }
    }
}
