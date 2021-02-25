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
    public class UserRepository : IUserRepository
    {
        private readonly ApplicationDbContext _context;
        public UserRepository(ApplicationDbContext context)
        {
            _context = context;
        }
        public async Task SaveUser(User user)
        {
            _context.Add(user);
            await _context.SaveChangesAsync();
        }
        public async Task<bool> ValidateExistence(User user)
        {
            var validateExistence = await _context.User.AnyAsync(x => x.UserName == user.UserName);
            return validateExistence;
        }

        public async Task<User> ValidatePassword(int idUser, string passwordOld)
        {
            var user = await _context.User.Where(x => x.Id == idUser && x.Password == passwordOld).FirstOrDefaultAsync();
            return user;
        }
        public async Task UpdatePassword(User user)
        {
            _context.Update(user);
            await _context.SaveChangesAsync();
        }

    }
}
