import { createUser } from "@/lib/database/user";
import { HttpStatus } from "@/enums/http-status.enum";

export const POST = async (req: Request) => {
  const data = await req.json();

  try {
    const user = await createUser(data.username, data.password);
    return Response.json(user);
  } catch (err) {
    const error = err as Error;
    return Response.json(
      { message: error.message },
      { status: HttpStatus.BAD_REQUEST },
    );
  }

  return Response.json(data, { status: HttpStatus.CREATED });
};
