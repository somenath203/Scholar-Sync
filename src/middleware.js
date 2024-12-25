import { withAuth } from "@kinde-oss/kinde-auth-nextjs/middleware";

export default withAuth({
  loginPage: '/api/auth/login',
  isReturnToCurrentPage: true,
});

export const config = {
  matcher: ['/((?!api|_next|static|public|favicon.ico|education_logo.svg|$).*)'],
};
