import React, { useState } from 'react';

interface DropdownProps {
  options: { value: string; label: React.ReactNode }[];
  text: React.ReactNode;
}

const Dropdown: React.FC<DropdownProps> = ({ options, text }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<string>('');

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const selectOption = (option: string) => {
    setSelectedOption(option);
    toggleDropdown(); // Close dropdown after selecting an option
  };

  return (
    <div className="dropdown">
      <button className="dropdown-toggle" onClick={toggleDropdown}>
        {text}
      </button>
      {isOpen && (
        <div className="fixed">
          {options.map((option, index) => (
            <div key={index} className="dropdown-item" onClick={() => selectOption(option.value)}>
              {/* {selectedOption} */}
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
