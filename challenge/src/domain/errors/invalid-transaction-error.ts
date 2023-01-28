
export class InvalidTransactionError extends Error {
    public readonly name = 'InvalidTransactionError'

    constructor (field: string) {

        super('Invalid field: '+ field + '.')
    }
}