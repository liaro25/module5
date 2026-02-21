import React from "react";
import { renderHook, act, waitFor } from "@testing-library/react";
import { CartProvider, useCart } from "../context/CartContext";

const STORAGE_KEY = "revoshop_cart_v1";

const product = {
  id: 1,
  title: "Test Product",
  price: 100,
  description: "desc",
  images: ["https://example.com/p.jpg"],
  category: { id: 1, name: "Cat", image: "https://example.com/c.jpg" },
};

function wrapper({ children }: { children: React.ReactNode }) {
  return <CartProvider>{children}</CartProvider>;
}

describe("CartContext", () => {
  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });

  it("starts empty", () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    expect(result.current.items).toHaveLength(0);
    expect(result.current.totalItems).toBe(0);
    expect(result.current.subtotal).toBe(0);
  });

  it("addItem adds product and updates totals", () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => {
      result.current.addItem(product as any);
    });

    expect(result.current.items).toHaveLength(1);
    expect(result.current.items[0].id).toBe(1);
    expect(result.current.items[0].quantity).toBe(1);

    expect(result.current.totalItems).toBe(1);
    expect(result.current.subtotal).toBe(100);
  });

  it("addItem with quantity merges into existing item", () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => result.current.addItem(product as any, 2));
    act(() => result.current.addItem(product as any, 3));

    expect(result.current.items).toHaveLength(1);
    expect(result.current.items[0].quantity).toBe(5);

    expect(result.current.totalItems).toBe(5);
    expect(result.current.subtotal).toBe(500);
  });

  it("setQty updates quantity; setQty to 0 removes item", () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => result.current.addItem(product as any, 2));
    act(() => result.current.setQty(1, 5));

    expect(result.current.items[0].quantity).toBe(5);
    expect(result.current.totalItems).toBe(5);
    expect(result.current.subtotal).toBe(500);

    act(() => result.current.setQty(1, 0));
    expect(result.current.items).toHaveLength(0);
    expect(result.current.totalItems).toBe(0);
    expect(result.current.subtotal).toBe(0);
  });

  it("removeItem removes item and resets totals", () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => result.current.addItem(product as any, 2));
    act(() => result.current.removeItem(1));

    expect(result.current.items).toHaveLength(0);
    expect(result.current.totalItems).toBe(0);
    expect(result.current.subtotal).toBe(0);
  });

  it("clear empties the cart", () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => result.current.addItem(product as any, 2));
    act(() => result.current.clear());

    expect(result.current.items).toHaveLength(0);
    expect(result.current.totalItems).toBe(0);
    expect(result.current.subtotal).toBe(0);
  });

  it("persists state to localStorage", async () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => result.current.addItem(product as any, 2));

    await waitFor(() => {
      const raw = localStorage.getItem(STORAGE_KEY);
      expect(raw).toBeTruthy();

      const parsed = JSON.parse(raw as string);
      expect(parsed.items).toHaveLength(1);
      expect(parsed.items[0].id).toBe(1);
      expect(parsed.items[0].quantity).toBe(2);
    });
  });

  it("hydrates from localStorage on mount", async () => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        items: [
          { id: 1, title: "Test Product", price: 100, image: "x", quantity: 3 },
        ],
      }),
    );

    const { result } = renderHook(() => useCart(), { wrapper });

    await waitFor(() => {
      expect(result.current.items).toHaveLength(1);
      expect(result.current.items[0].quantity).toBe(3);
      expect(result.current.totalItems).toBe(3);
      expect(result.current.subtotal).toBe(300);
    });
  });

  it("ignores invalid JSON in localStorage (does not crash)", async () => {
    localStorage.setItem(STORAGE_KEY, "{not-valid-json");

    const { result } = renderHook(() => useCart(), { wrapper });

    // Should stay empty and not throw
    await waitFor(() => {
      expect(result.current.items).toHaveLength(0);
      expect(result.current.totalItems).toBe(0);
      expect(result.current.subtotal).toBe(0);
    });
  });
});
