import "@testing-library/jest-dom";

// Mock next/link -> render <a> supaya gampang dicek href
jest.mock("next/link", () => ({
  __esModule: true,
  default: ({ href, className, children }: any) => (
    <a href={href} className={className}>
      {children}
    </a>
  ),
}));
