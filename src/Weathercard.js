import React from 'react';
import './style.scss';

function Weathercard({title,value}) {
  return (
    <div className='weathercard_card'>
    <div className='card'>
      <h3>{title}</h3>
      <p>{value}</p>
    </div>
    </div>
  )
}

export default Weathercard