using BackEnd.Domain.IServices;
using BackEnd.Domain.Models;
using BackEnd.Utils;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace BackEnd.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class QuestionaryController : ControllerBase
    {
        private readonly IQuestionaryService _questionaryService;
        public QuestionaryController(IQuestionaryService questionaryService)
        {
            _questionaryService = questionaryService;
        }

        [HttpPost]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<IActionResult> Post([FromBody] Questionary questionary) 
        {
            try
            {
                var identity = HttpContext.User.Identity as ClaimsIdentity;
                int idUser = JwtConfigurator.GetTokenUserId(identity);

                questionary.UserId = idUser;
                questionary.IsActive = true;
                questionary.Create = DateTime.Now;
                await _questionaryService.CreateQuestionary(questionary);

                return Ok(new { message = "Questionary succesfully added." });
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
