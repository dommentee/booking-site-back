import  { StatusCodes } from 'http-status-codes';
import  CustomAPIError from '../errors/custom-api';

class BadRequestError extends CustomAPIError {
  statusCode: StatusCodes;
  constructor(message: any) {
    super(message);
    this.statusCode = StatusCodes.BAD_REQUEST;
  }
}

export default BadRequestError;