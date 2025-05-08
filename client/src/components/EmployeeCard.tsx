import React from 'react';
import { Employee } from '../types';
import { formatDateWithDuration } from '../utils/formatDateWithDuration'; 

interface Props {
  employee: Employee;
  onView: () => void;
  onDelete: () => void;
}

const EmployeeCard: React.FC<Props> = ({ employee, onView, onDelete }) => (
  
  <div className="my-5 p-4 border border-indigo-500 rounded-md flex items-center justify-between"> 
    <div className='flex items-center'>
      <img 
         src={
          employee.avatarPath
            ? `${process.env.REACT_APP_API_BASE_URL}${employee.avatarPath}`
            : 'default-avatar.png'
        }
        alt='avatar'  
        className='w-24 h-24 rounded-full object-cover'
      />

      <div className='pl-6'>
        <div className='flex items-center'>
          <h1 className="text-2xl font-semibold">{employee.firstName} {employee.lastName}</h1>
          &nbsp; 
          <p className="text-xl text-gray-500 hidden sm:block">({employee.departmentName})</p>
        </div>
        <p className='text-xl font-semibold mt-2 hidden sm:block'>Hire Date</p>
        <p className="text-lg">{formatDateWithDuration(employee.hireDate)}</p>
      </div>
    </div>
    <div className="space-x-2"> 

        <div className='flex'>
          <button className="inline-flex items-center justify-center p-0.5 text-lg font-semibold text-indigo-500 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white  focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 hidden sm:block"
          onClick={onView}>
            <span className="px-6 py-2.5 transition-all ease-in bg-white dark:bg-indigo-100 rounded-md group-hover:bg-transparent group-hover:dark:bg-transparent hidden sm:block">
            View Details
            </span>
          </button> 
          <button onClick={onView} className="text-blue-500 text-2xl px-3 py-2 rounded hover:bg-blue-600 sm:hidden">
            <i className="fa-solid fa-file-alt"></i>
          </button>
          <button onClick={onDelete} className="px-4 text-blue-500 text-2xl">
            <i className="fa fa-trash" aria-hidden="true"></i>
          </button>
        </div>
    </div>
  </div>
);

export default EmployeeCard;