import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import LogoutButton from "../app/ui/logout-button";

const logoutMock = jest.fn();

jest.mock("@/app/actions/auth", () => ({
  __esModule: true,
  logout: () => logoutMock(),
}));

/**
 * Mock useTransition:
 * - isPending: false/true
 * - startTransition: langsung jalankan callback supaya deterministik
 */
const mockUseTransition = jest.fn();

jest.mock("react", () => {
  const actual = jest.requireActual("react");
  return {
    ...actual,
    useTransition: () => mockUseTransition(),
  };
});

describe("LogoutButton", () => {
  beforeEach(() => {
    logoutMock.mockClear();
    mockUseTransition.mockReset();
  });

  it("calls logout when submitted", async () => {
    const user = userEvent.setup();

    mockUseTransition.mockReturnValue([
      false,
      (cb: () => void) => cb(), // langsung execute
    ]);

    render(<LogoutButton />);

    await user.click(screen.getByRole("button", { name: /logout/i }));
    expect(logoutMock).toHaveBeenCalledTimes(1);
  });

  it("disables button and shows pending label when isPending is true", () => {
    mockUseTransition.mockReturnValue([true, (cb: () => void) => cb()]);

    render(<LogoutButton />);

    const btn = screen.getByRole("button", { name: /logging out/i });
    expect(btn).toBeDisabled();
  });
});
