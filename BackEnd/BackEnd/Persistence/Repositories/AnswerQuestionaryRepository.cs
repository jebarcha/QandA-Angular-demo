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
    public class AnswerQuestionaryRepository : IAnswerQuestionaryRepository
    {
        private readonly ApplicationDbContext _context;
        public AnswerQuestionaryRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task DeleteAnswerQuestionary(AnswerQuestionary answerQuestionary)
        {
            answerQuestionary.Active = 0;
            _context.Entry(answerQuestionary).State = EntityState.Modified;
            await _context.SaveChangesAsync();
        }

        public async Task<AnswerQuestionary> GetAnswerQuestionary(int answerQuestionaryId, int userId)
        {
            var answerQuestionary = await _context.AnswerQuestionary
                                            .Where(x => x.QuestionaryId == answerQuestionaryId
                                                    && x.Active == 1
                                                    && x.Questionary.UserId == userId
                                                   ).FirstOrDefaultAsync();
            return answerQuestionary;
        }

        public async Task<List<AnswerQuestionary>> ListAnswerQuestionary(int questionaryId, int userId)
        {
            var listAnswerQuestionary = await _context.AnswerQuestionary
                                                .Where(x => x.QuestionaryId == questionaryId
                                                        && x.Active == 1
                                                        && x.Questionary.UserId == userId)
                                                .OrderByDescending(x => x.Create).ToListAsync();
            return listAnswerQuestionary;
        }

        public async Task SaveAnswerQuestionary(AnswerQuestionary answerQuestionary)
        {
            answerQuestionary.Active = 1;
            answerQuestionary.Create = DateTime.Now;
            _context.Add(answerQuestionary);
            await _context.SaveChangesAsync();
        }
        public async Task<int> GetQuestionaryIdByAnswerId(int answerId)
        {
            var questionary = await _context.AnswerQuestionary.Where(x => x.Id == answerId
                                        && x.Active == 1).FirstOrDefaultAsync();
            
            return questionary.QuestionaryId;
        }

        public async Task<List<AnswerQuestionaryDetail>> GetListAnswers(int answerId)
        {
            var listAnswers = await _context.AnswerQuestionaryDetail.Where(x => x.AnswerQuestionaryId == answerId)
                                        .Select(x => new AnswerQuestionaryDetail 
                                        { 
                                            AnswerId = x.AnswerId
                                        }).ToListAsync();
            return listAnswers;
        }
    }
}
