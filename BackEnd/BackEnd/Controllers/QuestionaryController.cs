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
                int idUser = GetIdUser();

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

        [Route("GetListQuestionaryByUser")]
        [HttpGet]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<IActionResult> GetListQuestionaryByUser() 
        {
            try
            {
                int idUser = GetIdUser();

                var listQuestionary = await _questionaryService.GetListQuestionaryByUser(idUser);
                return Ok(listQuestionary);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("{questionaryId}")]
        public async Task<IActionResult> GetQuestionry(int questionaryId) 
        {
            try
            {
                var questionary = await _questionaryService.GetQuestionary(questionaryId);
                return Ok(questionary);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpDelete("{questionaryId}")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<IActionResult> Delete(int questionaryId)
        {
            try
            {
                int idUser = GetIdUser();
                var questionary = await _questionaryService.SearchQuestionary(questionaryId, idUser);
                if (questionary == null) 
                {
                    return BadRequest(new { message = "Questionary was not found!" });
                }
                await _questionaryService.RemoveQuestionary(questionary);
                return Ok(new { message = "Questionary was marked as deleted!" });
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Route("GetListQuestionaries")]
        [HttpGet]
        public async Task<IActionResult> GetListQuestionaries() 
        {
            try
            {
                var listQuestionaries = await _questionaryService.GetListQuestionaries();
                return Ok(listQuestionaries);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        private int GetIdUser() 
        {
            var identity = HttpContext.User.Identity as ClaimsIdentity;
            int idUser = JwtConfigurator.GetTokenUserId(identity);
            return idUser;
        }

    }
}
