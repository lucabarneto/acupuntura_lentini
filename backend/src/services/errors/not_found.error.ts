import { INotFoundError } from "../../types/general/Error.interface.js";

export class NotFoundError extends Error implements INotFoundError {
  status: "error";
  statusCode: 404;
  name: "NotFoundError";

  constructor(message: string = "") {
    super(message);
    this.status = "error";
    this.statusCode = 404;
    this.name = "NotFoundError";
  }
}
