import React, { useEffect, useState, useRef } from 'react';
import { getDepartments, createEmployee } from '../services/employeeService';
import { Department } from '../types'; 
import Button from './Button';
import Input from './Input';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onCreated: () => void;
}

interface Errors {
  [key: string]: string;
}

const EmployeeFormModal: React.FC<Props> = ({ isOpen, onClose, onCreated }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [departments, setDepartments] = useState<Department[]>([]); 
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    address: '',
    hireDate: new Date().toISOString().split('T')[0],
    departmentName: '',
    avatar: null as File | null
  });
  const [submitting, setSubmitting] = useState(false);
  const [formErrors, setFormErrors] = useState<Errors>({
    firstName: '',
    lastName: '',
    phone: '',
    address: '',
    hireDate: '',
    departmentName: ''
  });
  
  useEffect(() => {
    if (isOpen) {
      getDepartments().then((res) => setDepartments(res.data));
      setForm({
        firstName: '',
        lastName: '',
        phone: '',
        address: '',
        hireDate: '',
        departmentName: '',
        avatar: null as File | null
      });
    }
  }, [isOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target; 
    setForm((prev) => ({ ...prev, [name]: value }));
    setFormErrors((prevErrors) => ({ ...prevErrors, [name]: '' }));
  };
  
  const handleFileUpload = () => {
    if (inputRef) {
      inputRef.current?.click();
    }
  }; 

  const handleSubmit = async () => { 
    const newErrors = { ...formErrors };
    let hasError = false;
    Object.keys(form).forEach((key) => {
      if (!form[key as keyof typeof form]) { 
        if(key !== 'avatar'){
          newErrors[key as keyof typeof form] = 'This field is required';
          hasError = true; 
        } 
      }
    });

    if (hasError) {
      setFormErrors(newErrors); 
      return;
    }

    setSubmitting(true);
     
    const formData = new FormData();
    formData.append('firstName', form.firstName);
    formData.append('lastName', form.lastName);
    formData.append('phone', form.phone);
    formData.append('address', form.address);
    formData.append('hireDate', form.hireDate);
    formData.append('departmentId', form.departmentName);

    if (form.avatar) {
      formData.append('avatar', form.avatar);
    }

    try {
      await createEmployee(formData);
      onCreated();
      onClose(); 
      toast.success(`Success to create ${form.firstName}`)
    } catch { 
      toast.error('Failed to add employee');
    } finally {
      setSubmitting(false);
    }
  };

  if (!isOpen) return null;

  const fieldsInput: { name: keyof typeof form; placeholder: string }[] = [
    { name: 'firstName', placeholder: 'First Name' },
    { name: 'lastName', placeholder: 'Last Name' },
    { name: 'phone', placeholder: 'Phone' },
    { name: 'address', placeholder: 'Address' }, 
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-start pt-[5%] z-50 overflow-y-auto">

      <div className="w-full sm:w-[95%] md:w-[80%] lg:w-[70%] xl:w-[50%] bg-white p-6 sm:p-8 rounded-xl animate-slide-down max-w-3xl">
        <h1 className="text-2xl sm:text-3xl text-center font-semibold mb-6 text-transparent bg-clip-text bg-gradient-to-r to-purple-600 from-blue-400">
          New Employee 
        </h1> 
        
        <div className="flex flex-col md:flex-row justify-between gap-6"> 
          <div className="md:w-[67%] w-full">
            {fieldsInput.map((field) => (
              <div key={field.name}>
                <Input
                  key={field.name}
                  name={field.name}
                  placeholder={field.placeholder}
                  value={form[field.name]}
                  onChange={handleChange}
                />
                {formErrors[field.name] && <p className="text-red-500 text-sm">{formErrors[field.name]}</p>}
              </div>
            ))}
          </div> 
          <div className="md:w-[30%] w-full flex justify-center md:justify-start">
            <div className="w-40 md:w-full">
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0]; 
                  setAvatarPreview(URL.createObjectURL(file as any));
                  if (file) setForm(prev => ({ ...prev, avatar: file }));
                }}
                className="hidden"
                ref={inputRef}
              />
              <img 
                src={avatarPreview || 'default-avatar.png'}
                alt="avatar"
                className="w-full aspect-square rounded-full cursor-pointer object-cover outline outline-offset-4 outline-blue-400 hover"
                onClick={handleFileUpload}
              />
            </div>
          </div>
        </div>
        <p className='text-xl px-1 pt-1'>Hire Date:</p>
        <input
          type="date"
          name="hireDate"
          value={form.hireDate}
          onChange={handleChange}
          className="w-full text-xl px-4 py-3 border rounded mt-4"
        />
        {formErrors['hireDate'] && <p className="text-red-500 text-sm">{formErrors['hireDate']}</p>}
        <select
          name="departmentName"
          value={form.departmentName}
          onChange={handleChange}
          className="w-full text-xl mt-4 px-4 py-3 border rounded"
        >
          <option value="">Select Department</option>
          {departments.map((dep) => (
            <option key={dep.id} value={dep.id}>{dep.name}</option>
          ))}
        </select>
        {formErrors['departmentName'] && <p className="text-red-500 text-sm">{formErrors['departmentName']}</p>}

        <div className="flex flex-col sm:flex-row justify-end gap-4 mt-6">
          <button onClick={onClose} className="text-xl px-6 py-2.5 bg-gray-300 rounded-lg">Cancel</button> 
          <Button
            content={submitting ? 'Creating...' : 'Create'}
            role={handleSubmit}
            disable={submitting}
          />
        </div>
      </div>
      
    </div>
  );
};

export default EmployeeFormModal;