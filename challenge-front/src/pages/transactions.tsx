import FileUploader from "../components/FileUploader";
import Transactions from "@/components/Transactions";
import { ToastContainer, toast } from "react-toastify"


const TransactionsPage = () => {
  return (
    <main className="main">
      <h1 className="main_title">Transactions</h1>
      <ToastContainer
        position="top-center"
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
      <FileUploader/>
      <Transactions/>
    </main>
  );
};

export default TransactionsPage;