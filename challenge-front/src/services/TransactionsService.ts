import axios from "axios";
import ToastMessage from "./ToastMessage";

class TransactionsService {
  backend_host = process.env.BACKEND_HOST;
  post_transactions_url: string = `http://${this.backend_host}:4000/upload`;
  get_transactions_url: string = `http://${this.backend_host}:4000/transactions`;

  resolveFileUpload: any;

  onFileUploadPromise = new Promise<Function>((resolve) => {
    this.resolveFileUpload = resolve;
  });

  onFileUploaded(callback: Function) {
    this.resolveFileUpload(callback);
  }

  uploadFile(file: FormData): any {
    this.requestChallengeApi(file).then(() => {
      this.onFileUploadPromise.then((callback) => {
        callback();
      });
    });

  }

  async requestChallengeApi(file: FormData) {
    const promise = axios.post(this.post_transactions_url, file, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    promise
      .then(({ data }) => {
        if (data.error) {
          const message = "Please verify your file content." + data.message;
          return ToastMessage.showError(message);
        }

        ToastMessage.showSuccess("Transactions insertered with success!");
      })
      .catch((e) => {
        const message = "Ops! Unexpected error, please verify your file.";
        ToastMessage.showError(message);
      });

    return promise;
  }

  async requestTransactions() {
    return axios.get(this.get_transactions_url);
  }
}

export default TransactionsService;
