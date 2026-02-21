import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { CartProvider, useCart } from "../context/CartContext";
import AddToCart from "../components/AddToCart";

const product = {
  id: 1,
  title: "Test Product",
  price: 100,
  description: "desc",
  images: ["x"],
  category: { id: 1, name: "Cat", image: "y" },
};

// Test harness: expose cart state in DOM
function CartDebug() {
  const { subtotal, totalItems, items } = useCart();
  return (
    <div>
      <div data-testid="subtotal">{subtotal}</div>
      <div data-testid="totalItems">{totalItems}</div>
      <div data-testid="itemsCount">{items.length}</div>
    </div>
  );
}

function App() {
  return (
    <CartProvider>
      <CartDebug />
      <AddToCart product={product as any} />
    </CartProvider>
  );
}

describe("Cart integration", () => {
  beforeEach(() => {
    localStorage.clear(); // prevent hydration from older tests
  });

  it("adds item via AddToCart and updates cart totals", async () => {
    const user = userEvent.setup();

    render(<App />);

    expect(screen.getByTestId("subtotal")).toHaveTextContent("0");
    expect(screen.getByTestId("totalItems")).toHaveTextContent("0");
    expect(screen.getByTestId("itemsCount")).toHaveTextContent("0");

    await user.click(screen.getByRole("button", { name: /add to cart/i }));

    expect(screen.getByTestId("subtotal")).toHaveTextContent("100");
    expect(screen.getByTestId("totalItems")).toHaveTextContent("1");
    expect(screen.getByTestId("itemsCount")).toHaveTextContent("1");
  });

  it("adds twice -> quantity merges and totals increase", async () => {
    const user = userEvent.setup();

    render(<App />);

    await user.click(screen.getByRole("button", { name: /add to cart/i }));
    await user.click(screen.getByRole("button", { name: /add to cart/i }));

    expect(screen.getByTestId("subtotal")).toHaveTextContent("200");
    expect(screen.getByTestId("totalItems")).toHaveTextContent("2");
    expect(screen.getByTestId("itemsCount")).toHaveTextContent("1"); // merged line item
  });
});
