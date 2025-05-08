using EmployeeApp.Application.Interfaces;
using Microsoft.AspNetCore.Http;

namespace EmployeeApp.Infrastructure.Services
{
    public class FileService : IFileService
    {
        private readonly string _rootFolder = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "avatars");

        public async Task<string> SaveAvatarAsync(IFormFile file)
        {
            if (file == null || file.Length == 0)
                return string.Empty;

            if (!Directory.Exists(_rootFolder))
                Directory.CreateDirectory(_rootFolder);

            var fileName = $"{Guid.NewGuid()}_{Path.GetFileName(file.FileName)}";
            var filePath = Path.Combine(_rootFolder, fileName);

            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await file.CopyToAsync(stream);
            }

            return $"/avatars/{fileName}";
        }

        public Task DeleteAvatarAsync(string filePath)
        {
            var fullPath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", filePath.TrimStart('/'));
            if (File.Exists(fullPath))
            {
                File.Delete(fullPath);
            }
            return Task.CompletedTask;
        }
    }
}