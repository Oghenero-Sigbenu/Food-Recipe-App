import React from 'react';
import './css/Animate.css';

export const AnimateInOut = ({children, classname}) => {
  return (
    <div className={classname}>
      {children}
    </div>
  );
};