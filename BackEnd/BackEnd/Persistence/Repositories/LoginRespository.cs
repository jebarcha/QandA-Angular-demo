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
    public class LoginRespository: ILoginRepository
    {
        private readonly ApplicationDbContext _context;
        public LoginRespository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<User> ValidateUser(User user)
        {
            var userDb =  await _context.User.Where(x => x.UserName == user.UserName 
                    && x.Password == user.Password).FirstOrDefaultAsync();

            return userDb;
        }
    }
}
