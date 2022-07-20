import './App.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Table } from "antd";

function App() {
  const [bills, setBills] = useState([]);
  const [dataSource, setDataSource] = useState([]);
  const [totalPages, setTotalPages] = useState(2);
  const [loading, setLoading] = useState(false);

  const getBills = async (page) => {

    setLoading(true);
    axios.get(`https://mongo-api-node.herokuapp.com/bills?page=${page}`)
      .then((res) => {
        // console.log(res.data.bills);
        setBills(res.data.bills);
        setDataSource(res.data.bills);
        // setTotalPages(res.data.totalPages);
        setLoading(false);
      })
      .catch((e) => {
        console.log(e);
      })
  }

  useEffect(() => {
    getBills();
  }, []);

  const columns = [
    {
      title: "ID",
      dataIndex: "_id",
    },
    {
      title: "Consumption",
      dataIndex: "consumption",
    },
    {
      title: "Amount",
      dataIndex: "amount",
    },
    {
      title: "Bill Date",
      dataIndex: "billDate",
    },
    {
      title: "Paid Date",
      dataIndex: "paidDate",
    },
  ];
  
  return (
    <div className="App">
      <h1>Nishant</h1>

      <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Table
        loading={loading}
        columns={columns}
        dataSource={dataSource}
        pagination={{
          pageSize: 9,
          // total: totalPages,
          onChange: (page) => {
            getBills(page);
          },
        }}
      ></Table>
    </div>

      {
        bills.map((bill, key) => {
          return(
            <h1 key={key}>{bill._id}</h1>
          )
        })
      }
    </div>
  );
}

export default App;
