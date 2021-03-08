using BackEnd.Domain.IRepositories;
using BackEnd.Domain.Models;
using BackEnd.Persistence.Context;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BackEnd.Persistence.Repositories
{
    public class QuestionaryRepository : IQuestionaryRepository
    {
        private readonly ApplicationDbContext _context;
        public QuestionaryRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task CreateQuestionary(Questionary questionary)
        {
            _context.Add(questionary);
            await _context.SaveChangesAsync();
        }
    }
}
