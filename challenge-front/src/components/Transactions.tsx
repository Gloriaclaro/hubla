import { useEffect, useState } from "react";
import { ITransactions } from "@/domain/interfaces/transaction.interface";
import Moment from "react-moment";
import ToastMessage from "@/services/ToastMessage";

const Transactions = ({ transactionsService }: any) => {
  const initTransactions: Array<ITransactions> = [];
  const [transactions, setTransactions] = useState(initTransactions);


  useEffect(() => {
    transactionsService
      .requestTransactions()
      .then((response: any) => setTransactions(response.data.transaction))
      .catch((e: any) => ToastMessage.showError("Ops! Fail to load data."));

    transactionsService.onFileUploaded(() => {
      transactionsService
        .requestTransactions()
        .then((response: any) => setTransactions(response.data.transaction))
        .catch((e: any) => ToastMessage.showError("Ops! Fail to load data."));
    });
  }, []);

  const getTotalTransactions = () => {
    const totalTransactions = transactions.reduce(
      (accum, obj) => accum + obj.price / 100,
      0
    );
    return totalTransactions.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
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
                  <td>
                    <Moment format="DD/MM/YYYY HH:mm">{data.date}</Moment>
                  </td>
                  <td>{data.product}</td>
                  <td>
                    {(data.price / 100).toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </td>
                  <td>{data.seller}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="total-price">
        <div className="placar-style">
          <strong>Transactions total: </strong>
          {getTotalTransactions()}
        </div>
      </div>
    </div>
  );
};

export default Transactions;
