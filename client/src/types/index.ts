export interface Department {
  id: number;
  name: string;
}

export interface Employee {
  id: string;
  firstName: string;
  lastName: string;
  phone: string;
  address: string;
  hireDate: string;
  departmentName: string; 
  avatarPath?: string
}