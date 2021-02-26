using BackEnd.Domain.IServices;
using BackEnd.Domain.Models;
using BackEnd.DTO;
using BackEnd.Utils;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BackEnd.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;
        public UserController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] User user) 
        {
            try
            {
                var validateExistence = await _userService.ValidateExistence(user);
                if (validateExistence) 
                {
                    return BadRequest(new { message = $"Username {user.UserName} already exists" });
                }

                user.Password = Encrypt.EncryptPassword(user.Password);
                await _userService.SaveUser(user);

                return Ok(new { mesagge = "User added successfully" });
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // localhost:xxx/api/User/ChangePassword
        [Route("ChangePassword")]
        [HttpPut]
        public async Task<IActionResult> ChangePassword([FromBody] ChangePasswordDTO changePassword) 
        {
            try
            {
                int idUser = 4;
                string passwordEncrypted = Encrypt.EncryptPassword(changePassword.PasswordOld);
                var user = await _userService.ValidatePassword(idUser, passwordEncrypted);
                if (user == null) 
                {
                    return BadRequest(new { message = "Password Incorrect!" });
                }

                user.Password = Encrypt.EncryptPassword(changePassword.PasswordNew);
                await _userService.UpdatePassword(user);
                return Ok(new { message = "Password was changed successfully"});
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

    }
}
