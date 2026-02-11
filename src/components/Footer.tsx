// src/components/Footer.tsx
export default function Footer() {
  return (
    <footer className="border-t bg-gray-50">
      <div className="mx-auto max-w-7xl px-6 py-10 text-sm text-gray-600">
        <div className="flex flex-col gap-4 sm:flex-row sm:justify-between">
          <p>© {new Date().getFullYear()} RevoShop</p>

          <p className="text-gray-500">
            Made with such hardwork!
          </p>
        </div>
      </div>
    </footer>
  );
}
