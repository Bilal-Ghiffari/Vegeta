// import { withAuth } from "next-auth/middleware";

// export default withAuth(function middleware(req) {
//   console.log("req", req.nextauth.token);
// });

// export const config = {
//   matcher: ["/product/detail/1"],
// };

export { default } from "next-auth/middleware";

export const config = {
  matcher: ["/product/detail/:path*"],
};
