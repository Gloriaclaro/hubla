import FileUploader from "../components/FileUploader";
import Transactions from "@/components/Transactions";
import { ToastContainer, toast } from "react-toastify"
import TransactionsService from '../services/TransactionsService'

const transactionsService = new TransactionsService();

const TransactionsPage = () => {

  return (
    <main className="main">
      <h1 className="main_title">Transactions</h1>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <FileUploader transactionsService={transactionsService}/>
      <Transactions transactionsService={transactionsService}/>
    </main>
  );
};

export default TransactionsPage;