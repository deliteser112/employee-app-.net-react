using EmployeeApp.Application.DTOs;
using EmployeeApp.Application.DTOs.Employees;
using EmployeeApp.Domain.Entities;
using Microsoft.AspNetCore.Http;

namespace EmployeeApp.Application.Interfaces
{
    public interface IEmployeeService
    {
        Task<PaginationResult<EmployeeDto>> GetEmployeesAsync(int page, int pageSize);
        Task<EmployeeDto> GetEmployeeAsync(Guid id);
        Task<EmployeeDto> AddEmployeeAsync(CreateEmployeeDto dto, IFormFile? avatar);
        Task UpdateEmployeeAsync(Guid id, UpdateEmployeeDto dto, IFormFile? avatar);
        Task DeleteEmployeeAsync(Guid id);
    }
}
