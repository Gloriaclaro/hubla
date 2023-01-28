import FileUploader from "../components/FileUploader";
import Transactions from "@/components/Transactions";

const TransactionsPage = () => {
  return (
    <main className="main">
      <h1 className="main_title">Transactions</h1>
      <FileUploader/>
      <Transactions/>
    </main>
  );
};

export default TransactionsPage;