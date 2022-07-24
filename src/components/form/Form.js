import React from 'react'
import './form.css'
import { useState } from 'react';
import axios from 'axios';
import {useLocation} from 'react-router-dom';

const Form = () => {

  const location = useLocation();

  const [formInput, setFormInput] = useState({});

  const onInputChange = (event) => {
    formInput[event.target.name] = event.target.value;
    setFormInput(formInput);
    console.log(formInput)

    console.log(location.state)
  };

  const addBill = async(e) => {
    e.preventDefault();
    console.log(typeof(formInput.bill_date))

    axios.post(`https://mongo-api-node.herokuapp.com/addBill`, {
      unitConsumed : parseInt(formInput.unitConsumed),
      amount : parseInt(formInput.amount),
      billDate: formInput.bill_date,
      paidDate : formInput.paid_date
    })
    .then((res) => {
      console.log(res);
      alert("Successfully Added");
    })
    .catch((e) => {
      console.log(e);
    })
  }

  const updateBill = async (e) => {
    e.preventDefault();

    axios.put(`https://mongo-api-node.herokuapp.com/bill/${location.state._id}`, {
      unitConsumed : parseInt(formInput.unitConsumed) || parseInt(location.state.unitConsumed),
      amount : parseInt(formInput.amount) || parseInt(location.state.amount),
      billDate: formInput.billDate || new Date(location.state.billDate).toISOString().slice(0,10),
      paidDate : formInput.paidDate || new Date(location.state.paidDate).toISOString().slice(0,10)
    })
    .then((res) => {
      console.log(res);
      alert("Successfully Updated")
      setFormInput({});
    })
    .catch((e) => console.log(e));

  }
  

  return (
    <>
        <div className='form_div'>
            <form onSubmit={(location.state) ? updateBill : addBill}>
                {/* <label for="bill_id">Bill Id:</label>
                <input required type="text" id="bill_id" name="bill_id" placeholder="Bill Id..." value={formInput.bill_id} onChange={onInputChange} /> */}

                <label htmlFor="unitConsumed">Unit Consumed</label>
                <input required type="number" id="unitConsumed" name="unitConsumed" placeholder="Unit Consumed..." defaultValue={(location.state) ? location.state.unitConsumed : " "} value={formInput.unitConsumed} onChange={onInputChange} />

                <label htmlFor="amount">Bill</label>
                <input required type="number" id="amount" name="amount" placeholder="Bill..." defaultValue={(location.state) ? location.state.amount : " "} value={formInput.amount} onChange={onInputChange} />

                <label htmlFor="billDate">Bill Date:</label>
                <input type="date" id="billDate" name="billDate" placeholder="Bill Date..." defaultValue={(location.state) ? new Date(location.state.billDate).toISOString().slice(0,10) : null} value={formInput.billDate} onChange={onInputChange} />

                <label htmlFor="paidDate">Paid Date:</label>
                <input type="date" id="paidDate" name="paidDate" placeholder="Paid Date..." defaultValue={(location.state) ? new Date(location.state.paidDate).toISOString().slice(0,10) : null} value={formInput.paidDate} onChange={onInputChange} />
            
                <input type="submit" value={(location.state) ? "Update" : "Submit"} />
            </form>
        </div>
    </>
  )
}

export default Form