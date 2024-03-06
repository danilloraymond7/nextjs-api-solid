export class CustomError extends Error {
  statusCode: number // Declare the statusCode as a class property
  constructor (message: string, statusCode: number) {
    super(message)
    this.name = this.constructor.name
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    this.statusCode = statusCode || 500 // Set the default status code to 500
  }
}
