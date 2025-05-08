using EmployeeApp.Domain.Entities;
using EmployeeApp.Domain.Enums;
using EmployeeApp.Domain.Interfaces;

namespace EmployeeApp.Infrastructure.Services
{
    public class DepartmentSeeder
    {
        private readonly IDepartmentRepository _departmentRepository;

        public DepartmentSeeder(IDepartmentRepository departmentRepository)
        {
            _departmentRepository = departmentRepository;
        }

        public async Task SeedAsync()
        {
            var existingDepartments = await _departmentRepository.GetAllDepartmentsAsync();
            if (existingDepartments.Any()) return;

            var departments = new List<Department>
            {
                new Department { Name = "HR", Type = DepartmentType.HR },
                new Department { Name = "IT", Type = DepartmentType.IT },
                new Department { Name = "Sales", Type = DepartmentType.Sales },
                new Department { Name = "Finance", Type = DepartmentType.Finance },
                new Department { Name = "Operations", Type = DepartmentType.Operations }
            };

            foreach (var dept in departments)
            {
                await _departmentRepository.AddAsync(dept);
            }
        }
    }
}