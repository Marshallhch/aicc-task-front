import React from 'react';
import Navbar from '../Navbar';
import ItemPanel from '../ItemPanel';

const index = () => {
  return (
    <div className="page_section">
      <Navbar menuIdx={0} />
      <ItemPanel pageTitle="All Items" filterCompleted="all" />
    </div>
  );
};

export default index;
