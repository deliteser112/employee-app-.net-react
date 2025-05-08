import React, { useEffect, useState, useRef } from "react";
import { getDepartments, updateEmployee } from "../services/employeeService";
import { Department, Employee } from "../types";
import { formatDateWithDuration } from "../utils/formatDateWithDuration";
import Button from "./Button";
import { toast, ToastContainer  } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface Props {
  employee: Employee;
  isOpen: boolean;
  onClose: () => void;
  onUpdated: () => void;
}

const EmployeeDetailModal: React.FC<Props> = ({
  employee,
  isOpen,
  onClose,
  onUpdated,
}) => {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [selectedDepartment, setSelectedDepartment] = useState<string>(
    employee.departmentName
  ); 
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [updating, setUpdating] = useState<boolean>(false);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const employeeFields = [
    { name: "firstName", value: employee.firstName },
    { name: "lastName", value: employee.lastName },
    { name: "phone", value: employee.phone },
    { name: "address", value: employee.address },
    { name: "hireDate", value: employee.hireDate },
    { name: "departmentId", value: selectedDepartment },
  ];

  const employeeDetails = [
    { label: "Employee ID", value: employee.id },
    { label: "Department", value: employee.departmentName },
    { label: "Telephone", value: employee.phone },
    { label: "Address", value: employee.address },
    {
      label: "Hire Date",
      value: formatDateWithDuration(employee.hireDate),
    },
  ];

  useEffect(() => {
    if (isOpen) {
      getDepartments().then((res) => {
        setDepartments(res.data); 
        const matchedDep = res.data.find((dep: any) => dep.name === employee.departmentName);
        if (matchedDep) {
          setSelectedDepartment(matchedDep.id); 
        }
      });

      setAvatarPreview(
        employee.avatarPath
          ? `${process.env.REACT_APP_API_BASE_URL}/${employee.avatarPath}`
          : null
      );
    }
  }, [isOpen, employee]);

  const handleFileUpload = () => {
    inputRef.current?.click();
  };

  const handleUpdate = async () => {
    setUpdating(true);
    const formData = new FormData();
    employeeFields.forEach((field) => {
      formData.append(field.name, field.value);
    });

    if (avatarFile) {
      formData.append("avatarPath", avatarFile);
    }

    try {
      await updateEmployee(employee.id, formData);
      onUpdated();
      onClose();
      closeAvatar()
    } catch (err) {
      toast.error("Failed to update employee.");
    } finally {
      setUpdating(false);
    }
  }; 

  const closeAvatar = () => {
    setAvatarFile(null)
  }

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-start pt-[10%] z-50 overflow-y-auto">
      <div className="w-full sm:w-[95%] md:w-[80%] lg:w-[70%] xl:w-[50%] bg-white p-6 sm:p-10 text-lg sm:text-xl rounded-lg animate-slide-down max-w-4xl">
        <div className="flex flex-col sm:flex-row gap-6">
          <div className="sm:w-[40%] flex justify-center sm:items-center">
            <img
              src={avatarPreview || "default-avatar.png"}
              alt="avatar"
              width="260"
              className="rounded-3xl object-cover outline outline-offset-4 outline-blue-400 cursor-pointer"
              onClick={handleFileUpload}
            />
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  setAvatarPreview(URL.createObjectURL(file));
                  setAvatarFile(file);
                }
              }}
              className="w-full text-xl mb-4 px-4 py-3 border rounded hidden"
              ref={inputRef}
            />
          </div>

          <div className="sm:w-[60%]">
            <h2 className="text-3xl sm:text-4xl font-semibold mb-4 text-transparent bg-clip-text bg-gradient-to-r to-purple-600 from-blue-400">
              {employee.firstName} {employee.lastName}
            </h2>

            {employeeDetails.map((detail, index) => (
              <p key={index} className="mb-2">
                <span className="font-semibold">{detail.label}:</span> {detail.value}
              </p>
            ))}

            <div className="mt-4">
              <label className="block font-semibold mb-2">Update Department:</label>
              <select
                value={selectedDepartment}
                onChange={(e) => setSelectedDepartment(e.target.value)}
                className="border border-gray-300 rounded px-2 py-1 w-full"
              >
                {departments.map((dep) => (
                  <option key={dep.id} value={dep.id}>
                    {dep.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-col sm:flex-row justify-end gap-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 rounded-lg"
          >
            Cancel
          </button>
          <Button
            content={updating ? "Updating..." : "Update"}
            role={handleUpdate}
            disable={updating}
          /> 
        </div>
      </div>
    </div>
  );
};

export default EmployeeDetailModal;