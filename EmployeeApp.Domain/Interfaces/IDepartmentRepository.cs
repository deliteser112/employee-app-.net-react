using EmployeeApp.Domain.Entities;

namespace EmployeeApp.Domain.Interfaces
{
    public interface IDepartmentRepository
    {
        Task<List<Department>> GetAllDepartmentsAsync();
        Task<Department?> GetDepartmentByIdAsync(Guid id);
        Task<Department?> GetDepartmentByNameAsync(string name);
        Task AddAsync(Department department);

    }
}