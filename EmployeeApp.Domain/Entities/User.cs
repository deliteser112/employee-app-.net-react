using EmployeeApp.Domain.Common.EmployeeApp.Domain.Common;

namespace EmployeeApp.Domain.Entities
{
    public class User : BaseEntity
    {
        public string Username { get; set; } = string.Empty;
        public string PasswordHash { get; set; } = string.Empty;
        public string PasswordSalt { get; set; } = string.Empty;
    }
}
