export interface FormElements extends HTMLFormControlsCollection {
file: HTMLInputElement
}
  
export interface TransactionFormElement extends HTMLFormElement {
readonly elements: FormElements
}

