using System.Threading.Tasks;
using System;
using EmployeeApp.Application.DTOs.Auth;
using EmployeeApp.Domain.Entities;
using EmployeeApp.Infrastructure.Data;
using EmployeeApp.Infrastructure.Services;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Moq;
using Xunit;
using EmployeeApp.Application.Services;

namespace EmployeeApp.Tests.Services
{
    public class AuthServiceTests
    {
        private readonly AppDbContext _dbContext;
        private readonly AuthService _authService;

        public AuthServiceTests()
        {
            var options = new DbContextOptionsBuilder<AppDbContext>()
                .UseInMemoryDatabase(databaseName: Guid.NewGuid().ToString())
                .Options;

            _dbContext = new AppDbContext(options);
             
            var mockConfig = new Mock<IConfiguration>();
            _authService = new AuthService(_dbContext, mockConfig.Object);
        }

        [Fact]
        public async Task RegisterAsync_ShouldAddUser_WhenUsernameIsUnique()
        {
            // Arrange
            var registerDto = new RegisterDto
            {
                Username = "testuser",
                Password = "password123"
            };

            // Act
            await _authService.RegisterAsync(registerDto);

            // Assert
            var user = await _dbContext.Users.FirstOrDefaultAsync(u => u.Username == registerDto.Username);
            Assert.NotNull(user);
            Assert.NotEmpty(user.PasswordHash);
            Assert.NotEmpty(user.PasswordSalt);
        }

        [Fact]
        public async Task RegisterAsync_ShouldThrow_WhenUserAlreadyExists()
        {
            // Arrange
            var existingUser = new User
            {
                Username = "duplicate",
                PasswordHash = "xxx",
                PasswordSalt = "yyy"
            };
            _dbContext.Users.Add(existingUser);
            await _dbContext.SaveChangesAsync();

            var duplicateDto = new RegisterDto
            {
                Username = "duplicate",
                Password = "something"
            };

            // Act & Assert
            await Assert.ThrowsAsync<InvalidOperationException>(() =>
                _authService.RegisterAsync(duplicateDto));
        }
    }
}