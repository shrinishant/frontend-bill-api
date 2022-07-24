import React from 'react';
import './View.css'
import {useLocation} from 'react-router-dom';

const View = () => {
    const location = useLocation();
    console.log(location.state);
    
  return (
    <div className='card_div'>
        <div class="card">
            <h3>Bill : {location.state._id}</h3>
            <p>Unit Consumed : {location.state.unitConsumed}</p>
            <p>Bill Amount : {location.state.amount}</p>
            <p>Bill Date : {new Date(location.state.billDate).toISOString().slice(0,10)}</p>
            <p>Paid Date : {new Date(location.state.paidDate).toISOString().slice(0,10)}</p>
        </div>
    </div>
  )
}

export default View