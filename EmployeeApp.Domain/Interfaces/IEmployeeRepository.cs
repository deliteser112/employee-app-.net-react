using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using EmployeeApp.Domain.Entities;

namespace EmployeeApp.Infrastructure.Repositories
{
    public interface IEmployeeRepository
    {
        IQueryable<Employee> GetEmployees();
        Task<Employee?> GetEmployeeByIdAsync(Guid id);
        Task AddEmployeeAsync(Employee employee);
        Task UpdateEmployeeAsync(Employee employee);
        Task DeleteEmployeeAsync(Employee employee);
    }
}
