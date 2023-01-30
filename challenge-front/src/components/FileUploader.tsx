import { FormEvent, useState } from "react";
import { TransactionFormElement } from "../domain/interfaces/file.interface";

const FileUploader = ({transactionsService} : any) => {
  const [file, setFile] = useState({ file: {} });

  const handleChange = (event: FormEvent<HTMLInputElement>) => {
    setFile({ file: event.currentTarget.value });
  };

  const handleSubmit = async (event: FormEvent<TransactionFormElement>) => {
    event.preventDefault();

    const currentTarget = event.currentTarget;
    const files = currentTarget.elements.file.files;

    if (!files) return;
    
    const file = files[0];

    const formData = new FormData();
    formData.append("file", file);

    transactionsService.uploadFile(formData);

  };

  return (
    <form className="form-container" onSubmit={handleSubmit}>
      <label htmlFor="file">Select your file</label>
      <input
        className="input-file"
        type="file"
        name="file"
        id="file"
        onChange={handleChange}
      />
      <button type="submit">Insert transactions</button>
    </form>
    
  );
};

export default FileUploader;
