import { render, screen } from "@testing-library/react";
import LoginForm from "../app/ui/login-form";

// Mock server action module (kita nggak perlu panggil beneran)
jest.mock("@/app/actions/auth", () => ({
  __esModule: true,
  login: jest.fn(),
}));

/**
 * Mock useActionState supaya kita bisa kontrol:
 * - state (errors/message)
 * - pending (true/false)
 */
const mockUseActionState = jest.fn();

jest.mock("react", () => {
  const actual = jest.requireActual("react");
  return {
    ...actual,
    useActionState: (...args: any[]) => mockUseActionState(...args),
  };
});

describe("LoginForm", () => {
  beforeEach(() => {
    mockUseActionState.mockReset();
  });

  it("renders email and password inputs and login button", () => {
    mockUseActionState.mockReturnValue([undefined, jest.fn(), false]);

    render(<LoginForm />);

    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /login/i })).toBeInTheDocument();
  });

  it("shows field errors when state.errors is present", () => {
    mockUseActionState.mockReturnValue([
      {
        errors: {
          email: "Please enter a valid email address.",
          password: "Password is required.",
        },
      },
      jest.fn(),
      false,
    ]);

    render(<LoginForm />);

    expect(
      screen.getByText(/please enter a valid email address/i),
    ).toBeInTheDocument();
    expect(screen.getByText(/password is required/i)).toBeInTheDocument();
  });

  it("shows form-level error message when state.message is present", () => {
    mockUseActionState.mockReturnValue([
      { message: "Invalid credentials" },
      jest.fn(),
      false,
    ]);

    render(<LoginForm />);

    expect(screen.getByText(/invalid credentials/i)).toBeInTheDocument();
  });

  it("disables submit button and changes label when pending", () => {
    mockUseActionState.mockReturnValue([undefined, jest.fn(), true]);

    render(<LoginForm />);

    const btn = screen.getByRole("button", { name: /logging in/i });
    expect(btn).toBeDisabled();
  });

  it("renders test credentials blocks", () => {
    mockUseActionState.mockReturnValue([undefined, jest.fn(), false]);

    render(<LoginForm />);

    expect(screen.getByText(/user test credentials/i)).toBeInTheDocument();
    expect(screen.getByText(/admin test credentials/i)).toBeInTheDocument();
    expect(screen.getByText(/john@mail\.com/i)).toBeInTheDocument();
    expect(screen.getByText(/admin@mail\.com/i)).toBeInTheDocument();
  });
});
