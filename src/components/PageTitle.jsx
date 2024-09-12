import React from 'react';

const PageTitle = ({ title }) => {
  return (
    <div className="page-title text-2xl font-semibold py-2 w-fit mb-4 relative">
      {title}
      <span className="under-bar absolute w-1/3 h-[3px] bg-gray-300 left-0 bottom-0"></span>
    </div>
  );
};

export default PageTitle;
