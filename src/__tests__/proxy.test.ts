import middleware from "../proxy"; // sesuaikan path kalau file beda nama
import { NextResponse } from "next/server";

const redirectMock = jest.fn();
const nextMock = jest.fn();

jest.mock("next/server", () => ({
  NextResponse: {
    redirect: (url: URL) => redirectMock(url),
    next: () => nextMock(),
  },
}));

function createRequest(
  path: string,
  sessionValue?: object | string,
) {
  return {
    url: `http://localhost:3000${path}`,
    nextUrl: {
      pathname: path,
    },
    cookies: {
      get: () =>
        sessionValue
          ? {
              value:
                typeof sessionValue === "string"
                  ? sessionValue
                  : encodeURIComponent(JSON.stringify(sessionValue)),
            }
          : undefined,
    },
  } as any;
}

describe("middleware", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("allows public route", () => {
    const req = createRequest("/");

    middleware(req);

    expect(nextMock).toHaveBeenCalled();
  });

  it("redirects protected route without session", () => {
    const req = createRequest("/dashboard");

    middleware(req);

    expect(redirectMock).toHaveBeenCalled();
    const url = redirectMock.mock.calls[0][0];
    expect(url.pathname).toBe("/login");
    expect(url.searchParams.get("redirect")).toBe("/dashboard");
  });

  it("redirects if session expired", () => {
    const expired = {
      userId: 1,
      role: "customer",
      expiresAt: new Date(Date.now() - 10000).toISOString(),
    };

    const req = createRequest("/dashboard", expired);

    middleware(req);

    expect(redirectMock).toHaveBeenCalled();
  });

  it("redirects if invalid session JSON", () => {
    const req = createRequest("/dashboard", "invalid-json");

    middleware(req);

    expect(redirectMock).toHaveBeenCalled();
  });

  it("redirects logged-in user away from /login", () => {
    const session = {
      userId: 1,
      role: "customer",
      expiresAt: new Date(Date.now() + 10000).toISOString(),
    };

    const req = createRequest("/login", session);

    middleware(req);

    const url = redirectMock.mock.calls[0][0];
    expect(url.pathname).toBe("/dashboard");
  });

  it("redirects non-admin from /admin", () => {
    const session = {
      userId: 1,
      role: "customer",
      expiresAt: new Date(Date.now() + 10000).toISOString(),
    };

    const req = createRequest("/admin", session);

    middleware(req);

    const url = redirectMock.mock.calls[0][0];
    expect(url.pathname).toBe("/dashboard");
  });

  it("allows admin access to /admin", () => {
    const session = {
      userId: 1,
      role: "admin",
      expiresAt: new Date(Date.now() + 10000).toISOString(),
    };

    const req = createRequest("/admin", session);

    middleware(req);

    expect(nextMock).toHaveBeenCalled();
  });
});