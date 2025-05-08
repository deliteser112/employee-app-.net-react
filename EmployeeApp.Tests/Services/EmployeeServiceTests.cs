using EmployeeApp.Application.DTOs.Employees;
using EmployeeApp.Application.Services;
using EmployeeApp.Domain.Entities;
using EmployeeApp.Domain.Interfaces;
using Microsoft.AspNetCore.Hosting;
using Moq;
using Xunit;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using EmployeeApp.Infrastructure.Repositories;
using EmployeeApp.Application.Interfaces;

namespace EmployeeApp.Tests.Services
{
    public class EmployeeServiceTests
    {
        private readonly Mock<IEmployeeRepository> _employeeRepoMock;
        private readonly Mock<IDepartmentRepository> _departmentRepoMock;
        private readonly Mock<IWebHostEnvironment> _envMock;
        private readonly EmployeeService _employeeService;

        private readonly Mock<IFileService> _fileServiceMock;

        public EmployeeServiceTests()
        {
            _employeeRepoMock = new Mock<IEmployeeRepository>();
            _departmentRepoMock = new Mock<IDepartmentRepository>();
            _fileServiceMock = new Mock<IFileService>();  // Mocking IFileService

            _employeeService = new EmployeeService(
                _employeeRepoMock.Object,
                _departmentRepoMock.Object,
                _fileServiceMock.Object);  // Pass the mock IFileService here
        }

        [Fact]
        public async Task GetEmployeesAsync_ShouldReturnPagedList()
        {
            // Arrange
            var employees = new List<Employee>
            {
                new Employee { Id = Guid.NewGuid(), FirstName = "John", LastName = "Doe", Department = new Department { Name = "IT" }, HireDate = DateTime.UtcNow, Phone = "123", Address = "City" },
                new Employee { Id = Guid.NewGuid(), FirstName = "Jane", LastName = "Smith", Department = new Department { Name = "HR" }, HireDate = DateTime.UtcNow, Phone = "456", Address = "Town" }
            }.AsQueryable();

            _employeeRepoMock.Setup(r => r.GetEmployees()).Returns(employees);

            // Act
            var result = await _employeeService.GetEmployeesAsync(1, 10);

            // Assert
            Assert.Equal(2, result.Count());
            Assert.Contains(result.Items, e => e.FirstName == "John"); 
        }

        [Fact]
        public async Task GetEmployeeAsync_ShouldReturnCorrectEmployee()
        {
            // Arrange
            var empId = Guid.NewGuid();
            var employee = new Employee
            {
                Id = empId,
                FirstName = "Alice",
                LastName = "Wonder",
                Phone = "999",
                Address = "Dreamland",
                HireDate = DateTime.UtcNow,
                Department = new Department { Name = "Sales" }
            };

            _employeeRepoMock.Setup(r => r.GetEmployeeByIdAsync(empId)).ReturnsAsync(employee);

            // Act
            var result = await _employeeService.GetEmployeeAsync(empId);

            // Assert
            Assert.NotNull(result);
            Assert.Equal("Alice", result.FirstName);
            Assert.Equal("Sales", result.DepartmentName);
        }

        [Fact]
        public async Task GetEmployeeAsync_ShouldReturnNull_WhenNotFound()
        {
            // Arrange
            var id = Guid.NewGuid();
            _employeeRepoMock.Setup(r => r.GetEmployeeByIdAsync(id)).ReturnsAsync((Employee?)null);

            // Act
            var result = await _employeeService.GetEmployeeAsync(id);

            // Assert
            Assert.Null(result);
        }
    }
}