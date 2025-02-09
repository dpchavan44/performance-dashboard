import React from 'react';
import { Dropdown } from 'primereact/dropdown';

const DropdownComponent = ({ label, value, options, onChange }) => {
  const OptionTemplate = (option) => {
    return (
      <div className="flex align-items-center bg-white rounded text-black p-2 hover:border-none hover:bg-slate-100">
        <div className=''>{option.label}</div>
      </div>
    );
  };

  return (
    <div className="mb-4 w-full md:w-auto">
      <label className="mr-4 font-bold">
        {label}
        <Dropdown
          value={value}
          options={options}
          onChange={onChange}
          placeholder=""
          filter
          itemTemplate={OptionTemplate}
          filterInputAutoFocus
          filterPlaceholder='Search Baseline'
          className="m-1 p-1 border rounded w-72"
        />
      </label>
    </div>
  );
};

export default DropdownComponent;