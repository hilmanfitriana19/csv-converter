import { CsvTransformer } from '@/components/csv-transformer';
import { Header } from '@/components/header';
import { Toaster } from '@/components/ui/toaster';

export default function Home() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-background text-foreground">
      <Header />
      <main className="flex-1 p-4 sm:p-6 md:p-8">
        <CsvTransformer />
      </main>
      <Toaster />
    </div>
  );
}
