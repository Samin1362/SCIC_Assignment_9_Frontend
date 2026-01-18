import { cookies } from "next/headers";

const SESSION_COOKIE_NAME = "auth_session";

/**
 * Gets the current session from cookies (server-side)
 */
export const getSession = async () => {
  try {
    const cookieStore = await cookies();
    const sessionToken = cookieStore.get(SESSION_COOKIE_NAME)?.value;
    return sessionToken || null;
  } catch (error) {
    // If cookies() fails (e.g., in client component), return null
    return null;
  }
};

/**
 * Checks if user is authenticated (server-side)
 */
export const isAuthenticated = async () => {
  const session = await getSession();
  return !!session;
};
