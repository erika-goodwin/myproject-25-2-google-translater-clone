import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isTranslateRoute = createRouteMatcher(["/translate(.*)"]);

export default clerkMiddleware(async (auth, req) => {
  if (isTranslateRoute(req)) await auth().protect();
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/translate", "/(api|trpc)(.*)"],
};
