import { createUser } from "../[...nextauth]/auth";
import { HttpStatus } from "@/enums/http-status.enum";
import { HttpError } from "@/lib/error/http-error";

export const POST = async (req: Request): Promise<Response> => {
  const data = await req.json();

  try {
    const user = await createUser(data.username, data.password);
    return Response.json(user, { status: HttpStatus.CREATED });
  } catch (error) {
    if (error instanceof HttpError) {
      return Response.json(
        { message: error.message },
        { status: error.status }
      );
    }

    const err = error as Error;
    return Response.json(
      { message: err.message },
      { status: HttpStatus.INTERNAL }
    );
  }
};
