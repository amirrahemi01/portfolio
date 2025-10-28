import React, { useState } from "react";

interface DropdownProps {
  options: { value: string; label: React.ReactNode }[];
  text: React.ReactNode;
}

const Dropdown: React.FC<DropdownProps> = ({ options, text }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<string>("");

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const selectOption = (option: string) => {
    setSelectedOption(option);
    toggleDropdown(); // Close dropdown after selecting an option
  };

  return (
    <div className="px-4 relative">
      <button className="dropdown-toggle" onClick={toggleDropdown}>
        {text}
      </button>
      {isOpen && (
        <div className="absolute -left-7 bg-transparent  dark:bg-transparent text-slate-600 border-2 border-slate-600 dark:border-2 dark:border-slate-400 dark:text-slate-400 max-w-20 px-6 py-2 rounded-xl ">
          {options.map((option, index) => (
            <div
              key={index}
              className="dropdown-item"
              onClick={() => selectOption(option.value)}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
