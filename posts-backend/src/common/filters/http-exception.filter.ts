import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { ApiResponse } from '../responses/api-response.dto';

// Interface for NestJS HttpException response structure
interface NestErrorResponse {
  message: string | string[];
  error: string;
  statusCode: number;
}

// Interface for Mongoose validation errors
interface MongooseValidationError {
  name: string;
  errors: { [key: string]: { message: string } };
}

// Interface for MongoDB server errors
interface MongoServerError {
  code: number;
  name: string;
}

@Catch() // Catch all exceptions
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message: string | string[] =
      'Internal server error: ' + String(exception);

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const res = exception.getResponse();

      // Verify if the response is an object or a string
      message =
        typeof res === 'object' && res !== null
          ? (res as NestErrorResponse).message
          : res;
    } else if (this._isMongooseValidationError(exception)) {
      // Mongoose validation error
      status = HttpStatus.BAD_REQUEST;
      message = Object.values(exception.errors)
        .map((el) => el.message)
        .join(', ');
    } else if (
      // Duplicate key error
      this._isMongoServerError(exception) &&
      exception.code === 11000
    ) {
      status = HttpStatus.BAD_REQUEST;
      message = 'Ya existe un registro con ese valor único';
    }

    response
      .status(status)
      .json(
        ApiResponse.error(
          Array.isArray(message) ? message.join(', ') : message,
          status,
        ),
      );
  }

  // Type Guards para verificar tipos de forma segura
  private _isMongooseValidationError(err: any): err is MongooseValidationError {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-member-access
    return err && err.name === 'ValidationError' && err.errors;
  }

  private _isMongoServerError(err: any): err is MongoServerError {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-member-access
    return err && err.code !== undefined;
  }
}
