import { FileText } from 'lucide-react';

export function Header() {
  return (
    <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-card px-4 md:px-6">
      <div className="flex items-center gap-3">
        <FileText className="h-7 w-7 text-primary" />
        <h1 className="text-xl font-bold tracking-tight sm:text-2xl">
          CSV Transformer
        </h1>
      </div>
    </header>
  );
}
