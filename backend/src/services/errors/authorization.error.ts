import { IAuthorizationError } from "../../types/general/Error.interface";

export class AuthorizationError extends Error implements IAuthorizationError {
  name: "AuthorizationError";
  status: "error";
  statusCode: 403;

  constructor(message: string = "") {
    super(message);
    this.name = "AuthorizationError";
    this.status = "error";
    this.statusCode = 403;
  }
}
