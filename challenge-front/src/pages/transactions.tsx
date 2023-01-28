import { FormEvent, useEffect, useState} from "react";
import axios from "axios";


interface Transactions {
  type: string
  date: Date
  product: string
  price: number
  seller: string
  

}

interface FormElements extends HTMLFormControlsCollection {
    file: HTMLInputElement
  }
  
  interface TransactionFormElement extends HTMLFormElement {
    readonly elements: FormElements
  }

const Table = () => {
  const initTransactions: Array<Transactions> = [{type: "1", date: new Date(), product: "CURSO DE BEM-ESTAR", price: 123, seller: "JOSE CARLOS"}]
  const [transactions, setTransactions] = useState(initTransactions);
  const url: string = "http://localhost:4000/transactions"

  useEffect(() => {
    requestTransactions()
    })

  const requestTransactions = async () => {
    await axios.get(url).then((response) => {
      setTransactions(response.data)
    }).catch((e) => {
      console.log(e)
    })
  }
  
  return (
    <div>
      {transactions.map((data, index) => {
        return <div key={index}>
          {data.type + "   " + data.date  + "   " + data.product + "   " + data.price + "   " + data.seller}
        </div>
      })}
    </div>
  );
}

const Form = () => {

    const [file, setFile] = useState({ file: {}}) 
    const url: string = "http://localhost:4000/upload"

    const handleChange =  (event: FormEvent<HTMLInputElement>) => {
          setFile({file: event.currentTarget.value})
    }

    const handleSubmit = async (event: FormEvent<TransactionFormElement>) =>{
      event.preventDefault()

      if (!event.currentTarget.elements.file.files) {
        console.log('erro')
        return
      }
      
      const file = event.currentTarget.elements.file.files[0]

      const formData = new FormData()
      formData.append('file', file)
      await requestChallengeApi(formData)
      }
      
  const requestChallengeApi = async (file: FormData) => {
      await axios.post(url, file, {headers: {'Content-Type': 'multipart/form-data'}}).then(({ data }) => {
        console.log(data)        
      }).catch((e) => {
        console.log(e)
      })
  }


  return (
    <form onSubmit={handleSubmit}>
      <input type="file" name="file" id="file" onChange={handleChange}/>
      <button type="submit">Send</button>
    </form>
  )
}

const Transactions = () => {
  return (
    <div>
      <h1>Transactions</h1>
      <Form/>
      <Table/>
    </div>
  );
};

export default Transactions;