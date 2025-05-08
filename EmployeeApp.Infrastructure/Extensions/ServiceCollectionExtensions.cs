using EmployeeApp.Application.Interfaces;
using EmployeeApp.Application.Services;
using EmployeeApp.Domain.Interfaces;
using EmployeeApp.Infrastructure.Data;
using EmployeeApp.Infrastructure.Repositories;
using EmployeeApp.Infrastructure.Services;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

namespace EmployeeApp.Infrastructure.Extensions
{
    public static class ServiceCollectionExtensions
    {
        public static IServiceCollection AddInfrastructure(this IServiceCollection services, string connectionString)
        {
            // --- Configure EF Core with SQLite ---
            services.AddDbContext<AppDbContext>(options =>
                options.UseSqlite(connectionString));

            // --- Register Repositories ---
            services.AddScoped<IDepartmentRepository, DepartmentRepository>();
            services.AddScoped<IEmployeeRepository, EmployeeRepository>();
            services.AddScoped<IUserRepository, UserRepository>();

            // --- Register Infrastructure Services ---
            services.AddScoped<IAuthService, AuthService>();
            services.AddScoped<IFileService, FileService>();

            return services;
        }
    }
}