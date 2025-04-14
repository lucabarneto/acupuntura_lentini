import { IAuthenticationError } from "../../types/general/Error.interface";

export class AuthenticationError extends Error implements IAuthenticationError {
  status: "error";
  statusCode: 401;
  name: "AuthenticationError";

  constructor(message: string = "") {
    super(message);
    this.status = "error";
    this.statusCode = 401;
    this.name = "AuthenticationError";
  }
}
