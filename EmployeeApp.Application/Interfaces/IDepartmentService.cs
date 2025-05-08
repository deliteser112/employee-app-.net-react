using EmployeeApp.Application.DTOs.Departments;
using EmployeeApp.Domain.Entities;

namespace EmployeeApp.Application.Interfaces
{
    public interface IDepartmentService
    {
        Task<List<DepartmentDto>> GetDepartmentsAsync();
        Task<DepartmentDto> GetDepartmentByIdAsync(Guid id);
        Task<DepartmentDto> GetDepartmentByNameAsync(string name);
    }
}