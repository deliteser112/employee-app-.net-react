
using EmployeeApp.Domain.Enums;

namespace EmployeeApp.Application.DTOs.Departments
{
    public class DepartmentDto
    {
        public Guid Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public DepartmentType Type { get; set; }
    }
}
