using BackEnd.Domain.IRepositories;
using BackEnd.Domain.Models;
using BackEnd.Persistence.Context;
using Microsoft.EntityFrameworkCore;
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

        public async Task<List<Questionary>> GetListQuestionaryByUser(int idUser)
        {
            var listQuestionary = await _context.Questionary.Where(q => q.IsActive && q.UserId == idUser).ToListAsync();
            return listQuestionary;
        }

        public async Task<Questionary> GetQuestionary(int questionaryId)
        {
            var questionary = await _context.Questionary.Where(x => x.Id == questionaryId 
                                                                    && x.IsActive)
                                                        .Include(x => x.ListQuestions)
                                                        .ThenInclude(x => x.ListAnswers)
                                                        .FirstOrDefaultAsync();

            return questionary;
        }
        public async Task<Questionary> SearchQuestionary(int questionaryId, int userId)
        {
            var questionary = await _context.Questionary.Where(x => x.Id == questionaryId 
                                                                      && x.IsActive
                                                                      && x.UserId == userId)
                                                        .FirstOrDefaultAsync();
            return questionary;
        }
        public async Task RemoveQuestionary(Questionary questionary)
        {
            questionary.IsActive = false;
            _context.Entry(questionary).State = EntityState.Modified;
            await _context.SaveChangesAsync();
        }

        public async Task<List<Questionary>> GetListQuestionaries()
        {
            var questionaries = await _context.Questionary.Where(x => x.IsActive)
                                                          .Select(o => new Questionary 
                                                          { 
                                                            Id = o.Id,
                                                            Name = o.Name,
                                                            Description = o.Description,
                                                            Create = o.Create,
                                                            User = new User { UserName = o.User.UserName }
                                                          })
                                                          .ToListAsync();
            return questionaries;
        }
    }
}
