import { HttpStatus } from "@/enums/http-status.enum";

export class HttpError extends Error {
  readonly status: HttpStatus;

  constructor(message: string, status: HttpStatus) {
    super(message);

    this.status = status;
  }
}
