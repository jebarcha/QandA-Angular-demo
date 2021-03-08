﻿using BackEnd.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BackEnd.Domain.IRepositories
{
    public interface IQuestionaryRepository
    {
        Task CreateQuestionary(Questionary questionary);
    }
}
