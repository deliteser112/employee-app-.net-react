using EmployeeApp.Application.DTOs.Auth;

namespace EmployeeApp.Application.Interfaces
{
    public interface IAuthService
    {
        Task RegisterAsync(RegisterDto dto);
        Task<string> LoginAsync(LoginDto dto);
    }
}