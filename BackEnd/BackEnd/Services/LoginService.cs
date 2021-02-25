using BackEnd.Domain.IRepositories;
using BackEnd.Domain.IServices;
using BackEnd.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BackEnd.Services
{
    public class LoginService : ILoginService
    {
        private readonly ILoginRepository _loginRespository;
        public LoginService(ILoginRepository loginRepository)
        {
            _loginRespository = loginRepository;
        }
        public async Task<User> ValidateUser(User user)
        {
            return await _loginRespository.ValidateUser(user);
        }
    }
}
