import React from 'react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  employeeName: string;
}

const ConfirmDeleteModal: React.FC<Props> = ({ isOpen, onClose, onConfirm, employeeName }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50">
    <div className="bg-white w-full sm:w-[80%] md:w-[60%] lg:w-[40%] xl:w-[30%] p-6 rounded-lg animate-slide-down">
      <h2 className="text-xl font-semibold mb-4">Confirm Deletion</h2>
      <p className="mb-4">Are you sure you want to delete the employee: <strong>{employeeName}</strong>?</p>
      <div className="flex justify-end gap-4">
        <button onClick={onClose} className="px-4 py-2 bg-gray-300 rounded-lg">Cancel</button>
        <button onClick={onConfirm} className="px-4 py-2 bg-red-500 text-white rounded-lg">Delete</button>
      </div>
    </div>
  </div>
  );
};

export default ConfirmDeleteModal;