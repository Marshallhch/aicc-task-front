import React from 'react';
import Navbar from '../Navbar';
import ItemPanel from '../ItemPanel';

const index = () => {
  return (
    <div className="page_section">
      <Navbar menuIdx={2} />
      <ItemPanel pageTitle="Incompleted Items" filterCompleted={false} />
    </div>
  );
};

export default index;
