import { login, logout } from "../app/actions/auth";

const createSessionMock = jest.fn();
const deleteSessionMock = jest.fn();
const redirectMock = jest.fn();

global.fetch = jest.fn();

// mock redirect
jest.mock("next/navigation", () => ({
  redirect: (url: string) => redirectMock(url),
}));

// mock session helpers
jest.mock("../lib/session", () => ({
  createSession: (...args: any[]) => createSessionMock(...args),
  deleteSession: () => deleteSessionMock(),
}));

describe("auth server actions", () => {
  beforeAll(() => {
    // mute console.error supaya output test bersih
    jest.spyOn(console, "error").mockImplementation(() => {});
  });

  afterAll(() => {
    (console.error as jest.Mock).mockRestore();
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("login()", () => {
    it("returns email error if invalid email", async () => {
      const formData = new FormData();
      formData.set("email", "invalid");
      formData.set("password", "123");

      const result = await login(undefined as any, formData);

      expect(result?.errors?.email).toBe(
        "Please enter a valid email address.",
      );
    });

    it("returns password error if empty password", async () => {
      const formData = new FormData();
      formData.set("email", "test@mail.com");
      formData.set("password", "");

      const result = await login(undefined as any, formData);

      expect(result?.errors?.password).toBe("Password is required.");
    });

    it("returns message if login API fails", async () => {
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
      });

      const formData = new FormData();
      formData.set("email", "test@mail.com");
      formData.set("password", "123");

      const result = await login(undefined as any, formData);

      expect(result?.message).toBe(
        "Invalid email or password. Please try again.",
      );
    });

    it("returns message if profile API fails", async () => {
      (fetch as jest.Mock)
        .mockResolvedValueOnce({
          ok: true,
          json: async () => ({ access_token: "token123" }),
        })
        .mockResolvedValueOnce({
          ok: false,
        });

      const formData = new FormData();
      formData.set("email", "test@mail.com");
      formData.set("password", "123");

      const result = await login(undefined as any, formData);

      expect(result?.message).toBe("Failed to fetch user profile.");
    });

    it("creates session and redirects on success", async () => {
      (fetch as jest.Mock)
        .mockResolvedValueOnce({
          ok: true,
          json: async () => ({ access_token: "token123" }),
        })
        .mockResolvedValueOnce({
          ok: true,
          json: async () => ({
            id: 1,
            email: "test@mail.com",
            role: "customer",
          }),
        });

      const formData = new FormData();
      formData.set("email", "test@mail.com");
      formData.set("password", "123");

      await login(undefined as any, formData);

      expect(createSessionMock).toHaveBeenCalledWith(
        1,
        "test@mail.com",
        "customer",
      );

      expect(redirectMock).toHaveBeenCalledWith("/");
    });

    it("returns generic error if fetch throws", async () => {
      (fetch as jest.Mock).mockRejectedValueOnce(
        new Error("network error"),
      );

      const formData = new FormData();
      formData.set("email", "test@mail.com");
      formData.set("password", "123");

      const result = await login(undefined as any, formData);

      expect(result?.message).toBe(
        "An error occurred during login. Please try again.",
      );
    });
  });

  describe("logout()", () => {
    it("deletes session and redirects to login", async () => {
      await logout();

      expect(deleteSessionMock).toHaveBeenCalledTimes(1);
      expect(redirectMock).toHaveBeenCalledWith("/login");
    });
  });
});