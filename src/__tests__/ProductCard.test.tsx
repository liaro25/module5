import { render, screen } from "@testing-library/react";
import ProductCard from "../components/ProductCard";

// mock AddToCartButton supaya tidak tergantung ke CartContext
jest.mock("@/components/AddToCart", () => ({
  __esModule: true,
  default: () => <button type="button">Add to Cart</button>,
}));

const product = {
  id: 123,
  title: "Classic Hoodie",
  price: 699,
  description: "desc",
  images: ["https://example.com/hoodie.jpg"],
  category: { id: 9, name: "Clothes", image: "https://example.com/cat.jpg" },
};

describe("ProductCard", () => {
  it("renders title, price and category", () => {
    render(<ProductCard product={product as any} />);

    expect(screen.getByText("Classic Hoodie")).toBeInTheDocument();
    expect(screen.getByText("$699")).toBeInTheDocument();
    expect(screen.getByText("Clothes")).toBeInTheDocument();
  });

  it("renders View Detail link correctly", () => {
    render(<ProductCard product={product as any} />);

    const link = screen.getByRole("link", { name: /view detail/i });
    expect(link).toHaveAttribute("href", "/products/123");
  });

  it("renders image correctly", () => {
    render(<ProductCard product={product as any} />);

    const img = screen.getByRole("img", { name: "Classic Hoodie" });
    expect(img).toHaveAttribute("src", "https://example.com/hoodie.jpg");
  });
});
