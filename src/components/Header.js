import React from 'react';

const Header = () => {
  return (
    <div className='flex justify-between bg-[#006487] items-center p-4 w-full box-border'>
      <div className="flex items-center">
        <div className="hamburger space-y-1.5 px-4">
          <div className="block w-6 h-0.5 bg-white"></div>
          <div className="block w-6 h-0.5 bg-white"></div>
          <div className="block w-6 h-0.5 bg-white"></div>
        </div>
        <div className="text-white font-medium px-4">
          Teamcenter Quality Performance
        </div>
      </div>
      <div>
        <h1 className='text-white font-bold'>SIEMENS</h1>
      </div>
    </div>
  );
};

export default Header;