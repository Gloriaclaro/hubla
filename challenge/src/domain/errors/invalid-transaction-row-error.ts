class InvalidTransactionRowError extends Error {
    public readonly name = 'InvalidTransactionRowError';
  
    constructor() {
      super('An transaction row must contain a minimum of 66 and a maximum of 86 characteres.');
    }
  }
  export default InvalidTransactionRowError;
  