export class CustomError extends Error {
  status: number;
  shortMsg: string;

  constructor(message: string = '', status: number = 500, shortMsg: string = 'Something went wrong') {
    super(message);
    this.status = status;
    this.shortMsg = shortMsg;
  }
}

export const resourcesNotFound = new CustomError('', 404, 'Resources not found');
export const resourceNotFound = new CustomError('', 404, 'Resource not found');
export const invalidData = new CustomError('', 400, 'Data is not valid');
export const invalidRequest = new CustomError('', 400, 'Request is not valid');
export const duplicateData = new CustomError('', 400, 'Resource already exists');
