import React, { useEffect, useState } from "react";
import { getEmployees, deleteEmployee } from "../services/employeeService";
import { Employee } from "../types";
import EmployeeCard from "../components/EmployeeCard";
import EmployeeDetailsModal from "../components/EmployeeDetailsModal";
import EmployeeFormModal from "../components/EmployeeFormModal";
import Button from "../components/Button";
import Toast from "../components/Toast";
import { useNavigate } from "react-router-dom";
import ConfirmDeleteModal from "../components/ConfirmDeleteModal";
import { toast, ToastContainer  } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Dashboard: React.FC = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState<boolean>(false);
  const [isFormModalOpen, setIsFormModalOpen] = useState<boolean>(false);

  const [isConfirmDeleteModalOpen, setIsConfirmDeleteModalOpen] = useState<boolean>(false);
  const [employeeToDelete, setEmployeeToDelete] = useState<Employee | null>(null);

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(5); 

  const navigate = useNavigate();

  const fetchEmployees = async () => {
    try {
      const res = await getEmployees(currentPage, pageSize); 
      
      setEmployees(res.items);
      setTotalPages(res.totalPages);
    } catch {
      toast.error("Failed to load employees.");
    }
  };
 
  const handleDelete = async () => {
    if (employeeToDelete) {
      try {
        await deleteEmployee(employeeToDelete.id);
        fetchEmployees();
        setIsConfirmDeleteModalOpen(false);
      } catch {
        toast.error("Failed to delete employee.");
      }
    }
  };

  const handleViewDetails = (employee: Employee) => {
    setSelectedEmployee(employee);
    setIsDetailModalOpen(true);
  };

  const handleUpdated = () => {
    fetchEmployees();
    setIsDetailModalOpen(false);
  };

  const handleOpenDeleteConfirmation = (employee: Employee) => {
    setEmployeeToDelete(employee);
    setIsConfirmDeleteModalOpen(true);
  };

  const handleCloseDeleteConfirmation = () => {
    setIsConfirmDeleteModalOpen(false);
    setEmployeeToDelete(null);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };


  const handleLogout = () => { 
    localStorage.removeItem("token");
    localStorage.removeItem("user");
 
    navigate("/login");
  };

  useEffect(() => {
    fetchEmployees();
  }, [currentPage]); 

  return (
    <div className="p-4 md:w-[100%] lg:w-[70%] mx-auto pt-[100px]">
      <h1 className="text-center text-4xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl mb-4">
        <span className="text-transparent bg-clip-text bg-gradient-to-r to-purple-600 from-blue-400 ">EMPLOYEES</span>
      </h1>

      <Button
        content="+ New Employee"
        role={() => setIsFormModalOpen(true)}
        disable={false}
      />

      <div>
        {employees.length > 0 ? (
          employees.map((emp) => (
            <EmployeeCard
              key={emp.id}
              employee={emp}
              onView={() => handleViewDetails(emp)}
              onDelete={() => handleOpenDeleteConfirmation(emp)}
            />
          ))
        ) : (
          <p className="text-center text-2xl text-red">No employees found.</p>
        )}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center mt-6">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-300 rounded-lg w-[100px]"
        >
          Previous
        </button>
        <span className="px-4 py-2">{`Page ${currentPage} of ${totalPages}`}</span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-gray-300 rounded-lg w-[100px]"
        >
          Next
        </button>
      </div>

      <button
        onClick={handleLogout}
        className="fixed top-5 right-5 gap-2 px-4 py-2 text-3xl text-black"
      > 
        <i className="fa-solid fa-right-from-bracket"></i> 
      </button>
 
      {selectedEmployee && (
        <EmployeeDetailsModal
          employee={selectedEmployee}
          isOpen={isDetailModalOpen}
          onClose={() => setIsDetailModalOpen(false)}
          onUpdated={handleUpdated}
        />
      )}
 
      {isFormModalOpen && (
        <EmployeeFormModal
          isOpen={isFormModalOpen}
          onClose={() => setIsFormModalOpen(false)}
          onCreated={fetchEmployees}
        />
      )}
 
      {isConfirmDeleteModalOpen && employeeToDelete && (
        <ConfirmDeleteModal
          isOpen={isConfirmDeleteModalOpen}
          onClose={handleCloseDeleteConfirmation}
          onConfirm={handleDelete}
          employeeName={employeeToDelete.firstName + ' ' + employeeToDelete.lastName}
        />
      )}
      
      <ToastContainer /> 
      {error && <Toast message={error} />}
    </div>
  );
};

export default Dashboard;