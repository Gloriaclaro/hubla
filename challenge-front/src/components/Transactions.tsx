import { useEffect, useState } from "react";
import axios from "axios";
import { ITransactions } from "@/domain/interfaces/transaction.interface";

const Transactions = () => {
  const initTransactions: Array<ITransactions> = [];
  const [transactions, setTransactions] = useState(initTransactions);
  const url: string = "http://localhost:4000/transactions";

  useEffect(() => {
    requestTransactions();
  });

  const requestTransactions = async () => {
    await axios
      .get(url)
      .then((response) => {
        setTransactions(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const getTotalTransactions = () => {
    const totalTransactions = transactions.reduce(
      (accum, obj) => accum + obj.price,
      0
    );
    return totalTransactions;
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
                  <td>{data.date.toString()}</td>
                  <td>{data.product}</td>
                  <td>{data.price}</td>
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
