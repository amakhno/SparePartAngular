using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DataModels;
using EntityFramework;
using Microsoft.EntityFrameworkCore;

namespace Repositories
{
    public class EntityUserRepository : IUserRepository
    {
        public User FindByCredentials(string username, string password)
        {
            using (EntityFrameworkContext context = new EntityFrameworkContext())
            {
                return new User();
            }
        }

        public User AddUser(User user)
        {
            using (EntityFrameworkContext context = new EntityFrameworkContext())
            {
                if (context.Users.Find(user.UserName) != null)
                {
                    throw new System.Exception("Пользователь с данным именем уже есть");
                }
                var resultUser = context.Users.Add(user);
                context.SaveChanges();
                return resultUser.Entity;
            }
        }

        public Role FindRoleByName(string Name)
        {
            using (EntityFrameworkContext context = new EntityFrameworkContext())
            {
                var roles = context.Roles.Where(x => x.Name == Name).ToList();
                if (roles.Any())
                {
                    Role resultRole = roles.First();
                    return resultRole;
                }
                else
                {
                    return null;
                }    
            }
        }

        public Role AddRole(Role role)
        {
            using (EntityFrameworkContext context = new EntityFrameworkContext())
            {
                var result = context.Roles.Add(role);
                context.SaveChanges();
                return result.Entity;
            }
        }

        public bool FindByCredentials()
        {
            return true;
        }

        public User FindByName(string username)
        {
            using (EntityFrameworkContext context = new EntityFrameworkContext())
            {
                User user = context.Users.Find(username);
                context.Entry(user).Reference(x=>x.Role).Load();
                if (user == null)
                {
                    throw new System.Exception("Пользователя с таким именем нет");
                }
                return user;
            }
        }

        public IEnumerable<User> FindUsersByRoleName(string roleName)
        {
            using (EntityFrameworkContext context = new EntityFrameworkContext())
            {
                var role = context.Roles.Where(x => x.Name == roleName).First();
                if (role == null)
                {
                    return new User[0];
                }
                var users = context.Users.Where(x => x.Role == role);
                return users.ToList();
            }
        }
    }
}