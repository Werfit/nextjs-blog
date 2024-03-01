import { put } from "@vercel/blob";
import { generateFilename } from "@/utils/filename-generator.util";
import { HttpStatus } from "@/enums/http-status.enum";

export const PUT = async (req: Request): Promise<Response> => {
  // const data = await req.json();
  const form = await req.formData();
  const file = form.get("file") as File;

  try {
    const response = await put(generateFilename(file.name), file, {
      access: "public",
    });

    return Response.json({ url: response.url });
  } catch (err) {
    const error = err as Error;
    return Response.json(
      {
        message: error.message,
      },
      { status: HttpStatus.BAD_REQUEST },
    );
  }
};
