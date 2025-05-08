import api from '../api'; 

export const getEmployees = async (page: number, pageSize: number) => {
  const response = await api.get(`/employees?page=${page}&pageSize=${pageSize}`);
  return response.data;
};
export const getDepartments = () => api.get('/Departments');
export const createEmployee = (formData: FormData) =>
  api.post('/Employees', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
export const updateEmployee = (id: string, formData: FormData) =>
  api.put(`/Employees/${id}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
export const deleteEmployee = (id: string) => api.delete(`/Employees/${id}`);
