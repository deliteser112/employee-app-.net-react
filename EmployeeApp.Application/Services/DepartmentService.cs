using EmployeeApp.Domain.Interfaces; 
using EmployeeApp.Application.Interfaces; 
using EmployeeApp.Application.DTOs.Departments;

namespace EmployeeApp.Application.Services
{
    public class DepartmentService : IDepartmentService
    {
        private readonly IDepartmentRepository _departmentRepository;

        public DepartmentService(IDepartmentRepository departmentRepository)
        {
            _departmentRepository = departmentRepository;
        }

        public async Task<List<DepartmentDto>> GetDepartmentsAsync()
        {
            var departments = await _departmentRepository.GetAllDepartmentsAsync();
            return departments.Select(d => new DepartmentDto
            {
                Id = d.Id,
                Name = d.Name,
                Type = d.Type
            }).ToList();
        }

        public async Task<DepartmentDto> GetDepartmentByIdAsync(Guid id)
        {
            var department = await _departmentRepository.GetDepartmentByIdAsync(id);
            if (department == null)
                throw new KeyNotFoundException($"Department with ID {id} not found.");

            return new DepartmentDto
            {
                Id = department.Id,
                Name = department.Name,
                Type = department.Type
            };
        }

        public async Task<DepartmentDto> GetDepartmentByNameAsync(string name)
        {
            var department = await _departmentRepository.GetDepartmentByNameAsync(name);
            if (department == null)
                throw new KeyNotFoundException($"Department with name {name} not found.");

            return new DepartmentDto
            {
                Id = department.Id,
                Name = department.Name,
                Type = department.Type
            };
        }
    }
}