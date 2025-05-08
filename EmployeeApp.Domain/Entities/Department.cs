using System.Text.Json.Serialization;
using EmployeeApp.Domain.Common.EmployeeApp.Domain.Common;
using EmployeeApp.Domain.Enums;

namespace EmployeeApp.Domain.Entities
{
    public class Department : BaseEntity
    {
        public string Name { get; set; } = string.Empty;
        public DepartmentType Type { get; set; }

        [JsonIgnore]
        public ICollection<Employee> Employees { get; set; } = new List<Employee>();
    }
}
