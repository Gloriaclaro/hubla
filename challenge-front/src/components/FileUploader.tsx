import { FormEvent, useState } from "react";
import axios from "axios";
import { TransactionFormElement } from "../domain/interfaces/file.interface";

const FileUploader = () => {
  const [file, setFile] = useState({ file: {} });
  const url: string = "http://localhost:4000/upload";

  const handleChange = (event: FormEvent<HTMLInputElement>) => {
    setFile({ file: event.currentTarget.value });
  };

  const handleSubmit = async (event: FormEvent<TransactionFormElement>) => {
    event.preventDefault();

    if (!event.currentTarget.elements.file.files) {
      console.log("erro");
      return;
    }

    const file = event.currentTarget.elements.file.files[0];

    const formData = new FormData();
    formData.append("file", file);
    await requestChallengeApi(formData);
  };

  const requestChallengeApi = async (file: FormData) => {
    await axios
      .post(url, file, { headers: { "Content-Type": "multipart/form-data" } })
      .then(({ data }) => {
        console.log(data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <form className="form_container" onSubmit={handleSubmit}>
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