using System;
using System.Linq;
using DataModels;
using Helpers;
using Repositories;

namespace Services
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _userRepository;

        public UserService(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        public User CreateUser(LoginViewModel model)
        {
            User newUser = new User();
            newUser.UserName = model.UserName;
            newUser.Password = MD5Helper.GetHash(model.Password);
            if (_userRepository.FindRoleByName("Admin") == null)
            {
                Role role = new Role { Name = "Admin" };
                _userRepository.AddRole(role);
            }
            if (_userRepository.FindRoleByName("User") == null)
            {
                Role role = new Role { Name = "User" };
                _userRepository.AddRole(role);
            }
            if (!_userRepository.FindUsersByRoleName("Admin").Any())
            {
                newUser.RoleId = _userRepository.FindRoleByName("Admin").Id;
            }
            else
            {
                newUser.RoleId = _userRepository.FindRoleByName("User").Id;
            }
            return _userRepository.AddUser(newUser);
        }

        public bool FindByCredentials()
        {
            return _userRepository.FindByCredentials();
        }

        public User FindByCredentials(string username, string password)
        {
            User user = _userRepository.FindByName(username);
            if (MD5Helper.CheckHash(password, user.Password))
            {
                return user;
            }
            else
            {
                throw new Exception("Нет пользователя с такими данными");
            }
        }
    }
}
