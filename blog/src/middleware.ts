export { default } from "next-auth/middleware";

export const config = {
  matcher: ["/search", "/user/:path*", "/article/create"],
};
