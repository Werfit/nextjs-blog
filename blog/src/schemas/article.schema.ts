import { z } from "zod";

const MIN_CONTENT_SYMBOLS = 10;

export const createArticleSchema = z.object({
  featuredImage: z.string().url(),
  title: z
    .string({
      required_error: "Title is required",
      invalid_type_error: "Title must be a string",
    })
    .min(1),
  content: z.string().min(MIN_CONTENT_SYMBOLS, {
    message: `Article should be at least ${MIN_CONTENT_SYMBOLS} symbols`,
  }),
  contentHtml: z.string().min(0),
});

export type CreateArticleSchema = z.infer<typeof createArticleSchema>;
