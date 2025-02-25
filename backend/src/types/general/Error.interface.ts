export interface CustomError extends Error {
  status: "error";
  statusCode: number;
  name: string;
  message: string;
}

export interface INotFoundError extends CustomError {
  statusCode: 404;
  name: "NotFoundError";
}

export interface IAuthenticationError extends CustomError {
  statusCode: 401;
  name: "AuthenticationError";
}

export interface IAuthorizationError extends CustomError {
  statusCode: 403;
  name: "AuthorizationError";
}
