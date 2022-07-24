import React from 'react'
import axios from 'axios';
import { useEffect, useState } from 'react';
import PaginationItem from '../Pagination_item';
import { useNavigate } from 'react-router-dom';
import Loader from '../loader/Loader';
import './Home.css'
import View from '../view/View';

const Home = () => {

    const [bills, setBills] = useState([]);
    const [totalBills, setTotalBills] = useState(0);
    const [pages, setPages] = useState(0);
    const [bill, setBill] = useState({});
    const [cPage, setCPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [sort, setSort] = useState("asc");

    let navigate = useNavigate();

  const getBills = async (page, sort) => {

    setIsLoading(true);
    console.log(sort)

    axios.get(`https://mongo-api-node.herokuapp.com/bills?page=${page}&sort=${(sort ==="desc") ? "desc" : "asc"}`)
      .then((res) => {
        setBills(res.data.bills);
        setTotalBills(res.data.totalBills);
        if(page > 0){
          setCPage(page);
        }

        setIsLoading(false);
      })
      .catch((e) => {
        console.log(e);
      })
  }

  const viewBill = async (bill) => {
    navigate("/viewBill", { state: bill, replace:false });
  }

  const updateBill = async (id) => {
    axios.get(`https://mongo-api-node.herokuapp.com/bill/${id}`)
    .then((res) => {
      setBill(res.data.bill);
      console.log(res.data.bill)

      navigate("/updateBill", { state: res.data.bill, replace:false });
    })
    .catch((e) => console.log(e));
  }

  const deleteBill = async (id) => {
    setIsLoading(true);
    axios.delete(`https://mongo-api-node.herokuapp.com/bill/${id}`)
    .then(() => {
      getBills(cPage);
      setIsLoading(false);
    })
    .catch((e) => {
      console.log(e)
    });
  }

  const calPage = () => {
    let p = parseInt(totalBills / 9 + ((totalBills % 9 !== 0) ? 1 : 0));
    setPages(p);
  }

  const sortAmount = async () => {
    // (sort === "asc") ? setSort("desc") : setSort("asc");
    if(sort === "asc") {
      getBills(cPage, "desc")
      setSort("desc");
    }else{
      getBills(cPage, "asc")
      setSort("asc")
    }
  }

  useEffect(() => {
    getBills(cPage, sort); 
  }, []);

  useEffect(() => {
    calPage();
  }, [bills]);


  return (
    <>
        <div className='table_div'>
          <table>
            <thead>
              <tr>
                <th>Bill Id</th>
                <th>Unit Consumed</th>
                <th className="sort_btn">Bill Amount <i onClick={sortAmount} class={(sort === "asc") ? "fa fa-2x fa-sort-down" : "fa fa-2x fa-sort-up"}></i></th>
                <th>Bill Date</th>
                <th>Paid Date</th>
                <th>View</th>
                <th>Update</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
            { (!isLoading) &&
              bills.map((bill) => {
                return(
                  <>
                      <tr>
                          <td>
                            <p>{bill._id}</p>
                          </td>
                          <td>
                            <p>{bill.unitConsumed}</p>
                          </td>
                          <td>
                            <p>{bill.amount}</p>
                          </td>
                          <td>
                            <p>{new Date(bill.billDate).toISOString().slice(0,10)}</p>
                          </td>
                          <td>
                            <p>{new Date(bill.paidDate).toISOString().slice(0,10)}</p>
                          </td>
                          <td>
                            <button className="button button1" onClick={() => {viewBill(bill)}}>View</button>
                          </td>
                          <td>
                            <button className="button button1" onClick={() => {updateBill(bill._id)}}>Update</button>
                          </td>
                          <td>
                            <button className="button button2" onClick={() => {deleteBill(bill._id)}}>Delete</button>
                          </td>
                      </tr>
                  </>
                )
              })
            }
            </tbody>
          </table>
        </div>

        {isLoading && <Loader />}

        <PaginationItem pages={pages} sort={sort} cPage={cPage} fun={getBills} />
    </>
  )
}

export default Home