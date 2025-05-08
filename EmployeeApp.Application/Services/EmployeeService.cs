using EmployeeApp.Application.Interfaces;
using EmployeeApp.Application.DTOs.Employees;
using EmployeeApp.Domain.Entities; 
using EmployeeApp.Infrastructure.Repositories;
using Microsoft.EntityFrameworkCore; 
using Microsoft.AspNetCore.Http; 
using EmployeeApp.Domain.Interfaces;
using EmployeeApp.Application.DTOs;

namespace EmployeeApp.Application.Services
{
    public class EmployeeService : IEmployeeService
    {
        private readonly IEmployeeRepository _employeeRepository;
        private readonly IDepartmentRepository _departmentRepository;
        private readonly IFileService _fileService;

        public EmployeeService(IEmployeeRepository employeeRepository,
                               IDepartmentRepository departmentRepository,
                               IFileService fileService)
        {
            _employeeRepository = employeeRepository;
            _departmentRepository = departmentRepository;
            _fileService = fileService;
        }

        public async Task<PaginationResult<EmployeeDto>> GetEmployeesAsync(int page, int pageSize)
        {
            var skip = (page - 1) * pageSize;
            var totalCount = await _employeeRepository.GetEmployees().CountAsync();

            IQueryable<Employee> query = _employeeRepository.GetEmployees();

            query = query.OrderByDescending(e => e.HireDate);

            var employees = await query
                .Skip(skip)
                .Take(pageSize)
                .Select(e => new EmployeeDto
                {
                    Id = e.Id,
                    FirstName = e.FirstName,
                    LastName = e.LastName,
                    Phone = e.Phone,
                    Address = e.Address,
                    HireDate = e.HireDate,
                    DepartmentName = e.Department.Name,
                    AvatarPath = e.AvatarPath
                })
                .ToListAsync();

            var totalPages = (int)Math.Ceiling(totalCount / (double)pageSize);

            return new PaginationResult<EmployeeDto>
            {
                Items = employees,
                TotalPages = totalPages
            };
        }

        public async Task<EmployeeDto> GetEmployeeAsync(Guid id)
        {
            var employee = await _employeeRepository.GetEmployeeByIdAsync(id);
            if (employee == null) return null;

            return new EmployeeDto
            {
                Id = employee.Id,
                FirstName = employee.FirstName,
                LastName = employee.LastName,
                Phone = employee.Phone,
                Address = employee.Address,
                HireDate = employee.HireDate,
                DepartmentName = employee.Department.Name,
                AvatarPath = employee.AvatarPath
            };
        }

        public async Task<EmployeeDto> AddEmployeeAsync(CreateEmployeeDto dto, IFormFile? avatar)
        {
            var department = await _departmentRepository.GetDepartmentByIdAsync(dto.DepartmentId);
            if (department == null)
                throw new Exception("Invalid Department");

            var avatarPath = avatar != null ? await _fileService.SaveAvatarAsync(avatar) : null;

            var employee = new Employee
            {
                FirstName = dto.FirstName,
                LastName = dto.LastName,
                Phone = dto.Phone,
                Address = dto.Address,
                HireDate = dto.HireDate,
                DepartmentId = department.Id,
                AvatarPath = avatarPath
            };

            await _employeeRepository.AddEmployeeAsync(employee);

            return new EmployeeDto
            {
                Id = employee.Id,
                FirstName = employee.FirstName,
                LastName = employee.LastName,
                Phone = employee.Phone,
                Address = employee.Address,
                HireDate = employee.HireDate,
                DepartmentName = department.Name,
                AvatarPath = employee.AvatarPath
            };
        }

        public async Task UpdateEmployeeAsync(Guid id, UpdateEmployeeDto dto, IFormFile? avatar)
        {
            var employee = await _employeeRepository.GetEmployeeByIdAsync(id);
            if (employee == null)
                throw new Exception("Employee not found");

            var department = await _departmentRepository.GetDepartmentByIdAsync(dto.DepartmentId);
            if (department == null)
                throw new Exception("Invalid department");

            if (avatar != null)
            {
                var avatarPath = await _fileService.SaveAvatarAsync(avatar);
                employee.AvatarPath = avatarPath;
            }

            employee.FirstName = dto.FirstName;
            employee.LastName = dto.LastName;
            employee.Phone = dto.Phone;
            employee.Address = dto.Address;
            employee.HireDate = dto.HireDate;
            employee.DepartmentId = department.Id;

            await _employeeRepository.UpdateEmployeeAsync(employee);
        }

        public async Task DeleteEmployeeAsync(Guid id)
        {
            var employee = await _employeeRepository.GetEmployeeByIdAsync(id);
            if (employee == null)
                throw new Exception("Employee not found");

            if (!string.IsNullOrEmpty(employee.AvatarPath))
            {
                await _fileService.DeleteAvatarAsync(employee.AvatarPath);
            }

            await _employeeRepository.DeleteEmployeeAsync(employee);
        }
    }
}