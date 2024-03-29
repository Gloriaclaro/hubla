import { toast } from "react-toastify";

class ToastMessage {
  static showSuccess(successMessage: string) {
    toast.success(successMessage, {
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
  }
  

  static showError(errorMessage: string) {
    toast.error(errorMessage, {
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

}

export default ToastMessage;
