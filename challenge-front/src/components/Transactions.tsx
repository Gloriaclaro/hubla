import { useEffect, useState } from "react";
import axios from "axios";
import { ITransactions } from "@/domain/interfaces/transaction.interface";
import { toast } from "react-toastify"
import Moment from 'react-moment';


const Transactions = () => {
  const initTransactions: Array<ITransactions> = [];
  const [transactions, setTransactions] = useState(initTransactions);
  const url: string = `http://${process.env.BACKEND_HOST}:4000/transactions`;

  useEffect(() => {
    requestTransactions();
  });

  const requestTransactions = async () => {
    await axios
      .get(url)
      .then((response) => {
        setTransactions(response.data.transaction);
      })
      .catch((e) => {
        toast.error('Ops! Fail to load data.', {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          });
      });
  };
  const getTotalTransactions = () => {
    const totalTransactions = transactions.reduce(
      (accum, obj) => accum + obj.price/100,
      0
    );
    return totalTransactions.toLocaleString("pt-BR", {style: 'currency', currency: 'BRL' });
  };

  return (
    <div>
      <div className="transactions_container">
        <table>
          <thead>
            <tr>
              <th>Type</th>
              <th>Date</th>
              <th>Product</th>
              <th>Price</th>
              <th>Seller</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((data, index) => {
              return (
                <tr key={index}>
                  <td>{data.type}</td>
                  <td><Moment>{data.date}</Moment></td>
                  <td>{data.product}</td>
                  <td>{(data.price/100).toLocaleString("pt-BR", {style: 'currency', currency: 'BRL' })}</td>
                  <td>{data.seller}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="total-price">
        <div className="placar-style">
          <strong>Transactions total value = </strong>
          {getTotalTransactions()}
        </div>
      </div>
    </div>
  );
};

export default Transactions;
function moment(date: Date) {
  throw new Error("Function not implemented.");
}

