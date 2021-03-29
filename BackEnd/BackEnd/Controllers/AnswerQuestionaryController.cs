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
    public class AnswerQuestionaryController : ControllerBase
    {
        private readonly IAnswerQuestionaryService _answerQuestionaryService;
        private readonly IQuestionaryService _questionaryService;
        public AnswerQuestionaryController(IAnswerQuestionaryService answerQuestionaryService, IQuestionaryService questionaryService)
        {
            _answerQuestionaryService = answerQuestionaryService;
            _questionaryService = questionaryService;
        }
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] AnswerQuestionary answerQuestionary)
        {
            try
            {
                await _answerQuestionaryService.SaveAnswerQuestionary(answerQuestionary);
            }
            catch (Exception ex)
            {
                BadRequest(ex.Message);
            }
            return Ok();
        }
        [HttpGet("{questionaryId}")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<IActionResult> Get(int questionaryId)
        {
            try
            {
                var identity = HttpContext.User.Identity as ClaimsIdentity;
                int idUser = JwtConfigurator.GetTokenUserId(identity);

                var listAnswerQuestionary = await _answerQuestionaryService.ListAnswerQuestionary(questionaryId, idUser);
                if (listAnswerQuestionary == null) 
                {
                    return BadRequest(new { message = "Error in list Answers" });
                }
                return Ok(listAnswerQuestionary);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }   
        }

        [HttpDelete("{id}")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<IActionResult> Delete(int id) 
        {
            try
            {
                var identity = HttpContext.User.Identity as ClaimsIdentity;
                int idUser = JwtConfigurator.GetTokenUserId(identity);

                // Crete a method to get the answer
                var answerQuestionary = await _answerQuestionaryService.GetAnswerQuestionary(id, idUser);
                if (answerQuestionary == null) 
                {
                    return BadRequest(new { message = "Error when getting answer" });
                }

                await _answerQuestionaryService.DeleteAnswerQuestionary(answerQuestionary);
                return Ok(new { message = "The answer was removed successfully" });
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Route("GetQuestionaryByAnswerId/{answerId}")]
        [HttpGet]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<IActionResult> GetQuestionaryByAnswerId(int answerId)
        {
            try
            {
                // Get QuestionaryId given an AnswerId
                int questionaryId = await _answerQuestionaryService.GetQuestionaryIdByAnswerId(answerId);

                // Get Questionary (we already have it)
                var questionary = await _questionaryService.GetQuestionary(questionaryId);

                // Get answers selected given an AnswerId
                var listAnswers = await _answerQuestionaryService.GetListAnswers(answerId);
                return Ok(new { questionary = questionary, answers = listAnswers });


            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
