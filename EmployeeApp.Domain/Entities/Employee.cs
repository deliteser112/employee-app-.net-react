using EmployeeApp.Domain.Common.EmployeeApp.Domain.Common;

namespace EmployeeApp.Domain.Entities
{
    public class Employee : BaseEntity
    {
        public string FirstName { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;
        public string Phone { get; set; } = string.Empty;
        public string Address { get; set; } = string.Empty;
        public DateTime HireDate { get; set; }
        public string? AvatarPath { get; set; }
        public Guid DepartmentId { get; set; }
        public Department? Department { get; set; }
    }
}