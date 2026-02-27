import "@testing-library/jest-dom";

// Mock next/navigation (App Router hooks)
jest.mock("next/navigation", () => {
  const push = jest.fn();
  const replace = jest.fn();
  const prefetch = jest.fn();
  const refresh = jest.fn();

  return {
    __esModule: true,
    useRouter: () => ({ push, replace, prefetch, refresh }),
    usePathname: () => "/",
    useSearchParams: () => new URLSearchParams(),
  };
});

// Mock next/link
jest.mock("next/link", () => ({
  __esModule: true,
  default: ({ href, className, children }: any) => (
    <a href={href} className={className}>
      {children}
    </a>
  ),
}));
