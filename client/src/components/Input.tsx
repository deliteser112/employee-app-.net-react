type InputProps = {
    name: string;
    placeholder: string;
    value: any;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  };
  
  const Input: React.FC<InputProps> = ({ name, placeholder, value, onChange }) => (
    <input
      type="text"
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="w-full text-xl mt-4 px-4 py-3 border rounded"
    />
  );
  
  export default Input;