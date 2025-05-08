import React from "react";

interface Props {
    content: string;
    role: () => void; 
    disable: boolean; 
}

const Button: React.FC<Props> = ({content, role, disable}) => (
    <div className="flex justify-end flex-col sm:flex-row"> 
        <button className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-xl px-5 py-2.5 text-center"
        onClick={role} 
        > 
        {content} 
        </button>
    </div>
)

export default Button;