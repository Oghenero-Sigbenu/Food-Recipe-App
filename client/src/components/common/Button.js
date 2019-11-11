import React from 'react';
import './css/Button.css';

export default function Button({ children, onclick, styles, disable }) {
  return (
    <button className={`button ${!styles ? '' : styles}`} onClick={onclick} disabled={disable}>
      {children}
    </button>
  );
}
