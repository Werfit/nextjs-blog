export { default } from "next-auth/middleware";

export const config = {
  matcher: ["/user/:id/security", "/article/create"],
};
