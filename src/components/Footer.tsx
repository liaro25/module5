// src/components/Footer.tsx
export default function Footer() {
  return (
    <footer className="border-t border-[#BFAEFF]/35 bg-white/10 backdrop-blur">
      <div className="mx-auto max-w-7xl px-6 py-5 text-sm">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between text-[#3B2F7F]/80">
          <p>© {new Date().getFullYear()} RevoShop</p>

          <p className="text-[#3B2F7F]/60">
            Built with caffeine and countless re-renders!
          </p>
        </div>
      </div>
    </footer>
  );
}
