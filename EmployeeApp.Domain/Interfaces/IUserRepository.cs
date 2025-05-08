
using EmployeeApp.Domain.Entities;

namespace EmployeeApp.Domain.Interfaces
{
    public interface IUserRepository
    {
        Task<User?> GetByUsernameAsync(string username);
        Task AddAsync(User user);
    }
}
