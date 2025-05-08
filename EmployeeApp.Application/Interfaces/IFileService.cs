using Microsoft.AspNetCore.Http; 

namespace EmployeeApp.Application.Interfaces
{
    public interface IFileService
    {
        Task<string> SaveAvatarAsync(IFormFile file);
        Task DeleteAvatarAsync(string filePath);
    }
}