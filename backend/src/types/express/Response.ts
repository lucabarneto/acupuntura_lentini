export interface ErrorResponse {
  status: "error";
  statusCode: number;
  message: string;
  name: string;
}

export interface SuccessResponse<T> {
  status: "success";
  statusCode: number;
  payload: T;
}
