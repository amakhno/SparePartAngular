using DataModels;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Repositories
{
    public interface IUserRepository
    {
        bool FindByCredentials();
        User FindByCredentials(string username, string password);
        User FindByName(string username);
        Role FindRoleByName(string Name);
        Role AddRole(Role role);

        User AddUser(User user);
        IEnumerable<User> FindUsersByRoleName(string roleName);
    }
}