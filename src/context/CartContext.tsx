"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
} from "react";
import type { Product } from "@/types/product";

export type CartItem = {
  id: number;
  title: string;
  price: number;
  image: string;
  quantity: number;
};

type CartState = { items: CartItem[] };

type CartAction =
  | { type: "HYDRATE"; payload: CartState }
  | { type: "ADD_ITEM"; payload: { product: Product; quantity?: number } }
  | { type: "REMOVE_ITEM"; payload: { id: number } }
  | { type: "SET_QTY"; payload: { id: number; quantity: number } }
  | { type: "CLEAR" };

const CART_STORAGE_KEY = "revoshop_cart_v1";

function toCartItem(product: Product, quantity: number): CartItem {
  const image = product.images?.[0] ?? product.category?.image ?? "";
  return {
    id: product.id,
    title: product.title,
    price: product.price,
    image,
    quantity,
  };
}

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "HYDRATE":
      return action.payload;

    case "ADD_ITEM": {
      const qtyToAdd = Math.max(1, action.payload.quantity ?? 1);
      const next = [...state.items];
      const idx = next.findIndex((it) => it.id === action.payload.product.id);

      if (idx >= 0) {
        next[idx] = { ...next[idx], quantity: next[idx].quantity + qtyToAdd };
      } else {
        next.push(toCartItem(action.payload.product, qtyToAdd));
      }
      return { items: next };
    }

    case "REMOVE_ITEM":
      return { items: state.items.filter((it) => it.id !== action.payload.id) };

    case "SET_QTY": {
      const q = action.payload.quantity;
      if (q <= 0) {
        return {
          items: state.items.filter((it) => it.id !== action.payload.id),
        };
      }
      return {
        items: state.items.map((it) =>
          it.id === action.payload.id ? { ...it, quantity: q } : it,
        ),
      };
    }

    case "CLEAR":
      return { items: [] };

    default:
      return state;
  }
}

type CartContextValue = {
  items: CartItem[];
  totalItems: number;
  subtotal: number;

  addItem: (product: Product, quantity?: number) => void;
  removeItem: (id: number) => void;
  setQty: (id: number, quantity: number) => void;
  clear: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [] });

  // hydrate from localStorage
  useEffect(() => {
    try {
      const raw = localStorage.getItem(CART_STORAGE_KEY);
      if (!raw) return;
      const parsed = JSON.parse(raw) as CartState;
      if (!parsed?.items || !Array.isArray(parsed.items)) return;
      dispatch({ type: "HYDRATE", payload: parsed });
    } catch {
      // ignore invalid json
    }
  }, []);

  // persist to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(state));
    } catch {
      // ignore quota/private mode
    }
  }, [state]);

  const totalItems = useMemo(
    () => state.items.reduce((sum, it) => sum + it.quantity, 0),
    [state.items],
  );

  const subtotal = useMemo(
    () => state.items.reduce((sum, it) => sum + it.price * it.quantity, 0),
    [state.items],
  );

  const value: CartContextValue = useMemo(
    () => ({
      items: state.items,
      totalItems,
      subtotal,
      addItem: (product, quantity) =>
        dispatch({ type: "ADD_ITEM", payload: { product, quantity } }),
      removeItem: (id) => dispatch({ type: "REMOVE_ITEM", payload: { id } }),
      setQty: (id, quantity) =>
        dispatch({ type: "SET_QTY", payload: { id, quantity } }),
      clear: () => dispatch({ type: "CLEAR" }),
    }),
    [state.items, subtotal, totalItems],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside <CartProvider>");
  return ctx;
}
