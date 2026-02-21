import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import AddToCart from "../components/AddToCart";

// mock CartContext sekali di top-level
const addItemMock = jest.fn();

jest.mock("@/context/CartContext", () => ({
  __esModule: true,
  useCart: () => ({
    items: [],
    totalItems: 0,
    subtotal: 0,
    addItem: addItemMock,
    removeItem: jest.fn(),
    setQty: jest.fn(),
    clear: jest.fn(),
  }),
}));

const product = {
  id: 1,
  title: "Test Product",
  price: 100,
  description: "desc",
  images: ["x"],
  category: { id: 1, name: "Cat", image: "y" },
};

describe("AddToCart", () => {
  beforeEach(() => {
    addItemMock.mockClear();
  });

  it("simple mode: calls addItem(product, 1) when clicked", async () => {
    const user = userEvent.setup();

    render(<AddToCart product={product as any} />);

    await user.click(screen.getByRole("button", { name: /add to cart/i }));

    expect(addItemMock).toHaveBeenCalledTimes(1);
    expect(addItemMock).toHaveBeenCalledWith(product, 1);
  });

  it("withQty mode: + increments quantity", async () => {
    const user = userEvent.setup();

    render(<AddToCart product={product as any} withQty />);

    await user.click(screen.getByRole("button", { name: "+" }));

    expect(screen.getByRole("spinbutton")).toHaveValue(2);
  });

  it("withQty mode: - never goes below 1", async () => {
    const user = userEvent.setup();

    render(<AddToCart product={product as any} withQty />);

    await user.click(screen.getByRole("button", { name: "-" }));

    expect(screen.getByRole("spinbutton")).toHaveValue(1);
  });

  it("withQty mode: calls addItem with selected qty", async () => {
    const user = userEvent.setup();

    render(<AddToCart product={product as any} withQty />);

    await user.click(screen.getByRole("button", { name: "+" }));
    await user.click(screen.getByRole("button", { name: "+" })); // qty -> 3

    await user.click(screen.getByRole("button", { name: /add to cart/i }));

    expect(addItemMock).toHaveBeenCalledTimes(1);
    expect(addItemMock).toHaveBeenCalledWith(product, 3);
  });

  it("withQty mode: manual input change works", () => {
    render(<AddToCart product={product as any} withQty />);

    const input = screen.getByRole("spinbutton");

    fireEvent.change(input, { target: { value: "5" } });

    expect(input).toHaveValue(5);
  });
});
