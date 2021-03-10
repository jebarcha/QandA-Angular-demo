using BackEnd.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BackEnd.Domain.IServices
{
    public interface IQuestionaryService
    {
        Task CreateQuestionary(Questionary questionary);
        Task<List<Questionary>> GetListQuestionaryByUser(int idUser);
        Task<Questionary> GetQuestionary(int questionaryId);
        Task<Questionary> SearchQuestionary(int questionaryId, int userId);
        Task RemoveQuestionary(Questionary questionary);
        Task<List<Questionary>> GetListQuestionaries();
    }
}
