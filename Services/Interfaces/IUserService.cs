using DataModels;
using System;
using System.Collections.Generic;
using System.Text;

namespace Services
{
    public interface IUserService
    {
        User FindByCredentials(string username, string password);
        User CreateUser(LoginViewModel model);
    }
}
