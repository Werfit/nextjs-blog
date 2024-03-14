import sanitize from "sanitize-html";

const allowedTags = [
  "p",
  "b",
  "i",
  "em",
  "strong",
  "pre",
  "code",
  "ul",
  "ol",
  "li",
  "h1",
  "h2",
  "blockquote",
  "br",
  "img",
];

// TODO: <br /> is removed
export const sanitizeHtml = (html: string): string =>
  sanitize(html, { allowedTags });
